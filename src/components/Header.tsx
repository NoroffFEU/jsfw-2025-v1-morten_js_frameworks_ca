import { ShoppingCart, Store } from "lucide-react";
import { Link } from "react-router";
import { useCart } from "../context/CartContext";

// The cart icon will be displayed in our header and we need to display the total number of items that our user
// currently have in the cart. Therefore we extract getAllitems from the useCart function.
// when items in the cart is above 0, we display a little text on the icon itself indicating how many products.
export function Header() {
  const { getTotalItems } = useCart();
  const totalItems = getTotalItems();

  return (
    <header className="sticky top-0 z-50 w-full bg-white border-b shadow-sm">
      <div className="max-w-6xl px-4 mx-auto">
        <div className="flex items-center justify-between h-16">
          <Link
            to="/"
            className="flex items-center gap-2 text-xl font-semibold text-gray-900"
          >
            <Store className="w-6 h-6" />
            <span className="hidden sm:inline">ShopHub</span>
          </Link>

          <nav className="flex items-center gap-6 text-sm font-medium text-gray-700">
            <Link
              to="/"
              className="text-lg transition-colors hover:text-blue-600"
            >
              Home
            </Link>

            <Link
              to="/contact"
              className="text-lg transition-colors hover:text-blue-600"
            >
              Contact
            </Link>
          </nav>

          <Link
            to="/cart"
            className="relative flex items-center gap-2 px-4 py-2 text-white transition bg-blue-600 rounded-lg hover:bg-blue-700"
          >
            <ShoppingCart className="w-5 h-5" />
            <span className="hidden sm:inline">Cart</span>

            {totalItems > 0 && (
              <span className="absolute flex items-center justify-center w-6 h-6 text-xs font-bold text-white bg-red-500 rounded-full -top-2 -right-2">
                {totalItems}
              </span>
            )}
          </Link>
        </div>
      </div>
    </header>
  );
}
