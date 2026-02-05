const ProductsSkeleton = () => {
    return (
      <section className="p-6 max-w-7xl mx-auto animate-pulse">
        {/* Title */}
        <div className="h-7 w-48 bg-base-300 rounded mb-6" />
  
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {[...Array(8)].map((_, i) => (
            <div
              key={i}
              className="rounded-xl border border-gray-200 shadow-sm overflow-hidden bg-base-100"
            >
              {/* Image */}
              <div className="h-52 bg-base-300" />
  
              {/* Content */}
              <div className="p-4 space-y-3">
                <div className="h-4 w-full bg-base-300 rounded" />
                <div className="h-4 w-3/4 bg-base-300 rounded" />
  
                <div className="h-6 w-24 bg-base-300 rounded mt-2" />
              </div>
  
              {/* Button */}
              <div className="px-4 pb-4">
                <div className="h-10 w-full bg-base-300 rounded-lg" />
              </div>
            </div>
          ))}
        </div>
      </section>
    );
  };
  
  export default ProductsSkeleton;
  