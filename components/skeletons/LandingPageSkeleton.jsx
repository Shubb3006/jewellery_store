"use client";

const LandingPageSkeleton = () => {
  return (
    <div className="min-h-[calc(100vh-64px)] animate-pulse">
      {/* HERO SECTION SKELETON */}
      <section className="bg-base-200 py-15 px-6 text-center">
        <div className="h-10 w-72 mx-auto bg-base-300 rounded"></div>

        <div className="mt-6 h-4 w-[90%] max-w-xl mx-auto bg-base-300 rounded"></div>
        <div className="mt-3 h-4 w-[70%] max-w-md mx-auto bg-base-300 rounded"></div>

        <div className="mt-8 h-12 w-44 mx-auto bg-base-300 rounded"></div>
      </section>

      {/* PRODUCTS SECTION SKELETON */}
      <section className="p-6 max-w-7xl mx-auto">
        <div className="h-6 w-56 mb-6 bg-base-300 rounded"></div>

        {/* Product Cards Skeleton */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {Array.from({ length: 8 }).map((_, i) => (
            <div
              key={i}
              className="border rounded-lg p-4 space-y-4 bg-base-100"
            >
              {/* Image */}
              <div className="h-40 w-full bg-base-300 rounded"></div>

              {/* Title */}
              <div className="h-4 w-3/4 bg-base-300 rounded"></div>

              {/* Price */}
              <div className="h-4 w-1/2 bg-base-300 rounded"></div>

              {/* Button */}
              <div className="h-10 w-full bg-base-300 rounded"></div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
};

export default LandingPageSkeleton;
