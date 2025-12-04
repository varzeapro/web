import { relations } from "drizzle-orm";
import {
  mysqlTable,
  varchar,
  text,
  timestamp,
  boolean,
  int,
  mysqlEnum,
  decimal,
  primaryKey,
  index,
  date,
} from "drizzle-orm/mysql-core";

// --- Better Auth Tables ---

export const users = mysqlTable("users", {
  id: varchar("id", { length: 36 }).primaryKey(),
  name: varchar("name", { length: 255 }).notNull(),
  email: varchar("email", { length: 255 }).notNull().unique(),
  emailVerified: boolean("email_verified").default(false).notNull(),
  image: text("image"),
  createdAt: timestamp("created_at", { fsp: 3 }).defaultNow().notNull(),
  updatedAt: timestamp("updated_at", { fsp: 3 })
    .defaultNow()
    .$onUpdate(() => new Date())
    .notNull(),
  role: mysqlEnum("role", ["ADMIN", "PLAYER", "TEAM"]),
  onboardingCompleted: boolean("onboarding_completed").default(false).notNull(),
});

export const sessions = mysqlTable(
  "sessions",
  {
    id: varchar("id", { length: 36 }).primaryKey(),
    expiresAt: timestamp("expires_at", { fsp: 3 }).notNull(),
    token: varchar("token", { length: 255 }).notNull().unique(),
    createdAt: timestamp("created_at", { fsp: 3 }).defaultNow().notNull(),
    updatedAt: timestamp("updated_at", { fsp: 3 })
      .defaultNow()
      .$onUpdate(() => new Date())
      .notNull(),
    ipAddress: text("ip_address"),
    userAgent: text("user_agent"),
    userId: varchar("user_id", { length: 36 })
      .notNull()
      .references(() => users.id, { onDelete: "cascade" }),
  },
  (table) => [index("sessions_userId_idx").on(table.userId)]
);

export const accounts = mysqlTable(
  "accounts",
  {
    id: varchar("id", { length: 36 }).primaryKey(),
    accountId: text("account_id").notNull(),
    providerId: text("provider_id").notNull(),
    userId: varchar("user_id", { length: 36 })
      .notNull()
      .references(() => users.id, { onDelete: "cascade" }),
    accessToken: text("access_token"),
    refreshToken: text("refresh_token"),
    idToken: text("id_token"),
    accessTokenExpiresAt: timestamp("access_token_expires_at", { fsp: 3 }),
    refreshTokenExpiresAt: timestamp("refresh_token_expires_at", { fsp: 3 }),
    scope: text("scope"),
    password: text("password"),
    createdAt: timestamp("created_at", { fsp: 3 }).defaultNow().notNull(),
    updatedAt: timestamp("updated_at", { fsp: 3 })
      .defaultNow()
      .$onUpdate(() => new Date())
      .notNull(),
  },
  (table) => [index("accounts_userId_idx").on(table.userId)]
);

export const verifications = mysqlTable(
  "verifications",
  {
    id: varchar("id", { length: 36 }).primaryKey(),
    identifier: varchar("identifier", { length: 255 }).notNull(),
    value: text("value").notNull(),
    expiresAt: timestamp("expires_at", { fsp: 3 }).notNull(),
    createdAt: timestamp("created_at", { fsp: 3 }).defaultNow().notNull(),
    updatedAt: timestamp("updated_at", { fsp: 3 })
      .defaultNow()
      .$onUpdate(() => new Date())
      .notNull(),
  },
  (table) => [index("verifications_identifier_idx").on(table.identifier)]
);

// --- Domain Tables ---

export const players = mysqlTable("players", {
  id: int("id").primaryKey().autoincrement(),
  userId: varchar("user_id", { length: 36 })
    .notNull()
    .references(() => users.id, { onDelete: "cascade" }),
  nome: varchar("nome", { length: 255 }).notNull(),
  dataNascimento: date("data_nascimento", { mode: "date" }).notNull(),
  altura: decimal("altura", { precision: 3, scale: 2 }),
  peso: decimal("peso", { precision: 5, scale: 2 }),
  pernaDominante: mysqlEnum("perna_dominante", [
    "DIREITA",
    "ESQUERDA",
    "AMBAS",
  ]),
  cidade: varchar("cidade", { length: 255 }),
  estado: varchar("estado", { length: 2 }),
  bio: text("bio"),
  statusDisponibilidade: boolean("status_disponibilidade")
    .default(true)
    .notNull(),
  updatedAt: timestamp("updated_at").defaultNow().onUpdateNow().notNull(),
});

