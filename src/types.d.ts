type NumberLike = number | `${number}` | "";

// STORE TYPES AND ACTIONS

type RadioStoreType = {
  currentStation: Station;
  favouriteStations: Station[];
  radioPlay: boolean;
  radioBuffer: boolean;
  playing: boolean;
  firstPlay: boolean;
  loadingStation: boolean;
  validStation: boolean;
  searchFilters: SearchOptions;
  loadedOptions: LoadedOptions;
};

type RadioStoreAction = {
  handleCurrentStation: (value: any) => void;
  setPlaying: (value: RadioStoreType["playing"]) => void;
  setRadioBuffer: (value: RadioStoreType["radioBuffer"]) => void;
  handleRadioToggle: (value: RadioStoreType["radioPlay"]) => void;
  handleFirstPlay: () => void;
  setLoadingStation: (value: RadioStoreType["loadingStation"]) => void;
  addFavouriteStation: (value: RadioStoreType["currentStation"]) => void;
  removeFavouriteStation: (value: string) => void;
  setSearchFilters: (value: string | boolean, filter: string) => void;
  setValidStation: () => void;
  setLoadedOptions: (property: "countries" | "languages" ,value: string) => void;
};

type SettingsStoreType = {
  isMuted: boolean;
  prevVolume: number;
  volume: number;
};

type SettingsStoreAction = {
  handleMuteToggle: () => void;
  handleVolume: (value: SettingsStoreType["volume"]) => void;
};

type InterfaceStoreType = {
  errorText: string;
  isToasty: boolean;
  isMenu: boolean;
  isDrawer: boolean;
  drawerData: {
    type: "channel" | "filters";
    data?: Station;
  };
  isVolumeSlider: boolean;
  menuSection: 1 | 2 | 3;
};

type InterfaceStoreAction = {
  setErrorText: (value: InterfaceStoreType["errorText"]) => void;
  setIsToasty: (value: InterfaceStoreType["isToasty"]) => void;
  setIsMenu: (value: InterfaceStoreType["isMenu"]) => void;
  setIsDrawer: (value: InterfaceStoreType["isDrawer"]) => void;
  setDrawerData: (
    type: "channel" | "filters",
    data?: Station,
  ) => void;
  setVolumeSlider: (value: InterfaceStoreType["isVolumeSlider"]) => void;
  setMenuSection: (value: InterfaceStoreType["menuSection"]) => void;
};

// END STORE TYPES AND ACTIONS

interface Station {
  name: string;
  url: string;
  country: string;
  stationuuid: string;
  clickcount: number;
  countrycode: string;
  bitrate: string;
  tags: string;
  favicon: string;
  homepage: string;
  codec: string;
}

interface SearchResult {
  bitrate: number;
  lastcheckok: number;
  name: string;
  url: string;
  homepage: string;
  favicon: string;
  country: string;
  state: string;
  language: string;
  codec: string;
  clickcount: number;
  votes: number;
  tags: string;
  stationuuid: string;
}

interface Initial {
  changeuuid: string;
  stationuuid: string;
  serveruuid: string;
  name: string;
  url: string;
  url_resolved: string;
  homepage: string;
  favicon: string;
  tags: string;
  country: string;
  countrycode: string;
  iso_3166_2: string | null;
  state: string;
  language: string;
  languagecodes: string;
  votes: number;
  lastchangetime: string;
  lastchangetime_iso8601: string;
  codec: string;
  bitrate: number;
  hls: number;
  lastcheckok: number;
  lastchecktime: string;
  lastchecktime_iso8601: string;
  lastcheckoktime: string;
  lastcheckoktime_iso8601: string;
  lastlocalchecktime: string;
  lastlocalchecktime_iso8601: string;
  clicktimestamp: string;
  clicktimestamp_iso8601: string;
  clickcount: number;
  clicktrend: number;
  ssl_error: number;
  geo_lat: number | null;
  geo_long: number | null;
  has_extended_info: boolean;
}

type DropdownProps = {
  label: string;
  placeholder: string;
  filter: string;
  options: any;
  value: string;
  setTemp: any;
  all: boolean;
};

type LoadedOptions = {
  countries: SearchResult["country"];
  languages: SearchResult["language"];
};

type ToggleProps = {
  label: string;
  filter: string;
  value: boolean;
  setTemp: any;
  showInverted: boolean;
};

type MenuNoResultProps = {
  icon: react.ForwardRefExoticComponent<
    Omit<IconProps, "ref"> & react.RefAttributes<Icon>
  >;
  text: string;
};

type TagSearchProps = {
  label: string;
  filter: string;
  setTemp: any;
  value: string;
};

interface SearchOptions {
  tags: string;
  country: string;
  state: string;
  language: string;
  order: keyof SearchResult;
  bitrate: { min?: NumberLike; max?: NumberLike };
  reverse: boolean;
  hidebroken: boolean;
}

type ItemTagType = {
  children: any;
  special?: boolean;
  icon?: string;
  small?: boolean;
};

type MenuHeadingType = {
  children: string;
};

type MenuListItemType = {
  res: any;
  special: boolean;
  dynamicTagsVisible: boolean;
};

type SpinnerProps = {
  alt?: boolean;
};
