import type { ProductsResponse, Category, UsersResponse, Cart, Product, User } from "./types";

const BASE_URL = "https://dummyjson.com";

export async function fetchProducts(limit = 100): Promise<Product[]> {
  const res = await fetch(`${BASE_URL}/products?limit=${limit}`);
  if (!res.ok) throw new Error("Failed to fetch products");
  const data: ProductsResponse = await res.json();
  return data.products;
}

export async function fetchProduct(id: number): Promise<Product> {
  const res = await fetch(`${BASE_URL}/products/${id}`);
  if (!res.ok) throw new Error("Failed to fetch product");
  return res.json();
}

export async function fetchCategories(): Promise<Category[]> {
  const res = await fetch(`${BASE_URL}/products/categories`);
  if (!res.ok) throw new Error("Failed to fetch categories");
  return res.json();
}

export async function fetchUsers(limit = 30): Promise<User[]> {
  const res = await fetch(`${BASE_URL}/users?limit=${limit}`);
  if (!res.ok) throw new Error("Failed to fetch users");
  const data: UsersResponse = await res.json();
  return data.users;
}

export async function fetchCarts(): Promise<Cart[]> {
  const res = await fetch(`${BASE_URL}/carts?limit=10`);
  if (!res.ok) throw new Error("Failed to fetch carts");
  const data = await res.json();
  return data.carts;
}

export async function fetchFeaturedProducts(): Promise<Product[]> {
  const res = await fetch(`${BASE_URL}/products?limit=20&sortBy=rating&order=desc`);
  if (!res.ok) throw new Error("Failed to fetch featured products");
  const data: ProductsResponse = await res.json();
  return data.products;
}
