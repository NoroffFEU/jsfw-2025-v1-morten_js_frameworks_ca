import { RouterProvider } from "react-router";
import { router } from "./routes";
import { ShoppingCartProvider } from "./context/CartContext";

// The App component is the root of our React application.
// We wrap the entire app in ShoppingCartProvider so that any component
// can access the cart state (add/remove items, get totals, etc.).
// RouterProvider takes our router configuration and renders the correct
// page based on the URL. This connects the layout, pages, and routes
// so navigation works across the app.

export default function App() {
  return (
    <ShoppingCartProvider>
      <RouterProvider router={router} />
    </ShoppingCartProvider>
  );
}
