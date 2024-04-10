import { useInterfaceStore } from "@/stores/interfaceStore";
import { useRadioStore } from "@/stores/radioStore";
import { fetchCountries, fetchLanguages } from "@/utils/apiConnect";
import { useEffect, useState } from "react";
import { useShallow } from "zustand/react/shallow";
import TagSearch from "./tagSearch";
import ToggleSwitch from "./toggleSwitch";
import DropdownSelect from "./dropdownSelect";
import MenuHeading from "./menuHeading";
import { button, buttonAlt, buttonBorder } from "@/utils/tailwindUtil";
import Spinner from "./spinner";

export const DrawerFilters = () => {
  const [loading, setLoading] = useState<boolean>(false);
  const [failed, setFailed] = useState<boolean>(false);

  const [temp, setTemp] = useState<SearchOptions>({
    tags: "",
    country: "",
    language: "",
    reverse: false,
    hidebroken: true,
    order: "clickcount",
    bitrate: { min: 0, max: "" },
    state: "",
  });

  const { setSearchFilters, loadedOptions, setLoadedOptions } = useRadioStore(
    useShallow((state) => ({
      setSearchFilters: state.setSearchFilters,
      loadedOptions: state.loadedOptions,
      setLoadedOptions: state.setLoadedOptions,
    }))
  );

  const { setIsDrawer } = useInterfaceStore(
    useShallow((state) => ({
      setIsDrawer: state.setIsDrawer,
    }))
  );
  const sortOptions = [
    { name: "clickcount" },
    { name: "votes" },
    { name: "name" },
    { name: "country" },
    { name: "language" },
    { name: "codec" },
  ];

  const handleSearchFilters = () => {
    Object.entries(temp).forEach(([filter, value]) => {
      setSearchFilters(value, filter);
    });
    setIsDrawer(false);
  };

  const clearTemp = () => {
    setTemp({
      tags: "",
      country: "",
      language: "",
      reverse: false,
      hidebroken: true,
      order: "clickcount",
      bitrate: { min: 0, max: "" },
      state: "",
    });
  };

  async function loadFilterOptions(): Promise<void> {
    setLoading(true);
    setFailed(false);
    try {
      const countries = await fetchCountries();
      const languages = await fetchLanguages();
      setLoadedOptions("countries", countries);
      setLoadedOptions("languages", languages);
    } catch (err) {
      setFailed(true);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    if (!loadedOptions.countries || !loadedOptions.languages) {
      loadFilterOptions();
    }
  }, []);

  return (
    <div className="w-full h-full flex flex-col relative">
      <MenuHeading>Search Filters</MenuHeading>
      {!loading ? (
        !failed && 
          <>
            <div className="w-full h-full max-h-[75svh] flex flex-col relative overflow-y-auto">
              <TagSearch
                setTemp={setTemp}
                value={temp.tags}
                filter={"tagList"}
                label={"Tags (comma seprated)"}
              />
              {loadedOptions.countries !== "" && (
                <DropdownSelect
                  options={loadedOptions.countries}
                  label={"Country"}
                  filter="country"
                  placeholder={"Countries"}
                  setTemp={setTemp}
                  value={temp.country}
                  all={true}
                />
              )}
              {loadedOptions.languages !== "" && (
                <DropdownSelect
                  options={loadedOptions.languages}
                  label={"Language"}
                  filter="language"
                  placeholder={"Languages"}
                  setTemp={setTemp}
                  value={temp.language}
                  all={true}
                />
              )}
              <DropdownSelect
                options={sortOptions}
                label="Sort By"
                filter="order"
                placeholder="Sort By"
                setTemp={setTemp}
                value={temp.order}
                all={false}
              />

              <ToggleSwitch
                showInverted={false}
                setTemp={setTemp}
                value={temp.reverse}
                label={"Reverse Order"}
                filter="reverse"
              />
              <ToggleSwitch
                showInverted={true}
                setTemp={setTemp}
                value={temp.hidebroken}
                label={"Show Broken Stations"}
                filter="hidebroken"
              />
              <div className=" min-h-32 "/>
            </div>
            <div className="w-full h-12 flex p-1 fixed bg-neutral-900 left-0 bottom-0">
              <button
                className={`${button} mx-1 ${buttonBorder} w-[calc(100%-2rem)]`}
                onClick={clearTemp}
              >
                Clear
              </button>

              <button
                className={`${button} mx-1 ${buttonAlt} w-[calc(100%-2rem)]`}
                onClick={handleSearchFilters}
              >
                Apply
              </button>
            </div>
          </>
        
      ) : (
        <div className="flex justify-center h-32 w-full">
          <div className="h-10 w-10 flex">
            <Spinner />
          </div>
        </div>
      )}
    </div>
  );
};

export default DrawerFilters;
