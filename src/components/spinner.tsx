import { IconCircleDashed, IconLoader2 } from "@tabler/icons-react";

const Spinner: React.FC<SpinnerProps> = ({ alt }) => {
  return (
    <div
      id="loading-spinner"
      className="w-full flex justify-center items-center"
    >
      <div
        id="spinner"
        className={`${
          alt ? "animate-spinSlow" : "animate-spin"
        } h-full max-h-full w-full max-w-full `}
      >
        {alt ? (
          <IconCircleDashed size={"100%"} stroke={"1.5"} />
        ) : (
          <IconLoader2 size={"100%"} stroke={"1.5"} />
        )}
      </div>
    </div>
  );
};

export default Spinner;
