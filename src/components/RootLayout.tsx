import { Outlet } from "react-router";
import { Header } from "./Header";

// This is what we will display on every page.
// It contains the header and footer that show on every page,
// and a placeholder (<Outlet />) where the content of each route will appear.
// For instance:
//    <main className="flex-1">
//        <HomePage />
//      </main>
export function RootLayout() {
  return (
    <div className="flex flex-col min-h-screen bg-gray-50">
      <Header />

      <main className="flex-1">
        <Outlet />
      </main>

      <footer className="py-8 mt-12 bg-white border-t">
        <div className="container px-4 mx-auto sm:px-6 lg:px-8">
          <p className="text-center text-gray-600">
            © 2026 ShopHub. All rights reserved.
          </p>
        </div>
      </footer>
    </div>
  );
}
