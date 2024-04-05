import {
  IconBan,
  IconChevronsDown,
  IconRefresh,
  IconWorldSearch,
  IconX,
} from "@tabler/icons-react";
import React, { useState, useRef, useEffect } from "react";
import MenuHeading from "./menuHeading";
import { animAll, button, interactionInput } from "@/utils/tailwindUtil";
import { findStations } from "@/utils/apiConnect";
import { useShallow } from "zustand/react/shallow";
import Spinner from "./spinner";
import { useRadioStore } from "@/stores/radioStore";
import MenuSearchFilter from "./menuSearchFilter";
import MenuListItem from "./menuListItem";
import MenuNoResult from "./menuNoResult";

let newAbortController: AbortController | undefined;

const MenuSearch: React.FC = () => {
  const { handleCurrentStation, handleFirstPlay, searchFilters } =
    useRadioStore(
      useShallow((state) => ({
        handleCurrentStation: state.handleCurrentStation,
        handleFirstPlay: state.handleFirstPlay,
        searchFilters: state.searchFilters,
      }))
    );

  const searchInputRef = useRef<HTMLInputElement>(null);

  const [searchInput, setSearchInput] = useState<string>("");
  // const [loading, setLoading] = useState<boolean>(false);
  const [failed, setFailed] = useState<boolean>(false);
  const [offset, setOffset] = useState<number>(0);
  const [results, setResults] = useState<SearchResult[]>([]);
  const [working, setWorking] = useState<boolean>(true);
  const [moreResults, setMoreResults] = useState<boolean>(true);
  // const [emptyResults, setEmptyResults] = useState<boolean>(false);
  const [moreWorking, setMoreWorking] = useState<boolean>(false);

  const requestSearchResults = (): void => {
    setOffset(0);
    loadSearchResults(false);
  };

  const loadSearchResults = async (doOffset: boolean): Promise<void> => {
    newAbortController?.abort();
    const controller = new AbortController();
    newAbortController = controller;
    setFailed(false);
    // setLoading(true);

    let newOffset = offset;

    if (doOffset) {
      newOffset += 15;
      setOffset(newOffset);
    } else {
      newOffset = 0;
      setOffset(0);
    }

    try {
      const searchResult = await findStations({
        searchEntries: {
          name: searchInput,
          tagList: searchFilters.tags,
          tagExact: true,
          country: searchFilters.country,
          state: searchFilters.state,
          language: searchFilters.language,
          countryExact: searchFilters.country !== "",
          stateExact: searchFilters.state !== "",
          languageExact: searchFilters.language !== "",
          offset: newOffset,
          limit: 15,
          order: searchFilters.order,
          bitrateMin: searchFilters.bitrate.min,
          bitrateMax: searchFilters.bitrate.max,
          reverse:
            searchFilters.reverse !==
            (searchFilters.order === "clickcount" ||
              searchFilters.order === "votes"),
          hidebroken: searchFilters.hidebroken,
        },
        signal: controller.signal,
      });

      let newResults: SearchResult[] = [...results];

      if (newOffset === 0) {
        setResults([]);
        newResults = [];
      }

      newResults = [
        ...newResults,
        ...(searchResult.map(Object.freeze) as SearchResult[]),
      ];
      setResults(newResults);

      const newMoreResults =
        newResults.length % 15 === 0 && searchResult.length > 0;
      setMoreResults(newMoreResults);

      // setEmptyResults(!newMoreResults && newResults.length === 0);
    } catch {
      if (!controller.signal.aborted) {
        setFailed(true);
      }
    } finally {
      if (!controller.signal.aborted) {
        // setLoading(false);
        setWorking(false);
        setMoreWorking(false);
      }
    }
  };

  const loadMoreResults = () => {
    setMoreWorking(true);
    loadSearchResults(true);
  };

  const handleReload = () => {
    setWorking(true);
    // requestSearchResults();
    window.location.reload();
  };

  const handleSearchInputChange = (value: string) => {
    setSearchInput(value);
  };

  const handleSelection = async (res: SearchResult) => {
    handleFirstPlay();
    handleCurrentStation(res);
  };

  useEffect(() => {
    requestSearchResults();
  }, [searchInput]);

  useEffect(() => {
    setWorking(true);
    requestSearchResults();
  }, [searchFilters]);

  return (
    <div id="search-wrap" className="w-full flex flex-col h-full ">
      <MenuHeading>{"Find Stations"}</MenuHeading>
      <div
        id="input-wrap"
        className={` ${animAll} bg-neutral-800/75 ${interactionInput} my-2 p-2 flex rounded-full relative h-10 `}
      >
        <div id="input-icon" className=" h-full flex aspect-square">
          <IconWorldSearch size={"100%"} stroke={"2"} />
        </div>
        <input
          id="input"
          className="text-lg px-4 rounded-md h-full w-full border-0 bg-transparent outline-0"
          autoComplete="false"
          autoCapitalize="false"
          type="text"
          spellCheck="false"
          placeholder="Search station name"
          value={searchInput}
          ref={searchInputRef}
          onChange={(e) => handleSearchInputChange(e.target.value)}
        ></input>
        {searchInput !== "" && (
          <div
            id="clear-icon"
            onClick={() => handleSearchInputChange("")}
            className={` ${button} h-full flex aspect-square`}
          >
            <IconX size={"100%"} stroke={"1.5"} />
          </div>
        )}
      </div>
      <div className="overflow-y-auto flex flex-col w-full">
        {!failed && <MenuSearchFilter />}
        <div
          id="result"
          className={` ${animAll} w-full h-full items-center flex flex-col rounded-md my-2 `}
        >
          {!failed ? (
            working ? (
              <div className="w-10 h-10 flex justify-center items-center">
                <Spinner />
              </div>
            ) : (
              <>
                {results.length > 0 ? (
                  results.map((res: SearchResult) => {
                    return (
                      <React.Fragment key={res.stationuuid}>
                        <MenuListItem
                          handleSelection={handleSelection}
                          res={res}
                          special={true}
                          searchFilters={searchFilters}
                          dynamicTagsVisible
                        />
                      </React.Fragment>
                    );
                  })
                ) : (
                  <MenuNoResult
                    icon={<IconBan size={"100%"} stroke={"1.5"} />}
                    text={"No results found"}
                  />
                )}
                <>
                  {moreResults && (
                    <div
                      id="load-more"
                      className={`w-full flex min-h-10 h-10 max-h-14 my-1 justify-center`}
                    >
                      {moreWorking ? (
                        <>
                          <div className="flex overflow-hidden ">
                            <Spinner />
                          </div>
                        </>
                      ) : (
                        <>
                          <button
                            id="load-more-btn"
                            className={` w-full flex justify-center items-center font-semibold text-lg ${button} p-2 `}
                            onClick={loadMoreResults}
                          >
                            <IconChevronsDown stroke={"1.5"} />{" "}
                            <span>{"Load More"}</span>
                          </button>
                        </>
                      )}
                    </div>
                  )}
                </>
              </>
            )
          ) : (
            <>
              <div className="mt-4 relative flex flex-col justify-center text-center">
                <h5 className="text-lg font-semibold">Failed To Load</h5>
                <button
                  onClick={() => handleReload()}
                  className={`${button} justify-center flex border border-neutral-300 p-2 m-2`}
                >
                  <IconRefresh stroke={"1.5"} />{" "}
                  <span className="ml-1">Reload</span>
                </button>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default MenuSearch;
