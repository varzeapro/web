import { requireAuth } from "@/src/lib/auth-guard";

export default async function OnboardingLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  await requireAuth();
  return <>{children}</>;
}
