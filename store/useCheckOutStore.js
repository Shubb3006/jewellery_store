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

      setSelectedAddress: (address) =>
        set({ selectedAddress: address }),

      clearCheckout: () =>
        set({ selectedAddress: null }),

      checkOut: async ({paymentMethod}) => {
        const { selectedAddress } = get();
        if (!selectedAddress) {
          toast.error("Please select delivery address");
          return false;
        }

        set({ isCheckingOut: true });

        try {
          const res = await axiosInstance.post("/user/orders", {
            address: selectedAddress,
            paymentMethod
          });

          useCartStore.getState().clearCart();
          set({ selectedAddress: null }); // IMPORTANT
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
    {
      name: "checkout-storage", // localStorage key
    }
  )
);
