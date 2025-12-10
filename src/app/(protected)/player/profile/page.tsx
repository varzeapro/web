"use client";

import { useState } from "react";
import { ArrowLeft, Settings, LogOut, Edit, ChevronRight } from "lucide-react";
import { Button } from "@/src/components/ui/button";
import { ProfileHeader } from "@/src/components/player-dashboard/profile-header";
import { ProfileInfo } from "@/src/components/player-dashboard/profile-info";
import { BottomNavbar } from "@/src/components/player-dashboard/bottom-navbar";
import Link from "next/link";

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
  const [, setEditingAvatar] = useState(false);

  const menuItems = [
    { icon: Edit, label: "Editar Perfil", href: "#" },
    { icon: Settings, label: "Configurações", href: "#" },
  ];

  return (
    <div className="min-h-screen bg-onboarding pb-24">
      {/* Header */}
      <header className="sticky top-0 z-40 border-b border-white/10 bg-[#0f0f1a]/90 backdrop-blur-lg px-4 py-4">
        <div className="mx-auto max-w-md flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Link href="/player">
              <Button
                variant="ghost"
                size="icon"
                className="text-white/70 hover:text-white"
              >
                <ArrowLeft className="h-5 w-5" />
              </Button>
            </Link>
            <h1 className="text-xl font-bold text-white">Meu Perfil</h1>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="mx-auto max-w-md space-y-6 px-4 py-6">
        {/* Profile Header */}
        <section className="animate-fade-in">
          <ProfileHeader
            player={mockPlayer}
            onEditAvatar={() => setEditingAvatar(true)}
          />
        </section>

        {/* Profile Info */}
        <section className="animate-fade-in animation-delay-200">
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
            className="flex w-full items-center gap-3 rounded-xl bg-red-500/10 px-4 py-4 text-red-400 transition-colors hover:bg-red-500/20"
            onClick={() => console.log("Logout")}
          >
            <LogOut className="h-5 w-5" />
            <span className="flex-1 text-left">Sair da conta</span>
          </button>
        </section>
      </main>

      {/* Bottom Navigation */}
      <BottomNavbar activeItem="profile" />
    </div>
  );
}
