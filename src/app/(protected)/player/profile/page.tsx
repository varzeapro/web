"use client";

import { useState } from "react";
import { Settings, LogOut, Edit, ChevronRight } from "lucide-react";
import { ProfileHeader } from "@/src/components/player-dashboard/profile-header";
import { ProfileInfo } from "@/src/components/player-dashboard/profile-info";
import Link from "next/link";
import { authClient } from "@/src/lib/auth-client";
import { useRouter } from "next/navigation";

// ============================================
// MOCK DATA
// ============================================

const mockPlayer = {
  name: "Carlos Silva",
  nickname: "carlitos10",
  avatar: undefined,
  initials: "CS",
  level: "intermediário" as const,
  stats: {
    games: 12,
    goals: 8,
    assists: 5,
  },
};

const mockInfo = {
  position: "Atacante",
  location: "Vila Madalena, São Paulo",
  playDays: ["Sábado", "Domingo"],
  playTime: "14:00 - 18:00",
  searchRadius: "5 km",
};

// ============================================
// PAGE COMPONENT
// ============================================

export default function ProfilePage() {
  const router = useRouter();
  const [, setEditingAvatar] = useState(false);

  const menuItems = [
    { icon: Edit, label: "Editar Perfil", href: "#" },
    { icon: Settings, label: "Configurações", href: "#" },
  ];

  return (
    <>
      {/* Page Title */}
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-white">Meu Perfil</h1>
      </div>

      {/* Profile Header */}
      <section className="animate-fade-in mb-6">
        <ProfileHeader
          player={mockPlayer}
          onEditAvatar={() => setEditingAvatar(true)}
        />
      </section>

      {/* Profile Info */}
      <section className="animate-fade-in animation-delay-200 mb-6">
        <ProfileInfo info={mockInfo} />
      </section>

      {/* Menu Items */}
      <section className="animate-fade-in animation-delay-300 space-y-2">
        {menuItems.map((item) => (
          <Link
            key={item.label}
            href={item.href}
            className="flex items-center gap-3 rounded-xl bg-white/5 px-4 py-4 text-white transition-colors hover:bg-white/10"
          >
            <item.icon className="h-5 w-5 text-(--varzea-gold)" />
            <span className="flex-1">{item.label}</span>
            <ChevronRight className="h-5 w-5 text-white/30" />
          </Link>
        ))}

        {/* Logout */}
        <button
          className="flex cursor-pointer w-full items-center gap-3 rounded-xl bg-red-500/10 px-4 py-4 text-red-400 transition-colors hover:bg-red-500/20"
          onClick={() =>
            authClient.signOut({
              fetchOptions: {
                onSuccess: () => {
                  router.push("/sign-in");
                },
              },
            })
          }
        >
          <LogOut className="h-5 w-5" />
          <span className="flex-1 text-left">Sair da conta</span>
        </button>
      </section>
    </>
  );
}
