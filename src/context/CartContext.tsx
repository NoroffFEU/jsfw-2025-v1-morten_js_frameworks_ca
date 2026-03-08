import { createContext, useContext, useState, type ReactNode } from "react";
import type { CartItem, Product } from "../types/Product";
import { ShoppingCart } from "lucide-react";

// void is used when we are not returning anything, but rather changing state
// Here we create an interface that defines how the shopping cart object should look like.
// When we are not returning anything, we use void, because we are only changing the state,
// but when we are returning something like the price or number we return a number

interface ShoppingCart {
  cart: CartItem[];
  addToCart: (product: Product) => void;
  removeFromCart: (productId: string) => void;
  updateQuantity: (productId: string, quantity: number) => void;
  clearCart: () => void;
  getTotalItems: () => number;
  getTotalPrice: () => number;
}

//create context lets us create a context that our components can use.
const ShoppingCartContext = createContext<ShoppingCart | undefined>(undefined);

//// this is the function where all the actions of the shopping cart is taken care of.
export function ShoppingCartProvider({ children }: { children: ReactNode }) {
  const [cart, setCart] = useState<CartItem[]>([]);

  // when we add to cart, we are ensure that the product we add mathces the Product type.
  // current value is the state of our cart before an item is added or removed.
  // first we check if the item we added already exists in our shopping cart.
  // if it does, we return item with its properties, but we add +1 in the quantity.
  // if the product does not exists then add the item itself. If we wrote quanity + 1 here, then
  // we would have increased the quantity for every item in the cart which is incorrect behaviour.

  const addToCart = (product: Product) => {
    setCart((currentValue) => {
      const existingItem = currentValue.find(
        (item) => item.product.id === product.id,
      );
      if (existingItem) {
        return currentValue.map((item) => {
          if (item.product.id === product.id) {
            return {
              ...item,
              quantity: item.quantity + 1,
            };
          } else {
            return item;
          }
        });
      }
      return [...currentValue, { product, quantity: 1 }];
    });
  };

  // When we remove from cart, we want to return a new filtered array containing all the products
  // except the one we just removed the item we just removed.
  const removeFromCart = (productId: string) => {
    setCart((currentValue) => {
      return currentValue.filter((item) => item.product.id !== productId);
    });
  };

  // If the quantity is smaller than or equal to 0, remove it from the cart, otherwise update the quantity.
  // if the item already exists then update only the quantity, else add the whole item.
  const updateQuantity = (productId: string, quantity: number) => {
    if (quantity <= 0) {
      removeFromCart(productId);
      return;
    } else {
      setCart((currentValue) =>
        currentValue.map((item) => {
          if (item.product.id === productId) {
            return { ...item, quantity };
          } else {
            return item;
          }
        }),
      );
    }
  };

  const clearCart = () => {
    setCart([]);
  };

  // here we use the reduce method, which takes the total + the item quanity and start the
  // count at 0.
  const getTotalItems = () => {
    return cart.reduce((total, item) => total + item.quantity, 0);
  };

  // same as above, only difference is that our increment is the price * quantity.
  // if there is a discount use that price, otherwise use the original price
  const getTotalPrice = () => {
    return cart.reduce(
      (total, item) =>
        total +
        (item.product.discountedPrice ?? item.product.price) * item.quantity,
      0,
    );
  };

  return (
    <ShoppingCartContext.Provider
      value={{
        cart,
        addToCart,
        removeFromCart,
        updateQuantity,
        clearCart,
        getTotalItems,
        getTotalPrice,
      }}
    >
      {children}
    </ShoppingCartContext.Provider>
  );
}

export function useCart() {
  const context = useContext(ShoppingCartContext);
  if (context === undefined) {
    throw new Error("useCart must be used within ShoppingCartProvider");
  }
  return context;
}
