import { buttonHoverOnly } from "@/utils/tailwindUtil";
import VolumeSlider from "./volumeSlider";
import ControllerDrawerVolumeButton from "./controllerDrawerVolumeButton";

const ControllerVolumeDefault: React.FC = () => {

  return (
    <div
      id="control-volume-default"
      className={` hidden relative sm:flex justify-self-end justify-end h-full w-full items-center`}
    >
      <div
        id="volume-wrap"
        className={`flex h-full aspect-square items-end relative`}
      >
        <ControllerDrawerVolumeButton/>
      </div>
      <div
        id="volume-slider"
        className={` ${buttonHoverOnly} justify-center items-center p-2 rounded-md w-28 h-full flex `}
      >
        <VolumeSlider />
      </div>
    </div>
  );
};

export default ControllerVolumeDefault;
