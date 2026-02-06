const AddressesSkeleton = () => {
    return (
      <div className="max-w-4xl mx-auto p-6 animate-pulse">
        {/* Header */}
        <div className="flex justify-between mb-6">
          <div className="h-7 w-40 bg-gray-200 rounded"></div>
          <div className="h-10 w-40 bg-gray-200 rounded"></div>
        </div>
  
        {/* Address cards */}
        <div className="space-y-4">
          {[1, 2, 3].map((_, i) => (
            <div
              key={i}
              className="border rounded-lg p-4 flex gap-4 items-start"
            >
              {/* Radio */}
              <div className="h-5 w-5 bg-gray-200 rounded-full mt-1"></div>
  
              {/* Address content */}
              <div className="flex-1 space-y-2">
                <div className="h-4 w-32 bg-gray-200 rounded"></div>
                <div className="h-3 w-full bg-gray-200 rounded"></div>
                <div className="h-3 w-3/4 bg-gray-200 rounded"></div>
                <div className="h-3 w-1/2 bg-gray-200 rounded"></div>
              </div>
  
              {/* Actions */}
              <div className="flex gap-2">
                <div className="h-8 w-16 bg-gray-200 rounded"></div>
                <div className="h-8 w-16 bg-gray-200 rounded"></div>
              </div>
            </div>
          ))}
        </div>
  
        {/* Continue button */}
        <div className="mt-6">
          <div className="h-12 w-40 bg-gray-200 rounded"></div>
        </div>
      </div>
    );
  };
  
  export default AddressesSkeleton;
  