const CartSkeleton = () => {
    return (
      <div className="max-w-6xl mx-auto p-4 sm:p-6 grid grid-cols-1 md:grid-cols-3 gap-6 animate-pulse">
        {/* LEFT: CART ITEMS */}
        <div className="md:col-span-2 space-y-4">
          <div className="h-6 w-40 bg-base-300 rounded" />
  
          {[1, 2, 3].map((i) => (
            <div
              key={i}
              className="card bg-base-100 shadow-md p-4 flex flex-col sm:flex-row gap-4"
            >
              {/* image */}
              <div className="w-full sm:w-24 h-40 sm:h-24 bg-base-300 rounded-lg" />
  
              {/* info */}
              <div className="flex-1 space-y-3">
                <div className="h-5 w-3/4 bg-base-300 rounded" />
                <div className="h-4 w-32 bg-base-300 rounded" />
  
                <div className="flex items-center gap-3 mt-4">
                  <div className="h-8 w-8 bg-base-300 rounded" />
                  <div className="h-5 w-6 bg-base-300 rounded" />
                  <div className="h-8 w-8 bg-base-300 rounded" />
                </div>
              </div>
  
              {/* price */}
              <div className="h-6 w-20 bg-base-300 rounded self-end sm:self-start" />
            </div>
          ))}
        </div>
  
        {/* RIGHT: SUMMARY */}
        <div className="card bg-base-100 shadow-lg p-6 h-fit space-y-4">
          <div className="h-6 w-32 bg-base-300 rounded" />
  
          <div className="flex justify-between">
            <div className="h-4 w-24 bg-base-300 rounded" />
            <div className="h-4 w-12 bg-base-300 rounded" />
          </div>
  
          <div className="flex justify-between">
            <div className="h-4 w-24 bg-base-300 rounded" />
            <div className="h-4 w-16 bg-base-300 rounded" />
          </div>
  
          <div className="h-10 w-full bg-base-300 rounded mt-4" />
        </div>
      </div>
    );
  };
  
  export default CartSkeleton;
  