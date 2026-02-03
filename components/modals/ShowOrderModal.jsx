import React from "react";

const ShowOrderModal = ({ selectedOrder, onClose }) => {
  return (
    <>
      <div className={`modal modal-open`}>
        <div
          className="modal-backdrop backdrop-blur-sm bg-black/40"
          onClick={onClose}
        />
        <div className="modal-box">
          <h2 className="text-2xl font-bold text-center text-primary">
            Order Details
          </h2>
          <button
            className="btn btn-sm btn-error absolute top-4 right-4"
            onClick={onClose}
          >
            Close
          </button>

          <div className="space-y-4">
            {selectedOrder.items.map((item) => (
              <div key={item._id} className="flex gap-4 border-b pb-2">
                <div className="w-20 h-20 bg-gray-100 rounded overflow-hidden">
                  <img
                    src={item.product?.images?.[0] || "/placeholder.png"}
                    alt={item.name}
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="flex-1">
                  <p className="font-semibold">{item.name}</p>
                  <p className="text-sm text-gray-500">
                    Quantity: {item.quantity}
                  </p>
                  <p className="text-sm text-gray-500">
                    Price: ₹{item.priceAtOrder}
                  </p>
                </div>
                <div className="font-semibold">
                  ₹{item.priceAtOrder * item.quantity}
                </div>
              </div>
            ))}
          </div>

          <div className="mt-4 border-t pt-4 flex justify-between items-center">
            <p className="text-sm text-gray-600">
              Delivery Address: {selectedOrder.address}
            </p>
            <p className="text-lg font-bold">
              Total: ₹{selectedOrder.totalAmount}
            </p>
          </div>
        </div>
      </div>
    </>
  );
};

export default ShowOrderModal;
