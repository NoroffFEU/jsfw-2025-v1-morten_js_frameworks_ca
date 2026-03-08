import { Link } from "react-router";
import { useCart } from "../context/CartContext";
import { useEffect } from "react";

// Here useEffect tells react to invoke clearCart when the page renders. We set [] as a depency to run once when the page loads.
export function CheckoutPage() {
  const { clearCart } = useCart();

  useEffect(() => {
    clearCart();
  }, []);

  return (
    <p>Thank you for your purchase. Products are on route to your location!</p>
  );
}
