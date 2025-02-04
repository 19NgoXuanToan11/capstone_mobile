import { View, Text, TouchableOpacity, Image, Dimensions } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import styles from "../styles/HomeStyles";

const { width } = Dimensions.get("window");
const CARD_WIDTH = (width - 40) / 2; // 40 is total horizontal padding

export default function FeaturedProducts() {
  const products = [
    {
      id: 1,
      name: "iPhone 12 Pro",
      price: "12.000.000đ",
      originalPrice: "15.000.000đ",
      image: "https://picsum.photos/200",
      condition: "Như mới",
      location: "TP.HCM",
      rating: 4.8,
      sold: 12,
    },
    {
      id: 2,
      name: "MacBook Pro M1",
      price: "22.000.000đ",
      originalPrice: "28.000.000đ",
      image: "https://picsum.photos/201",
      condition: "Đã sử dụng",
      location: "Hà Nội",
      rating: 4.9,
      sold: 8,
    },
    {
      id: 3,
      name: "iPad Pro 2021",
      price: "15.000.000đ",
      originalPrice: "19.000.000đ",
      image: "https://picsum.photos/202",
      condition: "Như mới",
      location: "Đà Nẵng",
      rating: 4.7,
      sold: 15,
    },
    {
      id: 4,
      name: "Apple Watch S7",
      price: "8.000.000đ",
      originalPrice: "10.000.000đ",
      image: "https://picsum.photos/203",
      condition: "Đã sử dụng",
      location: "TP.HCM",
      rating: 4.6,
      sold: 20,
    },
  ];

  return (
    <View style={styles.productSection}>
      <View style={styles.sectionHeader}>
        <Text style={styles.sectionTitle}>Sản phẩm nổi bật</Text>
        <TouchableOpacity style={styles.viewAllButton}>
          <Text style={styles.viewAllText}>Xem tất cả</Text>
          <Ionicons name="chevron-forward" size={16} color="#666" />
        </TouchableOpacity>
      </View>

      <View style={styles.productGrid}>
        {products.map((product) => (
          <TouchableOpacity
            key={product.id}
            style={[styles.productCard, { width: CARD_WIDTH }]}
          >
            <View style={styles.imageContainer}>
              <Image
                source={{ uri: product.image }}
                style={styles.productImage}
              />
              <View style={styles.conditionBadge}>
                <Text style={styles.conditionText}>{product.condition}</Text>
              </View>
              <TouchableOpacity style={styles.favoriteButton}>
                <Ionicons name="heart-outline" size={20} color="#FF4B4B" />
              </TouchableOpacity>
            </View>

            <View style={styles.productInfo}>
              <Text style={styles.productName} numberOfLines={2}>
                {product.name}
              </Text>

              <View style={styles.priceContainer}>
                <Text style={styles.productPrice}>{product.price}</Text>
                <Text style={styles.originalPrice}>
                  {product.originalPrice}
                </Text>
              </View>

              <View style={styles.productMeta}>
                <View style={styles.ratingContainer}>
                  <Ionicons name="star" size={14} color="#FFD700" />
                  <Text style={styles.ratingText}>{product.rating}</Text>
                  <Text style={styles.soldText}>Đã bán {product.sold}</Text>
                </View>
                <View style={styles.locationContainer}>
                  <Ionicons name="location-outline" size={14} color="#666" />
                  <Text style={styles.locationText}>{product.location}</Text>
                </View>
              </View>
            </View>
          </TouchableOpacity>
        ))}
      </View>
    </View>
  );
}
