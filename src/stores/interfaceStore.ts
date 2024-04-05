import { create } from "zustand";
import { immer } from "zustand/middleware/immer";
import { persist } from "zustand/middleware";

// ErrorStoreType in types declaration

export const useInterfaceStore = create<
  InterfaceStoreType & InterfaceStoreAction
>()(
  immer(
    // devtools(
    persist(
      (set) => ({
        isMenu: true,
        isDrawer: false,
        drawerData: {
          type: "channel",
          data: {
            name: "",
            url: "",
            country: "",
            stationuuid: "",
            clickcount: 0,
            countrycode: "",
            bitrate: "",
            tags: "",
            favicon: "",
            homepage: "",
            codec: "",
          },
        },
        menuSection: 1,
        isVolumeSlider: false,
        errorText: "Processing error, please retry",
        isToasty: false,
        setErrorText: (value) =>
          set((state) => {
            state.errorText = value;
          }),
        setIsToasty: (value) =>
          set((state) => {
            state.isToasty = value;
          }),
        setIsMenu: (value) =>
          set((state) => {
            state.isMenu = value;
          }),
        setIsDrawer: (value) =>
          set((state) => {
            state.isDrawer = value;
          }),
        setDrawerData: (type, data) =>
          set((state) => {
            state.drawerData = {
              type: type,
              data: data,
            };
          }),
        setVolumeSlider: (value) =>
          set((state) => {
            state.isVolumeSlider = value;
          }),
        setMenuSection: (value) =>
          set((state) => {
            state.menuSection = value;
          }),
      }),
      {
        name: "interfaceControl",
        partialize: (state) => ({
          menuSection: state.menuSection,
        }),
      }
      // )
    )
  )
);
