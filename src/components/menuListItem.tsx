import { useRadioStore } from "@/stores/radioStore";
import {
  animAll,
  button,
  buttonSwap,
  iconHide,
  iconShow,
  interaction,
  selected,
} from "@/utils/tailwindUtil";
import {
  IconCircleCheckFilled,
  IconDotsVertical,
  IconHeartFilled,
  IconInnerShadowBottomFilled,
} from "@tabler/icons-react";
import React from "react";
import { useShallow } from "zustand/react/shallow";
import ItemTag from "./itemTag";
import { useInterfaceStore } from "@/stores/interfaceStore";

const MenuListItem = ({
  searchFilters,
  res,
  special,
  handleSelection,
  dynamicTagsVisible,
}: MenuListItemType) => {
  const { currentStation, playing, radioBuffer, favouriteStations } =
    useRadioStore(
      useShallow((state) => ({
        currentStation: state.currentStation,
        playing: state.playing,
        radioBuffer: state.radioBuffer,
        favouriteStations: state.favouriteStations,
      }))
    );
  const { setIsDrawer, setDrawerData } = useInterfaceStore(
    useShallow((state) => ({
      setIsDrawer: state.setIsDrawer,
      setDrawerData: state.setDrawerData,
    }))
  );

  const handleDrawer = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    e.stopPropagation();
    setIsDrawer(true);
    setDrawerData("channel", res);
  };

  const checkFavourite = favouriteStations.some(
    (station) => station.stationuuid === res.stationuuid
  );

  return (
    <>
      <div
        id="result-item"
        className={`${interaction} ${
          res.stationuuid === currentStation.stationuuid && selected
        } ${animAll} cursor-pointer rounded-md w-full my-0.5 flex flex-col h-max p-2`}
        onClick={() => handleSelection(res)}
        key={res.stationuuid}
      >
        <div id="desc" className="h-10 flex w-full items-center relative">
          <div className="flex h-full w-full items-center relative">
            <div
              className={`${animAll} ${
                res.stationuuid === currentStation.stationuuid
                  ? "min-h-6 min-w-6 h-6 w-6 opacity-1"
                  : "h-0 opacity-0"
              } relative`}
            >
              <div className="flex absolute items-center justify-center h-full w-full">
                {playing && !radioBuffer && (
                  <>
                    <span className=" absolute animate-pingSlow h-full w-full bg-neutral-400/50 rounded-full" />
                  </>
                )}
                <div
                  className={`${buttonSwap} ${animAll} ${
                    (playing && !radioBuffer) || (!playing && !radioBuffer)
                      ? iconShow
                      : iconHide
                  } `}
                >
                  <IconCircleCheckFilled size={"100%"} stroke={"1.5"} />
                </div>
                <div
                  className={`${buttonSwap} ${animAll} ${
                    radioBuffer ? iconShow : iconHide
                  } animate-spinSlow`}
                >
                  <IconInnerShadowBottomFilled size={"100%"} stroke={"1.5"} />
                </div>
              </div>
            </div>
            {dynamicTagsVisible && (
              <div
                className={`${animAll} ${
                  checkFavourite
                    ? "min-h-6 min-w-6 h-6 w-6 opacity-1"
                    : "h-0 opacity-0"
                } relative`}
              >
                <div className="flex absolute items-center justify-center h-full w-full">
                  <IconHeartFilled size={"100%"} stroke={"1.5"} />
                </div>
              </div>
            )}
            <div className="flex w-full h-full items-center justify-between truncate">
              <div className={`${animAll} flex flex-row truncate items-center`}>
                <h4
                  className={` ${animAll} ml-1 text-lg font-semibold truncate`}
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
            className="mt-2 w-full overflow-x-auto items-center flex flex-wrap "
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
            {res.tags
              .split(",")
              .slice(0, 8)
              .map((tag: string, index: number) => {
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
          </div>
        </>
      </div>
    </>
  );
};

export default MenuListItem;
