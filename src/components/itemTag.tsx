import {
  IconFileSignal,
  IconThumbUp,
  IconTrendingUp,
  IconWaveSine,
} from "@tabler/icons-react";

const ItemTag = ({ children, special, icon, small }: ItemTagType) => {
  const icons:{ [key: string]: JSX.Element }  = {
    clickcount: <IconTrendingUp size={"100%"} stroke={"1.5"} />,
    votes: <IconThumbUp size={"100%"} stroke={"1.5"} />,
    codec: <IconFileSignal size={"100%"} stroke={"1.5"} />,
    bitrate: <IconWaveSine size={"100%"} stroke={"1.5"} />,
  };

  return (
    <>
      <div
        id="tag"
        className={` ${
          small ? "h-6" : "h-8"
        } p-2 m-1 text-xs font-medium rounded-md flex whitespace-nowrap items-center ${
          special
            ? "bg-neutral-100/50 text-black font-semibold"
            : "bg-neutral-800/75 font-medium"
        }`}
      >
        {icon && icons[icon] && (
          <div id="tag-icon" className="mr-1 h-full aspect-square">
            {icons[icon]}
          </div>
        )}
        {children}
      </div>
    </>
  );
};

export default ItemTag;
