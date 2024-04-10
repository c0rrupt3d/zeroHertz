import React from "react";

const ToggleSwitch: React.FC<ToggleProps> = ({
  setTemp,
  filter,
  value,
  label,
  showInverted,
}) => {
  return (
    <div className="flex mt-2 w-full">
      <label
        htmlFor={filter}
        className="inline-flex justify-between my-2 items-center cursor-pointer w-full"
        onClick={() => setTemp((prev: SearchOptions) => ({...prev, [filter]: !value}))}
      >
        <input
          type="checkbox"
          checked={showInverted ? !value : value}
          className="sr-only peer hidden"
          onChange={() => setTemp((prev: SearchOptions) => ({...prev, [filter]: !value}))}
        />
        <span className=" block my-1 text-md font-medium">{label}</span>
        <div
          className={`relative w-12 h-6 rounded-full peer-focus:ring-4 peer-focus:ring-neutral-800 bg-neutral-800 peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full  after:content-[''] after:absolute  after:top-1 after:start-1 after:bg-white after:rounded-full after:h-4 after:w-4 peer-checked:after:start-3 after:transition-all peer-checked:bg-neutral-500`}
        />
      </label>
    </div>
  );
};

export default ToggleSwitch;
