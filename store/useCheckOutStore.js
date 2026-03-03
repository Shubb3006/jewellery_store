import axiosInstance from "@/lib/axios";
import toast from "react-hot-toast";
import { create } from "zustand";
import { persist } from "zustand/middleware";
import { useCartStore } from "./useCartStore";

export const useCheckoutStore = create(
  persist(
    (set, get) => ({
      isCheckingOut: false,
      selectedAddress: null,
      orders: [],

      setSelectedAddress: (address) => set({ selectedAddress: address }),
      clearCheckout: () => set({ selectedAddress: null }),

      checkOut: async ({ paymentMethod, items }) => {
        const { selectedAddress } = get();
        if (!selectedAddress) {
          toast.error("Please select delivery address");
          return false;
        }

        if (!items || items.length === 0) {
          toast.error("No items to checkout");
          return false;
        }

        set({ isCheckingOut: true });

        try {
          await axiosInstance.post("/user/orders", {
            address: selectedAddress,
            paymentMethod,
            items: items.map((item) => ({
              productId: item.productId._id,
              quantity: item.quantity,
              isBuyNow: item.isBuyNow || false, // Send Buy Now flag
            })),
          });

          // Clear cart only for cart checkout
          const isCartCheckout = !items.some((item) => item.isBuyNow);
          if (isCartCheckout) useCartStore.getState().clearCart();

          set({ selectedAddress: null });
          toast.success("Order placed successfully 🎉");
          return true;
        } catch (e) {
          toast.error(e?.response?.data?.message || "Checkout failed");
          return false;
        } finally {
          set({ isCheckingOut: false });
        }
      },
    }),
    { name: "checkout-storage" }
  )
);