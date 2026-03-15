import { dummyCart, dummyWishlist } from "@/assets/assets";
import { Product, WishlistContextType } from "@/constants/types";
import React, { createContext, useEffect } from "react";

export type CartItem = {
  id: string;
  product: Product[];
  productid: string;
  quantity: number;
  size: string;
  price: number;
};

type CartContextType = {
  cartItems: CartItem[];
  addToCart: (product: Product, size: string) => Promise<void>;
  removeFromCart: (itemId: string, size: string) => Promise<void>;
  updateQuantity: (
    itemId: string,
    quantity: number,
    size: string,
  ) => Promise<void>;
  clearCart: () => Promise<void>;
  cartTotal: number;
  itemCount: number;
  isLoading: boolean;
};

const CartContext = createContext<CartContextType | undefined>(undefined);

export function CartProvider({ children }: { children: React.ReactNode }) {
  const [cartItems, setCartItems] = React.useState<CartItem[]>([]);
  const [isLoading, setIsLoading] = React.useState(false);
  const [cartTotal, setCartTotal] = React.useState(0);

  const fetchCart = async () => {
    setIsLoading(true);
    const serverCart = dummyCart;
    const mappedItems: CartItem[] = serverCart.items.map((item: any) => ({
      id: item.product._id,
      productid: item.product._id,
      product: item.product,
      quantity: item.quantity,
      size: item?.size || "M",
      price: item.price,
    }));
    setCartItems(mappedItems);
    setCartTotal(serverCart.totalAmount);
    setIsLoading(false);
  };

  useEffect(() => {
    fetchCart();
  }, []);

  const addToCart = async (product: Product, size: string) => {};

  const removeFromCart = async (productId: string, size: string) => {};

  const updateQuantity = async (
    productId: string,
    quantity: number,
    size: string = "M",
  ) => {};

  const clearCart = async () => {};

  const itemCount = cartItems.reduce((sum, item) => sum + item.quantity, 0);

  return (
    <CartContext.Provider
      value={{
        cartItems,
        addToCart,
        removeFromCart,
        updateQuantity,
        clearCart,
        cartTotal,
        itemCount,
        isLoading,
      }}
    >
      {children}
    </CartContext.Provider>
  );
}

export default function useCart() {
  const context = React.useContext(CartContext);
  if (context === undefined) {
    throw new Error("useCart must be used within a CartProvider");
  }
  return context;
}
