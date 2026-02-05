const MyOrderSkeleton = () => {
  return (
    <div className="max-w-6xl mx-auto px-4 py-8 animate-pulse">
      {/* Page Title */}
      <div className="h-7 w-40 bg-base-300 rounded mb-6" />

      <div className="space-y-6">
        {[...Array(3)].map((_, i) => (
          <div key={i} className="border rounded-lg p-5 shadow-sm bg-base-100">
            {/* Header */}
            <div className="flex flex-wrap gap-6 mb-4">
              {[...Array(5)].map((_, j) => (
                <div key={j}>
                  <div className="h-3 w-20 bg-base-300 rounded mb-2" />
                  <div className="h-4 w-28 bg-base-300 rounded" />
                </div>
              ))}
            </div>

            {/* Items */}
            <div className="divide-y">
              {[...Array(2)].map((_, k) => (
                <div key={k} className="flex gap-4 py-4">
                  <div className="w-20 h-20 bg-base-300 rounded" />

                  <div className="flex-1 space-y-2">
                    <div className="h-4 w-3/4 bg-base-300 rounded" />
                    <div className="h-3 w-1/2 bg-base-300 rounded" />
                    <div className="h-3 w-1/3 bg-base-300 rounded" />
                  </div>

                  <div className="h-4 w-20 bg-base-300 rounded" />
                </div>
              ))}
            </div>

            {/* Footer */}
            <div className="flex justify-between items-center mt-4 pt-4 border-t">
              <div className="h-3 w-64 bg-base-300 rounded" />
              <div className="h-5 w-28 bg-base-300 rounded" />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default MyOrderSkeleton;
