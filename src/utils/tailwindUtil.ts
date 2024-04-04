export const animAll = `duration-300 transition-all ease-default`;
export const animColor = `duration-300 transition-color ease-default`;
export const interaction = ` betterhover:hover:bg-neutral-400 betterhover:hover:bg-opacity-15 active:bg-neutral-600 active:bg-opacity-25`;
export const interactionSelection = `betterhover:hover:bg-neutral-400 betterhover:hover:bg-opacity-15 active:bg-neutral-600 active:bg-opacity-20`;
export const interactionInput = `has-[:focus]:ring-2 has-[:focus]:ring-neutral-600 has-[:focus]:ring-inset has-[:focus]:bg-neutral-400 betterhover:hover:bg-neutral-400 betterhover:hover:bg-opacity-15 has-[:focus]:bg-neutral-500 has-[:focus]:bg-opacity-20`;
export const button = `p-1 ${animAll} ${interaction} stroke-white cursor-pointer rounded-md border-neutral-400 border-opacity-10 betterhover:hover:border-neutral-300 betterhover:hover:border-opacity-15 active:scale-90`;
export const buttonSelection = `p-0.5 ${animAll} ${interaction} stroke-white cursor-pointer rounded-md border-neutral-400 border-opacity-10 betterhover:hover:border-neutral-300 betterhover:hover:border-opacity-15`;
export const selection = `p-1 ${animAll} ${interactionSelection} cursor-pointer betterhover:hover:ring-0 betterhover:hover:ring-neutral-600 betterhover:hover:ring-inset betterhover:hover:bg-neutral-400 bg-opacity-35 betterhover:hover:bg-opacity-15 my-2 p-2 flex rounded-md relative h-10 bg-neutral-800`;
export const buttonHoverOnly = `p-1 ${animAll} stroke-white rounded-md border-neutral-400 border-opacity-10 betterhover:hover:border-neutral-300 betterhover:hover:border-opacity-15 betterhover:hover:bg-neutral-400 betterhover:hover:bg-opacity-15`;
export const morphOn = `backdrop-blur bg-opacity-55 shadow-sm bg-neutral-800`;
export const morphBorder = `border-2 border-neutral-400 border-opacity-10`;
export const morphOff = `bg-transparent`;
export const iconHide = `scale-90 opacity-0 pointer-events-none invisible`;
export const iconShow = `scale-100 opacity-100 delay-100 visible`;
export const selected = `bg-neutral-200/5`;
export const buttonSwap = `flex h-full w-full absolute top-0 left-0`;
