const DropdownSkeleton = () => {
  return (
    <div className="flex w-full relative mt-2 flex-col">
      <div className="w-20 min-h-6 animate-pulse rounded-md bg-neutral-800 flex my-2" />
      <div className="min-w-full min-h-9 rounded-md animate-pulse bg-neutral-800 flex" />
    </div>
  );
};

export default DropdownSkeleton;
