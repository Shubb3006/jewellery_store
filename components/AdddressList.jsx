import { Edit2, Trash2 } from "lucide-react";

export default function AddressList({
  addresses,
  selectable = false,
  selectedId,
  onSelect,
  showActions = false,
  onEdit,
  onDelete,
}) {
  return (
    <div className="space-y-4">
      {addresses.map((address) => (
        <label key={address._id} className="cursor-pointer block">
          <div
            className={`border rounded-lg p-4 flex justify-between gap-4 ${
              address.isDefault ? "border-primary bg-primary/10" : ""
            }`}
          >
            <div className="flex gap-3">
              {selectable && (
                <input
                  type="radio"
                  name="address"
                  checked={selectedId === address._id}
                  onChange={() => onSelect?.(address)}
                />
              )}

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
            </div>

            {showActions && (
              <div className="flex gap-2">
                <button
                  className="btn btn-outline btn-sm"
                  onClick={() => onEdit?.(address)}
                >
                  <Edit2 size={14} /> Edit
                </button>

                <button
                  className="btn btn-error btn-sm"
                  onClick={() => onDelete?.(address._id)}
                >
                  <Trash2 size={14} /> Delete
                </button>
              </div>
            )}
          </div>
        </label>
      ))}
    </div>
  );
}
