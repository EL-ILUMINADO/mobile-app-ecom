import { BANNERS, dummyProducts } from "@/assets/assets";
import CategoryItem from "@/components/category-item";
import Header from "@/components/header";
import ProductCard from "@/components/product-card";
import { CATEGORIES } from "@/constants";
import { Product } from "@/constants/types";
import { useRouter } from "expo-router";
import React, { useEffect } from "react";
import {
  ActivityIndicator,
  Dimensions,
  Image,
  ScrollView,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

const { width } = Dimensions.get("window");

export default function Home() {
  const router = useRouter();
  const [activeBannerIndex, setActiveBannerIndex] = React.useState(0);
  const [products, setProducts] = React.useState<Product[]>([]);
  const [loading, setLoading] = React.useState(true);

  const categories = [{ id: "all", name: "All", icon: "grid" }, ...CATEGORIES];

  const fetchProducts = async () => {
    setProducts(dummyProducts);
    setLoading(false);
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  return (
    <SafeAreaView className="flex-1" edges={["top"]}>
      <Header title="Forever" showMenu showCart showSearch showLogo />

      <ScrollView className="flex-1 px-4" showsVerticalScrollIndicator={false}>
        {/* Banner Slider */}
        <View className="mb-6">
          <ScrollView
            className="w-full h-48 rounded-xl"
            scrollEventThrottle={16}
            horizontal
            pagingEnabled
            showsHorizontalScrollIndicator={false}
            onScroll={(event) => {
              const slide = Math.ceil(
                event.nativeEvent.contentOffset.x /
                  event.nativeEvent.layoutMeasurement.width,
              );
              if (slide !== activeBannerIndex) {
                setActiveBannerIndex(slide);
              }
            }}
          >
            {BANNERS.map((banner, idx) => (
              <View
                key={idx}
                className="relative w-full h-48 bg-gray-200 overflow-hidden"
                style={{
                  width: width - 32, // Full width minus horizontal padding
                }}
              >
                <Image
                  source={{ uri: banner.image }}
                  className="w-full h-full"
                  resizeMode="cover"
                />

                {/* OVERLAY */}
                <View className="absolute inset-0 bg-black/40" />

                <View className="absolute bottom-4 left-4 z-10">
                  <Text className="text-white text-2xl font-bold">
                    {banner.title}
                  </Text>
                  <Text className="text-white text-sm font-medium">
                    {banner.subtitle}
                  </Text>
                  <TouchableOpacity className="mt-2 bg-white px-4 py-2 rounded-full self-start">
                    <Text className="text-primary font-bold text-xs">
                      Get Now
                    </Text>
                  </TouchableOpacity>
                </View>
              </View>
            ))}
          </ScrollView>
          {/* PAGINATION DOTS */}
          <View className="flex-row justify-center mt-3 gap-2">
            {BANNERS.map((_, idx) => (
              <View
                key={idx}
                className={`h-2 rounded-full ${idx === activeBannerIndex ? "w-6 bg-primary" : "w-2 bg-gray-400"}`}
              />
            ))}
          </View>
        </View>

        {/* CATEGORIES */}
        <View className="mb-6">
          <View className="flex-row justify-between items-center mb-4">
            <Text className="text-xl font-bold text-primary">Categories</Text>
          </View>

          {/* LIST */}
          <ScrollView horizontal showsHorizontalScrollIndicator={false}>
            {categories.map((category: any) => (
              <CategoryItem
                key={category.id}
                item={category}
                isSelected={false}
                onPress={() =>
                  router.push({
                    pathname: "/shop",
                    params: {
                      category: category.id === "all" ? "" : category.name,
                    },
                  })
                }
              />
            ))}
          </ScrollView>
        </View>

        {/* PRODUCTS - POPULAR PRODUCTS */}
        <View className="mb-8">
          <View className="flex-row justify-between items-center mb-4">
            <Text className="text-xl font-bold text-primary">Popular</Text>
            <TouchableOpacity onPress={() => router.push("/shop")}>
              <Text className="text-secondary text-sm">See All</Text>
            </TouchableOpacity>
          </View>
          {loading ? (
            <ActivityIndicator size="large" />
          ) : (
            <View className="flex-row flex-wrap justify-between">
              {products.slice(0, 6).map((product) => (
                <ProductCard key={product._id} product={product} />
              ))}
            </View>
          )}
        </View>

        {/* NEWSLETTER CTA */}
        <View className="bg-gray-100 p-6 rounded-2xl mb-20 items-center">
          <Text className="text-xl font-bold text-primary mb-2">
            Join the Revolution
          </Text>
          <Text className="text-secondary text-sm text-center mb-4">
            Subscribe to our newsletter and get 10% off on your first purchase.
          </Text>
          <TouchableOpacity className="bg-primary px-4 py-2 rounded-full items-center">
            <Text className="text-white font-bold text-sm">Subscribe</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}
