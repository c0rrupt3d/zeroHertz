import { animAll, button, interactionInput } from "@/utils/tailwindUtil";
import { IconTags, IconX } from "@tabler/icons-react";
import React from "react";
import ItemTag from "./itemTag";

export const TagSearch: React.FC<TagSearchProps> = ({
  label,
  filter,
  setTemp,
  value
}) => {

  return (
    <>
      <div className="flex flex-col w-full mt-2">
        <label htmlFor={filter} className="block my-2 text-md font-medium">
          {label}
        </label>
        <div className="inline-flex w-full relative h-10">
          <div
            id="input-wrap"
            className={` ${animAll} bg-neutral-800 ${interactionInput} mr-1 w-full p-2 flex rounded-md relative h-10 `}
          >
            <div id="input-icon" className=" h-full flex aspect-square">
              <IconTags size={"100%"} stroke={"2"} />
            </div>
            <input
              id="input"
              className="text-md px-2 py-1 rounded-md h-full w-full border-0 bg-transparent outline-0"
              autoComplete="false"
              autoCapitalize="false"
              type="text"
              spellCheck="false"
              placeholder="Search tags, comma, seperated"
              value={value}
              onChange={(e) => setTemp((prev: SearchOptions) => ({...prev, tags: e.target.value.toLowerCase().concat()}))}
            ></input>
            {value !== "" && (
              <div
                id="clear-icon"
                onClick={() => setTemp((prev: SearchOptions) => ({...prev, tags: ""}))}
                className={`${button} h-full flex aspect-square`}
              >
                <IconX size={"100%"} stroke={"1.5"} />
              </div>
            )}
          </div>
          {/* <button
            onClick={() => handleClick()}
            className={`${button} bg-neutral-800 aspect-square h-full `}
          >
            <IconSearch size={"100%"} stroke={"1.5"} />
          </button> */}
        </div>
        <div className="w-full flex mt-2 text-sm items-center">
          <span className="mr-0.5">{`Tag Preview:`}</span>
          {value.split(",").map((tag: string, index: number) => {
            return (
              <React.Fragment key={index}>
                {tag && (
                  <ItemTag small={true}  special={false} icon={""}>
                    {tag}
                  </ItemTag>
                )}
              </React.Fragment>
            );
          })}
        </div>
      </div>
    </>
  );
};

export default TagSearch;
