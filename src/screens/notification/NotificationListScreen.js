import React, { useState, useRef } from "react";
import {
  View,
  Text,
  FlatList,
  TouchableOpacity,
  Image,
  RefreshControl,
  Animated,
  StyleSheet,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Ionicons } from "@expo/vector-icons";
import { LinearGradient } from "expo-linear-gradient";
import { COLORS, SHADOW } from "../../components/theme";

export default function NotificationListScreen({ navigation }) {
  const [refreshing, setRefreshing] = useState(false);
  const [activeTab, setActiveTab] = useState("all");
  const translateX = useRef(new Animated.Value(0)).current;

  const notifications = [
    {
      id: "1",
      type: "exchange_request",
      title: "Yêu cầu trao đổi mới",
      message: "Nguyễn Văn A muốn trao đổi iPhone 13 Pro với sản phẩm của bạn",
      image: "https://randomuser.me/api/portraits/men/32.jpg",
      timestamp: "2 phút trước",
      read: false,
      data: {
        exchangeId: "123",
        productId: "456",
        userName: "Nguyễn Văn A",
        userAvatar: "https://randomuser.me/api/portraits/men/32.jpg",
        productName: "iPhone 13 Pro",
        productImage: "https://example.com/iphone.jpg",
        productPrice: "24.990.000đ",
      },
      priority: "high",
    },
    {
      id: "2",
      type: "message",
      title: "Tin nhắn mới",
      message: "Bạn có tin nhắn mới từ Trần Thị B: Sản phẩm còn không bạn?",
      image: "https://randomuser.me/api/portraits/women/44.jpg",
      timestamp: "1 giờ trước",
      read: true,
      data: {
        chatId: "789",
        userId: "101",
        userName: "Trần Thị B",
        userAvatar: "https://randomuser.me/api/portraits/women/44.jpg",
        lastMessage: "Sản phẩm còn không bạn?",
      },
      priority: "medium",
    },
    {
      id: "3",
      type: "system",
      title: "Cập nhật ứng dụng",
      message:
        "Phiên bản mới 2.0 đã sẵn sàng để cập nhật với nhiều tính năng hấp dẫn",
      timestamp: "Hôm qua",
      read: false,
      data: {
        url: "app_store_url",
        version: "2.0",
        features: [
          "Giao diện mới",
          "Tính năng trao đổi nâng cao",
          "Hỗ trợ thanh toán",
        ],
      },
      priority: "low",
    },
    {
      id: "4",
      type: "transaction",
      title: "Giao dịch thành công",
      message:
        "Bạn đã bán thành công sản phẩm Apple Watch Series 7 với giá 8.500.000đ",
      timestamp: "2 ngày trước",
      read: true,
      data: {
        transactionId: "TX123456",
        productName: "Apple Watch Series 7",
        productImage: "https://example.com/watch.jpg",
        amount: "8.500.000đ",
        buyerName: "Hoàng Minh",
      },
      priority: "medium",
    },
    {
      id: "5",
      type: "promotion",
      title: "Khuyến mãi đặc biệt",
      message: "Giảm 50% phí đăng tin khi đăng ký gói Premium trong tuần này",
      timestamp: "3 ngày trước",
      read: false,
      data: {
        promoCode: "PREMIUM50",
        validUntil: "30/06/2023",
        discount: "50%",
      },
      priority: "medium",
    },
  ];

  const filteredNotifications = notifications.filter((notification) => {
    if (activeTab === "unread" && notification.read) return false;
    return true;
  });

  const onRefresh = React.useCallback(() => {
    setRefreshing(true);
    setTimeout(() => {
      setRefreshing(false);
    }, 2000);
  }, []);

  const changeTab = (tab) => {
    setActiveTab(tab);
    Animated.spring(translateX, {
      toValue: tab === "all" ? 0 : 1,
      useNativeDriver: true,
      friction: 8,
      tension: 70,
    }).start();
  };

  const handleNotificationPress = (notification) => {
    // Đánh dấu thông báo đã đọc (trong ứng dụng thực tế, bạn sẽ gọi API)
    // markAsRead(notification.id);

    switch (notification.type) {
      case "exchange_request":
        navigation.navigate("ExchangeDetail", {
          exchangeId: notification.data.exchangeId,
        });
        break;
      case "message":
        navigation.navigate("ChatDetail", {
          chatId: notification.data.chatId,
          userId: notification.data.userId,
          userName: notification.data.userName,
        });
        break;
      case "system":
        navigation.navigate("NotificationDetail", {
          notificationId: notification.id,
        });
        break;
      case "transaction":
        navigation.navigate("TransactionDetail", {
          transactionId: notification.data.transactionId,
        });
        break;
      case "promotion":
        navigation.navigate("PromotionDetail", {
          promoCode: notification.data.promoCode,
        });
        break;
    }
  };

  const getNotificationIcon = (type) => {
    switch (type) {
      case "exchange_request":
        return "git-pull-request";
      case "message":
        return "chatbubble";
      case "system":
        return "information-circle";
      case "transaction":
        return "card";
      case "promotion":
        return "gift";
      default:
        return "notifications";
    }
  };

  const getNotificationColor = (type, priority) => {
    switch (type) {
      case "exchange_request":
        return ["#FF6B6B", "#FF8E8E"];
      case "message":
        return ["#4ECDC4", "#45B7D1"];
      case "system":
        return ["#A18CD1", "#FBC2EB"];
      case "transaction":
        return ["#84FAB0", "#8FD3F4"];
      case "promotion":
        return ["#FFD26F", "#FFA26F"];
      default:
        return ["#6C7A89", "#A3A1A8"];
    }
  };

  const renderNotificationItem = ({ item }) => (
    <TouchableOpacity
      style={[styles.notificationItem, !item.read && styles.unreadItem]}
      onPress={() => handleNotificationPress(item)}
    >
      <View style={styles.notificationContent}>
        {item.image ? (
          <Image
            source={{ uri: item.image }}
            style={styles.notificationImage}
          />
        ) : (
          <LinearGradient
            colors={getNotificationColor(item.type, item.priority)}
            style={styles.iconContainer}
          >
            <Ionicons
              name={getNotificationIcon(item.type)}
              size={24}
              color="#fff"
            />
          </LinearGradient>
        )}

        <View style={styles.textContainer}>
          <View style={styles.notificationHeader}>
            <Text style={styles.notificationTitle}>{item.title}</Text>
            <Text style={styles.timestamp}>{item.timestamp}</Text>
          </View>
          <Text
            style={[styles.message, !item.read && styles.unreadMessage]}
            numberOfLines={2}
          >
            {item.message}
          </Text>

          {item.type === "exchange_request" && item.data && (
            <View style={styles.previewContainer}>
              <View style={styles.productPreview}>
                <Image
                  source={{ uri: item.data.productImage }}
                  style={styles.previewImage}
                />
                <View style={styles.previewInfo}>
                  <Text style={styles.previewTitle} numberOfLines={1}>
                    {item.data.productName}
                  </Text>
                  <Text style={styles.previewPrice}>
                    {item.data.productPrice}
                  </Text>
                </View>
              </View>
              <TouchableOpacity style={styles.actionButton}>
                <Text style={styles.actionButtonText}>Xem chi tiết</Text>
              </TouchableOpacity>
            </View>
          )}

          {item.type === "promotion" && item.data && (
            <View style={styles.promoContainer}>
              <View style={styles.promoCodeContainer}>
                <Text style={styles.promoCode}>{item.data.promoCode}</Text>
              </View>
              <Text style={styles.promoExpiry}>
                Hết hạn: {item.data.validUntil}
              </Text>
            </View>
          )}
        </View>

        {!item.read && <View style={styles.unreadDot} />}
      </View>
    </TouchableOpacity>
  );

  const renderHeader = () => (
    <View style={styles.listHeader}>
      <View style={styles.tabContainer}>
        <Animated.View
          style={[
            styles.tabIndicator,
            {
              transform: [
                {
                  translateX: translateX.interpolate({
                    inputRange: [0, 1],
                    outputRange: [0, 150],
                  }),
                },
              ],
            },
          ]}
        />
        <TouchableOpacity
          style={[styles.tab, activeTab === "all" && styles.activeTab]}
          onPress={() => changeTab("all")}
        >
          <Text
            style={[
              styles.tabText,
              activeTab === "all" && styles.activeTabText,
            ]}
          >
            Tất cả
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.tab, activeTab === "unread" && styles.activeTab]}
          onPress={() => changeTab("unread")}
        >
          <View style={styles.tabWithBadge}>
            <Text
              style={[
                styles.tabText,
                activeTab === "unread" && styles.activeTabText,
              ]}
            >
              Chưa đọc
            </Text>
            <View style={styles.tabBadge}>
              <Text style={styles.tabBadgeText}>
                {notifications.filter((n) => !n.read).length}
              </Text>
            </View>
          </View>
        </TouchableOpacity>
      </View>
    </View>
  );

  const renderEmptyComponent = () => (
    <View style={styles.emptyContainer}>
      <Ionicons name="notifications-outline" size={64} color="#CCD1D1" />
      <Text style={styles.emptyText}>
        {activeTab === "all"
          ? "Bạn chưa có thông báo nào"
          : "Bạn không có thông báo chưa đọc"}
      </Text>
      {activeTab === "unread" && (
        <TouchableOpacity
          style={styles.viewAllButton}
          onPress={() => changeTab("all")}
        >
          <Text style={styles.viewAllText}>Xem tất cả thông báo</Text>
        </TouchableOpacity>
      )}
    </View>
  );

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Thông báo</Text>
        <TouchableOpacity style={styles.settingsButton}>
          <Ionicons name="settings-outline" size={24} color="#1A1A1A" />
        </TouchableOpacity>
      </View>

      <FlatList
        data={filteredNotifications}
        renderItem={renderNotificationItem}
        keyExtractor={(item) => item.id}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }
        contentContainerStyle={styles.notificationList}
        ListHeaderComponent={renderHeader}
        ListEmptyComponent={renderEmptyComponent}
        showsVerticalScrollIndicator={false}
      />

      {notifications.some((n) => !n.read) && (
        <TouchableOpacity style={styles.markAllReadButton}>
          <Text style={styles.markAllReadText}>Đánh dấu tất cả đã đọc</Text>
        </TouchableOpacity>
      )}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F8F9FA",
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 16,
    paddingVertical: 12,
    backgroundColor: COLORS.white,
    ...SHADOW.medium,
  },
  headerTitle: {
    fontSize: 24,
    fontWeight: "700",
    color: "#1A1A1A",
  },
  settingsButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: "#F1F3F5",
    justifyContent: "center",
    alignItems: "center",
  },
  listHeader: {
    paddingHorizontal: 16,
    paddingVertical: 12,
  },
  tabContainer: {
    flexDirection: "row",
    backgroundColor: "#F1F3F5",
    borderRadius: 12,
    height: 44,
    position: "relative",
    marginBottom: 8,
  },
  tabIndicator: {
    position: "absolute",
    width: "50%",
    height: "100%",
    backgroundColor: COLORS.white,
    borderRadius: 12,
    ...SHADOW.small,
  },
  tab: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    zIndex: 1,
  },
  activeTab: {
    // Styles for active tab
  },
  tabText: {
    fontSize: 16,
    fontWeight: "500",
    color: "#666",
  },
  activeTabText: {
    color: COLORS.primary,
    fontWeight: "600",
  },
  tabWithBadge: {
    flexDirection: "row",
    alignItems: "center",
  },
  tabBadge: {
    backgroundColor: COLORS.primary,
    borderRadius: 10,
    paddingHorizontal: 6,
    paddingVertical: 2,
    marginLeft: 4,
  },
  tabBadgeText: {
    color: COLORS.white,
    fontSize: 12,
    fontWeight: "600",
  },
  notificationList: {
    paddingBottom: 80,
  },
  notificationItem: {
    backgroundColor: COLORS.white,
    marginHorizontal: 16,
    marginVertical: 6,
    borderRadius: 16,
    ...SHADOW.small,
  },
  unreadItem: {
    borderLeftWidth: 3,
    borderLeftColor: COLORS.primary,
  },
  notificationContent: {
    flexDirection: "row",
    padding: 16,
  },
  notificationImage: {
    width: 50,
    height: 50,
    borderRadius: 25,
    marginRight: 12,
  },
  iconContainer: {
    width: 50,
    height: 50,
    borderRadius: 25,
    justifyContent: "center",
    alignItems: "center",
    marginRight: 12,
  },
  textContainer: {
    flex: 1,
  },
  notificationHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 4,
  },
  notificationTitle: {
    fontSize: 16,
    fontWeight: "600",
    color: "#1A1A1A",
    flex: 1,
    marginRight: 8,
  },
  timestamp: {
    fontSize: 12,
    color: "#999",
  },
  message: {
    fontSize: 14,
    color: "#666",
    marginBottom: 8,
  },
  unreadMessage: {
    color: "#1A1A1A",
    fontWeight: "500",
  },
  unreadDot: {
    width: 10,
    height: 10,
    borderRadius: 5,
    backgroundColor: COLORS.primary,
    marginLeft: 8,
    alignSelf: "flex-start",
    marginTop: 8,
  },
  previewContainer: {
    backgroundColor: "#F8F9FA",
    borderRadius: 8,
    padding: 8,
    marginTop: 4,
  },
  productPreview: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 8,
  },
  previewImage: {
    width: 40,
    height: 40,
    borderRadius: 8,
    marginRight: 8,
  },
  previewInfo: {
    flex: 1,
  },
  previewTitle: {
    fontSize: 12,
    color: "#1A1A1A",
    marginBottom: 2,
  },
  previewPrice: {
    fontSize: 12,
    fontWeight: "600",
    color: COLORS.primary,
  },
  actionButton: {
    backgroundColor: COLORS.primary,
    paddingVertical: 6,
    paddingHorizontal: 12,
    borderRadius: 8,
    alignSelf: "flex-end",
  },
  actionButtonText: {
    color: COLORS.white,
    fontSize: 12,
    fontWeight: "600",
  },
  promoContainer: {
    backgroundColor: "#FFF9E6",
    borderRadius: 8,
    padding: 8,
    marginTop: 4,
  },
  promoCodeContainer: {
    backgroundColor: "#FFD26F",
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 8,
    alignSelf: "flex-start",
    marginBottom: 4,
  },
  promoCode: {
    fontSize: 14,
    fontWeight: "700",
    color: "#1A1A1A",
  },
  promoExpiry: {
    fontSize: 12,
    color: "#666",
  },
  emptyContainer: {
    alignItems: "center",
    justifyContent: "center",
    padding: 32,
    marginTop: 32,
  },
  emptyText: {
    fontSize: 16,
    color: "#666",
    textAlign: "center",
    marginTop: 16,
    marginBottom: 24,
  },
  viewAllButton: {
    backgroundColor: COLORS.primary,
    paddingHorizontal: 24,
    paddingVertical: 12,
    borderRadius: 24,
  },
  viewAllText: {
    color: COLORS.white,
    fontSize: 16,
    fontWeight: "600",
  },
  markAllReadButton: {
    position: "absolute",
    bottom: 20,
    left: 20,
    right: 20,
    backgroundColor: COLORS.primary,
    paddingVertical: 12,
    borderRadius: 12,
    alignItems: "center",
    justifyContent: "center",
    ...SHADOW.medium,
  },
  markAllReadText: {
    color: COLORS.white,
    fontSize: 16,
    fontWeight: "600",
  },
});
