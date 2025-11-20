export interface Product {
  id: string;
  name: string;
  category: string;
  tags: string[];
  price: number;
  image: string;
  images: string[];
  inStock: boolean;
  popularity: number;
  shades?: string[];
  sizes?: string[];
  virtual_try_on?: boolean;
  aisle?: string;
}

export const mockProducts: Product[] = [
  {
    id: "1",
    name: "Hydrating Moisturizer",
    category: "Skincare",
    tags: ["moisturizer", "hydrating", "SPF"],
    price: 45.99,
    image: "https://images.unsplash.com/photo-1556228578-8c89e6adf883?w=400&h=400&fit=crop",
    images: ["https://images.unsplash.com/photo-1556228578-8c89e6adf883?w=400&h=400&fit=crop"],
    inStock: true,
    popularity: 95,
    virtual_try_on: false,
    aisle: "A1",
  },
  {
    id: "2",
    name: "Gentle Facial Cleanser",
    category: "Skincare",
    tags: ["cleanser", "gentle", "daily"],
    price: 28.99,
    image: "https://images.unsplash.com/photo-1556228578-1f4a8c4b9d3a?w=400&h=400&fit=crop",
    images: ["https://images.unsplash.com/photo-1556228578-1f4a8c4b9d3a?w=400&h=400&fit=crop"],
    inStock: true,
    popularity: 88,
    virtual_try_on: false,
    aisle: "A2",
  },
  {
    id: "3",
    name: "SPF 50 Sunscreen",
    category: "Skincare",
    tags: ["SPF", "sun-protection", "daily"],
    price: 35.99,
    image: "https://images.unsplash.com/photo-1520763185298-1b434c919afe?w=400&h=400&fit=crop",
    images: ["https://images.unsplash.com/photo-1520763185298-1b434c919afe?w=400&h=400&fit=crop"],
    inStock: true,
    popularity: 92,
    virtual_try_on: false,
    aisle: "A3",
  },
  {
    id: "4",
    name: "Liquid Foundation",
    category: "Makeup",
    tags: ["foundation", "liquid", "full-coverage"],
    price: 39.99,
    image: "https://images.unsplash.com/photo-1565958011504-98d48d8b0bec?w=400&h=400&fit=crop",
    images: ["https://images.unsplash.com/photo-1565958011504-98d48d8b0bec?w=400&h=400&fit=crop"],
    inStock: true,
    popularity: 85,
    shades: ["Fair", "Light", "Medium", "Dark"],
    virtual_try_on: true,
    aisle: "B1",
  },
  {
    id: "5",
    name: "Matte Lipstick",
    category: "Makeup",
    tags: ["lipstick", "matte", "bold"],
    price: 22.99,
    image: "https://images.unsplash.com/photo-1571875257727-256c39da7aae?w=400&h=400&fit=crop",
    images: ["https://images.unsplash.com/photo-1571875257727-256c39da7aae?w=400&h=400&fit=crop"],
    inStock: true,
    popularity: 79,
    shades: ["Red", "Berry", "Nude", "Pink"],
    virtual_try_on: true,
    aisle: "B2",
  },
  {
    id: "6",
    name: "Volume Mascara",
    category: "Makeup",
    tags: ["mascara", "volume", "long-lasting"],
    price: 18.99,
    image: "https://images.unsplash.com/photo-1606729175091-7e8d6f92e538?w=400&h=400&fit=crop",
    images: ["https://images.unsplash.com/photo-1606729175091-7e8d6f92e538?w=400&h=400&fit=crop"],
    inStock: true,
    popularity: 81,
    virtual_try_on: true,
    aisle: "B3",
  },
  {
    id: "7",
    name: "Argan Oil Hair Serum",
    category: "Hair Care",
    tags: ["oil", "serum", "hydrating"],
    price: 32.99,
    image: "https://images.unsplash.com/photo-1599643478518-a784e5dc4c8f?w=400&h=400&fit=crop",
    images: ["https://images.unsplash.com/photo-1599643478518-a784e5dc4c8f?w=400&h=400&fit=crop"],
    inStock: true,
    popularity: 77,
    virtual_try_on: false,
    aisle: "C1",
  },
  {
    id: "8",
    name: "Volumizing Shampoo",
    category: "Hair Care",
    tags: ["shampoo", "volume", "daily"],
    price: 24.99,
    image: "https://images.unsplash.com/photo-1585110396000-c9ffd4e4b308?w=400&h=400&fit=crop",
    images: ["https://images.unsplash.com/photo-1585110396000-c9ffd4e4b308?w=400&h=400&fit=crop"],
    inStock: true,
    popularity: 73,
    virtual_try_on: false,
    aisle: "C2",
  },
  {
    id: "9",
    name: "Eye Cream",
    category: "Skincare",
    tags: ["eye-care", "anti-aging", "hydrating"],
    price: 52.99,
    image: "https://images.unsplash.com/photo-1556228578-8c89e6adf883?w=400&h=400&fit=crop",
    images: ["https://images.unsplash.com/photo-1556228578-8c89e6adf883?w=400&h=400&fit=crop"],
    inStock: true,
    popularity: 71,
    virtual_try_on: false,
    aisle: "A4",
  },
  {
    id: "10",
    name: "Face Serum",
    category: "Skincare",
    tags: ["serum", "anti-aging", "hydrating"],
    price: 48.99,
    image: "https://images.unsplash.com/photo-1556228578-8c89e6adf883?w=400&h=400&fit=crop",
    images: ["https://images.unsplash.com/photo-1556228578-8c89e6adf883?w=400&h=400&fit=crop"],
    inStock: true,
    popularity: 86,
    virtual_try_on: false,
    aisle: "A5",
  },
];

export const categories = ["Skincare", "Makeup", "Hair Care", "Fragrance"];

export function getTopTagsForCategory(category: string, limit: number = 5): string[] {
  const products = mockProducts.filter((p) => p.category === category);
  const tagCount: Record<string, number> = {};

  products.forEach((p) => {
    p.tags.forEach((tag) => {
      tagCount[tag] = (tagCount[tag] || 0) + 1;
    });
  });

  return Object.entries(tagCount)
    .sort(([, a], [, b]) => b - a)
    .slice(0, limit)
    .map(([tag]) => tag);
}

export function searchProducts(query: string): Product[] {
  const lowerQuery = query.toLowerCase();
  return mockProducts.filter(
    (p) =>
      p.name.toLowerCase().includes(lowerQuery) ||
      p.category.toLowerCase().includes(lowerQuery) ||
      p.tags.some((t) => t.toLowerCase().includes(lowerQuery))
  );
}

export function filterByTag(tag: string): Product[] {
  return mockProducts.filter((p) => p.tags.includes(tag));
}

export function getRandomProducts(count: number): Product[] {
  const shuffled = [...mockProducts].sort(() => Math.random() - 0.5);
  return shuffled.slice(0, count);
}
