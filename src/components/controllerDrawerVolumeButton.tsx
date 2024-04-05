import { useSettingsStore } from "@/stores/settingsStore";
import { button } from "@/utils/tailwindUtil";
import { IconVolume, IconVolume2, IconVolume3 } from "@tabler/icons-react";
import { useShallow } from "zustand/react/shallow";

export const ControllerDrawerVolumeButton: React.FC = () => {
  const { volume, handleMuteToggle, isMuted } = useSettingsStore(
    useShallow((state) => ({
      handleMuteToggle: state.handleMuteToggle,
      volume: state.volume,
      isMuted: state.isMuted,
    }))
  );

  return (
    <>
      <button
        onClick={handleMuteToggle}
        id="mute-button"
        className={`${button} aspect-square flex relative h-full`}
      >
        <div className="flex flex-col h-full w-full relative justify-center items-center">
          {isMuted && <IconVolume3 size={"100%"} stroke={"1.5"} />}
          {!isMuted && volume >= 0.45 && (
            <IconVolume size={"100%"} stroke={"1.5"} />
          )}
          {!isMuted && volume < 0.45 && (
            <IconVolume2 size={"100%"} stroke={"1.5"} />
          )}
          <span className={`text-xs font-extralight`}>
            {volume > 0 ? `${Math.trunc(volume * 100)}%` : "Mute"}
          </span>
        </div>
      </button>
    </>
  );
};

export default ControllerDrawerVolumeButton;
