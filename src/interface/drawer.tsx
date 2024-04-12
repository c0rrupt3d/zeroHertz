import DrawerChannel from "@/components/drawerChannel";
import DrawerFilters from "@/components/drawerFilters";
import { useInterfaceStore } from "@/stores/interfaceStore";
import { animAll, buttonSelection, morphOn } from "@/utils/tailwindUtil";
import { IconChevronCompactDown } from "@tabler/icons-react";
import { useShallow } from "zustand/react/shallow";

const Drawer = () => {
  const { isDrawer, setIsDrawer, drawerData } = useInterfaceStore(
    useShallow((state) => ({
      isDrawer: state.isDrawer,
      setIsDrawer: state.setIsDrawer,
      drawerData: state.drawerData,
    }))
  );

  return (
    <div
      id="popup-drawer"
      className={` ${animAll} ${
        isDrawer ? "opacity-1" : "opacity-0 pointer-events-none delay-100"
      } z-40 flex w-full h-full fixed bottom-0 items-end justify-center overflow-hidden top-0 right-0 left-0 md:inset-0 max-h-full bg-neutral-950 bg-opacity-75 backdrop-blur-[2px]`}
      onClick={() => setIsDrawer(false)}
    >
      <div
        id="drawer-box"
        className={` ${animAll} ${
          isDrawer ? "opacity-100 translate-y-0" : "opacity-90 translate-y-full"
        } xs:max-w-screen-xs w-full h-fit max-h-[80svh] relative flex will-change-transform border border-b-0 rounded-md rounded-b-none border-neutral-800 `}
        onClick={(e) => e.stopPropagation()}
      >
        <div
          className={`rounded-md rounded-b-none w-full h-full ${morphOn} flex flex-col bottom-0`}
        >
          <button
            onClick={() => setIsDrawer(false)}
            type="button"
            className={`w-full justify-center h-8 flex ${buttonSelection} rounded-b-none }`}
          >
            <div className={`h-full`} data-modal-hide="popup-modal">
              <IconChevronCompactDown size={"100%"} stroke={"1.5"} />
              <span className="sr-only">{"Close modal"}</span>
            </div>
          </button>
          <div className="p-4 overflow-y-auto flex w-full h-full relative">
            {drawerData.type == "channel" ? (
              <DrawerChannel />
            ) : (
              <DrawerFilters />
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Drawer;
