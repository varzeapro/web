import { requireAuth } from "@/src/lib/auth-guard";

export default async function PlayerLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  // Requires authenticated user with PLAYER role
  await requireAuth(["PLAYER"]);

  return <>{children}</>;
}
