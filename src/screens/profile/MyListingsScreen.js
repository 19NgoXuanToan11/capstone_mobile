import React, { useState, useRef, useCallback } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  FlatList,
  Image,
  RefreshControl,
  Alert,
  StyleSheet,
  Animated,
  StatusBar,
  Platform,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Ionicons } from "@expo/vector-icons";
import { LinearGradient } from "expo-linear-gradient";
import { BlurView } from "expo-blur";
import { COLORS, SHADOW } from "../../components/theme";

// Tạo component riêng cho ListingItem để tránh lỗi hook
const ListingItem = React.memo(({ item, index, navigation, onDelete }) => {
  const scaleAnim = useRef(new Animated.Value(0.95)).current;
  const opacityAnim = useRef(new Animated.Value(0)).current;

  React.useEffect(() => {
    Animated.parallel([
      Animated.timing(scaleAnim, {
        toValue: 1,
        duration: 300,
        delay: index * 100,
        useNativeDriver: true,
      }),
      Animated.timing(opacityAnim, {
        toValue: 1,
        duration: 300,
        delay: index * 100,
        useNativeDriver: true,
      }),
    ]).start();
  }, [index]);

  return (
    <Animated.View
      style={[
        styles.listingCardContainer,
        {
          transform: [{ scale: scaleAnim }],
          opacity: opacityAnim,
        },
      ]}
    >
      <View style={styles.listingCard}>
        {/* Image Section */}
        <View style={styles.imageSection}>
          <Image source={{ uri: item.image }} style={styles.listingImage} />

          {/* Price Badge */}
          <View style={styles.priceBadge}>
            <Text style={styles.priceText}>{item.price}</Text>
          </View>

          {/* Location Badge */}
          <View style={styles.locationBadge}>
            <Ionicons name="location-outline" size={14} color="#FFF" />
            <Text style={styles.locationText}>{item.location}</Text>
          </View>
        </View>

        {/* Content Section */}
        <View style={styles.contentSection}>
          {/* Title and Delete Button */}
          <View style={styles.titleRow}>
            <Text style={styles.titleText} numberOfLines={1}>
              {item.title}
            </Text>
            <TouchableOpacity
              onPress={() => onDelete(item.id)}
              style={styles.deleteButton}
            >
              <Ionicons name="trash-outline" size={20} color="#FF3B30" />
            </TouchableOpacity>
          </View>

          {/* Condition */}
          <Text style={styles.conditionText}>{item.condition}</Text>

          {/* Exchange Wishes */}
          <View style={styles.exchangeSection}>
            <Text style={styles.exchangeLabel}>Muốn đổi:</Text>
            <View style={styles.wishesContainer}>
              {item.wantToExchange.map((wish, idx) => (
                <View key={idx} style={styles.wishBadge}>
                  <Text style={styles.wishText}>{wish}</Text>
                </View>
              ))}
            </View>
          </View>

          {/* Stats Row */}
          <View style={styles.statsRow}>
            <View style={styles.statItem}>
              <Ionicons name="eye-outline" size={16} color="#666" />
              <Text style={styles.statText}>{item.views}</Text>
            </View>
            <View style={styles.statItem}>
              <Ionicons name="heart-outline" size={16} color="#666" />
              <Text style={styles.statText}>{item.interested}</Text>
            </View>
            <Text style={styles.dateText}>{item.date}</Text>
          </View>

          {/* Action Buttons */}
          <View style={styles.actionButtons}>
            <TouchableOpacity
              style={styles.editButton}
              onPress={() =>
                navigation.navigate("EditListing", { id: item.id })
              }
            >
              <Ionicons name="create-outline" size={16} color="#4A90E2" />
              <Text style={styles.editButtonText}>Chỉnh sửa</Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={[
                styles.statusButton,
                item.status === "active"
                  ? styles.deactivateButton
                  : styles.activateButton,
              ]}
              onPress={() => console.log("Toggle status for:", item.id)}
            >
              <Ionicons
                name={
                  item.status === "active"
                    ? "pause-circle-outline"
                    : "play-circle-outline"
                }
                size={16}
                color={item.status === "active" ? "#FF9500" : "#4CD964"}
              />
              <Text
                style={[
                  styles.statusButtonText,
                  item.status === "active"
                    ? styles.deactivateText
                    : styles.activateText,
                ]}
              >
                {item.status === "active" ? "Tạm ẩn" : "Kích hoạt"}
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </Animated.View>
  );
});

