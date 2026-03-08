import { Link } from "react-router";
import { useCart } from "../context/CartContext";
import { Minus, Plus, Trash2 } from "lucide-react";

// This is the cart page. This function will allow us to handle adding and removing items from cart

// same structure here. By destrucutring we are creating functions that we can reuse from useCart().
export function CartPage() {
  const { cart, removeFromCart, updateQuantity, getTotalPrice } = useCart();

  if (cart.length === 0) {
    return (
      <div>
        <h1>Cart is empty. Try shopping!</h1>
      </div>
    );
  }

  const hasDiscountedPrice = cart.map(
    (product) => product.product.price < product.product.discountedPrice,
  );
  // const discountPercentage = hasDiscount
  //   ? Math.round(
  //       ((product.price - product.discountedPrice) / product.price) * 100,
  //     )
  //   : 0;

  return (
    <div className="container">
      <div className="grid grid-cols-3 p-4">
        {/* /// col 1  the product details starts here*/}
        <div className="flex flex-col col-span-2 gap-6 p-4">
          {cart.map((item) => (
            <div
              key={item.product.id}
              className="grid grid-cols-[auto_1fr] gap-10 bg-white p-4 rounded-lg shadow-sm"
            >
              <div>
                <img
                  className="object-cover rounded-sm w-30 h-30"
                  src={item.product.image.url}
                  alt={item.product.image.alt}
                />
              </div>
              <div className="flex flex-col gap-1.5">
                <h1>{item.product.title}</h1>
                {hasDiscountedPrice ? (
                  <>
                    <div className="flex flex-col ">
                      <p className="line-through ">{item.product.price} NOK</p>
                      <p>{item.product.discountedPrice} NOK</p>
                    </div>
                  </>
                ) : (
                  <p>{item.product.price} NOK</p>
                )}
                <div className="flex justify-between">
                  <div className="flex items-center gap-3">
                    <button
                      className="flex items-center justify-center w-8 h-8 text-gray-600 transition-colors border border-gray-300 rounded-md hover:bg-gray-100"
                      onClick={() =>
                        updateQuantity(item.product.id, item.quantity - 1)
                      }
                    >
                      <Minus />
                    </button>
                    <p>{item.quantity}</p>
                    <button
                      className="flex items-center justify-center w-8 h-8 text-gray-600 transition-colors border border-gray-300 rounded-md hover:bg-gray-100"
                      onClick={() =>
                        updateQuantity(item.product.id, item.quantity + 1)
                      }
                    >
                      <Plus />
                    </button>
                  </div>

                  <button
                    className="flex items-center gap-1 font-medium text-red-500 transition cursor-pointer hover:text-red-800"
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
        {/* /// col 2  order summary starts here*/}
        <div className="self-start col-span-1 p-6 bg-white rounded-lg shadow-sm">
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
                  <p>
                    {item.product.title} x {item.quantity}
                  </p>

                  {hasDiscountedPrice ? (
                    <p>
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
