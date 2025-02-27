import React from "react";
import { View, Text, TouchableOpacity, Image, StyleSheet } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { LinearGradient } from "expo-linear-gradient";
import { COLORS, SHADOW } from "../../../components/theme";
import { useNavigation } from "@react-navigation/native";

export default function FeaturedProducts() {
  const navigation = useNavigation();

  const products = [
    {
      id: 1,
      name: "iPhone 14 Pro Max",
      price: "28.990.000đ",
      originalPrice: "32.990.000đ",
      image:
        "https://i.pinimg.com/736x/61/86/03/618603d1665a0d3d20cc29ab8aab2c0d.jpg",
      condition: "Như mới",
      rating: 4.8,
      sold: 126,
      discount: "-20%",
      verified: true,
      description:
        "iPhone 14 Pro Max 128GB, màu đen, đầy đủ phụ kiện, còn bảo hành chính hãng 10 tháng. Máy không trầy xước, pin 98%, hoạt động hoàn hảo.",
      features: [
        "Face ID",
        "Camera 48MP",
        "Chip A16 Bionic",
        "Màn hình 6.7 inch",
      ],
      seller: {
        id: "user1",
        name: "Nguyễn Văn A",
        avatar: "https://randomuser.me/api/portraits/men/32.jpg",
        rating: 4.8,
        verified: true,
        joinDate: "Tháng 3, 2022",
        totalProducts: 15,
        responseRate: "98%",
      },
    },
    {
      id: 2,
      name: "MacBook Pro M2",
      price: "42.990.000đ",
      originalPrice: "48.990.000đ",
      image:
        "https://i.pinimg.com/736x/eb/36/99/eb369990805c29991e933f2654cfe7b0.jpg",
      condition: "Mới 99%",
      rating: 4.9,
      sold: 84,
      discount: "-15%",
      verified: true,
      description:
        "MacBook Pro M2 13 inch, RAM 16GB, SSD 512GB, màu xám không gian. Mua tháng trước, còn bảo hành Apple 11 tháng. Máy mới 99%, không trầy xước.",
      features: ["Chip M2", "16GB RAM", "512GB SSD", "Màn hình Retina"],
      seller: {
        id: "user2",
        name: "Trần Thị B",
        avatar: "https://randomuser.me/api/portraits/women/44.jpg",
        rating: 4.9,
        verified: true,
        joinDate: "Tháng 5, 2021",
        totalProducts: 28,
        responseRate: "95%",
      },
    },
    {
      id: 3,
      name: 'iPad Pro M1 12.9"',
      price: "23.990.000đ",
      originalPrice: "27.990.000đ",
      image:
        "https://i.pinimg.com/736x/ee/c1/33/eec1335e35eb586f93010ad2fede2196.jpg",
      condition: "Mới 95%",
      rating: 4.7,
      sold: 93,
      discount: "-12%",
      verified: false,
      description:
        "iPad Pro M1 12.9 inch, bản Wifi + Cellular, bộ nhớ 256GB, màu bạc. Máy đã qua sử dụng, còn rất mới, pin còn 95%, không trầy xước.",
      features: [
        "Chip M1",
        "Màn hình 12.9 inch",
        "Liquid Retina XDR",
        "Cellular + Wifi",
      ],
      seller: {
        id: "user3",
        name: "Lê Văn C",
        avatar: "https://randomuser.me/api/portraits/men/67.jpg",
        rating: 4.7,
        verified: false,
        joinDate: "Tháng 8, 2022",
        totalProducts: 7,
        responseRate: "90%",
      },
    },
  ];

  const handleProductPress = (product) => {
    navigation.navigate("ProductDetail", { product });
  };

  const renderProductCard = (product) => (
    <TouchableOpacity
      key={product.id}
      style={styles.productCard}
      activeOpacity={0.95}
      onPress={() => handleProductPress(product)}
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
        <TouchableOpacity
          style={styles.favoriteButton}
          onPress={(e) => {
            e.stopPropagation();
            // Thêm logic yêu thích ở đây
          }}
        >
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
        </View>

        <TouchableOpacity
          style={styles.actionButton}
          onPress={() => handleProductPress(product)}
        >
          <Text style={styles.actionButtonText}>Xem chi tiết</Text>
          <Ionicons name="arrow-forward" size={16} color={COLORS.white} />
        </TouchableOpacity>
      </View>
    </TouchableOpacity>
  );

  const handleSeeAll = () => {
    navigation.navigate("AllProducts", { products: featuredProducts });
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <View style={styles.titleContainer}>
          <Text style={styles.title}>Sản phẩm nổi bật</Text>
          <View style={styles.badge}>
            <Text style={styles.badgeText}>HOT</Text>
          </View>
        </View>
        <TouchableOpacity
          style={styles.viewAllButton}
          onPress={() => navigation.navigate("AllProducts")}
        >
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
