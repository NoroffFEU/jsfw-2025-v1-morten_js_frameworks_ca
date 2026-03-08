import { Link } from "react-router";
import { useCart } from "../context/CartContext";
import { Minus, Plus, Trash2 } from "lucide-react";

// This is the cart page. This function will allow us to handle adding and removing items from cart

// same structure here. By destrucutring we are creating functions that we can reuse from useCart().
export function CartPage() {
  const { cart, removeFromCart, updateQuantity, getTotalPrice } = useCart();

  if (cart.length === 0) {
    return (
      <div className="container mx-auto mt-25">
        <h1 className="text-2xl text-center">
          The shopping cart is empty. Try adding some products!
        </h1>
      </div>
    );
  }

  const hasDiscountedPrice = cart.map(
    (product) => product.product.price < product.product.discountedPrice,
  );

  return (
    <div className="container">
      <div className="flex flex-wrap gap-6 p-4 sm:grid sm:grid-cols-3">
        {/* /// For my clarity: col 1  the product details starts here*/}
        <div className="flex flex-col w-full gap-6 p-4 sm:col-span-2">
          {cart.map((item) => (
            <div
              key={item.product.id}
              className="grid gap-6 p-4 bg-white rounded-lg shadow-sm sm:grid-cols-[auto_1fr]"
            >
              <div className="flex justify-center sm:justify-start">
                <img
                  className="object-cover rounded-md w-28 h-28 sm:w-30 sm:h-30"
                  src={item.product.image.url}
                  alt={item.product.image.alt}
                />
              </div>

              <div className="flex flex-col items-center gap-2 sm:items-start">
                <h2 className="font-semibold">{item.product.title}</h2>

                {hasDiscountedPrice ? (
                  <div>
                    <p className="text-sm text-gray-500 line-through">
                      {item.product.price} NOK
                    </p>
                    <p className="font-medium">
                      {item.product.discountedPrice} NOK
                    </p>
                  </div>
                ) : (
                  <p>{item.product.price} NOK</p>
                )}

                <div className="flex flex-col gap-4 mt-2 sm:flex-row sm:items-center sm:justify-between">
                  <div className="flex items-center gap-3">
                    <button
                      className="flex items-center justify-center w-8 h-8 text-gray-600 transition border border-gray-300 rounded-md hover:bg-gray-100"
                      onClick={() =>
                        updateQuantity(item.product.id, item.quantity - 1)
                      }
                    >
                      <Minus />
                    </button>

                    <p>{item.quantity}</p>

                    <button
                      className="flex items-center justify-center w-8 h-8 text-gray-600 transition border border-gray-300 rounded-md hover:bg-gray-100"
                      onClick={() =>
                        updateQuantity(item.product.id, item.quantity + 1)
                      }
                    >
                      <Plus />
                    </button>
                  </div>

                  <button
                    className="flex items-center gap-1 font-medium text-red-500 transition hover:text-red-800"
                    onClick={() => removeFromCart(item.product.id)}
                  >
                    Remove
                    <Trash2 />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
        {/* /// For my clarity: col 2  order summary starts here*/}
        <div className="self-start w-full p-6 bg-white rounded-lg shadow-sm sm:col-span-1">
          <h2 className="mb-6 text-2xl font-semibold text-center">
            Order summary
          </h2>

          <div className="flex flex-col gap-6">
            <div className="flex flex-col gap-3">
              {cart.map((item) => (
                <div
                  key={item.product.id}
                  className="flex justify-between text-sm"
                >
                  <p className="lg:text-lg">
                    {item.product.title} x {item.quantity}
                  </p>

                  {hasDiscountedPrice ? (
                    <p className="lg:text-lg">
                      {(item.product.discountedPrice * item.quantity).toFixed(
                        2,
                      )}{" "}
                      kr
                    </p>
                  ) : (
                    <p>{(item.product.price * item.quantity).toFixed(2)} kr</p>
                  )}
                </div>
              ))}
            </div>

            <div className="flex items-center justify-between pt-4 text-lg font-semibold border-t">
              <p>Total</p>
              <p>{getTotalPrice().toFixed(2)} kr</p>
            </div>

            <div className="flex flex-col gap-4 pt-2">
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
