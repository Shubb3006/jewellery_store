import axiosInstance from "@/lib/axios";
import { create } from "zustand";
import {toast} from "react-hot-toast"
import { useAuthStore } from "./useAuthStore";
import { addToGuestCart, deleteItemGuestCart, getGuestCart, removeFromGuestCart, updateGuestCartQuantity } from "@/lib/guestCart";

export const useCartStore=create((set)=>({
    cart:[],
    cartLoad:false,
    gettingCartItems:false,
    isAddingItem:false,
    isChangingQuantity:false,
    isDeleting:false,

    getCart:async()=>{
        try {
            set({gettingCartItems:true});
            if(useAuthStore.getState().authUser){
                const res=await axiosInstance.get("/user/cart");
                set({cart:res.data.cart.items});
            }
            else{
                try{
                set({cart:getGuestCart()});
                }
                catch(err){
                    console.log(err.message)
                }
            }
        } catch (error) {
            toast.error(error?.response?.data?.message || error.message);    
        }finally{
            set({gettingCartItems:false, cartLoad:true})
        }
    },

    addToCart: async (product) => {
        try {
          set({ isAddingItem: true });
      
          if (useAuthStore.getState().authUser) {
            const res = await axiosInstance.post("/user/cart", {
              productId: product._id,
            });
            set({ cart: res.data.cart.items });
          } else {
            await addToGuestCart(product, 1); // ❗ let it throw
            set({ cart: getGuestCart() });
          }
      
        } catch (error) {
          toast.error(error?.response?.data?.message || error.message || "Product not available");
        } finally {
          set({ isAddingItem: false });
        }
    },

    changeQuantity:async({product,action})=>{
        try {
            set({isChangingQuantity:true});
            if (useAuthStore.getState().authUser) {
                const res=await axiosInstance.put("/user/cart",{productId:product._id,action})
                set({cart:res.data.updatedCart.items})
            }
            else{
                await updateGuestCartQuantity(product, action);
                set({ cart: getGuestCart() });
            }
        } catch (error) {
            toast.error(error?.response?.data?.message || error.message || "No more stock available");    
            
        }finally{
            set({isChangingQuantity:false});

        }
    },

    deleteItem:async(product)=>{
        try {
            set({isDeleting:true});
            if (useAuthStore.getState().authUser) {
                const res=await axiosInstance.delete(`/user/cart/${product._id}`)
                set({cart:res.data.updatedCart.items})
            }
            else{
                await removeFromGuestCart(product._id)
                set({ cart: getGuestCart() });
            }
        } catch (error) {
            toast.error(error?.response?.data?.message);    
            
        }finally{
            set({isDeleting:false});
        }
    },

  clearCart: () => set({ cart: [] }),
}))