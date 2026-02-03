import axiosInstance from "@/lib/axios";
import { create } from "zustand";

export const useAdminStore=create((set)=>({
    allOrders:[],
    allUsers:[],
    gettingAllOrders:false,
    gettingAllUsers:false,

    getAllOrders:async()=>{
        try {
            set({gettingAllOrders:true});
            const res=await axiosInstance.get("/admin/orders");
            console.log(res.data.orders)
            set({allOrders:res.data.orders})
        } catch (error) {
            console.log(error.message)
        }finally{
            set({gettingAllOrders:false})
        }
    },

    getAllUsers:async()=>{
        try {
            set({gettingAllUsers:true});
            const res=await axiosInstance.get("/admin/users");
            console.log(res.data.users)
            set({allUsers:res.data.users})
        } catch (error) {
            console.log(error.message)
        }finally{
            set({gettingAllUsers:false})
        }
    }
}))