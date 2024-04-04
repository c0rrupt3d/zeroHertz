import React from "react";

export const DropdownSelect: React.FC<DropdownProps> = ({
  label,
  options,
  setSearchFilters,
  placeholder,
  filter,
  value,
  all,
}) => {
  return (
    <div className="flex flex-col w-full mt-2">
      <label htmlFor={filter} className="block my-2 text-md font-medium">
        {label}
      </label>
      <select
        id={filter}
        className="capitalize rounded-md px-1 py-2 bg-neutral-800"
        onChange={(event) => setSearchFilters(event.target.value, filter)}
        value={value}
      >
        {all && <option value={""}>{`All ${placeholder}`}</option>}
        {options.map((val: {name: string}, index:number) => {
          return (
            <React.Fragment key={index}>
              <option className="capitalize" value={val.name}>
                {val.name}
              </option>
            </React.Fragment>
          );
        })}
      </select>
    </div>
  );
};

export default DropdownSelect;
