import axiosInstance from "@/lib/axios";
import { create } from "zustand";

export const useAddressStore=create((set)=>({
    addresses:[],
    gettingAddresses:false,
    addingAddress:false,
    isDeletingAddress:false,

    getAddresses:async()=>{
        set({gettingAddresses:true})
        try {
          const res = await axiosInstance.get("/user/addresses");
          set({ addresses: res.data.addresses });
          
        } catch (error) {
          console.log(error.message);
        } finally {
          set({gettingAddresses:false})
        }
      },
  
      addAddress:async(data)=>{
        set({addingAddress:true})
        try {
          const res = await axiosInstance.post("/user/addresses",data);
          set({ addresses: res.data.addresses });
          
        } catch (error) {
          console.log(error.message);
        } finally {
          set({addingAddress:false})
        }
      },

      deleteAddress:async(addressId)=>{
        set({isDeletingAddress:true})
        console.log("yes")
        try {
          const res = await axiosInstance.delete(`/user/addresses/${addressId}`,);
          set({ addresses: res.data.addresses });
          
        } catch (error) {
          console.log(error.message);
        } finally {
          set({isDeletingAddress:false})
        }
      },
      
}))