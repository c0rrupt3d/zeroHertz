import { morphOn } from "@/utils/tailwindUtil";
import ControllerDrawer from "../components/controllerDrawer";
import ControllerVolumeResponsive from "../components/controllerVolumeResponsive";

const Controller: React.FC = () => {
  return (
    <div
      id="control-wrap"
      className={`relative h-16 p-1 ${morphOn} justify-between items-center flex w-full xs:rounded-md`}
    >
      <ControllerDrawer />
      <ControllerVolumeResponsive />
      {/* <ControllerVolumeDefault /> */}
    </div>
  );
};

export default Controller;
