import { useCart } from "../context/CartContext";
import { useEffect } from "react";
import { Check } from "lucide-react";

// Here useEffect tells react to invoke clearCart when the page renders. We set [] as a depency to run once when the page loads.
// If we left that out we would run into an infinite loop.
export function CheckoutPage() {
  const { clearCart } = useCart();

  useEffect(() => {
    clearCart();
  }, []);

  return (
    <div className="flex flex-col items-center justify-center min-h-screen px-4 text-center bg-gray-50">
      <div className="w-full max-w-md p-10 bg-white shadow-lg rounded-xl">
        <div className="flex flex-col items-center gap-4">
          <Check className="font-bold text-green-500 border border-black rounded-full size-20" />
          <h1 className="text-3xl font-semibold text-gray-900">
            Order Confirmed!
          </h1>
          <p className="text-gray-700">
            Thank you for your purchase. Your items are on the way!
          </p>

          <p className="text-sm text-gray-500">
            An email confirmation has been sent to you.
          </p>

          <div className="flex flex-col w-full gap-3 mt-6">
            <a
              href="/"
              className="block w-full py-2 text-white transition bg-blue-600 rounded-lg hover:bg-blue-700"
            >
              Continue Shopping
            </a>
            <a
              href=""
              className="block w-full py-2 transition border border-gray-300 rounded-lg hover:bg-gray-100"
            >
              View My Orders
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
