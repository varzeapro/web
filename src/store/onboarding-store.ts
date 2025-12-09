import { create } from "zustand";
import { persist } from "zustand/middleware";

interface PlayerData {
  photo: File | null;
  photoPreview: string | null;
  positions: string[];
  city: string;
  state: string;
  radius: number; // em km
  skillLevel: 1 | 2 | 3 | 4 | 5 | null;
  birthDate: string;
  name: string;
}

interface TeamData {
  badge: File | null;
  badgePreview: string | null;
  name: string;
  fieldLocation: string;
  city: string;
  state: string;
  gameDays: string[];
  gameTime: string;
  modality: "Futsal" | "Campo" | "Society" | null;
  teamLevel: 1 | 2 | 3 | 4 | 5 | null;
  responsibleName: string;
}

interface OnboardingState {
  // Wizard control
  role: "PLAYER" | "TEAM" | null;
  currentStep: number;

  // Player data
  playerData: PlayerData;

  // Team data
  teamData: TeamData;

  // Actions
  setRole: (role: "PLAYER" | "TEAM") => void;
  setCurrentStep: (step: number) => void;
  nextStep: () => void;
  prevStep: () => void;
  updatePlayerData: (data: Partial<PlayerData>) => void;
  updateTeamData: (data: Partial<TeamData>) => void;
  reset: () => void;

  // Computed
  getTotalSteps: () => number;
  getProgress: () => number;
}

const initialPlayerData: PlayerData = {
  photo: null,
  photoPreview: null,
  positions: [],
  city: "",
  state: "",
  radius: 10,
  skillLevel: null,
  birthDate: "",
  name: "",
};

const initialTeamData: TeamData = {
  badge: null,
  badgePreview: null,
  name: "",
  fieldLocation: "",
  city: "",
  state: "",
  gameDays: [],
  gameTime: "",
  modality: null,
  teamLevel: null,
  responsibleName: "",
};

export const useOnboardingStore = create<OnboardingState>()(
  persist(
    (set, get) => ({
      role: null,
      currentStep: 1,
      playerData: initialPlayerData,
      teamData: initialTeamData,

      setRole: (role) => set({ role, currentStep: 1 }),

      setCurrentStep: (step) => set({ currentStep: step }),

      nextStep: () =>
        set((state) => ({
          currentStep: Math.min(state.currentStep + 1, get().getTotalSteps()),
        })),

      prevStep: () =>
        set((state) => ({
          currentStep: Math.max(state.currentStep - 1, 1),
        })),

      updatePlayerData: (data) =>
        set((state) => ({
          playerData: { ...state.playerData, ...data },
        })),

      updateTeamData: (data) =>
        set((state) => ({
          teamData: { ...state.teamData, ...data },
        })),

      reset: () =>
        set({
          role: null,
          currentStep: 1,
          playerData: initialPlayerData,
          teamData: initialTeamData,
        }),

      getTotalSteps: () => (get().role === "PLAYER" ? 4 : 4),

      getProgress: () => {
        const { currentStep } = get();
        const total = get().getTotalSteps();
        return (currentStep / total) * 100;
      },
    }),
    {
      name: "varzea-onboarding",
      // Não persistir arquivos (File objects)
      partialize: (state) => ({
        role: state.role,
        currentStep: state.currentStep,
        playerData: {
          ...state.playerData,
          photo: null, // Não persistir File
        },
        teamData: {
          ...state.teamData,
          badge: null, // Não persistir File
        },
      }),
    }
  )
);