export default function MyListingsScreen({ navigation }) {
  const [refreshing, setRefreshing] = useState(false);
  const [activeTab, setActiveTab] = useState("active");

  const listings = {
    active: [
      {
        id: "1",
        title: "iPhone 12 Pro Max",
        image: "https://picsum.photos/300/300?random=1",
        condition: "Đã sử dụng - Còn 95%",
        wantToExchange: ["iPhone 13 Pro", "iPhone 13 Pro Max"],
        views: 245,
        interested: 12,
        date: "15/2/2024",
        status: "active",
        price: "18.000.000 đ",
        location: "Quận 1, TP.HCM",
      },
      {
        id: "2",
        title: "MacBook Pro M1",
        image: "https://picsum.photos/300/300?random=2",
        condition: "Mới - 99%",
        wantToExchange: ["MacBook Pro M2", "MacBook Air M2"],
        views: 189,
        interested: 8,
        date: "14/2/2024",
        status: "active",
        price: "25.500.000 đ",
        location: "Quận 7, TP.HCM",
      },
    ],
    inactive: [
      {
        id: "3",
        title: "iPad Pro 2022",
        image: "https://picsum.photos/300/300?random=3",
        condition: "Đã sử dụng - Còn 90%",
        wantToExchange: ["iPad Pro M2", "iPad Air 5"],
        views: 156,
        interested: 5,
        date: "20/1/2024",
        status: "inactive",
        price: "15.800.000 đ",
        location: "Quận 2, TP.HCM",
      },
    ],
  };

  const onRefresh = useCallback(() => {
    setRefreshing(true);
    setTimeout(() => {
      setRefreshing(false);
    }, 2000);
  }, []);

  const handleDeleteListing = useCallback((itemId) => {
    Alert.alert("Xác nhận xóa", "Bạn có chắc chắn muốn xóa sản phẩm này?", [
      {
        text: "Hủy",
        style: "cancel",
      },
      {
        text: "Xóa",
        style: "destructive",
        onPress: () => {
          console.log("Delete item:", itemId);
        },
      },
    ]);
  }, []);

  const renderListingItem = useCallback(
    ({ item, index }) => (
      <ListingItem
        item={item}
        index={index}
        navigation={navigation}
        onDelete={handleDeleteListing}
      />
    ),
    [navigation, handleDeleteListing]
  );

  const EmptyListComponent = useCallback(
    () => (
      <View style={styles.emptyContainer}>
        <Ionicons name="cube-outline" size={80} color="#DDD" />
        <Text style={styles.emptyText}>
          Bạn chưa có sản phẩm nào trong mục này
        </Text>
        <TouchableOpacity
          style={styles.emptyButton}
          onPress={() => navigation.navigate("AddProduct")}
        >
          <LinearGradient
            colors={["#4A90E2", "#5A9DE2"]}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 0 }}
            style={styles.emptyButtonGradient}
          >
            <Text style={styles.emptyButtonText}>Đăng sản phẩm ngay</Text>
          </LinearGradient>
        </TouchableOpacity>
      </View>
    ),
    [navigation]
  );

  return (
    <View style={styles.container}>
      <StatusBar
        barStyle="dark-content"
        backgroundColor="transparent"
        translucent
      />
      <View style={styles.headerContainer}>
        <View style={styles.header}>
          <TouchableOpacity
            style={styles.backButton}
            onPress={() => navigation.goBack()}
          >
            <Ionicons name="chevron-back" size={24} color="#000" />
          </TouchableOpacity>
          <Text style={styles.headerTitle}>Sản phẩm của tôi</Text>
          <View style={styles.headerRight} />
        </View>

        {/* Tab Selector */}
        <View style={styles.tabContainer}>
          <TouchableOpacity
            style={[
              styles.tabButton,
              activeTab === "active" && styles.activeTabButton,
            ]}
            onPress={() => setActiveTab("active")}
          >
            <Text
              style={[
                styles.tabText,
                activeTab === "active" && styles.activeTabText,
              ]}
            >
              Đang hiển thị ({listings.active.length})
            </Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={[
              styles.tabButton,
              activeTab === "inactive" && styles.activeTabButton,
            ]}
            onPress={() => setActiveTab("inactive")}
          >
            <Text
              style={[
                styles.tabText,
                activeTab === "inactive" && styles.activeTabText,
              ]}
            >
              Đã ẩn ({listings.inactive.length})
            </Text>
          </TouchableOpacity>
        </View>
      </View>

      {/* Listings */}
      <FlatList
        data={listings[activeTab]}
        renderItem={renderListingItem}
        keyExtractor={(item) => item.id}
        contentContainerStyle={styles.listContainer}
        showsVerticalScrollIndicator={false}
        ListEmptyComponent={EmptyListComponent}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F8F8F8",
  },
  headerContainer: {
    backgroundColor: "#FFF",
    paddingTop: Platform.OS === "android" ? StatusBar.currentHeight : 44,
    ...SHADOW.medium,
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 16,
    paddingVertical: 12,
  },
  backButton: {
    width: 40,
    height: 40,
    alignItems: "center",
    justifyContent: "center",
  },
  headerTitle: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#000",
  },
  headerRight: {
    width: 40,
  },
  tabContainer: {
    flexDirection: "row",
    paddingHorizontal: 16,
    paddingBottom: 16,
  },
  tabButton: {
    flex: 1,
    paddingVertical: 10,
    alignItems: "center",
    borderBottomWidth: 2,
    borderBottomColor: "transparent",
  },
  activeTabButton: {
    borderBottomColor: COLORS.primary,
  },
  tabText: {
    fontSize: 14,
    fontWeight: "500",
    color: "#999",
  },
  activeTabText: {
    color: COLORS.primary,
    fontWeight: "600",
  },
  listContainer: {
    padding: 16,
  },
  listingCardContainer: {
    marginBottom: 16,
  },
  listingCard: {
    backgroundColor: "#FFF",
    borderRadius: 12,
    overflow: "hidden",
    ...SHADOW.medium,
  },
  imageSection: {
    position: "relative",
    height: 180,
  },
  listingImage: {
    width: "100%",
    height: "100%",
  },
  priceBadge: {
    position: "absolute",
    top: 12,
    left: 12,
    backgroundColor: "rgba(0,0,0,0.7)",
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 20,
  },
  priceText: {
    color: "#FFF",
    fontWeight: "bold",
    fontSize: 14,
  },
  locationBadge: {
    position: "absolute",
    bottom: 12,
    right: 12,
    backgroundColor: "rgba(0,0,0,0.7)",
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 20,
    flexDirection: "row",
    alignItems: "center",
  },
  locationText: {
    color: "#FFF",
    fontSize: 12,
    marginLeft: 4,
  },
  contentSection: {
    padding: 16,
  },
  titleRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 8,
  },
  titleText: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#333",
    flex: 1,
  },
  deleteButton: {
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: "rgba(255,59,48,0.1)",
    alignItems: "center",
    justifyContent: "center",
  },
  conditionText: {
    fontSize: 14,
    color: "#666",
    marginBottom: 12,
  },
  exchangeSection: {
    marginBottom: 12,
  },
  exchangeLabel: {
    fontSize: 14,
    fontWeight: "600",
    color: "#333",
    marginBottom: 8,
  },
  wishesContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
  },
  wishBadge: {
    backgroundColor: "rgba(74,144,226,0.1)",
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 20,
    marginRight: 8,
    marginBottom: 8,
  },
  wishText: {
    color: "#4A90E2",
    fontSize: 13,
    fontWeight: "500",
  },
  statsRow: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 16,
  },
  statItem: {
    flexDirection: "row",
    alignItems: "center",
    marginRight: 16,
  },
  statText: {
    fontSize: 13,
    color: "#666",
    marginLeft: 4,
  },
  dateText: {
    fontSize: 13,
    color: "#999",
    marginLeft: "auto",
  },
  actionButtons: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  editButton: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "rgba(74,144,226,0.1)",
    paddingVertical: 10,
    paddingHorizontal: 16,
    borderRadius: 20,
    marginRight: 8,
  },
  editButtonText: {
    color: "#4A90E2",
    fontWeight: "600",
    fontSize: 14,
    marginLeft: 6,
  },
  statusButton: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 10,
    paddingHorizontal: 16,
    borderRadius: 20,
  },
  deactivateButton: {
    backgroundColor: "rgba(255,149,0,0.1)",
  },
  activateButton: {
    backgroundColor: "rgba(76,217,100,0.1)",
  },
  statusButtonText: {
    fontWeight: "600",
    fontSize: 14,
    marginLeft: 6,
  },
  deactivateText: {
    color: "#FF9500",
  },
  activateText: {
    color: "#4CD964",
  },
  emptyContainer: {
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 60,
  },
  emptyText: {
    fontSize: 16,
    color: "#999",
    textAlign: "center",
    marginTop: 16,
    marginBottom: 24,
    paddingHorizontal: 32,
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
    fontSize: 16,
  },
});
