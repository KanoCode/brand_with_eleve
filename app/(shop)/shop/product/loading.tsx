import { Separator } from "@/components/ui/separator";

// LoadingSkeleton.js
const LoadingSkeleton = () => {
  return (
    <div className="w-full container mt-9">
      <Separator />

      <div className="container mx-auto p-4 h-full">
        <div className="flex flex-col md:flex-row gap-8">
          {/* Image Skeleton */}
          <div className="w-full md:w-1/2">
            <div className="w-full h-64 bg-gray-300 shining-block rounded"></div>
          </div>

          {/* Content Skeleton */}
          <div className="w-full md:w-1/2 space-y-4">
            <div className="w-3/4 h-8 bg-gray-300 shining-block rounded"></div>
            <div className="w-1/2 h-6 bg-gray-300 shining-block rounded"></div>

            <div className="w-1/4 h-6 bg-gray-300 rounded"></div>

            <div className="flex items-center shining-block space-x-2">
              <div className="w-8 h-8 bg-gray-300 rounded-full"></div>
              <div className="w-24 h-8 bg-gray-300 rounded shining-block"></div>
            </div>

            <div className="w-full h-12 bg-gray-300 rounded shining-block"></div>

            <div className="w-1/2 h-8 bg-gray-300 rounded shining-block"></div>
            <div className="w-1/3 h-6 bg-gray-300 rounded shining-block"></div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoadingSkeleton;
