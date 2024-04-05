import { useEffect, useState } from "react";
import {
  animAll,
  animColor,
  button,
  buttonSwap,
  iconHide,
  iconShow,
  morphOn,
} from "@/utils/tailwindUtil";
import { useShallow } from "zustand/react/shallow";
import {
  IconDotsVertical,
  IconPlayerPlayFilled,
  IconPlayerStopFilled,
} from "@tabler/icons-react";
import { useRadioStore } from "@/stores/radioStore";
import ChannelPlayer from "@/components/channelPlayer";
import Spinner from "@/components/spinner";
import { useInterfaceStore } from "@/stores/interfaceStore";

const Channel: React.FC = () => {
  const { setErrorText, setIsToasty, setIsDrawer, setDrawerData } =
    useInterfaceStore(
      useShallow((state) => ({
        setErrorText: state.setErrorText,
        setIsToasty: state.setIsToasty,
        setIsDrawer: state.setIsDrawer,
        setDrawerData: state.setDrawerData,
      }))
    );

  const {
    playing,
    radioPlay,
    handleFirstPlay,
    radioBuffer,
    currentStation,
    handleRadioToggle,
    setRadioBuffer,
    validStation,
    setValidStation,
  } = useRadioStore(
    useShallow((state) => ({
      playing: state.playing,
      radioPlay: state.radioPlay,
      handleRadioToggle: state.handleRadioToggle,
      currentStation: state.currentStation,
      radioBuffer: state.radioBuffer,
      handleFirstPlay: state.handleFirstPlay,
      setRadioBuffer: state.setRadioBuffer,
      validStation: state.validStation,
      setValidStation: state.setValidStation,
    }))
  );

  const [validity, setValidity] = useState<boolean>(false);

  const handleDrawer = (value: boolean) => {
    if (value) {
      setDrawerData("channel", currentStation);
    }
    setIsDrawer(value);
  };

  const handleError = (text: string) => {
    setErrorText(text);
    setIsToasty(true);
  };

  const handleToggle = (value: boolean) => {
    handleFirstPlay();
    setRadioBuffer(true);
    try {
      handleRadioToggle(value);
    } catch (err) {
      handleError("No Station Selected. Please search and select a station.");
      setRadioBuffer(false);
    }
  };

  useEffect(() => {
    setValidStation();
  }, []);

  useEffect(() => {
    setValidity(validStation);
  }, [validStation]);

  return (
    <>
      <ChannelPlayer />
      <div
        id="channel-wrap"
        className={` ${morphOn} ${animColor} relative h-[4.5rem] xs:rounded-md w-full p-2 flex items-center`}
      >
        <div
          id="channel-desc"
          className="w-full flex flex-col overflow-hidden flex-grow pl-1"
        >
          <div id="channel-title-mask" className=" w-full flex">
            <h1
              id="channel-name"
              className=" font-medium text-xl xs:text-2xl truncate"
            >
              {currentStation.name}
            </h1>
          </div>
          <div id="channel-subtitle-mask" className="w-full flex">
            <h3
              id="channel-loc"
              className=" text-xs xs:text-sm font-extralight truncate"
            >
              {currentStation.country}
            </h3>
          </div>
        </div>
        <div
          id="channel-player"
          className="h-full w-1/2 flex justify-end items-center"
        >
          {validity && (
            <button
              onClick={() => handleDrawer(true)}
              id="more-button"
              className={`${button} h-3/4 aspect-square justify-center items-center mr-1 flex`}
            >
              <div className="flex h-full w-full relative justify-center items-center">
                <IconDotsVertical size={"100%"} stroke={"1.5"} />
              </div>
            </button>
          )}
          <button
            onClick={() => handleToggle(!radioPlay)}
            id="player-button"
            className={` ${button} relative h-full aspect-square max-w-full flex justify-center items-center `}
          >
            <div className="flex h-full w-full justify-center items-center">
              <div
                className={`${buttonSwap} ${
                  playing && !radioBuffer ? iconShow : iconHide
                } ${animAll} items-center justify-center flex`}
              >
                <IconPlayerStopFilled size={"100%"} stroke={"1.5"} />
              </div>
              <div
                className={`${buttonSwap} ${
                  radioBuffer ? iconShow : iconHide
                } ${animAll} items-center justify-center flex`}
              >
                <Spinner alt />
                <div className="absolute flex items-center w-1/2 h-1/2">
                  <IconPlayerStopFilled size={"100%"} stroke={"1.5"} />
                </div>
              </div>
              <div
                className={`${buttonSwap} ${
                  !playing && !radioBuffer ? iconShow : iconHide
                } ${animAll} items-center justify-center flex`}
              >
                <IconPlayerPlayFilled size={"100%"} stroke={"1.5"} />
              </div>
            </div>
          </button>
        </div>
      </div>
    </>
  );
};

export default Channel;
