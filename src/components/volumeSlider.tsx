import { useSettingsStore } from "@/stores/settingsStore";
import { animAll } from "@/utils/tailwindUtil";
import { useEffect, useRef } from "react";
import { useShallow } from "zustand/react/shallow";

const VolumeSlider: React.FC = () => {
  const { volume, handleVolume } = useSettingsStore(
    useShallow((state) => ({
      handleVolume: state.handleVolume,
      volume: state.volume,
    }))
  );

  const sliderRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const slider = sliderRef.current;

    const handleMouseMove = (e: MouseEvent | TouchEvent) => {
      const clientX = "touches" in e ? e.touches[0].clientX : e.clientX;
      if (slider) {
        const rect = slider.getBoundingClientRect();
        const offsetX = clientX - rect.left;
        const width = slider.clientWidth;
        let newVolume = offsetX / width;
        newVolume = Math.min(1, Math.max(0, newVolume));
        newVolume = Math.round(newVolume / 0.05) * 0.05;
        handleVolume(newVolume);
      }
    };

    const handleMouseDown = (e: MouseEvent) => {
      handleMouseMove(e);
      document.addEventListener("mousemove", handleMouseMove);
      document.addEventListener("mouseup", handleMouseUp);
    };

    const handleTouchStart = (e: TouchEvent) => {
      handleMouseMove(e);
      document.addEventListener("touchmove", handleMouseMove);
      document.addEventListener("touchend", handleTouchEnd);
    };

    const handleMouseUp = () => {
      document.removeEventListener("mousemove", handleMouseMove);
      document.removeEventListener("mouseup", handleMouseUp);
    };

    const handleTouchEnd = () => {
      document.removeEventListener("touchmove", handleMouseMove);
      document.removeEventListener("touchend", handleTouchEnd);
    };

    if (slider) {
      slider.addEventListener("mousedown", handleMouseDown);
      slider.addEventListener("touchstart", handleTouchStart);
    }

    return () => {
      if (slider) {
        slider.removeEventListener("mousedown", handleMouseDown);
        slider.removeEventListener("touchstart", handleTouchStart);
      }
      document.removeEventListener("mousemove", handleMouseMove);
      document.removeEventListener("mouseup", handleMouseUp);
      document.removeEventListener("touchmove", handleMouseMove);
      document.removeEventListener("touchend", handleTouchEnd);
    };
  }, [handleVolume]);

  return (
    <div className="flex w-full relative">
      <div className="overflow-hidden rounded-md w-full relative">
        <div
          className={` ${animAll} *:betterhover:hover:bg-neutral-200 relative w-full h-1.5 betterhover:hover:h-3 bg-neutral-700 cursor-pointer rounded-md`}
          ref={sliderRef}
        >
          <div
            className="absolute w-full h-full bg-white bottom-0 left-0 rounded-md pointer-events-none transition-colors duration-300 translate-x-dynamic"
            style={{ transform: `translateX(-${100 - volume * 100}%)` }}
          />
        </div>{" "}
        {/* <div className="flex absolute min-h-2 min-w-1 " style={{ left: `${volume * 100}%` }} /> */}
      </div>
    </div>
  );
};

export default VolumeSlider;
