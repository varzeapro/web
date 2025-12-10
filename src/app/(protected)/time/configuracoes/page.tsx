"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import {
  Camera,
  Bell,
  Shield,
  LogOut,
  ChevronRight,
  Trash2,
} from "lucide-react";
import { Button } from "@/src/components/ui/button";
import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from "@/src/components/ui/avatar";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/src/components/ui/card";
import { Switch } from "@/src/components/ui/switch";
import { authClient } from "@/src/lib/auth-client";
import Link from "next/link";

// ============================================
// MOCK DATA
// ============================================

const mockTeam = {
  name: "União São Jorge",
  initials: "USJ",
  avatar: undefined,
  createdAt: "Janeiro 2024",
  membersCount: 9,
};

// ============================================
// PAGE COMPONENT
// ============================================

export default function SettingsPage() {
  const router = useRouter();
  const [notifications, setNotifications] = useState(true);
  const [matchReminders, setMatchReminders] = useState(true);
  const [paymentReminders, setPaymentReminders] = useState(true);

  const handleLogout = () => {
    authClient.signOut({
      fetchOptions: {
        onSuccess: () => {
          router.push("/sign-in");
        },
      },
    });
  };

  return (
    <>
      {/* Page Header */}
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-white">⚙️ Configurações</h1>
      </div>

      {/* Team Profile */}
      <Card className="border-0 bg-linear-to-br from-[#1a1a2e] to-[#0f0f1a] text-white overflow-hidden mb-6">
        <CardContent className="p-6">
          <div className="flex items-center gap-4">
            <div className="relative">
              <Avatar className="h-20 w-20 border-4 border-(--varzea-green)/30">
                <AvatarImage src={mockTeam.avatar} alt={mockTeam.name} />
                <AvatarFallback className="bg-(--varzea-green-dark) text-2xl font-bold">
                  {mockTeam.initials}
                </AvatarFallback>
              </Avatar>
              <Button
                size="icon-sm"
                className="absolute -bottom-1 -right-1 rounded-full bg-(--varzea-green) text-white hover:bg-(--varzea-green)/90"
              >
                <Camera className="h-4 w-4" />
              </Button>
            </div>
            <div>
              <h2 className="text-xl font-bold">{mockTeam.name}</h2>
              <p className="text-sm text-white/50">
                Desde {mockTeam.createdAt}
              </p>
              <p className="text-sm text-white/50">
                {mockTeam.membersCount} membros
              </p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Notifications */}
      <Card className="border-0 bg-linear-to-br from-[#1a1a2e] to-[#0f0f1a] text-white mb-6">
        <CardHeader className="pb-2">
          <CardTitle className="text-lg flex items-center gap-2">
            <Bell className="h-5 w-5 text-(--varzea-gold)" />
            Notificações
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="font-medium">Notificações Push</p>
              <p className="text-xs text-white/50">
                Receber todas as notificações
              </p>
            </div>
            <Switch
              checked={notifications}
              onCheckedChange={setNotifications}
              className="data-[state=checked]:bg-(--varzea-green)"
            />
          </div>
          <div className="flex items-center justify-between">
            <div>
              <p className="font-medium">Lembretes de Jogo</p>
              <p className="text-xs text-white/50">24h e 1h antes da partida</p>
            </div>
            <Switch
              checked={matchReminders}
              onCheckedChange={setMatchReminders}
              className="data-[state=checked]:bg-(--varzea-green)"
            />
          </div>
          <div className="flex items-center justify-between">
            <div>
              <p className="font-medium">Cobranças de Pagamento</p>
              <p className="text-xs text-white/50">
                Lembrar jogadores da caixinha
              </p>
            </div>
            <Switch
              checked={paymentReminders}
              onCheckedChange={setPaymentReminders}
              className="data-[state=checked]:bg-(--varzea-green)"
            />
          </div>
        </CardContent>
      </Card>

      {/* Security */}
      <Card className="border-0 bg-linear-to-br from-[#1a1a2e] to-[#0f0f1a] text-white mb-6">
        <CardHeader className="pb-2">
          <CardTitle className="text-lg flex items-center gap-2">
            <Shield className="h-5 w-5 text-(--varzea-blue-light)" />
            Segurança
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-2">
          <Link
            href="#"
            className="flex items-center justify-between rounded-lg bg-white/5 px-4 py-3 transition-colors hover:bg-white/10"
          >
            <span>Alterar senha</span>
            <ChevronRight className="h-5 w-5 text-white/30" />
          </Link>
          <Link
            href="#"
            className="flex items-center justify-between rounded-lg bg-white/5 px-4 py-3 transition-colors hover:bg-white/10"
          >
            <span>Transferir liderança</span>
            <ChevronRight className="h-5 w-5 text-white/30" />
          </Link>
        </CardContent>
      </Card>

      {/* Danger Zone */}
      <div className="space-y-2">
        <button
          onClick={handleLogout}
          className="flex cursor-pointer w-full items-center gap-3 rounded-xl bg-red-500/10 px-4 py-4 text-red-400 transition-colors hover:bg-red-500/20"
        >
          <LogOut className="h-5 w-5" />
          <span className="flex-1 text-left">Sair da conta</span>
        </button>
        <button className="flex cursor-pointer w-full items-center gap-3 rounded-xl bg-red-500/10 px-4 py-4 text-red-400 transition-colors hover:bg-red-500/20">
          <Trash2 className="h-5 w-5" />
          <span className="flex-1 text-left">Excluir time</span>
        </button>
      </div>
    </>
  );
}
