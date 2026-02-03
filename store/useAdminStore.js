import axiosInstance from "@/lib/axios";
import toast from "react-hot-toast";
import { create } from "zustand";
import useProductStore from "./useProductStore";

export const useAdminStore=create((set)=>({
    allOrders:[],
    allUsers:[],
    deletingProduct:false,
    gettingAllOrders:false,
    gettingAllUsers:false,
    isEditngProduct:false,
    isAddingProduct:false,

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
    },

    deleteProduct:async(productId)=>{
        try {
            set({deletingProduct:true});
            const res=await axiosInstance.delete(`/admin/products/${productId}`);
            useProductStore.getState().getAllProducts()

        } catch (error) {
            console.log(error.message)
            toast.error(error?.response?.data?.message);
            
        }finally{
            set({deletingProduct:false})
        }
    },

    editProduct:async(productId,data)=>{
        try {
            set({isEditngProduct:true});
            const res=await axiosInstance.put(`/admin/products/${productId}`,data);
            toast.success("Product Updated")
            const updatedProduct=res.data.product
            useProductStore.getState().updateProduct(updatedProduct)
            return true;
        } catch (error) {
            toast.error(error?.response?.data?.message);
            console.log(error.message)
        }finally{
            set({isEditngProduct:false})
        }
    }, 

    addProduct:async(data)=>{
        try {
            set({isAddingProduct:true});
            const res=await axiosInstance.post("/admin/products",data);
            toast.success("Product Added")
            
            useProductStore.setState((state) => ({
                products: [...state.products, res.data.product],
            }));
            return true;
        } catch (error) {
            toast.error(error?.response?.data?.message);
            console.log(error.message)
        }finally{
            set({isAddingProduct:false})
        }
    }
}))