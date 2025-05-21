"use client";

import { useState, Suspense } from "react";
import ScheduleCallModal from "./ScheduleCallModal";

// ProductGridSkeleton.js
const ProductGridSkeleton = () => {
  return (
    <div className="w-full px-6">
      {/* Title Section Skeleton */}
      <div className="w-64 h-8 bg-gray-300 animate-pulse mx-auto mb-4"></div>

      {/* Grid Layout for Product Cards */}
      <div className="grid grid-cols-5 gap-6">
        {Array(5)
          .fill(null)
          .map((_, index) => (
            <div
              key={index}
              className="flex flex-col items-center justify-between bg-gray-200 p-4 rounded-lg animate-pulse"
            >
              {/* Product Image Skeleton */}
              <div className="w-full h-48 bg-gray-300 rounded-lg mb-4"></div>

              {/* Product Title Skeleton */}
              <div className="w-3/4 h-6 bg-gray-300 mb-2 rounded"></div>

              {/* Product Price Skeleton */}
              <div className="w-1/2 h-6 bg-gray-300 rounded mb-2"></div>

              {/* Additional Info Skeleton */}
              <div className="w-3/4 h-4 bg-gray-300 rounded"></div>
            </div>
          ))}
      </div>
    </div>
  );
};

export default function FeaturedProductsContainer({
  children,
}: {
  children: React.ReactNode;
}) {
  const [isMeetingModalVisible, setIsMeetingModalVisible] = useState(false);

  return (
    <>
      <div className="md:mx-24">{children}</div>;
      <ScheduleCallModal
        isOpen={isMeetingModalVisible}
        message={null}
        onClose={() => {
          setIsMeetingModalVisible(false);
        }}
      />
    </>
  );
}
