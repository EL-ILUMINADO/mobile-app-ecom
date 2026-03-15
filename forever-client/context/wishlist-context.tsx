import { dummyWishlist } from "@/assets/assets";
import { Product, WishlistContextType } from "@/constants/types";
import React, { createContext, useEffect } from "react";

const wishlistContext = createContext<WishlistContextType | undefined>(
  undefined,
);

export function WishlistProvider({ children }: { children: React.ReactNode }) {
  const [wishlist, setWishlist] = React.useState<Product[]>([]);
  const [loading, setLoading] = React.useState(false);

  const fetchWishlist = async () => {
    setLoading(true);
    setWishlist(dummyWishlist);
    setLoading(false);
  };

  const toggleWishlist = async (product: Product) => {
    const exists = wishlist.find((p) => p._id === product._id);
    setWishlist((prev) => {
      if (exists) {
        return prev.filter((p) => p._id !== product._id);
      } else {
        return [...prev, product];
      }
    });
  };

  const isInWishlist = (productId: string) => {
    return wishlist.some((p) => p._id === productId);
  };

  useEffect(() => {
    fetchWishlist();
  }, []);

  return (
    <wishlistContext.Provider
      value={{ wishlist, loading, toggleWishlist, isInWishlist }}
    >
      {children}
    </wishlistContext.Provider>
  );
}

export default function useWishList() {
  const context = React.useContext(wishlistContext);
  if (context === undefined) {
    throw new Error("useWishList must be used within a WishlistProvider");
  }
  return context;
}
