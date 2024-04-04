import React from "react";
import { morphOn } from "@/utils/tailwindUtil";
import ControllerDrawer from "../components/controllerDrawer";
import ControllerVolumeResponsive from "../components/controllerVolumeResponsive";
import ControllerVolumeDefault from "../components/controllerVolumeDefault";

const Controller: React.FC = () => {
  return (
    <div
      id="control-wrap"
      className={`relative h-14 p-2 ${morphOn} justify-between items-center flex w-full rounded-md`}
    >
      <ControllerDrawer />
      <ControllerVolumeResponsive />
      <ControllerVolumeDefault />
    </div>
  );
};

export default Controller;
