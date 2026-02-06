"use client";
import { useAddressStore } from "@/store/useAddressStore";
import React, { useEffect, useState } from "react";
import { Loader2, Plus } from "lucide-react";
import AddAddressModal from "../../../components/modals/AddAddressModal";
import EditAddressModal from "@/components/modals/EditAddressModal";
import AddressList from "@/components/AdddressList";
import AddressesSkeleton from "@/components/skeletons/AddressSkeleton";

const AddressesPage = () => {
  const { getAddresses, addresses, gettingAddresses, deleteAddress } =
    useAddressStore();

  const [showAddForm, setShowAddForm] = useState(false);
  const [editingAddress, setEditingAddress] = useState(false);

  useEffect(() => {
    getAddresses();
  }, []);

  if(gettingAddresses) return <AddressesSkeleton />

  return (
    <div className="max-w-4xl mx-auto p-6">
      <div className="flex justify-between">
        <h1 className="text-2xl font-bold mb-6">My Addresses</h1>
        <button
          className="btn btn-primary flex items-center gap-2"
          onClick={() => setShowAddForm(!showAddForm)}
        >
          <Plus size={16} />
          Add New Address
        </button>
      </div>

      {!gettingAddresses 
      && addresses.length === 0  ?(
        <p className="text-gray-500 text-center">No addresses added yet.</p>
      ) : (
        <AddressList
        addresses={addresses}
        showActions
        onEdit={setEditingAddress}
        onDelete={deleteAddress}
        />
      )}

      {/* ADD NEW ADDRESS */}
      <div className="mt-6">
        {showAddForm && (
          <AddAddressModal onClose={() => setShowAddForm(false)} />
        )}
        {editingAddress && (
          <EditAddressModal
            address={editingAddress}
            onClose={() => setEditingAddress(null)}
          />
        )}
      </div>
    </div>
  );
};

export default AddressesPage;
