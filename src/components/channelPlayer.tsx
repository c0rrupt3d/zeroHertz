import { useInterfaceStore } from "@/stores/interfaceStore";
import { useRadioStore } from "@/stores/radioStore";
import { useSettingsStore } from "@/stores/settingsStore";
import { fetchPlayableUrl } from "@/utils/apiConnect";
import { useRef, useEffect } from "react";
import { useShallow } from "zustand/react/shallow";

let newAbortController: AbortController | undefined;

const ChannelPlayer: React.FC = () => {
  const audioRef = useRef<HTMLAudioElement>(null);

  const {setErrorText, setIsToasty} = useInterfaceStore(useShallow((state) => ({
    setErrorText: state.setErrorText,
    setIsToasty: state.setIsToasty,
  })))

  const {
    currentStation,
    setRadioBuffer,
    firstPlay,
    handleRadioToggle,
    radioPlay,
    setPlaying,
    setLoadingStation,
  } = useRadioStore(
    useShallow((state) => ({
      currentStation: state.currentStation,
      setRadioBuffer: state.setRadioBuffer,
      radioPlay: state.radioPlay,
      setPlaying: state.setPlaying,
      handleRadioToggle: state.handleRadioToggle,
      firstPlay: state.firstPlay,
      setLoadingStation: state.setLoadingStation,
    }))
  );
  const { volume } = useSettingsStore(
    useShallow((state) => ({
      volume: state.volume,
    }))
  );

  const handlePlay = async () => {
    setLoadingStation(true)
    const audio = audioRef.current;
    audio?.load()
    const res = currentStation
    newAbortController?.abort();
    const controller = new AbortController();
    newAbortController = controller;

    try {
      const playableUrl = await fetchPlayableUrl({
        id: res.stationuuid,
        signal: controller.signal
      })
      const updatedUrl = playableUrl.ok ? playableUrl.url : res.url

      if (audio) {
          audio.src = updatedUrl;
          try {
            audio.play();
          }
          catch(err) {
           // audio error to be managed later
          }
      }
      
    }
    catch(err) {
      setErrorText("Failed to load station, please try later")
      setIsToasty(true)
      setRadioBuffer(false)
    }
    finally {
      setLoadingStation(false)
    }
    

  };

  const handleError = (text: string) => {
    setErrorText(text)
    setIsToasty(true)
    setRadioBuffer(false)
  }

  const manageRadioToggle = (value: boolean) => {
    try {
      handleRadioToggle(value);
    }
    catch(err) {
      handleError("No Station Selected. Please search and select a station.")
    }
  }

  const handleOnWaiting = () => {
    setRadioBuffer(true)
  }

  const handleOnPlaying = () => {
    setRadioBuffer(false)
  }

  const handleOnPlay = () => {
    setPlaying(true);
    setRadioBuffer(true);
    if (!radioPlay) {
      manageRadioToggle(true);
    }
  };

  const handleOnPause = () => {

    setPlaying(false);
    setRadioBuffer(false);
    if (radioPlay) {
      manageRadioToggle(false);
    }

  };

  const handlePause = () => {
    const audio = audioRef.current;
    if (audio) {
      try {
        audio.removeAttribute("src")
        audio.pause();
        audio.load();
        setRadioBuffer(false);
        setPlaying(false);
      }
      catch {
        // audio error to be managed later
      }
    }
  };

  const handleVolume = () => {
    const audio = audioRef.current;
    if (audio) {
      audio.volume = volume;
    }
  };

  useEffect(() => {
    if(radioPlay && firstPlay) {
      handlePlay();
    }
    else if (!radioPlay) {
      handlePause();
    }
  }, [radioPlay]);

  useEffect(() => {
    if (firstPlay && !radioPlay) {
      manageRadioToggle(true);
    }
    else if (firstPlay) {
      handlePlay()
    }
  }, [currentStation]);

  useEffect(() => {
    handleVolume();
  }, [volume]);

  return (
    <>
      <audio
        id="player"
        ref={audioRef}
        className="hidden pointer-events-none"
        playsInline
        onWaiting={() => handleOnWaiting()}
        onPlaying={() => handleOnPlaying()}
        onPlay={() => handleOnPlay()}
        onPause={() => handleOnPause()}
        onError={() => handleError(`Failed to load ${currentStation.name}, please try later`)}
      />
    </>
  );
};

export default ChannelPlayer;
