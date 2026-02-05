import { create } from "zustand";
import axiosInstance from "@/lib/axios";

export const useOrderStore = create((set) => ({
  orders: [],
  gettingOrders: false,

  getOrders: async () => {
    set({ gettingOrders: true });
    try {
      const res = await axiosInstance.get("/user/orders");
      set({ orders: res.data.orders });
    } catch (error) {
    } finally {
      set({ gettingOrders: false });
    }
  },
}));
