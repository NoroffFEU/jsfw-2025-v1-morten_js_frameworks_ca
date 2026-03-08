import { Star } from "lucide-react";
import { Link } from "react-router";
import type { Product } from "../types/Product";

interface ProductCardProps {
  product: Product;
}

export function ProductCard({ product }: ProductCardProps) {
  const hasDiscountedPrice = product.price > product.discountedPrice;
  const discountedPricePercentage = hasDiscountedPrice
    ? Math.round(
        ((product.price - product.discountedPrice) / product.price) * 100,
      )
    : 0;
  return (
    // To only scale the image when hovering the div, we have to make the parent div into a group.
    <div className="overflow-hidden bg-white rounded-lg shadow-md hover:shadow-lg group">
      <Link to={`/product/${product.id}`}>
        <div className="relative">
          <img
            src={product.image.url}
            alt={product.image.alt}
            className="object-cover transition-transform rounded-t-lg aspect-square group-hover:scale-101"
          />
          {hasDiscountedPrice && (
            <span className="absolute p-0.5 rounded-full px-3 text-sm text-white bg-green-500 top-2 right-2">
              {discountedPricePercentage} %
            </span>
          )}
        </div>
        <div className="flex flex-col gap-3 p-3">
          <h1 className="text-lg font-normal">{product.title}</h1>
          <div className="flex items-center gap-1">
            <Star className="text-yellow-500 fill-yellow-400" />
            <p className="text-sm">{product.rating.toFixed(1)}</p>
          </div>
          {hasDiscountedPrice ? (
            <>
              <div className="flex gap-2">
                <p className="font-semibold">{product.discountedPrice} kr</p>
                <p className="text-gray-500 line-through">{product.price} kr</p>
              </div>
            </>
          ) : (
            <p>{product.price} kr</p>
          )}
        </div>
      </Link>
    </div>
  );
}
