"use client";
import { useAddressStore } from "@/store/useAddressStore";
import React, { useEffect, useState } from "react";
import { Loader2, Edit2, Trash2, Plus } from "lucide-react";
import AddAddressModal from "../../../components/modals/AddAddressModal";

const AddressesPage = () => {
  const { getAddresses, addresses, gettingAddresses, deleteAddress } =
    useAddressStore();
  console.log(addresses);

  const [showAddForm, setShowAddForm] = useState(false);

  useEffect(() => {
    getAddresses();
  }, []);

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

      {gettingAddresses ? (
        <div className="flex justify-center items-center min-h-[200px]">
          <Loader2 className="animate-spin w-8 h-8" />
        </div>
      ) : addresses.length === 0 ? (
        <p className="text-gray-500 text-center">No addresses added yet.</p>
      ) : (
        <div className="space-y-4">
          {addresses.map((address) => (
            <div
              key={address._id}
              className={`border rounded-lg p-4 flex justify-between items-start gap-4 ${
                address.isDefault ? "border-primary bg-primary/10" : ""
              }`}
            >
              <div>
                <p className="font-semibold">{address.name}</p>
                <p className="text-sm text-gray-600">
                  {address.recipientName} | {address.phone}
                </p>
                <p className="text-sm text-gray-600 mt-1">
                  {address.line1} {address.line2}, {address.city},{" "}
                  {address.state} - {address.zip}, {address.country}
                </p>
                {address.isDefault && (
                  <span className="inline-block mt-2 px-2 py-1 text-xs bg-primary text-white rounded">
                    Default
                  </span>
                )}
              </div>
              <div className="flex gap-2">
                <button className="btn btn-outline btn-sm flex items-center gap-1">
                  <Edit2 size={14} />
                  Edit
                </button>
                <button
                  className="btn btn-error btn-sm flex items-center gap-1"
                  onClick={() => deleteAddress(address._id)}
                >
                  <Trash2 size={14} />
                  Delete
                </button>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* ADD NEW ADDRESS */}
      <div className="mt-6">
        {showAddForm && (
          <AddAddressModal onClose={() => setShowAddForm(false)} />
        )}
      </div>
    </div>
  );
};

export default AddressesPage;
