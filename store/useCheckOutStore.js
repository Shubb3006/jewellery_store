import axiosInstance from "@/lib/axios";
import { create } from "zustand";
import { toast } from "react-hot-toast";
import { useCartStore } from "./useCartStore";

export const useCheckoutStore = create((set) => ({
  isCheckingOut: false,
  orders: [],

  checkOut: async () => {
    set({ isCheckingOut: true });

    try {
      const res = await axiosInstance.post("/user/orders");
      useCartStore.getState().clearCart();
      toast.success("Order placed successfully 🎉");

      // optional: store order
      set((state) => ({
        orders: [...state.orders, res.data.order],
      }));

      return true; // useful for redirect
    } catch (error) {
      toast.error(
        error?.response?.data?.message || "Checkout failed"
      );
      return false;
    } finally {
      set({ isCheckingOut: false });
    }
  },
}));
