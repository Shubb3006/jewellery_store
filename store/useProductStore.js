import { create } from "zustand";
import axiosInstance from "@/lib/axios";
import toast from "react-hot-toast";

const useProductStore = create((set) => ({
  products: [],
  gettingAllProducts: false,
  gettingProduct:false,

  getAllProducts: async () => {
    set({ gettingAllProducts: true });
    try {
      const res = await axiosInstance.get("/products");
      set({ products: res.data.products });
    } catch (err) {
        toast.error(err?.response?.data?.message);
        console.error(err);
    }
    finally{
      set({gettingAllProducts:false})
    }
  },

  updateProduct: (updatedProduct) =>
    set((state) => ({
      products: state.products.map((p) =>
        p._id === updatedProduct._id ? updatedProduct : p
      ),
    })), 
    
   getProduct:async(ProductId)=>{
      set({gettingProduct:true})
      try {
        const res = await axiosInstance.get(`/products/${ProductId}`);
        set({ product: res.data.product });
      } catch (err) {
      }
      finally{
        set({gettingProduct:false})

      }
   } ,
   

}));

export default useProductStore;
