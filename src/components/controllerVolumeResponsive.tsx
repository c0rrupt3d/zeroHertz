import {
  animAll,
  button,
  buttonHoverOnly,
  buttonSwap,
  iconHide,
  iconShow,
} from "@/utils/tailwindUtil";
import React from "react";
import VolumeSlider from "./volumeSlider";
import { useSettingsStore } from "@/stores/settingsStore";
import { useShallow } from "zustand/react/shallow";
import {
  IconChevronLeft,
  IconChevronRight,
  IconVolume,
  IconVolume2,
  IconVolume3,
} from "@tabler/icons-react";
import { useInterfaceStore } from "@/stores/interfaceStore";

const ControllerVolumeResponsive: React.FC = () => {

  const { volume, handleMuteToggle, isMuted } =
    useSettingsStore(
      useShallow((state) => ({
        handleMuteToggle: state.handleMuteToggle,
        volume: state.volume,
        isMuted: state.isMuted,
      }))
    );

  const { isVolumeSlider, setVolumeSlider } =
    useInterfaceStore(
      useShallow((state) => ({
        isVolumeSlider: state.isVolumeSlider,
        setVolumeSlider: state.setVolumeSlider,
      }))
    );
    

  return (
    <div
      id="control-volume-reponsive"
      className={` ${
        isVolumeSlider ? `absolute p-2 ` : `relative p-0`
      } sm:hidden flex h-full w-full right-0 top-0 `}
    >
      <div
        id="draw-responsive"
        className="flex w-full h-full relative justify-end"
      >
        <button
          onClick={() => setVolumeSlider(!isVolumeSlider)}
          id="draw-button"
          className={` ${button} flex relative h-full aspect-square cursor-pointer`}
        >
          <div className="flex h-full w-full relative justify-center items-center">
            <div
              className={`${buttonSwap} ${
                isVolumeSlider ? iconShow : iconHide
              } ${animAll}`}
            >
              <IconChevronRight size={"100%"} stroke={"1.5"} />
            </div>
            <div
              className={`${buttonSwap} ${
                !isVolumeSlider ? iconShow : iconHide
              } ${animAll}`}
            >
              <IconChevronLeft size={"100%"} stroke={"1.5"} />
            </div>
          </div>
        </button>
        <div
          id="seperator"
          className="h-full mx-0.5 w-1 min-w-1 flex bg-neutral-400 rounded"
        ></div>
        <button
          onClick={handleMuteToggle}
          id="mute-button"
          className={` ${button} flex relative h-full aspect-square cursor-pointer`}
        >
          <div className="flex h-full w-full relative justify-center items-center">
            <div
              className={`${buttonSwap} ${
                isMuted ? iconShow : iconHide
              } ${animAll}`}
            >
              <IconVolume3 size={"100%"} stroke={"1.5"} />
            </div>
            <div
              className={`${buttonSwap} ${
                !isMuted && volume >= 0.45 ? iconShow : iconHide
              } ${animAll}`}
            >
              <IconVolume size={"100%"} stroke={"1.5"} />
            </div>
            <div
              className={` ${buttonSwap} ${
                !isMuted && volume < 0.45 ? iconShow : iconHide
              } ${animAll}`}
            >
              <IconVolume2 size={"100%"} stroke={"1.5"} />
            </div>
          </div>
        </button>
        <div
          id="volume-slider"
          className={` ${
            isVolumeSlider ? "w-full" : "w-0"
          } ${animAll} duration-1000 flex items-center`}
        >
          <div
            id="volume-slider"
            className={` ${buttonHoverOnly} justify-center items-center p-2 rounded-md w-full h-full flex `}
          >
            <VolumeSlider />
          </div>
        </div>
      </div>
    </div>
  );
};

export default ControllerVolumeResponsive;
