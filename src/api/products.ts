import type { Product } from "../types/Product";

const API_URL = "https://v2.api.noroff.dev/online-shop";

export async function fetchProducts(): Promise<Product[]> {
  const response = await fetch(`${API_URL}`);

  if (!response.ok) {
    throw new Error("Failed to fetch products");
  }

  const data = await response.json();
  return data.data;
}

export async function fetchProductById(id: string): Promise<Product | null> {
  try {
    const response = await fetch(`${API_URL}/${id}`);
    if (!response.ok) {
      throw new Error("Failed to fetch product");
    }
    const data = await response.json();
    return data.data;
  } catch (error) {
    console.error("Error fetching product, using mock data:", error);
    return null;
  }
}
