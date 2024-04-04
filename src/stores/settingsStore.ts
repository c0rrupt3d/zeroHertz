import { create } from "zustand";
import { persist } from "zustand/middleware";
import { immer } from "zustand/middleware/immer";

// SettingsStoreType in types declaration

export const useSettingsStore = create<
  SettingsStoreType & SettingsStoreAction
>()(
  immer(
    // devtools(
    persist(
      (set) => ({
        playing: false,
        isMuted: false,
        volume: 1,
        prevVolume: 1,
        handleMuteToggle: () =>
          set((state) => {
            state.isMuted = !state.isMuted;
            state.prevVolume = state.isMuted ? state.volume : state.prevVolume;
            state.volume = state.isMuted ? 0 : state.prevVolume;
          }),
        handleVolume: (value) =>
          set((state) => {
            state.volume = value;
            state.prevVolume = value;
            state.isMuted = value === 0;
          }),
      }),
      {
        name: "settings",
        partialize: (state) =>
          Object.fromEntries(
            Object.entries(state).filter(([key]) => !["playing"].includes(key))
          ),
      }
    )
    // )
  )
);
