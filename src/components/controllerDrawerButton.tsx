import { button } from "@/utils/tailwindUtil";

export const ControllerDrawerButton: React.FC<{
    section: InterfaceStoreType["menuSection"];
    icon1: React.JSX.Element;
    iconFilled: React.JSX.Element;
    title: string;
    handleMenuSection: (section: InterfaceStoreType["menuSection"]) => void;
    menuSection: InterfaceStoreType["menuSection"];
  }> = ({
    section,
    icon1,
    iconFilled,
    title,
    handleMenuSection,
    menuSection,
  }) => {
    return (
      <button
        className={` ${button} flex relative h-full`}
        onClick={() => handleMenuSection(section)}
      >
        <div className="flex flex-col items-center justify-center w-full h-full relative">
          {menuSection === section ? iconFilled : icon1}
          <span
            className={`text-xs font-extralight ${
              menuSection === section ? "font-medium" : "font-extralight"
            }`}
          >
            {title}
          </span>
        </div>
      </button>
    );
  };

export default ControllerDrawerButton;
