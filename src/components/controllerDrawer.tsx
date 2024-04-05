import { useInterfaceStore } from "@/stores/interfaceStore";
import { animAll } from "@/utils/tailwindUtil";
import {
  IconHeart,
  IconHeartFilled,
  IconZoom,
  IconZoomFilled,
} from "@tabler/icons-react";
import { useShallow } from "zustand/react/shallow";
import ControllerDrawerButton from "./controllerDrawerButton";

const ControllerDrawer: React.FC = () => {
  const { isVolumeSlider, isMenu, setMenuSection, setIsMenu, menuSection } =
    useInterfaceStore(
      useShallow((state) => ({
        isVolumeSlider: state.isVolumeSlider,
        setMenuSection: state.setMenuSection,
        setIsMenu: state.setIsMenu,
        isMenu: state.isMenu,
        menuSection: state.menuSection,
      }))
    );

  const handleMenuSection = (section: InterfaceStoreType["menuSection"]) => {
    if (!isMenu) {
      setIsMenu(true);
    }
    setMenuSection(section);
  };

  return (
    <div
      id="control-drawer"
      className={` ${
        isVolumeSlider
          ? "opacity-0 scale-90 pointer-events-none w-0"
          : "opacity-100 scale-100 w-full"
      } ${animAll} relative h-full flex flex-row`}
    >
      <ControllerDrawerButton
        menuSection={menuSection}
        icon1={<IconZoom size={"100%"} stroke={"1.5"} />}
        iconFilled={<IconZoomFilled size={"100%"} stroke={"1.5"} />}
        section={1}
        handleMenuSection={handleMenuSection}
        title={"Search"}
      />
      <ControllerDrawerButton
        menuSection={menuSection}
        icon1={<IconHeart size={"100%"} stroke={"1.5"} />}
        iconFilled={<IconHeartFilled size={"100%"} stroke={"1.5"} />}
        section={2}
        handleMenuSection={handleMenuSection}
        title={"Favourites"}
      />
      {/* <button className={` ${button} flex relative h-full cursor-pointer `} onClick={() => setMenuSection(3)} >
      <IconSettings size={"100%"} stroke={"1.5"} />
      </button> */}
    </div>
  );
};

export default ControllerDrawer;
