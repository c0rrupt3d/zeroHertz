import React from "react";
import MenuHeading from "./menuHeading";
import { animAll } from "@/utils/tailwindUtil";
import { useRadioStore } from "@/stores/radioStore";
import { useShallow } from "zustand/react/shallow";
import MenuListItem from "./menuListItem";
// import { fetchStationDetails } from "@/utils/apiConnect";
import { IconHeartBroken } from "@tabler/icons-react";
import MenuNoResult from "./menuNoResult";

// let newAbortController: AbortController | undefined;

const MenuFavourites: React.FC = () => {
  const {
    favouriteStations,
  } = useRadioStore(
    useShallow((state) => ({
      favouriteStations: state.favouriteStations,
    }))
  );

  // const updateStationInfo = async (res: any) => {
  //   newAbortController?.abort();
  //   const controller = new AbortController();
  //   newAbortController = controller;
  //   try {
  //     const updatedStation = await fetchStationDetails({
  //       id: res.stationuuid,
  //       signal: controller.signal,
  //     });
  //     return updatedStation;
  //   } catch {
  //     return res;
  //   }
  // };


  return (
    <div id="favourite-wrap" className="w-full flex flex-col h-full ">
      <MenuHeading>{"Your Favourites"}</MenuHeading>
      <div className="overflow-y-auto flex flex-col w-full">
        <div
          id="result"
          className={` ${animAll} w-full h-full items-center flex flex-col rounded-md my-2 `}
        >
          {favouriteStations.length !== 0 ? (
            favouriteStations.map((res: any) => {
              return (
                <React.Fragment key={res.stationuuid}>
                  <MenuListItem
                    res={res}
                    special={true}
                    dynamicTagsVisible={false}
                  />
                </React.Fragment>
              );
            })
          ) : (
            <MenuNoResult
              icon={<IconHeartBroken size={"100%"} stroke={"1.5"} />}
              text={"No favourites added"}
            />
          )}
        </div>
      </div>
    </div>
  );
};

export default MenuFavourites;
