import React from "react";

const MenuHeading: React.FC<MenuHeadingType> = ({children}) => {
  return (
    <h2 id="heading" className="text-3xl mb-4 mx-2 font-light uppercase">
      {children}
    </h2>
  );
};

export default MenuHeading;
