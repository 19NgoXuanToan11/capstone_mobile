import React, { useState, useRef } from "react";
import {
  View,
  Text,
  Image,
  ScrollView,
  TouchableOpacity,
  StyleSheet,
  Dimensions,
  Animated,
  Share,
  FlatList,
  StatusBar,
  Platform,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Ionicons } from "@expo/vector-icons";
import { LinearGradient } from "expo-linear-gradient";
import { BlurView } from "expo-blur";
import { COLORS, SHADOW } from "../../components/theme";

const { width, height } = Dimensions.get("window");
const IMAGE_HEIGHT = height * 0.45;
const HEADER_HEIGHT = 60;

const ProductDetailScreen = ({ route, navigation }) => {
  const { product } = route.params;
  const scrollY = useRef(new Animated.Value(0)).current;
  const [isFavorite, setIsFavorite] = useState(false);
  const [activeTab, setActiveTab] = useState("description");
  const [showFullDescription, setShowFullDescription] = useState(false);
  const [selectedImage, setSelectedImage] = useState(0);

  // Đảm bảo productImages luôn có ít nhất một phần tử
  const productImages = [
    { id: 1, uri: product?.image || "https://via.placeholder.com/400" },
    ...(product?.additionalImages || []).map((uri, index) => ({
      id: index + 2,
      uri,
    })),
  ];

  // Sản phẩm tương tự
  const similarProducts = [
    {
      id: 101,
      name: "Samsung Galaxy S23",
      price: "19.990.000đ",
      image:
        "https://i.pinimg.com/736x/a6/92/3a/a6923ae5d327edd021dfe6d1dfc808f3.jpg",
      condition: "Mới 100%",
    },
    {
      id: 102,
      name: "Xiaomi 13 Pro",
      price: "16.990.000đ",
      image:
        "https://i.pinimg.com/736x/fc/61/6d/fc616d81c45ebf2f60a3ce939c8a2024.jpg",
      condition: "Mới 99%",
    },
    {
      id: 103,
      name: "OPPO Find X5 Pro",
      price: "18.990.000đ",
      image:
        "https://i.pinimg.com/736x/d3/d0/b2/d3d0b29c60e3927f7593ef74acb4ed98.jpg",
      condition: "Mới 98%",
    },
  ];

  // Animation cho header
  const headerOpacity = scrollY.interpolate({
    inputRange: [0, IMAGE_HEIGHT - HEADER_HEIGHT],
    outputRange: [0, 1],
    extrapolate: "clamp",
  });

  const imageOpacity = scrollY.interpolate({
    inputRange: [0, IMAGE_HEIGHT / 2, IMAGE_HEIGHT],
    outputRange: [1, 1, 0.3],
    extrapolate: "clamp",
  });

  const imageTranslateY = scrollY.interpolate({
    inputRange: [-IMAGE_HEIGHT, 0, IMAGE_HEIGHT],
    outputRange: [IMAGE_HEIGHT / 2, 0, -IMAGE_HEIGHT / 3],
    extrapolate: "clamp",
  });

  const imageScale = scrollY.interpolate({
    inputRange: [-IMAGE_HEIGHT, 0],
    outputRange: [1.5, 1],
    extrapolate: "clamp",
  });

  const contentTranslateY = scrollY.interpolate({
    inputRange: [0, IMAGE_HEIGHT / 2],
    outputRange: [0, -50],
    extrapolate: "clamp",
  });

  const handleShare = async () => {
    try {
      await Share.share({
        message: `Xem sản phẩm ${product.name} với giá ${product.price} tại ứng dụng của chúng tôi!`,
        url: product.image,
      });
    } catch (error) {
      console.log(error.message);
    }
  };

  const handleContact = () => {
    // Thêm logic liên hệ người bán
    alert("Đã gửi tin nhắn đến người bán!");
  };

  const handleExchange = () => {
    // Thêm logic đề xuất trao đổi
    navigation.navigate("ProposeExchange", { product });
  };

  // Hàm xử lý sự kiện scroll
  const handleScroll = Animated.event(
    [{ nativeEvent: { contentOffset: { y: scrollY } } }],
    { useNativeDriver: false }
  );

  const renderThumbnail = ({ item, index }) => (
    <TouchableOpacity
      style={[
        styles.thumbnailContainer,
        selectedImage === index && styles.selectedThumbnail,
      ]}
      onPress={() => setSelectedImage(index)}
    >
      <Image source={{ uri: item.uri }} style={styles.thumbnail} />
    </TouchableOpacity>
  );

  const renderSimilarItem = ({ item }) => (
    <TouchableOpacity
      style={styles.similarProductCard}
      onPress={() => navigation.push("ProductDetail", { product: item })}
    >
      <Image source={{ uri: item.image }} style={styles.similarProductImage} />
      <View style={styles.similarProductInfo}>
        <Text style={styles.similarProductName} numberOfLines={2}>
          {item.name}
        </Text>
        <Text style={styles.similarProductPrice}>{item.price}</Text>
        <Text style={styles.similarProductCondition}>{item.condition}</Text>
      </View>
    </TouchableOpacity>
  );

  const renderFeatureItem = ({ item }) => (
    <View style={styles.featureItem}>
      <Ionicons name="checkmark-circle" size={18} color={COLORS.primary} />
      <Text style={styles.featureText}>{item}</Text>
    </View>
  );

  return (
    <View style={styles.container}>
      <StatusBar
        barStyle="light-content"
        backgroundColor="transparent"
        translucent
      />

      {/* Main Content */}
      <ScrollView
        showsVerticalScrollIndicator={false}
        onScroll={handleScroll}
        scrollEventThrottle={16}
      >
        {/* Product Images */}
        <View style={styles.imageContainer}>
          <Animated.Image
            source={{
              uri:
                productImages[selectedImage]?.uri ||
                "https://via.placeholder.com/400",
            }}
            style={[
              styles.productImage,
              {
                opacity: imageOpacity,
                transform: [
                  { translateY: imageTranslateY },
                  { scale: imageScale },
                ],
              },
            ]}
          />
          <LinearGradient
            colors={["rgba(0,0,0,0.7)", "transparent"]}
            style={styles.imageGradient}
          >
            <TouchableOpacity
              style={styles.backButtonTransparent}
              onPress={() => navigation.goBack()}
            >
              <Ionicons name="arrow-back" size={24} color="#FFF" />
            </TouchableOpacity>
          </LinearGradient>
        </View>

        {/* Content */}
        <Animated.View
          style={[
            styles.contentContainer,
            { transform: [{ translateY: contentTranslateY }] },
          ]}
        >
          {/* Product Header */}
          <View style={styles.productHeader}>
            <View style={styles.titleContainer}>
              <Text style={styles.productTitle}>
                {product?.name || "Tên sản phẩm"}
              </Text>
              {product?.discount && (
                <View style={styles.discountBadge}>
                  <Text style={styles.discountText}>{product.discount}</Text>
                </View>
              )}
              <TouchableOpacity
                style={styles.favoriteButton}
                onPress={() => setIsFavorite(!isFavorite)}
              >
                <Ionicons
                  name={isFavorite ? "heart" : "heart-outline"}
                  size={24}
                  color={isFavorite ? COLORS.primary : "#666"}
                />
              </TouchableOpacity>
              {product?.verified && (
                <Ionicons
                  name="checkmark-circle"
                  size={20}
                  color={COLORS.primary}
                />
              )}
            </View>

            <View style={styles.priceContainer}>
              <Text style={styles.productPrice}>{product?.price || "0đ"}</Text>
              {product?.originalPrice && (
                <Text style={styles.originalPrice}>
                  {product.originalPrice}
                </Text>
              )}
            </View>
          </View>

          {/* Meta Info */}
          <View style={styles.metaContainer}>
            <View style={styles.metaItem}>
              <Ionicons name="eye-outline" size={18} color="#666" />
              <Text style={styles.metaText}>
                {product?.sold || 126} lượt xem
              </Text>
            </View>
            <View style={styles.metaDivider} />
            <View style={styles.metaItem}>
              <Ionicons name="time-outline" size={18} color="#666" />
              <Text style={styles.metaText}>Đăng 2 ngày trước</Text>
            </View>
            <View style={styles.metaDivider} />
          </View>

          {/* Condition */}
          <View style={styles.conditionContainer}>
            <Text style={styles.sectionTitle}>Tình trạng</Text>
            <View style={styles.conditionBadge}>
              <Text style={styles.conditionText}>
                {product?.condition || "Mới"}
              </Text>
            </View>
          </View>

          {/* Features */}
          {product?.features && (
            <View style={styles.featuresContainer}>
              <Text style={styles.sectionTitle}>Đặc điểm</Text>
              <FlatList
                data={product.features}
                renderItem={renderFeatureItem}
                keyExtractor={(item, index) => index.toString()}
                numColumns={2}
                scrollEnabled={false}
              />
            </View>
          )}

          {/* Description */}
          <View style={styles.descriptionContainer}>
            <Text style={styles.sectionTitle}>Mô tả sản phẩm</Text>
            <Text
              style={styles.descriptionText}
              numberOfLines={showFullDescription ? undefined : 3}
            >
              {product?.description || "Không có mô tả cho sản phẩm này."}
            </Text>
            <TouchableOpacity
              style={styles.showMoreButton}
              onPress={() => setShowFullDescription(!showFullDescription)}
            >
              <Text style={styles.showMoreText}>
                {showFullDescription ? "Thu gọn" : "Xem thêm"}
              </Text>
              <Ionicons
                name={
                  showFullDescription
                    ? "chevron-up-outline"
                    : "chevron-down-outline"
                }
                size={16}
                color={COLORS.primary}
              />
            </TouchableOpacity>
          </View>

          {/* Seller Info */}
          {product?.seller && (
            <View style={styles.sellerContainer}>
              <Text style={styles.sectionTitle}>Thông tin người bán</Text>
              <View style={styles.sellerCard}>
                <View style={styles.sellerHeader}>
                  <Image
                    source={{
                      uri:
                        product.seller.avatar ||
                        "https://via.placeholder.com/100",
                    }}
                    style={styles.sellerAvatar}
                  />
                  <View style={styles.sellerInfo}>
                    <View style={styles.sellerNameRow}>
                      <Text style={styles.sellerName}>
                        {product.seller.name}
                      </Text>
                      {product.seller.verified && (
                        <Ionicons
                          name="checkmark-circle"
                          size={16}
                          color={COLORS.primary}
                        />
                      )}
                    </View>
                    <View style={styles.sellerRatingContainer}>
                      <Ionicons name="star" size={14} color="#FFD700" />
                      <Text style={styles.sellerRating}>
                        {product.seller.rating}
                      </Text>
                    </View>
                    <Text style={styles.sellerJoinDate}>
                      Thành viên từ {product.seller.joinDate}
                    </Text>
                  </View>
                  <TouchableOpacity
                    style={styles.viewProfileButton}
                    onPress={() =>
                      navigation.navigate("SellerProfile", {
                        seller: product.seller,
                      })
                    }
                  >
                    <Text style={styles.viewProfileText}>Xem trang</Text>
                  </TouchableOpacity>
                </View>
              </View>
            </View>
          )}

          {/* Similar Products */}
          <View style={styles.similarProductsContainer}>
            <Text style={styles.sectionTitle}>Sản phẩm tương tự</Text>
            <FlatList
              data={similarProducts}
              renderItem={renderSimilarItem}
              keyExtractor={(item) => item.id.toString()}
              horizontal
              showsHorizontalScrollIndicator={false}
              contentContainerStyle={styles.similarProductsList}
            />
          </View>

          {/* Bottom Padding */}
          <View style={{ height: 80 }} />
        </Animated.View>
      </ScrollView>

      {/* Bottom Actions */}
      <View style={styles.bottomActions}>
        {/* <TouchableOpacity
          style={styles.favoriteButton}
          onPress={() => setIsFavorite(!isFavorite)}
        >
          <Ionicons
            name={isFavorite ? "heart" : "heart-outline"}
            size={24}
            color={isFavorite ? COLORS.primary : "#666"}
          />
        </TouchableOpacity> */}

        <TouchableOpacity style={styles.contactButton} onPress={handleContact}>
          <Ionicons name="chatbubble-outline" size={20} color="#FFF" />
          <Text style={styles.actionButtonText}>Liên hệ</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.exchangeButton}
          onPress={handleExchange}
        >
          <Ionicons name="swap-horizontal" size={20} color="#FFF" />
          <Text style={styles.actionButtonText}>Trao đổi</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.buyButton}
          onPress={() => navigation.navigate("Checkout", { product })}
        >
          <Ionicons name="cart-outline" size={20} color="#FFF" />
          <Text style={styles.actionButtonText}>Mua ngay</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#FFF",
  },
  header: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    zIndex: 10,
    marginTop: 30,
  },
  headerGradient: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 15,
    paddingVertical: 10,
    height: HEADER_HEIGHT,
  },
  headerButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    alignItems: "center",
    justifyContent: "center",
  },
  headerTitle: {
    flex: 1,
    fontSize: 18,
    fontWeight: "bold",
    color: "#FFF",
    marginHorizontal: 10,
    textAlign: "center",
  },
  headerRight: {
    flexDirection: "row",
  },
  imageContainer: {
    height: IMAGE_HEIGHT,
    width: width,
    position: "relative",
  },
  productImage: {
    width: "100%",
    height: "100%",
    resizeMode: "cover",
  },
  imageGradient: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    height: 100,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "flex-start",
    paddingHorizontal: 15,
    paddingTop: Platform.OS === "ios" ? 50 : 40,
  },
  backButtonTransparent: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: "rgba(0,0,0,0.3)",
    alignItems: "center",
    justifyContent: "center",
  },
  imageActions: {
    flexDirection: "row",
  },
  imageActionButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: "rgba(0,0,0,0.3)",
    alignItems: "center",
    justifyContent: "center",
    marginLeft: 10,
  },
  thumbnailsContainer: {
    position: "absolute",
    bottom: 15,
    left: 0,
    right: 0,
    flexDirection: "row",
    justifyContent: "center",
  },
  thumbnailContainer: {
    width: 60,
    height: 60,
    borderRadius: 8,
    marginHorizontal: 5,
    borderWidth: 2,
    borderColor: "transparent",
    overflow: "hidden",
  },
  selectedThumbnail: {
    borderColor: COLORS.primary,
  },
  thumbnail: {
    width: "100%",
    height: "100%",
    resizeMode: "cover",
  },
  contentContainer: {
    backgroundColor: "#FFF",
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    marginTop: -20,
    paddingTop: 20,
    paddingBottom: 20,
  },
  productHeader: {
    paddingHorizontal: 15,
    marginBottom: 15,
  },
  titleContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 8,
  },
  productTitle: {
    fontSize: 22,
    fontWeight: "bold",
    color: "#1A1A1A",
    flex: 1,
    marginRight: 8,
  },
  priceContainer: {
    flexDirection: "row",
    alignItems: "center",
    flexWrap: "wrap",
  },
  productPrice: {
    fontSize: 24,
    fontWeight: "bold",
    color: COLORS.primary,
    marginRight: 10,
  },
  originalPrice: {
    fontSize: 16,
    color: "#999",
    textDecorationLine: "line-through",
    marginRight: 10,
  },
  discountBadge: {
    backgroundColor: "#FFE8E8",
    paddingHorizontal: 8,
    marginRight: 15,
    paddingVertical: 4,
    borderRadius: 4,
  },
  discountText: {
    fontSize: 12,
    fontWeight: "bold",
    color: "#FF3B30",
  },
  metaContainer: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 15,
    paddingVertical: 12,
    backgroundColor: "#F9F9F9",
    marginBottom: 15,
  },
  metaItem: {
    flexDirection: "row",
    alignItems: "center",
  },
  metaText: {
    fontSize: 13,
    color: "#666",
    marginLeft: 5,
  },
  metaDivider: {
    width: 1,
    height: 16,
    backgroundColor: "#DDD",
    marginHorizontal: 10,
  },
  conditionContainer: {
    paddingHorizontal: 15,
    marginBottom: 20,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#1A1A1A",
    marginBottom: 10,
  },
  conditionBadge: {
    backgroundColor: "#F0F0F0",
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 8,
    alignSelf: "flex-start",
  },
  conditionText: {
    fontSize: 14,
    color: "#333",
  },
  featuresContainer: {
    paddingHorizontal: 15,
    marginBottom: 20,
  },
  featureItem: {
    flexDirection: "row",
    alignItems: "center",
    width: "50%",
    marginBottom: 10,
    paddingRight: 10,
  },
  featureText: {
    fontSize: 14,
    color: "#333",
    marginLeft: 8,
    flex: 1,
  },
  descriptionContainer: {
    paddingHorizontal: 15,
    marginBottom: 20,
  },
  descriptionText: {
    fontSize: 15,
    lineHeight: 22,
    color: "#444",
  },
  showMoreButton: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 8,
  },
  showMoreText: {
    fontSize: 14,
    color: COLORS.primary,
    fontWeight: "500",
    marginRight: 5,
  },
  sellerContainer: {
    paddingHorizontal: 15,
    marginBottom: 20,
  },
  sellerCard: {
    backgroundColor: "#FAFAFA",
    borderRadius: 12,
    padding: 15,
  },
  sellerHeader: {
    flexDirection: "row",
    alignItems: "center",
  },
  sellerAvatar: {
    width: 50,
    height: 50,
    borderRadius: 25,
  },
  sellerInfo: {
    flex: 1,
    marginLeft: 12,
  },
  sellerNameRow: {
    flexDirection: "row",
    alignItems: "center",
  },
  sellerName: {
    fontSize: 16,
    fontWeight: "600",
    color: "#333",
    marginRight: 5,
  },
  sellerRatingContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 4,
  },
  sellerRating: {
    fontSize: 14,
    color: "#666",
    marginLeft: 4,
  },
  sellerJoinDate: {
    fontSize: 13,
    color: "#888",
    marginTop: 2,
  },
  viewProfileButton: {
    backgroundColor: "#F0F0F0",
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 16,
  },
  viewProfileText: {
    fontSize: 12,
    color: "#333",
    fontWeight: "500",
  },
  similarProductsContainer: {
    paddingHorizontal: 15,
    marginBottom: 20,
  },
  similarProductsList: {
    paddingVertical: 10,
  },
  similarProductCard: {
    width: 160,
    backgroundColor: "#FFF",
    borderRadius: 12,
    overflow: "hidden",
    marginRight: 12,
    ...Platform.select({
      ios: {
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 4,
      },
      android: {
        elevation: 3,
      },
    }),
  },
  similarProductImage: {
    width: "100%",
    height: 120,
    resizeMode: "cover",
  },
  similarProductInfo: {
    padding: 10,
  },
  similarProductName: {
    fontSize: 14,
    fontWeight: "600",
    color: "#333",
    marginBottom: 5,
  },
  similarProductPrice: {
    fontSize: 15,
    fontWeight: "bold",
    color: COLORS.primary,
    marginBottom: 5,
  },
  similarProductCondition: {
    fontSize: 12,
    color: "#666",
  },
  bottomActions: {
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0,
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 10,
    paddingVertical: 10,
    backgroundColor: "#FFF",
    borderTopWidth: 1,
    borderTopColor: "#F0F0F0",
    ...Platform.select({
      ios: {
        shadowColor: "#000",
        shadowOffset: { width: 0, height: -3 },
        shadowOpacity: 0.1,
        shadowRadius: 4,
      },
      android: {
        elevation: 5,
      },
    }),
  },
  favoriteButton: {
    width: 44,
    height: 44,
    borderRadius: 22,
    backgroundColor: "#F5F5F5",
    alignItems: "center",
    justifyContent: "center",
    marginRight: 10,
  },
  contactButton: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#0066CC",
    paddingVertical: 12,
    borderRadius: 12,
    marginRight: 8,
  },
  exchangeButton: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: COLORS.primary,
    paddingVertical: 12,
    borderRadius: 12,
    marginRight: 8,
  },
  buyButton: {
    flex: 1.5,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#FF3B30",
    paddingVertical: 12,
    borderRadius: 12,
  },
  actionButtonText: {
    fontSize: 14,
    fontWeight: "600",
    color: "#FFF",
    marginLeft: 6,
  },
});

export default ProductDetailScreen;
