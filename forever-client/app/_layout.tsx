import { Stack } from "expo-router";
import "@/global.css";
import { CartProvider } from "@/context/cart-context";
import { WishlistProvider } from "@/context/wishlist-context";
import { GestureHandlerRootView } from "react-native-gesture-handler";

export default function RootLayout() {
  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <CartProvider>
        <WishlistProvider>
          <Stack screenOptions={{ headerShown: false }} />
        </WishlistProvider>
      </CartProvider>
    </GestureHandlerRootView>
  );
}
