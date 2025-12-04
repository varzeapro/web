import { betterAuth } from "better-auth";
import { drizzleAdapter } from "better-auth/adapters/drizzle";
import { db } from "@/src/db";
import * as schema from "@/src/db/schema";
import { nextCookies } from "better-auth/next-js";

export const auth = betterAuth({
  database: drizzleAdapter(db, {
    provider: "mysql",
    schema: {
      ...schema,
      user: {
        fields: {
          role: "role",
        },
      },
    },
    usePlural: true,
  }),
  emailAndPassword: {
    enabled: true,
  },
  plugins: [nextCookies()],
  user: {
    additionalFields: {
      role: {
        type: "string",
        required: false,
        input: false, // Don't allow user to set role directly
      },
      onboardingCompleted: {
        type: "boolean",
        required: false,
        defaultValue: false,
        input: false,
      },
    },
  },
});
