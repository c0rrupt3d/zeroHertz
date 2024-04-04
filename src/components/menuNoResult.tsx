import React from "react";

const MenuNoResult: React.FC<MenuNoResultProps> = ({icon, text}) => {
  return (
    <>
      <div
        id="no-result"
        className="relative mt-4 w-full justify-center flex flex-col items-center text-align-center"
      >
        <div className="aspect-square h-10 w-full">
          {icon}
        </div>
        <h5 className="mt-2 text-lg font-semibold text-center">
          {text}
        </h5>
      </div>
    </>
  );
};

export default MenuNoResult;
