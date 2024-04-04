import { useSettingsStore } from "@/stores/settingsStore";
import { animAll, button, buttonHoverOnly, buttonSwap, iconHide, iconShow } from "@/utils/tailwindUtil";
import React from "react";
import { useShallow } from "zustand/react/shallow";
import VolumeSlider from "./volumeSlider";
import { IconVolume, IconVolume2, IconVolume3} from "@tabler/icons-react";


const ControllerVolumeDefault: React.FC = () => {

    const {
        volume,
        handleMuteToggle,
        isMuted,
      } = useSettingsStore(
        useShallow((state) => ({
          handleMuteToggle: state.handleMuteToggle,
          volume: state.volume,
          isMuted: state.isMuted,
        }))
      );

  return (
    <div
      id="control-volume-default"
      className={` hidden relative sm:flex justify-self-end justify-end h-full w-full items-center`}
    >
      <div
        id="volume-wrap"
        className={` rounded-md flex h-full aspect-square items-end relative`}
      >
        <button
          onClick={handleMuteToggle}
          id="mute-button"
          className={` ${button} flex relative h-full w-full aspect-square cursor-pointer`}
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
      </div>
      <div
        id="volume-slider"
        className={` ${buttonHoverOnly} justify-center items-center p-2 rounded-md w-32 h-full flex `}
      >
        <VolumeSlider />
      </div>
    </div>
  );
};

export default ControllerVolumeDefault;
