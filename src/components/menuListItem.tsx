import { useRadioStore } from "@/stores/radioStore";
import { animAll, button, interaction, selected } from "@/utils/tailwindUtil";
import {
  IconCircleCheckFilled,
  IconCircleDotFilled,
  IconDots,
  IconDotsVertical,
  IconHeartFilled,
  IconInnerShadowBottomFilled,
} from "@tabler/icons-react";
import React from "react";
import { useShallow } from "zustand/react/shallow";
import ItemTag from "./itemTag";
import { useInterfaceStore } from "@/stores/interfaceStore";

const MenuListItem = ({
  res,
  special,
  dynamicTagsVisible,
}: MenuListItemType) => {
  const {
    currentStation,
    searchFilters,
    playing,
    radioBuffer,
    favouriteStations,
    handleCurrentStation,
    handleFirstPlay,
  } = useRadioStore(
    useShallow((state) => ({
      currentStation: state.currentStation,
      playing: state.playing,
      radioBuffer: state.radioBuffer,
      favouriteStations: state.favouriteStations,
      searchFilters: state.searchFilters,
      handleCurrentStation: state.handleCurrentStation,
      handleFirstPlay: state.handleFirstPlay,
    }))
  );
  const { setIsDrawer, setDrawerData } = useInterfaceStore(
    useShallow((state) => ({
      setIsDrawer: state.setIsDrawer,
      setDrawerData: state.setDrawerData,
    }))
  );

  const handleSelection = async (res: SearchResult) => {
    handleFirstPlay();
    handleCurrentStation(res);
  };

  const handleDrawer = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    e.stopPropagation();
    setIsDrawer(true);
    setDrawerData("channel", {
      ...res,
      tags: prioritizeTags(res.tags, searchFilters.tags).join(","),
    });
  };

  const checkFavourite = favouriteStations.some(
    (station) => station.stationuuid === res.stationuuid
  );

  const prioritizeTags = (tags: string, searchedTags: string): string[] => {
    const allTags = tags.split(",").filter((tag) => tag.trim() !== "");
    const searchedTagsArray = searchedTags.split(",").map((tag) => tag.trim());

    if (searchedTagsArray.length === 0) {
      return allTags;
    }

    const prioritizedTags = [];
    for (const tag of searchedTagsArray) {
      const index = allTags.indexOf(tag);
      if (index !== -1) {
        prioritizedTags.push(allTags.splice(index, 1)[0]);
      }
    }

    prioritizedTags.push(...allTags);

    return prioritizedTags;
  };

  const priority = prioritizeTags(res.tags, searchFilters.tags);
  const idMatch = res.stationuuid === currentStation.stationuuid;

  return (
    <>
      <div
        id="result-item"
        className={`${interaction} ${
          idMatch && selected
        } ${animAll} cursor-pointer rounded-md w-full my-0.5 flex flex-col h-max py-1 px-2`}
        onClick={() => handleSelection(res)}
        key={res.stationuuid}
      >
        <div id="desc" className="h-10 flex w-full items-center relative">
          <div className="flex h-full w-full items-center relative">
            {idMatch && (
              <div
                className={`
                  min-h-6 min-w-6 h-6 w-6
              relative`}
              >
                <div className="flex absolute items-center justify-center h-full w-full">
                  {/* {playing && !radioBuffer && (
                    <>
                      <span className=" absolute animate-pingSlow h-full w-full bg-fuchsia-400/50 rounded-full" />
                    </>
                  )} */}
                  {playing && !radioBuffer && (
                    <div>
                      <IconCircleCheckFilled size={"100%"} stroke={"1.5"} />
                    </div>
                  )}
                  {!playing && !radioBuffer && (
                    <div>
                      <IconCircleDotFilled size={"100%"} stroke={"1.5"} />
                    </div>
                  )}
                  {radioBuffer && (
                    <div className={`animate-spinSlow`}>
                      <IconInnerShadowBottomFilled
                        size={"100%"}
                        stroke={"1.5"}
                      />
                    </div>
                  )}
                </div>
              </div>
            )}
            {dynamicTagsVisible && checkFavourite ? (
              <div className={`relative min-h-6 min-w-6 h-6 w-6`}>
                <div className="flex absolute items-center justify-center h-full w-full">
                  <IconHeartFilled size={"100%"} stroke={"1.5"} />
                </div>
              </div>
            ) : null}
            <div className="flex w-full h-full items-center justify-between truncate">
              <div className={`${animAll} flex flex-row truncate items-center`}>
                <h4
                  className={` ${animAll} ${
                    playing && idMatch && !radioBuffer && "text-fuchsia-500"
                  }  ml-1 text-lg font-semibold truncate`}
                >
                  {res.name}
                </h4>
              </div>
              <div className="flex relative h-3/4 aspect-square">
                <button
                  className={`${button} p-1 z-10 h-full aspect-square`}
                  onClick={(e) => handleDrawer(e)}
                >
                  <IconDotsVertical size={"100%"} stroke={"1.5"} />
                </button>
              </div>
            </div>
          </div>
        </div>
        <>
          <div
            id="tags"
            className="mt-1 w-full overflow-x-auto items-center flex flex-wrap "
          >
            <ItemTag>
              {res.countrycode && (
                <div className="w-6 min-w-6 justify-center items-center">
                  <img
                    src={`https://flagcdn.com/${res.countrycode.toLowerCase()}.svg`}
                    width="100%"
                    height="100%"
                    alt={res.country}
                    className="aspect-auto rounded-sm"
                    title={res.country}
                  />
                </div>
              )}
            </ItemTag>
            {dynamicTagsVisible && (
              <ItemTag
                small={false}
                icon={searchFilters.order}
                special={special}
              >
                {res[searchFilters.order]}
              </ItemTag>
            )}
            {res.bitrate > 0 && (
              <ItemTag small={false} icon={"bitrate"} special={special}>
                {`${res.bitrate}kBit/s`}
              </ItemTag>
            )}
            {priority.slice(0, 5).map((tag: string, index: number) => {
              if (tag !== "") {
                return (
                  <React.Fragment key={index}>
                    <ItemTag small={false} special={false} icon={""}>
                      {tag}
                    </ItemTag>
                  </React.Fragment>
                );
              }
            })}
            {res.tags.split(",").length > 6 && (
              <ItemTag>
                <IconDots size={"100%"} stroke={"1.5"} />
              </ItemTag>
            )}
          </div>
        </>
      </div>
    </>
  );
};

export default MenuListItem;
