import { useRadioStore } from "@/stores/radioStore";
import { fetchCountries, fetchLanguages } from "@/utils/apiConnect";
import {
  animAll,
  buttonSwap,
  iconHide,
  iconShow,
  interaction,
} from "@/utils/tailwindUtil";
import {
  IconAdjustments,
  IconCaretDownFilled,
  IconCaretUpFilled,
} from "@tabler/icons-react";
import { useState, useEffect } from "react";
import { useShallow } from "zustand/react/shallow";
import TagSearch from "./tagSearch";
import ToggleSwitch from "./toggleSwitch";
import DropdownSelect from "./dropdownSelect";

const MenuSearchFilter = () => {
  const { searchFilters, setSearchFilters } = useRadioStore(
    useShallow((state) => ({
      searchFilters: state.searchFilters,
      setSearchFilters: state.setSearchFilters,
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

  const [visible, setVisible] = useState<boolean>(false);
  // const [failed, setFailed] = useState<boolean>(false);
  const [loadedOptions, setLoadedOptions] = useState<LoadedOptionsType>({
    country: "",
    language: "",
  });

  async function loadFilterOptions(): Promise<void> {
    const countries = fetchCountries();
    const languages = fetchLanguages();

    try {
      setLoadedOptions({ country: await countries, language: await languages });
    } catch (err) {
      // setFailed(true);
    }
  }

  useEffect(() => {
    loadFilterOptions();
  }, []);

  return (
    <>
      <button
        id="filter-header"
        className={` ${interaction} ${animAll} p-1 rounded-md cursor-pointer w-full relative items-center h-8 flex justify-between`}
        onClick={() => setVisible(!visible)}
      >
        <div className="flex h-full items-center justify-start">
          <IconAdjustments size={"100%"} stroke={"1.5"} />
          <h5 className="text-lg font-medium whitespace-nowrap">
            Search Filters
          </h5>
        </div>
        <div className={`h-full aspect-square relative flex`}>
          <div
            className={` ${buttonSwap} ${animAll} ${
              visible ? iconShow : iconHide
            } `}
          >
            <IconCaretUpFilled size={"100%"} stroke={"1.5"} />
          </div>
          <div
            className={` ${buttonSwap} ${animAll} ${
              visible ? iconHide : iconShow
            } `}
          >
            <IconCaretDownFilled size={"100%"} stroke={"1.5"} />
          </div>
        </div>
      </button>
      <div
        id="filter"
        className={`w-full flex flex-col p-1 overflow-hidden flex-shrink-0 ${
          visible ? "h-auto" : "h-0"
        } ${animAll} `}
      >
        <TagSearch
          setSearchFilters={setSearchFilters}
          value={searchFilters.tags}
          filter={"tagList"}
          label={"Tags (comma seprated)"}
        />
        {loadedOptions.country !== "" && (
          <DropdownSelect
            options={loadedOptions.country}
            label={"Country"}
            filter="country"
            placeholder={"Countries"}
            setSearchFilters={setSearchFilters}
            value={searchFilters.country}
            all={true}
          />
        )}
        {loadedOptions.language !== "" && (
          <DropdownSelect
            options={loadedOptions.language}
            label={"Language"}
            filter="language"
            placeholder={"Languages"}
            setSearchFilters={setSearchFilters}
            value={searchFilters.language}
            all={true}
          />
        )}
        <DropdownSelect
          options={sortOptions}
          label="Sort By"
          filter="order"
          placeholder="Sort By"
          setSearchFilters={setSearchFilters}
          value={searchFilters.order}
          all={false}
        />

        <ToggleSwitch
          showInverted={false}
          setSearchFilters={setSearchFilters}
          value={searchFilters.reverse}
          label={"Reverse Order"}
          filter="reverse"
        />
        <ToggleSwitch
          showInverted={true}
          setSearchFilters={setSearchFilters}
          value={searchFilters.hidebroken}
          label={"Show Broken Stations"}
          filter="hidebroken"
        />
      </div>
      <div
        className={`w-full min-h-[2px] h-1 flex rounded-md ${
          visible ? "bg-neutral-400 my-2" : "bg-transparent my-0"
        }`}
      />
    </>
  );
};

export default MenuSearchFilter;
