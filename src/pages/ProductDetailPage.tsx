import { useEffect, useState } from "react";
import { useParams, Link } from "react-router";
import { fetchProductById } from "../api/products";
import type { Product } from "../types/Product";
import { useCart } from "../context/CartContext";
import { Star, ShoppingCart, ArrowLeft, Check } from "lucide-react";

import { Loader2 } from "lucide-react";

// When we click on a product we need to fetch the ID from the url.
// on smaller screens use a grid with only 1 colum, on larger screens use 2.

export function ProductDetailPage() {
  const { id } = useParams();
  const { addToCart } = useCart();
  const [product, setProduct] = useState<Product | null>(null);
  const [addedTocart, setAddedToCart] = useState(false);

  useEffect(() => {
    async function loadProduct() {
      if (!id) return;
      try {
        const data = await fetchProductById(id);
        setProduct(data);
      } catch (error) {
        console.warn("An unexpected error occured", error);
      }
    }
    loadProduct();
  }, [id]);

  if (!product) {
    return <div>No product to display</div>;
  }

  // I want to ensure users dont accidentally add to cart multiple times by mistake,
  // so we disable the button for 1 second after clicking it. After 1 second it reverts back to normal
  const handleAddToCart = () => {
    if (product) {
      addToCart(product);
      setAddedToCart(true);
      setTimeout(() => setAddedToCart(false), 1000);
    }
  };

  const hasDiscountedPrice = product.price > product.discountedPrice;
  const discountedPricePercentage = hasDiscountedPrice
    ? Math.round(
        ((product.price - product.discountedPrice) / product.price) * 100,
      )
    : 0;

  const hasTags = product.tags.length > 0;
  const hasReviews = product.reviews.length > 0;
  return (
    <div className="container px-4 py-8 mx-auto sm:px-6 lg:px-8">
      <div className="grid grid-cols-1 gap-8 p-5 lg:grid-cols-2">
        <div className="relative overflow-hidden bg-gray-100 rounded-lg aspect-square">
          <img
            src={product.image.url}
            alt={product.image.alt}
            className="object-cover w-full h-full"
          />
          {hasDiscountedPrice && (
            <span className="absolute p-0.5 rounded-full px-5 text-md text-white bg-green-500 top-3 right-3">
              {discountedPricePercentage}%
            </span>
          )}
        </div>
        <div className="flex flex-col gap-5">
          <h1 className="text-4xl font-semibold">{product.title}</h1>
          <div className="flex items-center gap-4">
            <div className="flex items-center">
              <Star className="text-yellow-500 fill-yellow-400" />
              <p>{product.rating}</p>
            </div>
            <div>
              ({product.reviews.length}{" "}
              {product.reviews.length === 1 ? "review" : "reviews"})
            </div>
          </div>

          <div>
            {hasDiscountedPrice ? (
              <div className="flex items-center gap-10">
                <p className="text-2xl font-semibold">
                  {product.discountedPrice} kr
                </p>
                <p className="text-xl line-through">{product.price} kr</p>
              </div>
            ) : (
              <p>{product.price}</p>
            )}
          </div>
          <p>{product.description}</p>
          {hasTags && (
            <div className="flex gap-3">
              {product.tags.map((tag, index) => (
                <span
                  key={index}
                  className="px-3 py-1 text-sm text-gray-700 bg-gray-200 rounded-full"
                >
                  {tag}
                </span>
              ))}
            </div>
          )}
          <button
            onClick={handleAddToCart}
            disabled={addedTocart}
            className="flex items-center justify-center gap-3 p-4 font-bold text-white bg-blue-600 rounded-lg hover:bg-blue-400"
          >
            {addedTocart ? (
              <>
                <Check />
                Added to cart
              </>
            ) : (
              <>
                <ShoppingCart className="w-5 h-5" />
                Add to Cart{" "}
              </>
            )}
          </button>
        </div>
      </div>
      <div>
        <div className="p-5 border-t">
          <h1 className="text-3xl font-semibold">Customer reviews</h1>
          {hasReviews ? (
            product.reviews.map((review) => (
              <div
                key={review.id}
                className="flex flex-col py-5 mt-5 bg-white rounded-md shadow-md"
              >
                <div className="flex flex-col gap-3 px-5">
                  <div className="flex justify-between">
                    <p className="font-semibold">{review.username}</p>
                    <div className="flex items-center justify-center gap-2">
                      <Star className="text-yellow-500 fill-yellow-400" />
                      <p>{review.rating.toFixed(1)}</p>
                    </div>
                  </div>
                  <p>{review.description}</p>
                </div>
              </div>
            ))
          ) : (
            <p>No reviews for this product yet...</p>
          )}
        </div>
      </div>
    </div>
  );
}
