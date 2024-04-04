import React, { useEffect } from "react";
import Channel from "@/interface/channel";
import Controller from "@/interface/controller";
import Menu from "@/interface/menu";
import { useShallow } from "zustand/react/shallow";
import { useRadioStore } from "@/stores/radioStore";
import Toasty from "@/interface/toasty";
import Drawer from "@/interface/drawer";

const MemoDrawer = React.memo(function MemoDrawer() {
  return (
    <>
      <Drawer />
    </>
  );
});
MemoDrawer.displayName = "MemoDrawer";

const MemoMenu = React.memo(function MemoMenu() {
  return (
    <>
      <Menu />
    </>
  );
});
MemoMenu.displayName = "MemoMenu";

const MemoController = React.memo(function MemoController() {
  return (
    <>
      <Controller />
    </>
  );
});
MemoController.displayName = "MemoController";

const MemoChannel = React.memo(function MemoChannel() {
  return (
    <>
      <Channel />
    </>
  );
});
MemoChannel.displayName = "MemoChannel";

const MemoToasty = React.memo(function MemoToasty() {
  return (
    <>
      <Toasty />
    </>
  );
});
MemoToasty.displayName = "MemoToasty";

export const Home: React.FC = () => {
  const { currentStation, radioBuffer, playing } = useRadioStore(
    useShallow((state) => ({
      currentStation: state.currentStation,
      playing: state.playing,
      radioBuffer: state.radioBuffer,
    }))
  );

  const title = "ZeroHertz"

  useEffect(() => {
    document.title = `${
      playing
        ? !radioBuffer
          ? `${currentStation.name} - ${title}`
          : `${title} - Loading...`
        : title
    }`;
  }, [playing, radioBuffer]);

  return (
    <>
      <div
        className={` ${
          playing && !radioBuffer
            ? "opacity-100 delay-200 scale-100"
            : "opacity-0 delay-100 scale-[0.98] grayscale"
        } duration-500 transition-all ease-default animate-playing bg-gradient-to-r from-pink-600 via-violet-600 to-indigo-600  absolute w-full h-full`}
      ></div>
      <MemoToasty />
      <MemoDrawer />
      <div
        id="radio-wrap"
        className="flex relative max-w-full max-h-full w-full justify-center"
      >
        <div
          id="radio-wrap-inner"
          className=" overflow-hidden z-30 flex flex-col relative m-0.5 xs:my-2 xs:max-w-screen-xs w-full max-w-full justify-end"
        >
          <div
            id="radio-menu"
            className={`mb-0.5 xs:mb-2 z-20 h-full overflow-y-auto sm:h-full sm:max-h-[900px] flex flex-col relative`}
          >
            <MemoMenu />
          </div>
          <div
            id="radio-drawer"
            className="z-20 backdrop-blur-md min-w-full flex-col flex items-end justify-between rounded-md"
          >
            <div id="radio-controller" className="mb-0.5 xs:mb-2 w-full flex justify-between items-center" >
            <MemoController />
            </div>
            <MemoChannel />
          </div>
        </div>
      </div>
    </>
  );
};

export default Home;
