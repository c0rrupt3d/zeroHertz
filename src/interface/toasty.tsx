import { useInterfaceStore } from "@/stores/interfaceStore";
import { animAll, button, buttonBorder, morphOn } from "@/utils/tailwindUtil";
import { IconAlertCircle, IconX } from "@tabler/icons-react";
import { useShallow } from "zustand/react/shallow";

const Toasty: React.FC = () => {
  const { errorText, isToasty, setIsToasty } = useInterfaceStore(
    useShallow((state) => ({
      setErrorText: state.setErrorText,
      setIsToasty: state.setIsToasty,
      errorText: state.errorText,
      isToasty: state.isToasty,
    }))
  );

  return (
    <div
      id="popup-error"
      tabIndex={-1}
      className={` ${
        isToasty ? "opacity-1" : " opacity-0 pointer-events-none delay-100"
      } ${animAll} overflow-y-auto overflow-x-hidden fixed top-0 flex right-0 left-0 z-[990] justify-center items-center w-full md:inset-0 h-full max-h-full bg-neutral-950 bg-opacity-75 backdrop-blur-[2px]`}
      onClick={() => setIsToasty(false)}
    >
      <div
        id="error-box"
        className={` ${animAll} ${
          isToasty ? "opacity-100 scale-100" : "opacity-90 scale-95"
        } relative w-full max-w-screen-xs max-h-full `}
        onClick={(e) => e.stopPropagation()}
      >
        <div className={`relative rounded-md shadow ${morphOn}`}>
          <button
            type="button"
            className={`absolute top-2 end-2 w-8 h-8 ${button}`}
            data-modal-hide="popup-modal"
            onClick={() => setIsToasty(false)}
          >
            <IconX size={"100%"} stroke={"1.5"} />
            <span className="sr-only">{"Close modal"}</span>
          </button>
          <div className="p-4 text-center">
            <div className="mx-auto mb-4 text-red-300/75 w-12 h-12 ">
              <IconAlertCircle size={"100%"} stroke={"1.5"} />
            </div>
            <h3 className="mb-5 text-lg font-normal text-white ">
              {errorText}
            </h3>
            <button
              data-modal-hide="popup-modal"
              type="button"
              className={`${button} ${buttonBorder} px-6 py-2`}
              onClick={() => setIsToasty(false)}
            >
              {"OK"}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Toasty;
