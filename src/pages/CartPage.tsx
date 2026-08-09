import { Link } from "react-router";
import { useCart } from "../context/CartContext";
import { Minus, Plus, Trash2 } from "lucide-react";

// This is the cart page. This function will allow us to handle adding and removing items from cart

// same structure here. By destrucutring we are creating functions that we can reuse from useCart().
export function CartPage() {
  const { cart, removeFromCart, updateQuantity, getTotalPrice } = useCart();

  if (cart.length === 0) {
    return (
      <div className="container px-4 py-16 mx-auto sm:px-6 lg:px-8">
        <h1 className="text-2xl text-center">
          The shopping cart is empty. Try adding some products!
        </h1>
      </div>
    );
  }

  return (
    <div className="container px-4 py-8 mx-auto sm:px-6 lg:px-8">
      <h1 className="mb-6 text-2xl font-semibold sm:text-3xl">Shopping cart</h1>

      <div className="grid gap-6 lg:grid-cols-3">
        <div className="flex flex-col gap-4 lg:col-span-2">
          {cart.map((item) => {
            const hasDiscount =
              item.product.price > item.product.discountedPrice;
            const unitPrice = hasDiscount
              ? item.product.discountedPrice
              : item.product.price;

            return (
              <div
                key={item.product.id}
                className="grid grid-cols-[5rem_1fr] gap-3 p-3 bg-white rounded-lg shadow-sm sm:grid-cols-[auto_1fr] sm:gap-4 sm:p-4"
              >
                <img
                  className="object-cover w-20 h-20 rounded-md sm:w-28 sm:h-28"
                  src={item.product.image.url}
                  alt={item.product.image.alt}
                />

                <div className="flex flex-col min-w-0 gap-2">
                  <h2 className="font-semibold leading-snug">
                    {item.product.title}
                  </h2>

                  {hasDiscount ? (
                    <div className="flex flex-wrap items-baseline gap-x-2">
                      <p className="text-sm text-gray-500 line-through">
                        {item.product.price} NOK
                      </p>
                      <p className="font-medium">{unitPrice} NOK</p>
                    </div>
                  ) : (
                    <p className="font-medium">{unitPrice} NOK</p>
                  )}

                  <div className="flex flex-wrap items-center gap-3 mt-auto">
                    <div className="flex items-center gap-2">
                      <button
                        className="flex items-center justify-center w-9 h-9 text-gray-600 transition border border-gray-300 rounded-md hover:bg-gray-100"
                        onClick={() =>
                          updateQuantity(item.product.id, item.quantity - 1)
                        }
                        aria-label="Decrease quantity"
                      >
                        <Minus className="size-4" />
                      </button>

                      <p className="w-6 text-center">{item.quantity}</p>

                      <button
                        className="flex items-center justify-center w-9 h-9 text-gray-600 transition border border-gray-300 rounded-md hover:bg-gray-100"
                        onClick={() =>
                          updateQuantity(item.product.id, item.quantity + 1)
                        }
                        aria-label="Increase quantity"
                      >
                        <Plus className="size-4" />
                      </button>
                    </div>

                    <button
                      className="flex items-center gap-1 text-sm font-medium text-red-500 transition hover:text-red-800"
                      onClick={() => removeFromCart(item.product.id)}
                    >
                      Remove
                      <Trash2 className="size-4" />
                    </button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        <div className="self-start w-full p-4 bg-white rounded-lg shadow-sm sm:p-6">
          <h2 className="mb-4 text-xl font-semibold sm:mb-6 sm:text-2xl">
            Order summary
          </h2>

          <div className="flex flex-col gap-6">
            <div className="flex flex-col gap-3">
              {cart.map((item) => {
                const linePrice =
                  (item.product.discountedPrice ?? item.product.price) *
                  item.quantity;

                return (
                  <div
                    key={item.product.id}
                    className="flex items-start justify-between gap-3 text-sm"
                  >
                    <p className="min-w-0 break-words sm:text-base">
                      {item.product.title} × {item.quantity}
                    </p>
                    <p className="shrink-0 sm:text-base">
                      {linePrice.toFixed(2)} kr
                    </p>
                  </div>
                );
              })}
            </div>

            <div className="flex items-center justify-between pt-4 text-lg font-semibold border-t">
              <p>Total</p>
              <p>{getTotalPrice().toFixed(2)} kr</p>
            </div>

            <div className="flex flex-col gap-3 pt-2">
              <Link to="/checkout">
                <button className="w-full p-3 font-semibold text-white transition bg-blue-600 rounded-lg hover:bg-blue-700">
                  Proceed to checkout
                </button>
              </Link>

              <Link to="/">
                <button className="w-full text-center text-blue-600 transition hover:text-blue-800">
                  Continue shopping
                </button>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
