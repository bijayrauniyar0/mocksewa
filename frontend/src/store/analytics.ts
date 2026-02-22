import { create } from "zustand";

type AnalyticsState = {
  mockTestId: number | null;
  mode: "practice" | "ranked";
  setMockTestId: (id: number) => void;
  setMode: (mode: "practice" | "ranked") => void;
};

const useAnalyticsStore = create<AnalyticsState>((set) => ({
  mockTestId: null,
  mode: "practice",
  setMockTestId: (id: number) => set({ mockTestId: id }),
  setMode: (mode: "practice" | "ranked") => set({ mode }),
}));

export default useAnalyticsStore;
