import axiosInstance from "@/lib/axios";
import toast from "react-hot-toast";
import { create } from "zustand";

export const useAddressStore=create((set)=>({
    addresses:[],
    gettingAddresses:false,
    addingAddress:false,
    isDeletingAddress:false,
    isEditingAddress:false,

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
          toast.error(error?.response?.data?.message);
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
      
    editAddress:async(addressId,data)=>{
      set({isEditingAddress:true})
        try {
          const res = await axiosInstance.put(`/user/addresses/${addressId}`,data);
          set({ addresses: res.data.addresses });
          toast.success("Address Edit Successfull")
        } catch (error) {
          toast.error(error?.response?.data?.message);
        } finally {
          set({isEditingAddress:false})
        }
    }
}))