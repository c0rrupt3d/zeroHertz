import { create } from "zustand";
import { persist } from "zustand/middleware";
import { immer } from "zustand/middleware/immer";

// RadioStoreType in types declaration

export const useRadioStore = create<RadioStoreType & RadioStoreAction>()(
  immer(
    // devtools(
    persist(
      (set) => ({
        currentStation: {
          name: "",
          url: "",
          country: "",
          stationuuid: "",
          clickcount: 0,
          countrycode: "",
          tags: "",
          bitrate: "",
          favicon: "",
          codec: "",
          homepage: "",
        },
        searchFilters: {
          tags: "",
          country: "",
          state: "",
          language: "",
          order: "clickcount",
          bitrate: { min: 0, max: "" },
          reverse: false,
          hidebroken: true,
        },
        favouriteStations: [],
        radioPlay: false,
        radioBuffer: false,
        playing: false,
        firstPlay: false,
        loadingStation: false,
        userRadioInteract: false,
        validStation: false,
        customTags: "",
        handleCurrentStation: (value) =>
          set((state) => {
            state.radioBuffer = true;
            state.currentStation = {
              name: value.name,
              url: value.url,
              country: value.country,
              stationuuid: value.stationuuid,
              clickcount: value.clickcount,
              countrycode: value.countrycode,
              tags: value.tags,
              bitrate: value.bitrate,
              homepage: value.homepage,
              favicon: value.favicon,
              codec: value.codec,
            };
          }),
        setValidStation: () =>
          set((state) => {
            const keys: Array<keyof Station> = ["name", "url", "stationuuid"];
            if (
              keys.some(
                (key: keyof Station) => state.currentStation[key] === ""
              )
            ) {
              state.validStation = false;
            } else {
              state.validStation = true;
            }
          }),
        setPlaying: (value) =>
          set((state) => {
            state.playing = value;
          }),
        setRadioBuffer: (value) =>
          set((state) => {
            state.radioBuffer = value;
          }),
        handleRadioToggle: (value) =>
          set((state) => {
            console.log("toggling");
            state.setValidStation();
            let valid = false;
            const keys: Array<keyof Station> = ["name", "url", "stationuuid"];
            if (
              keys.some(
                (key: keyof Station) => state.currentStation[key] === ""
              )
            ) {
              valid = false;
            } else {
              valid = true;
            }
            if (!valid) {
              throw new Error("No station selected");
            } else {
              state.radioPlay = value;
            }
          }),
        handleFirstPlay: () =>
          set((state) => {
            state.firstPlay = true;
          }),
        setLoadingStation: (value) =>
          set((state) => {
            state.loadingStation = value;
          }),
        addFavouriteStation: (value) =>
          set((state) => {
            if (
              !state.favouriteStations.some(
                (station) => station.stationuuid === value.stationuuid
              )
            ) {
              state.favouriteStations = [...state.favouriteStations, value];
            }
          }),
        removeFavouriteStation: (value) =>
          set((state) => {
            const update = state.favouriteStations.filter(
              (station) => station.stationuuid !== value
            );
            state.favouriteStations = update;
          }),
        setSearchFilters: (value, filter) => {
          set((state) => {
            state.searchFilters = {
              ...state.searchFilters,
              [filter]: value,
            };
            if (state.customTags !== state.searchFilters.tags) {
              state.searchFilters = {
                ...state.searchFilters,
                tags: state.customTags,
              };
            }
          });
        },
        setCustomTags: (value) =>
          set((state) => {
            state.customTags = value;
          }),
      }),
      {
        name: "radioControl",
        partialize: (state) => ({
          currentStation: state.currentStation,
          favouriteStations: state.favouriteStations,
        }),
      }
    )
    // )
  )
);
