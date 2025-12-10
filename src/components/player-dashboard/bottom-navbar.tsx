"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Home, Search, Calendar, User } from "lucide-react";
import { cn } from "@/src/lib/utils";

type NavItem = "home" | "search" | "matches" | "profile";

const navItems: {
  id: NavItem;
  icon: typeof Home;
  label: string;
  href: string;
}[] = [
  { id: "home", icon: Home, label: "Início", href: "/player" },
  { id: "search", icon: Search, label: "Buscar", href: "/player/search" },
  { id: "matches", icon: Calendar, label: "Partidas", href: "/player/matches" },
  { id: "profile", icon: User, label: "Perfil", href: "/player/profile" },
];

export function BottomNavbar() {
  const pathname = usePathname();

  // Determina qual item está ativo baseado na rota atual
  const getActiveItem = (): NavItem => {
    if (pathname === "/player") return "home";
    if (pathname.startsWith("/player/search")) return "search";
    if (pathname.startsWith("/player/matches")) return "matches";
    if (pathname.startsWith("/player/profile")) return "profile";
    return "home";
  };

  const activeItem = getActiveItem();

  return (
    <nav className="fixed bottom-0 left-0 right-0 z-50 border-t border-white/10 bg-[#0f0f1a]/95 backdrop-blur-lg">
      <div className="mx-auto flex max-w-md items-center justify-around px-2 py-2">
        {navItems.map((item) => {
          const isActive = activeItem === item.id;
          return (
            <Link
              key={item.id}
              href={item.href}
              className={cn(
                "relative flex flex-1 flex-col items-center gap-1 rounded-xl py-2 transition-all duration-200",
                isActive
                  ? "text-(--varzea-green)"
                  : "text-white/50 hover:text-white/80"
              )}
            >
              <div
                className={cn(
                  "rounded-xl p-2 transition-all duration-200",
                  isActive && "bg-(--varzea-green)/20"
                )}
              >
                <item.icon
                  className={cn(
                    "h-6 w-6 transition-transform duration-200",
                    isActive && "scale-110"
                  )}
                />
              </div>
              <span
                className={cn(
                  "text-[10px] font-medium",
                  isActive && "font-semibold"
                )}
              >
                {item.label}
              </span>

              {/* Active indicator dot */}
              {isActive && (
                <div className="absolute -bottom-1 h-1 w-1 rounded-full bg-(--varzea-green)" />
              )}
            </Link>
          );
        })}
      </div>

      {/* Safe area for iOS */}
      <div className="h-safe-area-inset-bottom bg-[#0f0f1a]" />
    </nav>
  );
}

export type { NavItem };
