import { animAll, button, buttonHoverOnly } from "@/utils/tailwindUtil";
import VolumeSlider from "./volumeSlider";
import { useShallow } from "zustand/react/shallow";
import { IconChevronLeft, IconChevronRight } from "@tabler/icons-react";
import { useInterfaceStore } from "@/stores/interfaceStore";
import ControllerDrawerVolumeButton from "./controllerDrawerVolumeButton";

const ControllerVolumeResponsive: React.FC = () => {
  const { isVolumeSlider, setVolumeSlider } = useInterfaceStore(
    useShallow((state) => ({
      isVolumeSlider: state.isVolumeSlider,
      setVolumeSlider: state.setVolumeSlider,
    }))
  );

  return (
    <div
      id="control-volume-reponsive"
      className={`relative flex h-full w-full right-0 top-0 `}
    >
      <div
        id="draw-responsive"
        className="flex w-full h-full relative justify-end"
      >
        <button
          onClick={() => setVolumeSlider(!isVolumeSlider)}
          id="draw-button"
          className={`${button} flex relative h-full aspect-square`}
        >
          <div className="flex flex-col h-full w-full relative justify-center items-center">
            {isVolumeSlider ? (
              <IconChevronRight size={"100%"} stroke={"1.5"} />
            ) : (
              <IconChevronLeft size={"100%"} stroke={"1.5"} />
            )}
            <span className={`text-xs font-extralight`}>
              {isVolumeSlider ? "Hide" : "Show"}
            </span>
          </div>
        </button>
        <div className="h-full relative py-2 px-0.5">
          <div
            id="seperator"
            className=" h-full mx-0.5 w-1 min-w-1 flex bg-neutral-400 rounded"
          ></div>
        </div>
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

        <ControllerDrawerVolumeButton />
      </div>
    </div>
  );
};

export default ControllerVolumeResponsive;
