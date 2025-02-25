import React from "react";
import { View, Text, TouchableOpacity, Image, StyleSheet } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { LinearGradient } from "expo-linear-gradient";
import { COLORS, SHADOW } from "../../../components/theme";

export default function FeaturedProducts() {
  const products = [
    {
      id: 1,
      name: "iPhone 14 Pro Max",
      price: "28.990.000đ",
      originalPrice: "32.990.000đ",
      image:
        "https://i.pinimg.com/736x/61/86/03/618603d1665a0d3d20cc29ab8aab2c0d.jpg",
      condition: "Như mới",
      location: "TP.HCM",
      rating: 4.8,
      sold: 126,
      discount: "-20%",
      verified: true,
    },
    {
      id: 2,
      name: "MacBook Pro M2",
      price: "42.990.000đ",
      originalPrice: "48.990.000đ",
      image:
        "https://i.pinimg.com/736x/eb/36/99/eb369990805c29991e933f2654cfe7b0.jpg",
      condition: "Mới 99%",
      location: "Hà Nội",
      rating: 4.9,
      sold: 84,
      discount: "-15%",
      verified: true,
    },
    {
      id: 3,
      name: 'iPad Pro M1 12.9"',
      price: "23.990.000đ",
      originalPrice: "27.990.000đ",
      image:
        "https://i.pinimg.com/736x/ee/c1/33/eec1335e35eb586f93010ad2fede2196.jpg",
      condition: "Mới 95%",
      location: "Đà Nẵng",
      rating: 4.7,
      sold: 93,
      discount: "-12%",
      verified: false,
    },
  ];

  const renderProductCard = (product) => (
    <TouchableOpacity
      key={product.id}
      style={styles.productCard}
      activeOpacity={0.95}
    >
      <View style={styles.imageContainer}>
        <Image source={{ uri: product.image }} style={styles.productImage} />

        {/* Discount Tag */}
        <LinearGradient
          colors={["#FF6B6B", "#FF8E8E"]}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 0 }}
          style={styles.discountTag}
        >
          <Text style={styles.discountText}>{product.discount}</Text>
        </LinearGradient>

        {/* Condition Badge */}
        <View style={styles.conditionBadge}>
          <Text style={styles.conditionText}>{product.condition}</Text>
        </View>

        {/* Favorite Button */}
        <TouchableOpacity style={styles.favoriteButton}>
          <Ionicons name="heart-outline" size={20} color="#FF4B4B" />
        </TouchableOpacity>
      </View>

      <View style={styles.contentContainer}>
        <View style={styles.titleRow}>
          <Text style={styles.productName} numberOfLines={2}>
            {product.name}
          </Text>
          {product.verified && (
            <Ionicons
              name="checkmark-circle"
              size={16}
              color={COLORS.primary}
            />
          )}
        </View>

        <View style={styles.priceContainer}>
          <Text style={styles.price}>{product.price}</Text>
          <Text style={styles.originalPrice}>{product.originalPrice}</Text>
        </View>

        <View style={styles.metaContainer}>
          <View style={styles.ratingContainer}>
            <Ionicons name="star" size={14} color="#FFD700" />
            <Text style={styles.ratingText}>{product.rating}</Text>
            <Text style={styles.soldText}>| Đã bán {product.sold}</Text>
          </View>
          <View style={styles.locationContainer}>
            <Ionicons name="location-outline" size={14} color="#666" />
            <Text style={styles.locationText}>{product.location}</Text>
          </View>
        </View>

        <TouchableOpacity style={styles.actionButton}>
          <Text style={styles.actionButtonText}>Xem chi tiết</Text>
          <Ionicons name="arrow-forward" size={16} color={COLORS.white} />
        </TouchableOpacity>
      </View>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <View style={styles.titleContainer}>
          <Text style={styles.title}>Sản phẩm nổi bật</Text>
          <View style={styles.badge}>
            <Text style={styles.badgeText}>HOT</Text>
          </View>
        </View>
        <TouchableOpacity style={styles.viewAllButton}>
          <Text style={styles.viewAllText}>Xem tất cả</Text>
          <Ionicons name="chevron-forward" size={16} color={COLORS.primary} />
        </TouchableOpacity>
      </View>

      <View style={styles.productsGrid}>{products.map(renderProductCard)}</View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginVertical: 16,
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 16,
    marginBottom: 16,
  },
  titleContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
  title: {
    fontSize: 20,
    fontWeight: "700",
    color: "#1A1A1A",
    marginRight: 8,
  },
  badge: {
    backgroundColor: "#FF3B30",
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 12,
  },
  badgeText: {
    color: COLORS.white,
    fontSize: 12,
    fontWeight: "700",
  },
  viewAllButton: {
    flexDirection: "row",
    alignItems: "center",
  },
  viewAllText: {
    color: COLORS.primary,
    fontSize: 14,
    fontWeight: "600",
    marginRight: 4,
  },
  productsGrid: {
    paddingHorizontal: 12,
  },
  productCard: {
    backgroundColor: COLORS.white,
    borderRadius: 16,
    marginBottom: 16,
    ...SHADOW.medium,
  },
  imageContainer: {
    position: "relative",
    borderTopLeftRadius: 16,
    borderTopRightRadius: 16,
    overflow: "hidden",
  },
  productImage: {
    width: "100%",
    height: 200,
    resizeMode: "cover",
  },
  discountTag: {
    position: "absolute",
    top: 12,
    left: 12,
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 12,
  },
  discountText: {
    color: COLORS.white,
    fontSize: 12,
    fontWeight: "700",
  },
  conditionBadge: {
    position: "absolute",
    bottom: 12,
    left: 12,
    backgroundColor: "rgba(0,0,0,0.6)",
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 12,
  },
  conditionText: {
    color: COLORS.white,
    fontSize: 12,
    fontWeight: "500",
  },
  favoriteButton: {
    position: "absolute",
    top: 12,
    right: 12,
    backgroundColor: COLORS.white,
    padding: 8,
    borderRadius: 20,
    ...SHADOW.small,
  },
  contentContainer: {
    padding: 16,
  },
  titleRow: {
    flexDirection: "row",
    alignItems: "flex-start",
    marginBottom: 8,
  },
  productName: {
    flex: 1,
    fontSize: 16,
    fontWeight: "600",
    color: "#1A1A1A",
    marginRight: 4,
  },
  priceContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 8,
  },
  price: {
    fontSize: 18,
    fontWeight: "700",
    color: COLORS.primary,
    marginRight: 8,
  },
  originalPrice: {
    fontSize: 14,
    color: "#999",
    textDecorationLine: "line-through",
  },
  metaContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 12,
  },
  ratingContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
  ratingText: {
    fontSize: 14,
    fontWeight: "600",
    color: "#1A1A1A",
    marginLeft: 4,
    marginRight: 4,
  },
  soldText: {
    fontSize: 12,
    color: "#666",
  },
  locationContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
  locationText: {
    fontSize: 12,
    color: "#666",
    marginLeft: 4,
  },
  actionButton: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: COLORS.primary,
    paddingVertical: 10,
    borderRadius: 12,
    marginTop: 8,
  },
  actionButtonText: {
    color: COLORS.white,
    fontSize: 14,
    fontWeight: "600",
    marginRight: 4,
  },
});