export const teams = mysqlTable("teams", {
  id: int("id").primaryKey().autoincrement(),
  userId: varchar("user_id", { length: 36 })
    .notNull()
    .references(() => users.id, { onDelete: "cascade" }),
  nomeTime: varchar("nome_time", { length: 255 }).notNull(),
  modalidade: varchar("modalidade", { length: 100 }),
  cidade: varchar("cidade", { length: 255 }),
  estado: varchar("estado", { length: 2 }),
  nomeResponsavel: varchar("nome_responsavel", { length: 255 }),
  // Freemium
  plano: mysqlEnum("plano", ["FREE", "PREMIUM"]).default("FREE").notNull(),
  contatosRealizados: int("contatos_realizados").default(0).notNull(),
  ultimoResetContatos: timestamp("ultimo_reset_contatos"),
});

export const positions = mysqlTable("positions", {
  id: int("id").primaryKey().autoincrement(),
  nome: varchar("nome", { length: 100 }).notNull(),
});

export const playerPositions = mysqlTable(
  "player_positions",
  {
    playerId: int("player_id")
      .notNull()
      .references(() => players.id, { onDelete: "cascade" }),
    positionId: int("position_id")
      .notNull()
      .references(() => positions.id, { onDelete: "cascade" }),
  },
  (t) => [primaryKey({ columns: [t.playerId, t.positionId] })]
);

export const media = mysqlTable("media", {
  id: int("id").primaryKey().autoincrement(),
  playerId: int("player_id")
    .notNull()
    .references(() => players.id, { onDelete: "cascade" }),
  type: mysqlEnum("type", ["PHOTO", "VIDEO"]).notNull(),
  url: text("url").notNull(),
  createdAt: timestamp("created_at").defaultNow().notNull(),
});

export const conversations = mysqlTable("conversations", {
  id: int("id").primaryKey().autoincrement(),
  teamId: int("team_id")
    .notNull()
    .references(() => teams.id, { onDelete: "cascade" }),
  playerId: int("player_id")
    .notNull()
    .references(() => players.id, { onDelete: "cascade" }),
  status: mysqlEnum("status", ["ACTIVE", "BLOCKED"])
    .default("ACTIVE")
    .notNull(),
  lastMessageAt: timestamp("last_message_at").defaultNow().notNull(),
  createdAt: timestamp("created_at").defaultNow().notNull(),
});

export const messages = mysqlTable("messages", {
  id: int("id").primaryKey().autoincrement(),
  conversationId: int("conversation_id")
    .notNull()
    .references(() => conversations.id, { onDelete: "cascade" }),
  senderId: varchar("sender_id", { length: 36 })
    .notNull()
    .references(() => users.id, { onDelete: "cascade" }),
  content: text("content").notNull(),
  readAt: timestamp("read_at"),
  createdAt: timestamp("created_at").defaultNow().notNull(),
});

// --- Relations ---

export const usersRelations = relations(users, ({ many, one }) => ({
  sessions: many(sessions),
  accounts: many(accounts),
  playerProfile: one(players, {
    fields: [users.id],
    references: [players.userId],
  }),
  teamProfile: one(teams, {
    fields: [users.id],
    references: [teams.userId],
  }),
  sentMessages: many(messages),
}));

export const sessionsRelations = relations(sessions, ({ one }) => ({
  user: one(users, {
    fields: [sessions.userId],
    references: [users.id],
  }),
}));

export const accountsRelations = relations(accounts, ({ one }) => ({
  user: one(users, {
    fields: [accounts.userId],
    references: [users.id],
  }),
}));

export const playersRelations = relations(players, ({ one, many }) => ({
  user: one(users, {
    fields: [players.userId],
    references: [users.id],
  }),
  positions: many(playerPositions),
  media: many(media),
  conversations: many(conversations),
}));

export const teamsRelations = relations(teams, ({ one, many }) => ({
  user: one(users, {
    fields: [teams.userId],
    references: [users.id],
  }),
  conversations: many(conversations),
}));

export const positionsRelations = relations(positions, ({ many }) => ({
  players: many(playerPositions),
}));

export const playerPositionsRelations = relations(
  playerPositions,
  ({ one }) => ({
    player: one(players, {
      fields: [playerPositions.playerId],
      references: [players.id],
    }),
    position: one(positions, {
      fields: [playerPositions.positionId],
      references: [positions.id],
    }),
  })
);

export const mediaRelations = relations(media, ({ one }) => ({
  player: one(players, {
    fields: [media.playerId],
    references: [players.id],
  }),
}));

export const conversationsRelations = relations(
  conversations,
  ({ one, many }) => ({
    team: one(teams, {
      fields: [conversations.teamId],
      references: [teams.id],
    }),
    player: one(players, {
      fields: [conversations.playerId],
      references: [players.id],
    }),
    messages: many(messages),
  })
);

export const messagesRelations = relations(messages, ({ one }) => ({
  conversation: one(conversations, {
    fields: [messages.conversationId],
    references: [conversations.id],
  }),
  sender: one(users, {
    fields: [messages.senderId],
    references: [users.id],
  }),
}));
