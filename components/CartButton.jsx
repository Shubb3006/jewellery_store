import Link from "next/link";
import { ShoppingCart } from "lucide-react";
import { useCartStore } from "@/store/useCartStore";

const CartButton = () => {
  const { cart } = useCartStore();

  const totalItems = cart.reduce((acc, item) => acc + item.quantity, 0);

  return (
    <Link href="/cart" className="btn btn-ghost btn-circle relative">
      <ShoppingCart size={22} />

      {totalItems > 0 && (
        <span className="badge badge-primary badge-sm absolute -top-1 -right-1">
          {totalItems}
        </span>
      )}
    </Link>
  );
};

export default CartButton;
