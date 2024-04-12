import { IconCircleDashed, IconLoader2 } from "@tabler/icons-react";
import { useState, useEffect } from "react";

const Spinner: React.FC<SpinnerProps> = ({ alt, animate = true }) => {
  const [shouldAnimate, setShouldAnimate] = useState(animate);

  useEffect(() => {
    let timeoutId: number | null = null; // Use 'number' for browser environments
    if (animate) {
      setShouldAnimate(true);
    } else {
      // Delay the transition from true to false
      timeoutId = window.setTimeout(() => {
        setShouldAnimate(false);
      }, 500);
    }

    return () => {
      if (timeoutId !== null) {
        clearTimeout(timeoutId);
      }
    };
  }, [animate]);

  return (
    <div
      id="loading-spinner"
      className="w-full overflow-hidden flex justify-center items-center"
    >
      <div
        id="spinner"
        className={`${
          shouldAnimate && (alt ? "animate-spinSlow" : "animate-spin")
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
