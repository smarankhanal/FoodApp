import React from "react";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";

export default function SkeletonLoader({
  count = 1,
  width = "100%",
  height = 20,
  className = "",
  baseColor,
  highlightColor,
}) {
  return (
    <div className={`space-y-2 ${className}`}>
      {Array(count)
        .fill(0)
        .map((_, i) => (
          <Skeleton
            key={i}
            width={width}
            height={height}
            baseColor={baseColor}
            highlightColor={highlightColor}
          />
        ))}
    </div>
  );
}
