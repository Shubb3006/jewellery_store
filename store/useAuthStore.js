import axiosInstance from "@/lib/axios";
import { create } from "zustand";
import { toast } from 'react-hot-toast';
import { useCartStore } from "./useCartStore";
import { clearGuestCart, getGuestCart } from "@/lib/guestCart";

export const useAuthStore=create((set,get)=>({
    authUser:null,
    isCheckingAuth:true,
    isLoggingIn:false,
    isSigningUp:false,
    isLoggingOut:false,
   

    checkAuth: async () => {
        set({ isCheckingAuth: true });
        try {
          const res = await axiosInstance.get("/auth/check");
          set({ authUser: res.data.user });
        } catch (err) {
          set({ authUser: null });
        } finally {
          set({ isCheckingAuth: false, hasCheckedAuth: true });
        }
      },
    signup: async (data) => {
        set({ isSigningUp: true });
        try {
          const res = await axiosInstance.post("/auth/signup", data);
          set({authUser:res.data.user});
          const guestItems = getGuestCart();
          if (guestItems.length > 0) {
            await axiosInstance.post("/cart/merge", {
              items: guestItems,
            });
      
            clearGuestCart();
          }
          useCartStore.getState().getCart();
          toast.success("Signup Successfull");
          return true;
        } catch (error) {
            toast.error(error?.response?.data?.message);
            console.log(error)
        } finally {
          set({ isSigningUp: false });
        }
      },
    
      login: async (data) => {
        set({ isLoggingIn: true });
        try {
          const res = await axiosInstance.post("/auth/signin", data);
          set({authUser:res.data.user});

          const guestItems = getGuestCart();
          if (guestItems.length > 0) {
            await axiosInstance.post("/user/cart/merge", {
              items: guestItems,
            });
      
            clearGuestCart();
          }
          useCartStore.getState().getCart();
          toast.success("Login Successfull");
          
          return true

        } catch (error) {
            toast.error(error?.response?.data?.message);
            console.log(error.message)
        } finally {
          set({ isLoggingIn: false });
        }
      },

        logout: async () => {
          set({isLoggingOut:true})
          try {
            const res = await axiosInstance.post("/auth/logout");
            set({ authUser: null,hasCheckedAuth:false });
            useCartStore.getState().clearCart()
            toast.success("Logout Success");
          } catch (error) {
            console.log(error.message);
          } finally {
            set({isLoggingOut:false})
          }
      },

   
}))