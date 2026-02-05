import Link from "next/link";
import { ShoppingCart } from "lucide-react";
import { useCartStore } from "@/store/useCartStore";
import { useMemo } from "react";

const CartButton = () => {
  const { cart, isAddingItem } = useCartStore();

  const totalItems = useMemo(
    () => cart.reduce((sum, item) => sum + (item.quantity || 0), 0),
    [cart]
  );
 

  return (
    <Link
      href="/cart"
      className="btn btn-ghost btn-circle relative relative hover:bg-base-300"
      aria-label="Cart"
    >
      <ShoppingCart
        size={22}
        className={`transition-transform duration-200 ${
          isAddingItem ? "scale-120" : "scale-100"
        }`}
        // className={`${isAddingItem && "scale-130"} transition`}
      />

      {/* {totalItems > 0 && (
        <span className="badge badge-primary badge-sm absolute -top-1 -right-1">
          {totalItems}
        </span>
      )} */}
      {totalItems > 0 && (
        <span className="absolute -top-1 -right-1 min-w-[18px] h-[18px] px-1 flex items-center justify-center rounded-full bg-primary text-primary-content text-xs font-bold leading-none">
          {totalItems > 9 ? "9+" : totalItems}
        </span>
      )}
    </Link>
  );
};

export default CartButton;
