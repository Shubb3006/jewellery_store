const SkeletonBox = ({ className }) => (
    <div className={`animate-pulse bg-base-300 rounded ${className}`} />
  );
  
  const ProductSkeleton = () => {
    return (
      <div className="max-w-6xl mx-auto p-4 sm:p-6 grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* IMAGE SECTION */}
        <div>
          <SkeletonBox className="w-full h-[300px] sm:h-[420px] rounded-xl" />
  
          <div className="flex gap-3 mt-4">
            {[1, 2, 3, 4].map((i) => (
              <SkeletonBox key={i} className="w-16 h-16 rounded-lg" />
            ))}
          </div>
        </div>
  
        {/* PRODUCT INFO */}
        <div className="flex flex-col gap-4">
          <SkeletonBox className="h-8 w-3/4" />
          <SkeletonBox className="h-4 w-1/3" />
          <SkeletonBox className="h-6 w-1/4" />
  
          <SkeletonBox className="h-4 w-full" />
          <SkeletonBox className="h-4 w-full" />
          <SkeletonBox className="h-4 w-5/6" />
  
          <div className="flex gap-3 mt-4">
            <SkeletonBox className="h-10 w-32 rounded-lg" />
            <SkeletonBox className="h-10 w-28 rounded-lg" />
          </div>
  
          <div className="border-t pt-4 mt-6 space-y-2">
            <SkeletonBox className="h-3 w-2/3" />
            <SkeletonBox className="h-3 w-1/2" />
            <SkeletonBox className="h-3 w-1/3" />
          </div>
        </div>
      </div>
    );
  };
  
  export default ProductSkeleton;
  