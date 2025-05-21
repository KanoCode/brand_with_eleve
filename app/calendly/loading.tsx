export default function Loading() {
  // You can add any UI inside Loading, including a Skeleton.
  return (
    <>
      <div className="flex justify-center items-center h-[60vh]">
        <div className="rounded-full h-20 w-20  bg-red-600 animate-ping"></div>
      </div>
    </>
  );
}
