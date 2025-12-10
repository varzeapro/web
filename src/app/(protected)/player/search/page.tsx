"use client";

import { useState } from "react";
import { Search } from "lucide-react";
import { Input } from "@/src/components/ui/input";
import {
  SearchFilters,
  type SearchFiltersData,
} from "@/src/components/player-dashboard/search-filters";
import {
  TeamGridCard,
  type TeamGridData,
} from "@/src/components/player-dashboard/team-grid-card";
import { BottomNavbar } from "@/src/components/player-dashboard/bottom-navbar";

// ============================================
// MOCK DATA
// ============================================

const mockTeams: TeamGridData[] = [
  {
    id: "1",
    name: "União São Jorge",
    initials: "USJ",
    lookingFor: "Atacante",
    level: "intermediário",
    location: "Vila Madalena, SP",
    distance: "2.5 km",
    playDays: ["Sáb", "Dom"],
  },
  {
    id: "2",
    name: "Real Periferia",
    initials: "RP",
    lookingFor: "Meio-campista",
    level: "avançado",
    location: "Pinheiros, SP",
    distance: "3.8 km",
    playDays: ["Qua", "Sex"],
  },
  {
    id: "3",
    name: "Bola na Rede FC",
    initials: "BR",
    lookingFor: "Goleiro",
    level: "iniciante",
    location: "Butantã, SP",
    distance: "5.2 km",
    playDays: ["Sáb"],
  },
  {
    id: "4",
    name: "Barcelona da Zona Sul",
    initials: "BZ",
    lookingFor: "Zagueiro",
    level: "intermediário",
    location: "Santo Amaro, SP",
    distance: "8.1 km",
    playDays: ["Dom"],
  },
  {
    id: "5",
    name: "Fúria FC",
    initials: "FF",
    lookingFor: "Lateral",
    level: "avançado",
    location: "Moema, SP",
    distance: "6.3 km",
    playDays: ["Ter", "Qui"],
  },
  {
    id: "6",
    name: "Os Incríveis",
    initials: "OI",
    lookingFor: "Volante",
    level: "iniciante",
    location: "Jardins, SP",
    distance: "4.0 km",
    playDays: ["Sáb", "Dom"],
  },
];

// ============================================
// PAGE COMPONENT
// ============================================

export default function SearchPage() {
  const [searchQuery, setSearchQuery] = useState("");
  const [filters, setFilters] = useState<SearchFiltersData>({
    positions: [],
    levels: [],
    maxDistance: 10,
    days: [],
  });

  // Filter teams based on search and filters
  const filteredTeams = mockTeams.filter((team) => {
    // Search query
    if (
      searchQuery &&
      !team.name.toLowerCase().includes(searchQuery.toLowerCase())
    ) {
      return false;
    }
    // Position filter
    if (
      filters.positions.length > 0 &&
      !filters.positions.includes(team.lookingFor)
    ) {
      return false;
    }
    // Level filter
    if (
      filters.levels.length > 0 &&
      !filters.levels.map((l: string) => l.toLowerCase()).includes(team.level)
    ) {
      return false;
    }
    // Distance filter
    const distance = parseFloat(team.distance);
    if (distance > filters.maxDistance) {
      return false;
    }
    // Days filter
    if (
      filters.days.length > 0 &&
      !team.playDays.some((d) => filters.days.includes(d))
    ) {
      return false;
    }
    return true;
  });

  const handleInterest = (teamId: string) => {
    console.log("Interesse em:", teamId);
  };

  return (
    <div className="min-h-screen bg-onboarding pb-24">
      {/* Header */}
      <header className="sticky top-0 z-40 border-b border-white/10 bg-[#0f0f1a]/90 backdrop-blur-lg px-4 py-4">
        <div className="mx-auto max-w-md">
          <h1 className="text-2xl font-bold text-white mb-4">
            🔍 Buscar Times
          </h1>

          {/* Search Bar */}
          <div className="flex gap-3">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-white/40" />
              <Input
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Buscar por nome..."
                className="pl-9 bg-white/5 border-white/10 text-white placeholder:text-white/40"
              />
            </div>
            <SearchFilters filters={filters} onFiltersChange={setFilters} />
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="mx-auto max-w-md px-4 py-6">
        {/* Results count */}
        <p className="text-sm text-white/50 mb-4">
          {filteredTeams.length} times encontrados
        </p>

        {/* Team Grid */}
        {filteredTeams.length > 0 ? (
          <div className="grid grid-cols-2 gap-3">
            {filteredTeams.map((team, index) => (
              <div
                key={team.id}
                className="animate-fade-in"
                style={{ animationDelay: `${index * 50}ms` }}
              >
                <TeamGridCard team={team} onInterest={handleInterest} />
              </div>
            ))}
          </div>
        ) : (
          <div className="rounded-xl border border-dashed border-white/20 bg-white/5 p-8 text-center mt-8">
            <p className="text-4xl mb-3">🔍</p>
            <p className="text-white/70">Nenhum time encontrado</p>
            <p className="text-sm text-white/50 mt-1">
              Tente ajustar os filtros
            </p>
          </div>
        )}
      </main>

      {/* Bottom Navigation */}
      <BottomNavbar activeItem="search" />
    </div>
  );
}
