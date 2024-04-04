import React from "react";
import { animAll, buttonSelection, morphOn } from "@/utils/tailwindUtil";
import { useShallow } from "zustand/react/shallow";
import {
  IconChevronCompactDown,
  IconChevronCompactUp,
} from "@tabler/icons-react";
import MenuSearch from "@/components/menuSearch";
import MenuFavourites from "@/components/menuFavourites";
import MenuSettings from "@/components/menuSettings";
import { useInterfaceStore } from "@/stores/interfaceStore";

const Menu: React.FC = () => {
  const { isMenu, setIsMenu, menuSection } = useInterfaceStore(
    useShallow((state) => ({
      isMenu: state.isMenu,
      menuSection: state.menuSection,
      setIsMenu: state.setIsMenu,
    }))
  );

  return (
    <div
      id="menu-wrap"
      className={` transition-all duration-500 ease-default justify-end flex flex-col items-center rounded-md w-full h-full will-change-auto `}
    >
      <div
        id="menu-bar"
        onClick={() => setIsMenu(!isMenu)}
        className={` ${
          isMenu ? " rounded-b-none" : ""
        } flex h-8 w-full rounded-md justify-center items-center ${morphOn} ${buttonSelection} will-change-auto cursor-pointer`}
      >
        <div className={`h-full ${animAll}`}>
          {isMenu ? (
            <IconChevronCompactDown size={"100%"} stroke={"1.5"} />
          ) : (
            <IconChevronCompactUp size={"100%"} stroke={"1.5"} />
          )}
        </div>
      </div>
      <div
        id="menu"
        className={` ease-default will-change-auto duration-500 overflow-hidden w-full rounded-md ${
          isMenu
            ? "h-full rounded-t-none"
            : "h-0 pointer-events-none overflow-hidden"
        }  `}
      >
        <div
          id="menu-content"
          className={` ${morphOn} h-full w-full flex p-2 sm:p-4`}
        >
          {isMenu && (
            <>
              {menuSection === 1 ? (
                <MenuSearch />
              ) : menuSection === 2 ? (
                <MenuFavourites />
              ) : (
                menuSection === 3 && <MenuSettings />
              )}
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default Menu;
