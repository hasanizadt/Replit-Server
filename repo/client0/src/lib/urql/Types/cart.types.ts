export interface CartItem {
  id: string;
  quantity: number;
  product: {
    id: string;
    name: string;
    slug: string;
    price: number;
    salePrice?: number;
    stock: number;
    image: string;
  };
}

export interface Cart {
  id: string;
  items: CartItem[];
  total: number;
  subtotal: number;
  discount: number;
  shipping: number;
}

export interface AddToCartInput {
  productId: string;
  quantity: number;
}

export interface UpdateCartInput {
  itemId: string;
  quantity: number;
}