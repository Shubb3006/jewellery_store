"use client";
import { useAddressStore } from "@/store/useAddressStore";
import { Loader2 } from "lucide-react";
import React, { useState } from "react";

const AddAddressModal = ({ onClose }) => {
  const [errors, setErrors] = useState({});
  const { addAddress, addingAddress } = useAddressStore();
  const [newAddress, setNewAddress] = useState({
    name: "",
    recipientName: "",
    phone: "",
    line1: "",
    line2: "",
    city: "",
    state: "",
    zip: "",
    country: "",
    isDefault: false,
  });
  const handleInputChange = (e) => {
    setNewAddress({ ...newAddress, [e.target.name]: e.target.value });
  };

  function validateAddress() {
    const errs = {};

    if (!newAddress.name.trim()) errs.name = "Address Name is required";
    if (!newAddress.recipientName.trim())
      errs.recipientName = "Recipient Name is required";
    if (!newAddress.phone.trim()) errs.phone = "Phone is required";
    if (!newAddress.line1.trim()) errs.line1 = "Address Line 1 is required";
    if (!newAddress.city.trim()) errs.city = "City is required";
    if (!newAddress.state.trim()) errs.state = "State is required";
    if (!newAddress.zip.trim()) errs.zip = "ZIP is required";
    if (!newAddress.country.trim()) errs.country = "Country is required";

    setErrors(errs);

    return Object.keys(errs).length === 0;
  }
  const handleAddAddress = async (e) => {
    e.preventDefault();
    const success = validateAddress();
    if (success) {
      await addAddress(newAddress);
      onClose();
      setNewAddress({
        name: "",
        recipientName: "",
        phone: "",
        line1: "",
        line2: "",
        city: "",
        state: "",
        zip: "",
        country: "",
        isDefault: false,
      });
    }
  };
  return (
    <div className="modal modal-open">
      <div
        className="modal-backdrop backdrop-blur-sm bg-black/40"
        onClick={onClose}
      />
      <div className="modal-box">
        <form
          onSubmit={handleAddAddress}
          className="grid grid-cols-1 md:grid-cols-2 gap-3"
        >
          <input
            type="text"
            name="name"
            placeholder="Address Name"
            value={newAddress.name}
            onChange={handleInputChange}
            className={`input input-bordered w-full ${
              errors.name ? "border-red-500" : ""
            }`}
          />

          <input
            type="text"
            name="recipientName"
            placeholder="Recipient Name"
            value={newAddress.recipientName}
            onChange={handleInputChange}
            className={`input input-bordered w-full ${
              errors.recipientName ? "border-red-500" : ""
            }`}
          />

          <input
            type="text"
            name="phone"
            placeholder="Phone Number"
            value={newAddress.phone}
            onChange={handleInputChange}
            className={`input input-bordered w-full ${
              errors.phone ? "border-red-500" : ""
            }`}
          />
          <input
            type="text"
            name="line1"
            placeholder="Address Line 1"
            value={newAddress.line1}
            onChange={handleInputChange}
            className={`input input-bordered w-full ${
              errors.line1 ? "border-red-500" : ""
            }`}
          />
          <input
            type="text"
            name="line2"
            placeholder="Address Line 2"
            value={newAddress.line2}
            onChange={handleInputChange}
            className={`input input-bordered w-full ${
              errors.line2 ? "border-red-500" : ""
            }`}
          />
          <input
            type="text"
            name="city"
            placeholder="City"
            value={newAddress.city}
            onChange={handleInputChange}
            className={`input input-bordered w-full ${
              errors.city ? "border-red-500" : ""
            }`}
          />
          <input
            type="text"
            name="state"
            placeholder="State"
            value={newAddress.state}
            onChange={handleInputChange}
            className={`input input-bordered w-full ${
              errors.state ? "border-red-500" : ""
            }`}
          />
          <input
            type="text"
            name="zip"
            placeholder="ZIP Code"
            value={newAddress.zip}
            onChange={handleInputChange}
            className={`input input-bordered w-full ${
              errors.zip ? "border-red-500" : ""
            }`}
          />
          <input
            type="text"
            name="country"
            placeholder="Country"
            value={newAddress.country}
            onChange={handleInputChange}
            className={`input input-bordered w-full ${
              errors.country ? "border-red-500" : ""
            }`}
          />

          <div className="flex items-center gap-2 mt-2">
            <input
              type="checkbox"
              name="isDefault"
              checked={newAddress.isDefault}
              onChange={(e) =>
                setNewAddress({
                  ...newAddress,
                  isDefault: e.target.checked,
                })
              }
              className="checkbox"
            />
            <label>Set as Default</label>
          </div>

          <div className="flex justify-end gap-3 pt-4">
            <button type="button" className="btn btn-ghost" onClick={onClose}>
              Cancel
            </button>

            <button
              type="submit"
              className="btn btn-primary"
              disabled={addingAddress}
            >
              {addingAddress ? (
                <Loader2 className="animate-spin" />
              ) : (
                "Save Address"
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddAddressModal;
