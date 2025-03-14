import React, { useState, useRef, useCallback } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  FlatList,
  Image,
  StyleSheet,
  Animated,
  StatusBar,
  Dimensions,
  RefreshControl,
  Platform,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Ionicons } from "@expo/vector-icons";
import { LinearGradient } from "expo-linear-gradient";
import { BlurView } from "expo-blur";
import { COLORS, SHADOW } from "../../components/theme";

const { width } = Dimensions.get("window");
const ITEM_WIDTH = width * 0.9;

const FavoritesScreen = ({ navigation }) => {
  const [refreshing, setRefreshing] = useState(false);
  const [activeTab, setActiveTab] = useState("products");
  const scrollY = useRef(new Animated.Value(0)).current;

  // Dữ liệu mẫu
  const favorites = {
    products: [
      {
        id: "1",
        title: "iPhone 13 Pro Max",
        price: 28000000,
        location: "Quận 1, TP.HCM",
        image: "https://images.unsplash.com/photo-1632661674596-df8be070a5c5",
        condition: "Đã sử dụng - Còn 95%",
        owner: {
          id: "user1",
          name: "Nguyễn Văn A",
          avatar: "https://randomuser.me/api/portraits/men/32.jpg",
          rating: 4.8,
        },
        stats: {
          views: 156,
          likes: 24,
          time: "2 ngày trước",
        },
        exchange_for: ["MacBook Pro", "iPad Pro"],
      },
      {
        id: "2",
        title: "MacBook Air M1",
        price: 22000000,
        location: "Quận 7, TP.HCM",
        image: "https://images.unsplash.com/photo-1611186871348-b1ce696e52c9",
        condition: "Mới - 100%",
        owner: {
          id: "user2",
          name: "Trần Thị B",
          avatar: "https://randomuser.me/api/portraits/women/44.jpg",
          rating: 4.6,
        },
        stats: {
          views: 98,
          likes: 15,
          time: "5 ngày trước",
        },
        exchange_for: ["iPhone 12 Pro", "Samsung S21"],
      },
      {
        id: "3",
        title: "PlayStation 5",
        price: 15000000,
        location: "Quận Cầu Giấy, Hà Nội",
        image: "https://images.unsplash.com/photo-1606813907291-d86efa9b94db",
        condition: "Đã sử dụng - Còn 98%",
        owner: {
          id: "user3",
          name: "Lê Văn C",
          avatar: "https://randomuser.me/api/portraits/men/67.jpg",
          rating: 4.9,
        },
        stats: {
          views: 210,
          likes: 42,
          time: "1 tuần trước",
        },
        exchange_for: ["Xbox Series X", "Nintendo Switch"],
      },
    ],
    sellers: [
      {
        id: "user1",
        name: "Nguyễn Văn A",
        avatar: "https://randomuser.me/api/portraits/men/32.jpg",
        rating: 4.8,
        products: 15,
        followers: 120,
        bio: "Chuyên trao đổi các sản phẩm công nghệ chính hãng",
      },
      {
        id: "user2",
        name: "Trần Thị B",
        avatar: "https://randomuser.me/api/portraits/women/44.jpg",
        rating: 4.6,
        products: 8,
        followers: 75,
        bio: "Yêu thích đồ Apple, luôn cập nhật sản phẩm mới",
      },
      {
        id: "user3",
        name: "Lê Văn C",
        avatar: "https://randomuser.me/api/portraits/men/67.jpg",
        rating: 4.9,
        products: 23,
        followers: 210,
        bio: "Game thủ chuyên nghiệp, trao đổi các thiết bị gaming",
      },
    ],
  };

  // Format tiền VND
  const formatCurrency = (amount) => {
    return amount.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".") + " đ";
  };

  // Refresh
  const onRefresh = useCallback(() => {
    setRefreshing(true);
    // Giả lập tải dữ liệu
    setTimeout(() => {
      setRefreshing(false);
    }, 1500);
  }, []);

  // Header animation
  const headerHeight = scrollY.interpolate({
    inputRange: [0, 100],
    outputRange: [120, 70],
    extrapolate: "clamp",
  });

  const headerTitleOpacity = scrollY.interpolate({
    inputRange: [0, 60, 90],
    outputRange: [0, 0.5, 1],
    extrapolate: "clamp",
  });

  const headerTitleSize = scrollY.interpolate({
    inputRange: [0, 100],
    outputRange: [0, 20],
    extrapolate: "clamp",
  });

  const headerLargeTitleOpacity = scrollY.interpolate({
    inputRange: [0, 60],
    outputRange: [1, 0],
    extrapolate: "clamp",
  });

  // Render sản phẩm yêu thích
  const renderProductItem = ({ item, index }) => {
    const inputRange = [
      -1,
      0,
      (index + 0.5) * (ITEM_WIDTH + 20),
      (index + 1) * (ITEM_WIDTH + 20),
    ];

    const scale = scrollY.interpolate({
      inputRange,
      outputRange: [1, 1, 1, 0.9],
    });

    const opacity = scrollY.interpolate({
      inputRange,
      outputRange: [1, 1, 1, 0.7],
    });

    return (
      <Animated.View
        style={[
          styles.productItemContainer,
          {
            transform: [{ scale }],
            opacity,
          },
        ]}
      >
        <TouchableOpacity
          style={styles.productItem}
          onPress={() => navigation.navigate("ProductDetail", { id: item.id })}
          activeOpacity={0.9}
        >
          {/* Hình ảnh sản phẩm */}
          <View style={styles.productImageContainer}>
            <Image
              source={{ uri: item.image }}
              style={styles.productImage}
              resizeMode="cover"
            />
            <LinearGradient
              colors={["transparent", "rgba(0,0,0,0.8)"]}
              style={styles.imageGradient}
            />
            <View style={styles.productPriceContainer}>
              <Text style={styles.productPrice}>
                {formatCurrency(item.price)}
              </Text>
            </View>
            <View style={styles.productLocationContainer}>
              <Ionicons name="location" size={14} color="#FFF" />
              <Text style={styles.productLocation}>{item.location}</Text>
            </View>
          </View>

          {/* Thông tin sản phẩm */}
          <View style={styles.productInfo}>
            <Text style={styles.productTitle} numberOfLines={1}>
              {item.title}
            </Text>
            <Text style={styles.productCondition}>{item.condition}</Text>

            {/* Thông tin người bán */}
            <View style={styles.ownerInfo}>
              <Image
                source={{ uri: item.owner.avatar }}
                style={styles.ownerAvatar}
              />
              <View style={styles.ownerDetails}>
                <Text style={styles.ownerName}>{item.owner.name}</Text>
                <View style={styles.ratingContainer}>
                  <Ionicons name="star" size={14} color="#FFD700" />
                  <Text style={styles.ownerRating}>{item.owner.rating}</Text>
                </View>
              </View>
            </View>

            {/* Muốn đổi */}
            {item.exchange_for && item.exchange_for.length > 0 && (
              <View style={styles.exchangeContainer}>
                <Text style={styles.exchangeLabel}>Muốn đổi:</Text>
                <View style={styles.exchangeItems}>
                  {item.exchange_for.map((item, index) => (
                    <View key={index} style={styles.exchangeItem}>
                      <Text style={styles.exchangeItemText}>{item}</Text>
                    </View>
                  ))}
                </View>
              </View>
            )}

            {/* Thống kê */}
            <View style={styles.statsContainer}>
              <View style={styles.statItem}>
                <Ionicons name="eye-outline" size={16} color="#999" />
                <Text style={styles.statText}>{item.stats.views}</Text>
              </View>
              <View style={styles.statItem}>
                <Ionicons name="heart" size={16} color="#FF6B6B" />
                <Text style={styles.statText}>{item.stats.likes}</Text>
              </View>
              <Text style={styles.timeText}>{item.stats.time}</Text>
            </View>
          </View>

          {/* Nút xóa khỏi yêu thích */}
          <TouchableOpacity style={styles.unlikeButton}>
            <Ionicons name="heart-dislike" size={20} color="#FF3B30" />
          </TouchableOpacity>
        </TouchableOpacity>
      </Animated.View>
    );
  };

  // Render người bán yêu thích
  const renderSellerItem = ({ item }) => {
    return (
      <TouchableOpacity
        style={styles.sellerItem}
        onPress={() => navigation.navigate("SellerProfile", { id: item.id })}
        activeOpacity={0.9}
      >
        <View style={styles.sellerHeader}>
          <Image source={{ uri: item.avatar }} style={styles.sellerAvatar} />
          <View style={styles.sellerInfo}>
            <Text style={styles.sellerName}>{item.name}</Text>
            <View style={styles.sellerRatingContainer}>
              <Ionicons name="star" size={14} color="#FFD700" />
              <Text style={styles.sellerRating}>{item.rating}</Text>
            </View>
          </View>
          <TouchableOpacity style={styles.unfollowButton}>
            <Text style={styles.unfollowButtonText}>Bỏ theo dõi</Text>
          </TouchableOpacity>
        </View>

        <Text style={styles.sellerBio} numberOfLines={2}>
          {item.bio}
        </Text>

        <View style={styles.sellerStats}>
          <View style={styles.sellerStatItem}>
            <Text style={styles.sellerStatValue}>{item.products}</Text>
            <Text style={styles.sellerStatLabel}>Sản phẩm</Text>
          </View>
          <View style={styles.sellerStatDivider} />
          <View style={styles.sellerStatItem}>
            <Text style={styles.sellerStatValue}>{item.followers}</Text>
            <Text style={styles.sellerStatLabel}>Người theo dõi</Text>
          </View>
        </View>
      </TouchableOpacity>
    );
  };

  // Render trạng thái trống
  const renderEmptyState = () => {
    return (
      <View style={styles.emptyContainer}>
        <Ionicons
          name={activeTab === "products" ? "heart-outline" : "people-outline"}
          size={80}
          color="#DDD"
        />
        <Text style={styles.emptyTitle}>
          {activeTab === "products"
            ? "Chưa có sản phẩm yêu thích"
            : "Chưa theo dõi ai"}
        </Text>
        <Text style={styles.emptyText}>
          {activeTab === "products"
            ? "Hãy thêm sản phẩm vào danh sách yêu thích để xem lại sau"
            : "Theo dõi người bán để cập nhật sản phẩm mới từ họ"}
        </Text>
        <TouchableOpacity
          style={styles.emptyButton}
          onPress={() => navigation.navigate("Home")}
        >
          <LinearGradient
            colors={[COLORS.primary, COLORS.primaryDark]}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 1 }}
            style={styles.emptyButtonGradient}
          >
            <Text style={styles.emptyButtonText}>
              {activeTab === "products"
                ? "Khám phá sản phẩm"
                : "Khám phá người bán"}
            </Text>
          </LinearGradient>
        </TouchableOpacity>
      </View>
    );
  };

  return (
    <View style={styles.container}>
      <StatusBar
        barStyle="dark-content"
        backgroundColor="transparent"
        translucent
      />

      {/* Header */}
      <View style={styles.headerContainer}>
        <View style={styles.headerRow}>
          <TouchableOpacity
            style={styles.backButton}
            onPress={() => navigation.goBack()}
          >
            <Ionicons name="chevron-back" size={24} color="#333" />
          </TouchableOpacity>
          <Text style={styles.headerTitle}>Yêu thích</Text>
        </View>

        {/* Tab Selector - Chia đôi theo chiều ngang */}
        <View style={styles.tabContainer}>
          <TouchableOpacity
            style={[
              styles.tabButton,
              activeTab === "products" && styles.activeTabButton,
            ]}
            onPress={() => setActiveTab("products")}
          >
            <View style={styles.tabContent}>
              <Ionicons
                name="heart"
                size={20}
                color={activeTab === "products" ? COLORS.primary : "#999"}
              />
              <Text
                style={[
                  styles.tabButtonText,
                  activeTab === "products" && styles.activeTabButtonText,
                ]}
              >
                Sản phẩm
              </Text>
            </View>
            {activeTab === "products" && (
              <View style={styles.activeTabIndicator} />
            )}
          </TouchableOpacity>

          <TouchableOpacity
            style={[
              styles.tabButton,
              activeTab === "sellers" && styles.activeTabButton,
            ]}
            onPress={() => setActiveTab("sellers")}
          >
            <View style={styles.tabContent}>
              <Ionicons
                name="people"
                size={20}
                color={activeTab === "sellers" ? COLORS.primary : "#999"}
              />
              <Text
                style={[
                  styles.tabButtonText,
                  activeTab === "sellers" && styles.activeTabButtonText,
                ]}
              >
                Người bán
              </Text>
            </View>
            {activeTab === "sellers" && (
              <View style={styles.activeTabIndicator} />
            )}
          </TouchableOpacity>
        </View>
      </View>

      {/* Content */}
      {activeTab === "products" ? (
        <Animated.FlatList
          data={favorites.products}
          renderItem={renderProductItem}
          keyExtractor={(item) => item.id}
          contentContainerStyle={styles.listContainer}
          showsVerticalScrollIndicator={false}
          onScroll={Animated.event(
            [{ nativeEvent: { contentOffset: { y: scrollY } } }],
            { useNativeDriver: false }
          )}
          scrollEventThrottle={16}
          refreshControl={
            <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
          }
          ListEmptyComponent={renderEmptyState}
        />
      ) : (
        <FlatList
          data={favorites.sellers}
          renderItem={renderSellerItem}
          keyExtractor={(item) => item.id}
          contentContainerStyle={styles.listContainer}
          showsVerticalScrollIndicator={false}
          refreshControl={
            <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
          }
          ListEmptyComponent={renderEmptyState}
        />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F8F8F8",
  },
  headerContainer: {
    backgroundColor: "#FFF",
    paddingTop: Platform.OS === "android" ? StatusBar.currentHeight : 44,
    borderBottomWidth: 1,
    borderBottomColor: "#F0F0F0",
    ...SHADOW.medium,
  },
  headerRow: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 15,
    paddingVertical: 15,
  },
  backButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    alignItems: "center",
    justifyContent: "center",
  },
  headerTitle: {
    fontSize: 28,
    fontWeight: "bold",
    color: "#333",
    marginLeft: 5,
  },
  tabContainer: {
    flexDirection: "row",
    paddingHorizontal: 15,
    paddingBottom: 5,
  },
  tabButton: {
    flex: 1,
    alignItems: "center",
    paddingVertical: 12,
    position: "relative",
  },
  tabContent: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
  },
  activeTabButton: {
    borderBottomWidth: 0,
  },
  tabButtonText: {
    fontSize: 15,
    fontWeight: "600",
    color: "#999",
    marginLeft: 5,
  },
  activeTabButtonText: {
    color: COLORS.primary,
  },
  activeTabIndicator: {
    position: "absolute",
    bottom: 0,
    left: 15,
    right: 15,
    height: 3,
    backgroundColor: COLORS.primary,
    borderRadius: 3,
  },
  listContainer: {
    paddingHorizontal: 15,
    paddingTop: 15,
    paddingBottom: 30,
  },
  productItemContainer: {
    marginBottom: 15,
  },
  productItem: {
    backgroundColor: "#FFF",
    borderRadius: 12,
    overflow: "hidden",
    ...SHADOW.medium,
  },
  productImageContainer: {
    height: 200,
    width: "100%",
    position: "relative",
  },
  productImage: {
    width: "100%",
    height: "100%",
  },
  imageGradient: {
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0,
    height: 80,
  },
  productPriceContainer: {
    position: "absolute",
    top: 10,
    left: 10,
    backgroundColor: "rgba(0,0,0,0.6)",
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderRadius: 20,
  },
  productPrice: {
    color: "#FFF",
    fontWeight: "bold",
    fontSize: 14,
  },
  productLocationContainer: {
    position: "absolute",
    bottom: 10,
    right: 10,
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "rgba(0,0,0,0.6)",
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderRadius: 20,
  },
  productLocation: {
    color: "#FFF",
    fontSize: 12,
    marginLeft: 3,
  },
  productInfo: {
    padding: 15,
  },
  productTitle: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#333",
    marginBottom: 5,
  },
  productCondition: {
    fontSize: 14,
    color: "#666",
    marginBottom: 10,
  },
  ownerInfo: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 15,
  },
  ownerAvatar: {
    width: 36,
    height: 36,
    borderRadius: 18,
    marginRight: 10,
  },
  ownerDetails: {
    flex: 1,
  },
  ownerName: {
    fontSize: 14,
    fontWeight: "500",
    color: "#333",
  },
  ratingContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
  ownerRating: {
    fontSize: 13,
    color: "#666",
    marginLeft: 3,
  },
  exchangeContainer: {
    marginBottom: 15,
  },
  exchangeLabel: {
    fontSize: 14,
    fontWeight: "500",
    color: "#666",
    marginBottom: 5,
  },
  exchangeItems: {
    flexDirection: "row",
    flexWrap: "wrap",
  },
  exchangeItem: {
    backgroundColor: "rgba(74,144,226,0.1)",
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderRadius: 15,
    marginRight: 8,
    marginBottom: 8,
  },
  exchangeItemText: {
    fontSize: 13,
    color: COLORS.primary,
  },
  statsContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
  statItem: {
    flexDirection: "row",
    alignItems: "center",
    marginRight: 15,
  },
  statText: {
    fontSize: 13,
    color: "#999",
    marginLeft: 3,
  },
  timeText: {
    fontSize: 13,
    color: "#999",
    marginLeft: "auto",
  },
  unlikeButton: {
    position: "absolute",
    top: 10,
    right: 10,
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: "#FFF",
    alignItems: "center",
    justifyContent: "center",
    ...SHADOW.small,
  },
  sellerItem: {
    backgroundColor: "#FFF",
    borderRadius: 12,
    padding: 15,
    marginBottom: 15,
    ...SHADOW.small,
  },
  sellerHeader: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 10,
  },
  sellerAvatar: {
    width: 50,
    height: 50,
    borderRadius: 25,
    marginRight: 15,
  },
  sellerInfo: {
    flex: 1,
  },
  sellerName: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#333",
    marginBottom: 3,
  },
  sellerRatingContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
  sellerRating: {
    fontSize: 14,
    color: "#666",
    marginLeft: 3,
  },
  unfollowButton: {
    backgroundColor: "rgba(255,59,48,0.1)",
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 15,
  },
  unfollowButtonText: {
    fontSize: 13,
    color: "#FF3B30",
    fontWeight: "500",
  },
  sellerBio: {
    fontSize: 14,
    color: "#666",
    marginBottom: 15,
    lineHeight: 20,
  },
  sellerStats: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-around",
    paddingTop: 15,
    borderTopWidth: 1,
    borderTopColor: "#F0F0F0",
  },
  sellerStatItem: {
    alignItems: "center",
  },
  sellerStatValue: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#333",
    marginBottom: 3,
  },
  sellerStatLabel: {
    fontSize: 13,
    color: "#999",
  },
  sellerStatDivider: {
    width: 1,
    height: 30,
    backgroundColor: "#F0F0F0",
  },
  emptyContainer: {
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 60,
    paddingHorizontal: 30,
  },
  emptyTitle: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#333",
    marginTop: 20,
    marginBottom: 10,
  },
  emptyText: {
    fontSize: 15,
    color: "#999",
    textAlign: "center",
    marginBottom: 30,
    lineHeight: 22,
  },
  emptyButton: {
    borderRadius: 25,
    overflow: "hidden",
    ...SHADOW.small,
  },
  emptyButtonGradient: {
    paddingVertical: 12,
    paddingHorizontal: 24,
  },
  emptyButtonText: {
    color: "#FFF",
    fontWeight: "600",
    fontSize: 15,
  },
});

export default FavoritesScreen;
