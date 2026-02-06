"use client";

import { useCheckoutStore } from "@/store/useCheckOutStore";
import { useCartStore } from "@/store/useCartStore";
import { redirect, useRouter } from "next/navigation";
import { useEffect, useState } from "react";

const ReviewPage = () => {
  const router = useRouter();
  const { selectedAddress, checkOut } = useCheckoutStore();
  const { cart, getCart, gettingCartItems } = useCartStore();
  useEffect(() => {
    getCart();
  }, []);

  const [paymentMethod, setPaymentMethod] = useState("COD");

  if (!selectedAddress) redirect("/checkout/addresses");

  const subtotal = cart.reduce(
    (sum, item) => sum + item.productId.price * item.quantity,
    0
  );

  const deliveryFee = subtotal > 999 ? 0 : 49;
  const total = subtotal + deliveryFee;

  if (gettingCartItems)
    return (
      <div>
        <p>Loading....</p>
      </div>
    );

  if (!gettingCartItems && cart.length === 0) {
    redirect("/cart");
  }

  return (
    <div className="max-w-5xl mx-auto p-6 grid md:grid-cols-3 gap-6">
      {/* LEFT */}
      <div className="md:col-span-2 space-y-6">
        {/* ADDRESS */}
        <div className="border rounded-lg p-4">
          <h2 className="font-bold mb-2">Delivery Address</h2>
          <p className="font-medium">{selectedAddress?.recipientName}</p>
          <p className="text-sm text-gray-600">
            {selectedAddress?.line1}, {selectedAddress?.line2},{" "}
            {selectedAddress?.city}, {selectedAddress?.state} -{" "}
            {selectedAddress?.zip}
          </p>
          <p className="text-sm">{selectedAddress?.phone}</p>

          <button
            className="btn btn-link px-0 mt-2"
            onClick={() => router.push("/checkout/addresses")}
          >
            Change Address
          </button>
        </div>

        {/* CART ITEMS */}
        <div className="border rounded-lg p-4 space-y-4">
          <h2 className="font-bold">Order Items</h2>

          {cart.map((item) => (
            <div
              key={item.productId._id}
              className="flex gap-4 items-center border-b pb-3 last:border-none"
            >
              <img
                src={item.productId.images[0]}
                alt={item.productId.name}
                width={80}
                height={80}
                className="rounded"
              />
              <div className="flex-1">
                <p className="font-medium">
                  {item.productId.name} : ₹{item.productId.price}
                </p>
                <p className="text-sm text-gray-500">Qty: {item.quantity}</p>
              </div>
              <p className="font-semibold">
                ₹{item.productId.price * item.quantity}
              </p>
            </div>
          ))}
        </div>

        {/* PAYMENT */}
        <div className="border rounded-lg p-4">
          <h2 className="font-bold mb-3">Payment Method</h2>

          <label className="flex items-center gap-2 cursor-pointer">
            <input
              type="radio"
              checked={paymentMethod === "COD"}
              onChange={() => setPaymentMethod("COD")}
            />
            Cash on Delivery
          </label>

          <label className="flex items-center gap-2 cursor-pointer mt-2">
            <input
              type="radio"
              checked={paymentMethod === "ONLINE"}
              onChange={() => setPaymentMethod("ONLINE")}
            />
            Online Payment
          </label>
        </div>
      </div>

      {/* RIGHT */}
      <div className="border rounded-lg p-4 h-fit space-y-3">
        <h2 className="font-bold">Price Summary</h2>

        <div className="flex justify-between text-sm">
          <span>Subtotal</span>
          <span>₹{subtotal}</span>
        </div>

        <div className="flex justify-between text-sm">
          <span>Delivery</span>
          <span>{deliveryFee === 0 ? "FREE" : `₹${deliveryFee}`}</span>
        </div>

        <hr />

        <div className="flex justify-between font-bold">
          <span>Total</span>
          <span>₹{total}</span>
        </div>

        <button
          className="btn btn-primary w-full mt-4"
          onClick={async () => {
            // CALL PLACE ORDER API HERE
            await checkOut({paymentMethod});
            router.push("/orders");
          }}
        >
          Place Order
        </button>
      </div>
    </div>
  );
};

export default ReviewPage;
