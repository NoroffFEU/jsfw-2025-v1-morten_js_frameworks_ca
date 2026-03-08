import { RouterProvider } from "react-router";
import { router } from "./routes";
import { ShoppingCartProvider } from "./context/CartContext";

export default function App() {
  return (
    <ShoppingCartProvider>
      <RouterProvider router={router} />
    </ShoppingCartProvider>
  );
}
