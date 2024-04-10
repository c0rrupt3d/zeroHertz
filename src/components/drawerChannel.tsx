import { buttonSelection, iconHide, iconShow } from "@/utils/tailwindUtil";
import {
  IconExternalLink,
  IconHeartFilled,
  IconHeartPlus,
  IconRadar2,
} from "@tabler/icons-react";
import Spinner from "./spinner";
import React, { useEffect, useState } from "react";
import { useRadioStore } from "@/stores/radioStore";
import { useShallow } from "zustand/react/shallow";
import { useInterfaceStore } from "@/stores/interfaceStore";
import ItemTag from "./itemTag";

const MenuItem: React.FC<{
  icon: React.JSX.Element;
  click: React.MouseEventHandler<HTMLButtonElement> | undefined;
  text: string;
}> = ({ icon, click, text }) => {
  return (
    <>
      <button
        className={`flex w-full items-center ${buttonSelection} h-10 my-1 `}
        onClick={click}
      >
        <div
          id="favourite"
          className={`h-full aspect-square justify-start items-start mr-2 flex`}
        >
          <div className="flex h-full w-full relative justify-center items-center p-0.5">
            {icon}
          </div>
        </div>
        <div className="text-lg">{text}</div>
      </button>
    </>
  );
};

export const DrawerChannel: React.FC = () => {
  const { setIsDrawer, drawerData } = useInterfaceStore(
    useShallow((state) => ({
      setIsDrawer: state.setIsDrawer,
      drawerData: state.drawerData,
    }))
  );

  const mainData = drawerData.data as Station;

  const DefaultImg: React.FC = () => {
    return (
      <div
        className={` h-full w-full flex rounded-md absolute bg-pink-600 items-center justify-center `}
      >
        <div className="w-8 h-8 relative">
          <IconRadar2 size={"100%"} stroke={"1.5"} />
        </div>
      </div>
    );
  };

  const { favouriteStations, addFavouriteStation, removeFavouriteStation } =
    useRadioStore(
      useShallow((state) => ({
        favouriteStations: state.favouriteStations,
        addFavouriteStation: state.addFavouriteStation,
        removeFavouriteStation: state.removeFavouriteStation,
      }))
    );

  const checkFavourite = favouriteStations.some(
    (station) => station.stationuuid === mainData.stationuuid
  );

  const [imageLoading, setImageLoading] = useState<boolean>(false);
  const [imageError, setImageError] = useState<boolean>(false);

  useEffect(() => {
    setImageLoading(true);
    setImageError(false);
  }, [mainData.favicon]);

  return (
    <div className="w-full h-full flex flex-col relative">
      <div className="flex w-full items-center relative ">
        <div className="aspect-square w-16 min-w-16 h-16 min-h-16 flex relative items-center justify-center">
          {mainData.favicon ? (
            <>
              {imageLoading && (
                <div
                  className={`h-full w-full flex rounded-md absolute bg-neutral-700 items-center justify-center animate-pulse ${
                    imageLoading ? iconShow : iconHide
                  } `}
                >
                  <div className="w-8 h-8 relative text-neutral-600">
                    <Spinner />
                  </div>
                </div>
              )}
              <div
                className={`w-full h-full flex items-center absolute ${
                  !imageLoading && !imageError ? iconShow : iconHide
                } `}
              >
                <img
                  src={mainData.favicon}
                  width={"100%"}
                  height={"100%"}
                  alt={mainData.name}
                  className="aspect-auto rounded-md bg-neutral-900"
                  title={mainData.name}
                  onLoad={() => setImageLoading(false)}
                  onError={() => setImageError(true)}
                />
              </div>
              {imageError && <DefaultImg />}
            </>
          ) : (
            <DefaultImg />
          )}
        </div>
        <div className="flex flex-col ml-2 w-full relative overflow-hidden">
          <h1 className=" flex w-full font-medium text-lg xs:text-xl max-h-40 overflow-y-auto">
            {mainData.name}
          </h1>
          <div className="flex mt-1 items-center">
            <h3 className="flex w-full text-sm font-extralight">
              {mainData.country}
            </h3>
          </div>
        </div>
      </div>
      <div
        id="tags"
        className="mt-2 w-full items-center flex overflow-x-auto scrollbar-hidden xs:scrollbar-visible scroll-resp "
      >
        {mainData.countrycode && (
          <ItemTag>
            <div className="mr-1 w-6 min-w-6 justify-center items-center">
              <img
                src={`https://flagcdn.com/${mainData.countrycode.toLowerCase()}.svg`}
                width="100%"
                height="100%"
                alt={mainData.country}
                className="aspect-auto rounded-sm"
                title={mainData.country}
              />
            </div>
          </ItemTag>
        )}
        {mainData.bitrate != "" && (
          <ItemTag small={false} icon={"bitrate"} special={true}>
            {`${mainData.bitrate}kBit/s`}
          </ItemTag>
        )}

        {mainData.tags.split(",").map((tag: string, index: number) => {
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
      <div
        id="seperator"
        className="w-full min-h-[2px] rounded-md bg-neutral-700 my-2"
      />
      <div className="w-full flex-col">
        <MenuItem
          text={
            !checkFavourite ? "Add to favourites" : "Remove from favourites"
          }
          icon={
            !checkFavourite ? (
              <IconHeartPlus size={"100%"} stroke={"1.5"} />
            ) : (
              <IconHeartFilled size={"100%"} stroke={"1.5"} />
            )
          }
          click={() => {
            if (!checkFavourite) {
              addFavouriteStation(mainData);
            } else {
              removeFavouriteStation(mainData.stationuuid);
              setIsDrawer(false);
            }
          }}
        />
        {mainData.homepage != "" && (
          <MenuItem
            text={"Open radio homepage"}
            icon={<IconExternalLink size={"100%"} stroke={"1.5"} />}
            click={() => window.open(mainData.homepage, "_bank")}
          />
        )}
      </div>
    </div>
  );
};

export default DrawerChannel;
