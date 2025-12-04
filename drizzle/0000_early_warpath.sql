CREATE TABLE `accounts` (
	`id` varchar(36) NOT NULL,
	`account_id` text NOT NULL,
	`provider_id` text NOT NULL,
	`user_id` varchar(36) NOT NULL,
	`access_token` text,
	`refresh_token` text,
	`id_token` text,
	`access_token_expires_at` timestamp(3),
	`refresh_token_expires_at` timestamp(3),
	`scope` text,
	`password` text,
	`created_at` timestamp(3) NOT NULL DEFAULT (now()),
	`updated_at` timestamp(3) NOT NULL DEFAULT (now()),
	CONSTRAINT `accounts_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
CREATE TABLE `conversations` (
	`id` int AUTO_INCREMENT NOT NULL,
	`team_id` int NOT NULL,
	`player_id` int NOT NULL,
	`status` enum('ACTIVE','BLOCKED') NOT NULL DEFAULT 'ACTIVE',
	`last_message_at` timestamp NOT NULL DEFAULT (now()),
	`created_at` timestamp NOT NULL DEFAULT (now()),
	CONSTRAINT `conversations_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
CREATE TABLE `media` (
	`id` int AUTO_INCREMENT NOT NULL,
	`player_id` int NOT NULL,
	`type` enum('PHOTO','VIDEO') NOT NULL,
	`url` text NOT NULL,
	`created_at` timestamp NOT NULL DEFAULT (now()),
	CONSTRAINT `media_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
CREATE TABLE `messages` (
	`id` int AUTO_INCREMENT NOT NULL,
	`conversation_id` int NOT NULL,
	`sender_id` varchar(36) NOT NULL,
	`content` text NOT NULL,
	`read_at` timestamp,
	`created_at` timestamp NOT NULL DEFAULT (now()),
	CONSTRAINT `messages_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
CREATE TABLE `player_positions` (
	`player_id` int NOT NULL,
	`position_id` int NOT NULL,
	CONSTRAINT `player_positions_player_id_position_id_pk` PRIMARY KEY(`player_id`,`position_id`)
);
--> statement-breakpoint
CREATE TABLE `players` (
	`id` int AUTO_INCREMENT NOT NULL,
	`user_id` varchar(36) NOT NULL,
	`nome` varchar(255) NOT NULL,
	`data_nascimento` date NOT NULL,
	`altura` decimal(3,2),
	`peso` decimal(5,2),
	`perna_dominante` enum('DIREITA','ESQUERDA','AMBAS'),
	`cidade` varchar(255),
	`estado` varchar(2),
	`bio` text,
	`status_disponibilidade` boolean NOT NULL DEFAULT true,
	`updated_at` timestamp NOT NULL DEFAULT (now()) ON UPDATE CURRENT_TIMESTAMP,
	CONSTRAINT `players_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
CREATE TABLE `positions` (
	`id` int AUTO_INCREMENT NOT NULL,
	`nome` varchar(100) NOT NULL,
	CONSTRAINT `positions_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
CREATE TABLE `sessions` (
	`id` varchar(36) NOT NULL,
	`expires_at` timestamp(3) NOT NULL,
	`token` varchar(255) NOT NULL,
	`created_at` timestamp(3) NOT NULL DEFAULT (now()),
	`updated_at` timestamp(3) NOT NULL DEFAULT (now()),
	`ip_address` text,
	`user_agent` text,
	`user_id` varchar(36) NOT NULL,
	CONSTRAINT `sessions_id` PRIMARY KEY(`id`),
	CONSTRAINT `sessions_token_unique` UNIQUE(`token`)
);
--> statement-breakpoint
CREATE TABLE `teams` (
	`id` int AUTO_INCREMENT NOT NULL,
	`user_id` varchar(36) NOT NULL,
	`nome_time` varchar(255) NOT NULL,
	`modalidade` varchar(100),
	`cidade` varchar(255),
	`estado` varchar(2),
	`nome_responsavel` varchar(255),
	`plano` enum('FREE','PREMIUM') NOT NULL DEFAULT 'FREE',
	`contatos_realizados` int NOT NULL DEFAULT 0,
	`ultimo_reset_contatos` timestamp,
	CONSTRAINT `teams_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
CREATE TABLE `users` (
	`id` varchar(36) NOT NULL,
	`name` varchar(255) NOT NULL,
	`email` varchar(255) NOT NULL,
	`email_verified` boolean NOT NULL DEFAULT false,
	`image` text,
	`created_at` timestamp(3) NOT NULL DEFAULT (now()),
	`updated_at` timestamp(3) NOT NULL DEFAULT (now()),
	`role` enum('ADMIN','PLAYER','TEAM') NOT NULL DEFAULT 'PLAYER',
	CONSTRAINT `users_id` PRIMARY KEY(`id`),
	CONSTRAINT `users_email_unique` UNIQUE(`email`)
);
--> statement-breakpoint
CREATE TABLE `verifications` (
	`id` varchar(36) NOT NULL,
	`identifier` varchar(255) NOT NULL,
	`value` text NOT NULL,
	`expires_at` timestamp(3) NOT NULL,
	`created_at` timestamp(3) NOT NULL DEFAULT (now()),
	`updated_at` timestamp(3) NOT NULL DEFAULT (now()),
	CONSTRAINT `verifications_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
ALTER TABLE `accounts` ADD CONSTRAINT `accounts_user_id_users_id_fk` FOREIGN KEY (`user_id`) REFERENCES `users`(`id`) ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE `conversations` ADD CONSTRAINT `conversations_team_id_teams_id_fk` FOREIGN KEY (`team_id`) REFERENCES `teams`(`id`) ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE `conversations` ADD CONSTRAINT `conversations_player_id_players_id_fk` FOREIGN KEY (`player_id`) REFERENCES `players`(`id`) ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE `media` ADD CONSTRAINT `media_player_id_players_id_fk` FOREIGN KEY (`player_id`) REFERENCES `players`(`id`) ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE `messages` ADD CONSTRAINT `messages_conversation_id_conversations_id_fk` FOREIGN KEY (`conversation_id`) REFERENCES `conversations`(`id`) ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE `messages` ADD CONSTRAINT `messages_sender_id_users_id_fk` FOREIGN KEY (`sender_id`) REFERENCES `users`(`id`) ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE `player_positions` ADD CONSTRAINT `player_positions_player_id_players_id_fk` FOREIGN KEY (`player_id`) REFERENCES `players`(`id`) ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE `player_positions` ADD CONSTRAINT `player_positions_position_id_positions_id_fk` FOREIGN KEY (`position_id`) REFERENCES `positions`(`id`) ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE `players` ADD CONSTRAINT `players_user_id_users_id_fk` FOREIGN KEY (`user_id`) REFERENCES `users`(`id`) ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE `sessions` ADD CONSTRAINT `sessions_user_id_users_id_fk` FOREIGN KEY (`user_id`) REFERENCES `users`(`id`) ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE `teams` ADD CONSTRAINT `teams_user_id_users_id_fk` FOREIGN KEY (`user_id`) REFERENCES `users`(`id`) ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
CREATE INDEX `accounts_userId_idx` ON `accounts` (`user_id`);--> statement-breakpoint
CREATE INDEX `sessions_userId_idx` ON `sessions` (`user_id`);--> statement-breakpoint
CREATE INDEX `verifications_identifier_idx` ON `verifications` (`identifier`);