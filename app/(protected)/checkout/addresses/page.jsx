"use client";
import { useAddressStore } from "@/store/useAddressStore";
import React, { useEffect, useState } from "react";
import { Loader2, Plus } from "lucide-react";
import AddAddressModal from "@/components/modals/AddAddressModal";
import AddressList from "@/components/AdddressList";
import { useCheckoutStore } from "@/store/useCheckOutStore";
import { redirect, useRouter } from "next/navigation";
import { useCartStore } from "@/store/useCartStore";
import AddressesSkeleton from "@/components/skeletons/AddressSkeleton";

const AddressesPage = () => {
  const { getAddresses, addresses, gettingAddresses } = useAddressStore();
  const { cart, getCart, gettingCartItems, cartLoad } = useCartStore();

  const { selectedAddress, setSelectedAddress } = useCheckoutStore();
  const router = useRouter();

  const [showAddForm, setShowAddForm] = useState(false);

  useEffect(() => {
    getAddresses();
    getCart();
  }, []);

  if (!cartLoad || gettingAddresses) {
    return <AddressesSkeleton />;
  }

  if (cartLoad && cart.length === 0) {
    redirect("/cart");
  }

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

      {gettingAddresses && addresses.length === 0 ? (
        <p className="text-gray-500 text-center">No addresses added yet.</p>
      ) : (
        <AddressList
          addresses={addresses}
          selectable
          selectedId={selectedAddress?._id}
          onSelect={(addr) => setSelectedAddress(addr)}
        />
      )}

      {/* ADD NEW ADDRESS */}
      <div className="mt-6">
        {showAddForm && (
          <AddAddressModal onClose={() => setShowAddForm(false)} />
        )}
      </div>

      <button
        className="btn btn-primary mt-6"
        disabled={!selectedAddress}
        onClick={() => router.push("/checkout/review")}
      >
        Continue
      </button>
    </div>
  );
};

export default AddressesPage;
