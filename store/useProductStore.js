import { create } from "zustand";
import axiosInstance from "@/lib/axios";

const useProductStore = create((set) => ({
  products: [],
  gettingAllProducts: false,

  getAllProducts: async () => {
    set({ gettingAllProducts: true });
    try {
      const res = await axiosInstance.get("/products");
      set({ products: res.data.products });
    } catch (err) {
      console.error(err);
    }
    finally{
      set({gettingAllProducts:false})
    }
  },

}));

export default useProductStore;
