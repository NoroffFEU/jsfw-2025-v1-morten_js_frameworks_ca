import { useState } from "react";
import { Link } from "react-router";
import type { Product } from "../types/Product";

// We are using the same pattern here of defining the shape of the props this component expects. We are searching throug
// an array of products. So the component must receive an array of Product objects.

interface SearchBarProps {
  products: Product[];
}

// Here we say that the props passed into our search function must follow the SearchBarProps interface.
export function SearchBar({ products }: SearchBarProps) {
  const [searchQuery, setSearchQuery] = useState("");

  const searchResults = products.filter((product) =>
    product.title.toLowerCase().includes(searchQuery.toLowerCase()),
  );

  return (
    <div className="relative w-full">
      <input
        type="text"
        placeholder="Search products..."
        value={searchQuery}
        onChange={(event) => setSearchQuery(event.target.value)}
        className="w-full p-3 border rounded-lg"
      />

      {searchQuery && (
        <div className="absolute z-50 w-full mt-1 overflow-y-auto bg-white border rounded-lg shadow-lg max-h-64">
          {searchResults.length === 0 ? (
            <p className="p-3 text-sm text-gray-500">No products found</p>
          ) : (
            searchResults.slice(0, 6).map((product) => (
              <Link
                key={product.id}
                to={`/product/${product.id}`}
                className="flex items-center gap-3 p-3 hover:bg-gray-100"
              >
                <img
                  src={product.image?.url}
                  alt={product.title}
                  className="object-cover w-8 h-8 rounded"
                />
                <span>{product.title}</span>
              </Link>
            ))
          )}
        </div>
      )}
    </div>
  );
}
