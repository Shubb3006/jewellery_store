const ReviewSkeleton = () => {
    return (
      <div className="max-w-5xl mx-auto p-6 grid md:grid-cols-3 gap-6 animate-pulse">
        {/* LEFT */}
        <div className="md:col-span-2 space-y-6">
          {/* ADDRESS */}
          <div className="border rounded-lg p-4 space-y-2">
            <div className="h-4 w-40 bg-gray-200 rounded" />
            <div className="h-3 w-56 bg-gray-200 rounded" />
            <div className="h-3 w-72 bg-gray-200 rounded" />
            <div className="h-3 w-32 bg-gray-200 rounded" />
            <div className="h-3 w-24 bg-gray-200 rounded mt-2" />
          </div>
  
          {/* CART ITEMS */}
          <div className="border rounded-lg p-4 space-y-4">
            <div className="h-4 w-32 bg-gray-200 rounded" />
  
            {[1, 2].map((i) => (
              <div key={i} className="flex gap-4 items-center">
                <div className="w-20 h-20 bg-gray-200 rounded" />
                <div className="flex-1 space-y-2">
                  <div className="h-4 w-48 bg-gray-200 rounded" />
                  <div className="h-3 w-24 bg-gray-200 rounded" />
                </div>
                <div className="h-4 w-16 bg-gray-200 rounded" />
              </div>
            ))}
          </div>
  
          {/* PAYMENT */}
          <div className="border rounded-lg p-4 space-y-3">
            <div className="h-4 w-40 bg-gray-200 rounded" />
            <div className="h-4 w-52 bg-gray-200 rounded" />
            <div className="h-4 w-52 bg-gray-200 rounded" />
          </div>
        </div>
  
        {/* RIGHT */}
        <div className="border rounded-lg p-4 h-fit space-y-3">
          <div className="h-4 w-32 bg-gray-200 rounded" />
  
          <div className="flex justify-between">
            <div className="h-3 w-20 bg-gray-200 rounded" />
            <div className="h-3 w-16 bg-gray-200 rounded" />
          </div>
  
          <div className="flex justify-between">
            <div className="h-3 w-20 bg-gray-200 rounded" />
            <div className="h-3 w-16 bg-gray-200 rounded" />
          </div>
  
          <div className="h-px bg-gray-200 my-2" />
  
          <div className="flex justify-between">
            <div className="h-4 w-20 bg-gray-200 rounded" />
            <div className="h-4 w-20 bg-gray-200 rounded" />
          </div>
  
          <div className="h-10 w-full bg-gray-200 rounded mt-4" />
        </div>
      </div>
    );
  };
  
  export default ReviewSkeleton;
  