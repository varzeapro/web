import { requireAuth } from "@/src/lib/auth-guard";

export default async function TeamLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  // Requires authenticated user with TEAM role
  await requireAuth(["TEAM"]);

  return <>{children}</>;
}
