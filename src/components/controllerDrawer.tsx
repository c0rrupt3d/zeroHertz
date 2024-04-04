import { useInterfaceStore } from "@/stores/interfaceStore";
import { animAll, button } from "@/utils/tailwindUtil";
import { IconStars, IconStarsFilled, IconZoom, IconZoomFilled } from "@tabler/icons-react";
import React from "react";
import { useShallow } from "zustand/react/shallow";

const ControllerDrawer: React.FC = () => {

  const { isVolumeSlider, isMenu, setMenuSection, setIsMenu, menuSection } = useInterfaceStore(
    useShallow((state) => ({
      isVolumeSlider: state.isVolumeSlider,
      setMenuSection: state.setMenuSection,
      setIsMenu: state.setIsMenu,
      isMenu: state.isMenu,
      menuSection: state.menuSection
    }))
  );
  

  const handleMenuSection = (section: InterfaceStoreType["menuSection"]) => {
    if(!isMenu){
      setIsMenu(true)
    }
    setMenuSection(section)
  }

  return (
    <div
      id="control-drawer"
      className={` ${
        isVolumeSlider
          ? "opacity-0 scale-95 pointer-events-none "
          : "opacity-100 scale-1"
      } ${animAll} relative h-full w-full flex flex-row`}
    >
      <button className={` ${button} flex relative h-full cursor-pointer `} onClick={() => handleMenuSection(1)}>
      {menuSection === 1 ? <IconZoomFilled size={"100%"}  stroke={"1.5"} /> : <IconZoom size={"100%"}  stroke={"1.5"} />}
      </button>
      <button className={` ${button} flex relative h-full cursor-pointer `} onClick={() => handleMenuSection(2)}>
      {menuSection === 2 ? <IconStarsFilled size={"100%"}  stroke={"1.5"} /> : <IconStars size={"100%"}  stroke={"1.5"} />}
      </button>
      {/* <button className={` ${button} flex relative h-full cursor-pointer `} onClick={() => setMenuSection(3)} >
      <IconSettings size={"100%"} stroke={"1.5"} />
      </button> */}
    </div>
  );
};

export default ControllerDrawer;
