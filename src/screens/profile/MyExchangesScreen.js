import React, { useState, useRef, useCallback } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  FlatList,
  Image,
  RefreshControl,
  StyleSheet,
  Animated,
  StatusBar,
  Platform,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Ionicons } from "@expo/vector-icons";
import { LinearGradient } from "expo-linear-gradient";
import { COLORS, SHADOW } from "../../components/theme";

// Exchange Item Component
const ExchangeItem = React.memo(({ item, navigation }) => {
  const scaleAnim = useRef(new Animated.Value(0.95)).current;
  const opacityAnim = useRef(new Animated.Value(0)).current;

  React.useEffect(() => {
    Animated.parallel([
      Animated.timing(scaleAnim, {
        toValue: 1,
        duration: 300,
        delay: 100,
        useNativeDriver: true,
      }),
      Animated.timing(opacityAnim, {
        toValue: 1,
        duration: 300,
        delay: 100,
        useNativeDriver: true,
      }),
    ]).start();
  }, []);

  const getStatusColor = (status) => {
    switch (status) {
      case "pending_confirmation":
        return "#FF9500";
      case "completed":
        return "#4CD964";
      case "cancelled":
        return "#FF3B30";
      default:
        return "#666";
    }
  };

  const getStatusText = (status) => {
    switch (status) {
      case "pending_confirmation":
        return "Chờ xác nhận";
      case "completed":
        return "Đã hoàn thành";
      case "cancelled":
        return "Đã hủy";
      default:
        return status;
    }
  };

  return (
    <Animated.View
      style={[
        styles.exchangeCardContainer,
        {
          transform: [{ scale: scaleAnim }],
          opacity: opacityAnim,
        },
      ]}
    >
      <View style={styles.exchangeCard}>
        {/* Header with partner info and status */}
        <View style={styles.exchangeHeader}>
          <View style={styles.partnerInfo}>
            <Image
              source={{ uri: item.partner.avatar }}
              style={styles.partnerAvatar}
            />
            <View>
              <Text style={styles.partnerName}>{item.partner.name}</Text>
              <View style={styles.ratingContainer}>
                <Ionicons name="star" size={14} color="#FFD700" />
                <Text style={styles.ratingText}>{item.partner.rating}</Text>
              </View>
            </View>
          </View>

          <View
            style={[
              styles.statusBadge,
              { backgroundColor: `${getStatusColor(item.status)}20` },
            ]}
          >
            <Text
              style={[
                styles.statusText,
                { color: getStatusColor(item.status) },
              ]}
            >
              {getStatusText(item.status)}
            </Text>
          </View>
        </View>

        {/* Exchange items */}
        <View style={styles.exchangeItems}>
          {/* My item */}
          <View style={styles.itemBox}>
            <View style={styles.itemImageContainer}>
              <Image
                source={{ uri: item.myItem.image }}
                style={styles.itemImage}
              />
              <LinearGradient
                colors={["transparent", "rgba(0,0,0,0.7)"]}
                style={styles.imageGradient}
              />
              <View style={styles.itemLabel}>
                <Text style={styles.itemLabelText}>Của tôi</Text>
              </View>
            </View>
            <View style={styles.itemInfo}>
              <Text style={styles.itemTitle} numberOfLines={2}>
                {item.myItem.title}
              </Text>
              <Text style={styles.itemCondition}>{item.myItem.condition}</Text>
            </View>
          </View>

          {/* Exchange icon */}
          <View style={styles.exchangeIconContainer}>
            <LinearGradient
              colors={["#4F8EF7", "#2D6CDF"]}
              style={styles.exchangeIconGradient}
              start={{ x: 0, y: 0 }}
              end={{ x: 1, y: 1 }}
            >
              <Ionicons name="swap-horizontal" size={20} color="#FFF" />
            </LinearGradient>
          </View>

          {/* Their item */}
          <View style={styles.itemBox}>
            <View style={styles.itemImageContainer}>
              <Image
                source={{ uri: item.theirItem.image }}
                style={styles.itemImage}
              />
              <LinearGradient
                colors={["transparent", "rgba(0,0,0,0.7)"]}
                style={styles.imageGradient}
              />
              <View style={[styles.itemLabel, styles.theirItemLabel]}>
                <Text style={styles.itemLabelText}>Đối phương</Text>
              </View>
            </View>
            <View style={styles.itemInfo}>
              <Text style={styles.itemTitle} numberOfLines={2}>
                {item.theirItem.title}
              </Text>
              <Text style={styles.itemCondition}>
                {item.theirItem.condition}
              </Text>
            </View>
          </View>
        </View>

        {/* Footer with date and actions */}
        <View style={styles.exchangeFooter}>
          <Text style={styles.exchangeDate}>{item.date}</Text>

          <View style={styles.actionButtons}>
            {item.status === "pending_confirmation" && (
              <TouchableOpacity
                style={[styles.actionButton, styles.cancelButton]}
                onPress={() => console.log("Cancel exchange:", item.id)}
              >
                <Text style={styles.cancelButtonText}>Hủy</Text>
              </TouchableOpacity>
            )}

            {item.status !== "cancelled" && (
              <TouchableOpacity
                style={[styles.actionButton, styles.chatButton]}
                onPress={() =>
                  navigation.navigate("ChatDetail", { id: item.chatId })
                }
              >
                <Ionicons name="chatbubble-outline" size={14} color="#4A90E2" />
                <Text style={styles.chatButtonText}>Chat</Text>
              </TouchableOpacity>
            )}

            {item.status === "completed" && !item.hasRated && (
              <TouchableOpacity
                style={[styles.actionButton, styles.rateButton]}
                onPress={() => console.log("Rate exchange:", item.id)}
              >
                <Ionicons name="star-outline" size={14} color="#4A90E2" />
                <Text style={styles.rateButtonText}>Đánh giá</Text>
              </TouchableOpacity>
            )}
          </View>
        </View>

        {item.status === "cancelled" && item.cancelReason && (
          <View style={styles.exchangeFooter}>
            <Text style={styles.cancelReason}>
              Lý do hủy: {item.cancelReason}
            </Text>
          </View>
        )}
      </View>
    </Animated.View>
  );
});

export default function MyExchangesScreen({ navigation }) {
  const [refreshing, setRefreshing] = useState(false);
  const [activeTab, setActiveTab] = useState("ongoing");
  const scrollY = useRef(new Animated.Value(0)).current;

  // Sample data
  const exchanges = {
    ongoing: [
      {
        id: "1",
        partner: {
          name: "Lê Văn D",
          avatar: "https://randomuser.me/api/portraits/men/32.jpg",
          rating: "4.7",
        },
        myItem: {
          title: "iPad Pro 2022",
          image: "https://picsum.photos/300/300?random=1",
          condition: "Mới - 100%",
        },
        theirItem: {
          title: "iPad Air 5",
          image: "https://picsum.photos/300/300?random=2",
          condition: "Đã sử dụng - Còn 90%",
        },
        status: "pending_confirmation",
        date: "15/1/2024",
        chatId: "chat1",
      },
      {
        id: "2",
        partner: {
          name: "Nguyễn Thị B",
          avatar: "https://randomuser.me/api/portraits/women/44.jpg",
          rating: "4.9",
        },
        myItem: {
          title: "iPhone 13 Pro Max",
          image: "https://picsum.photos/300/300?random=3",
          condition: "Đã sử dụng - Còn 95%",
        },
        theirItem: {
          title: "Samsung Galaxy S22 Ultra",
          image: "https://picsum.photos/300/300?random=4",
          condition: "Đã sử dụng - Còn 98%",
        },
        status: "pending_confirmation",
        date: "14/1/2024",
        chatId: "chat2",
      },
    ],
    completed: [
      {
        id: "3",
        partner: {
          name: "Trần Văn C",
          avatar: "https://randomuser.me/api/portraits/men/67.jpg",
          rating: "4.5",
        },
        myItem: {
          title: "MacBook Pro M1",
          image: "https://picsum.photos/300/300?random=5",
          condition: "Đã sử dụng - Còn 92%",
        },
        theirItem: {
          title: "Dell XPS 15",
          image: "https://picsum.photos/300/300?random=6",
          condition: "Đã sử dụng - Còn 90%",
        },
        status: "completed",
        date: "10/1/2024",
        chatId: "chat3",
        hasRated: false,
      },
    ],
    cancelled: [
      {
        id: "4",
        partner: {
          name: "Lê Văn D",
          avatar: "https://randomuser.me/api/portraits/men/32.jpg",
          rating: "4.7",
        },
        myItem: {
          title: "iPad Pro 2022",
          image: "https://picsum.photos/300/300?random=7",
          condition: "Mới - 100%",
        },
        theirItem: {
          title: "iPad Air 5",
          image: "https://picsum.photos/300/300?random=8",
          condition: "Đã sử dụng - Còn 90%",
        },
        status: "cancelled",
        date: "15/1/2024",
        chatId: "chat4",
        cancelReason: "Người dùng hủy yêu cầu",
      },
    ],
  };

  const onRefresh = useCallback(() => {
    setRefreshing(true);
    setTimeout(() => {
      setRefreshing(false);
    }, 2000);
  }, []);

  const renderExchangeItem = useCallback(
    ({ item }) => <ExchangeItem item={item} navigation={navigation} />,
    [navigation]
  );

  const EmptyListComponent = useCallback(() => {
    return (
      <View style={styles.emptyContainer}>
        <Ionicons name="swap-horizontal" size={64} color="#DDD" />
        <Text style={styles.emptyText}>
          {activeTab === "ongoing"
            ? "Không có trao đổi nào đang diễn ra"
            : activeTab === "completed"
            ? "Chưa có trao đổi nào hoàn thành"
            : "Không có trao đổi nào bị hủy"}
        </Text>
        <TouchableOpacity
          style={styles.emptyButton}
          onPress={() => navigation.navigate("Home")}
        >
          <LinearGradient
            colors={["#4F8EF7", "#2D6CDF"]}
            style={styles.emptyButtonGradient}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 1 }}
          >
            <Text style={styles.emptyButtonText}>Khám phá sản phẩm</Text>
          </LinearGradient>
        </TouchableOpacity>
      </View>
    );
  }, [activeTab, navigation]);

  return (
    <SafeAreaView style={styles.container} edges={["right", "left"]}>
      <StatusBar barStyle="dark-content" backgroundColor="#FFF" />

      {/* Header với mũi tên quay lại bên cạnh tiêu đề */}
      <View style={styles.header}>
        <View style={styles.headerRow}>
          <TouchableOpacity
            style={styles.backButton}
            onPress={() => navigation.goBack()}
          >
            <Ionicons name="chevron-back" size={24} color="#333" />
          </TouchableOpacity>
          <Text style={styles.headerTitle}>Lịch sử trao đổi</Text>
        </View>
      </View>

      {/* Tab Selector */}
      <View style={styles.tabContainer}>
        <TouchableOpacity
          style={[
            styles.tabButton,
            activeTab === "ongoing" && styles.activeTabButton,
          ]}
          onPress={() => setActiveTab("ongoing")}
        >
          <Text
            style={[
              styles.tabButtonText,
              activeTab === "ongoing" && styles.activeTabButtonText,
            ]}
          >
            Đang trao đổi ({exchanges.ongoing.length})
          </Text>
          {activeTab === "ongoing" && (
            <View style={styles.activeTabIndicator} />
          )}
        </TouchableOpacity>

        <TouchableOpacity
          style={[
            styles.tabButton,
            activeTab === "completed" && styles.activeTabButton,
          ]}
          onPress={() => setActiveTab("completed")}
        >
          <Text
            style={[
              styles.tabButtonText,
              activeTab === "completed" && styles.activeTabButtonText,
            ]}
          >
            Hoàn thành ({exchanges.completed.length})
          </Text>
          {activeTab === "completed" && (
            <View style={styles.activeTabIndicator} />
          )}
        </TouchableOpacity>

        <TouchableOpacity
          style={[
            styles.tabButton,
            activeTab === "cancelled" && styles.activeTabButton,
          ]}
          onPress={() => setActiveTab("cancelled")}
        >
          <Text
            style={[
              styles.tabButtonText,
              activeTab === "cancelled" && styles.activeTabButtonText,
            ]}
          >
            Đã hủy ({exchanges.cancelled.length})
          </Text>
          {activeTab === "cancelled" && (
            <View style={styles.activeTabIndicator} />
          )}
        </TouchableOpacity>
      </View>

      {/* Exchange List */}
      <FlatList
        data={exchanges[activeTab]}
        renderItem={renderExchangeItem}
        keyExtractor={(item) => item.id}
        contentContainerStyle={styles.listContainer}
        showsVerticalScrollIndicator={false}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }
        ListEmptyComponent={EmptyListComponent}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F8F8F8",
  },
  header: {
    backgroundColor: "#FFF",
    paddingHorizontal: 15,
    paddingVertical: 10,
    paddingTop: 50,
    borderBottomWidth: 1,
    borderBottomColor: "#F0F0F0",
  },
  headerRow: {
    flexDirection: "row",
    alignItems: "center",
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
    backgroundColor: "#FFF",
    paddingHorizontal: 15,
    borderBottomWidth: 1,
    borderBottomColor: "#F0F0F0",
  },
  tabButton: {
    paddingVertical: 15,
    marginRight: 15,
    position: "relative",
  },
  activeTabButton: {
    borderBottomWidth: 0,
  },
  tabButtonText: {
    fontSize: 14,
    fontWeight: "600",
    color: "#999",
  },
  activeTabButtonText: {
    color: COLORS.primary,
  },
  activeTabIndicator: {
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0,
    height: 3,
    backgroundColor: COLORS.primary,
    borderRadius: 3,
  },
  listContainer: {
    padding: 16,
    paddingBottom: 30,
  },
  exchangeCardContainer: {
    marginBottom: 16,
    borderRadius: 16,
    overflow: "hidden",
    ...SHADOW.medium,
  },
  exchangeCard: {
    backgroundColor: "#FFF",
    borderRadius: 16,
    overflow: "hidden",
  },
  exchangeHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: "#F0F0F0",
  },
  partnerInfo: {
    flexDirection: "row",
    alignItems: "center",
  },
  partnerAvatar: {
    width: 40,
    height: 40,
    borderRadius: 20,
    marginRight: 12,
  },
  partnerName: {
    fontSize: 16,
    fontWeight: "600",
    color: "#333",
    marginBottom: 2,
  },
  ratingContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
  ratingText: {
    fontSize: 14,
    color: "#666",
    marginLeft: 4,
  },
  statusBadge: {
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 20,
  },
  statusText: {
    fontSize: 12,
    fontWeight: "600",
  },
  exchangeItems: {
    flexDirection: "row",
    padding: 16,
    alignItems: "center",
    borderBottomWidth: 1,
    borderBottomColor: "#F0F0F0",
  },
  itemBox: {
    flex: 1,
  },
  itemImageContainer: {
    height: 120,
    borderRadius: 12,
    overflow: "hidden",
    marginBottom: 8,
    position: "relative",
  },
  itemImage: {
    width: "100%",
    height: "100%",
    borderRadius: 12,
  },
  imageGradient: {
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0,
    height: 50,
  },
  itemLabel: {
    position: "absolute",
    top: 8,
    left: 8,
    backgroundColor: "rgba(74,144,226,0.9)",
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 4,
  },
  theirItemLabel: {
    backgroundColor: "rgba(255,149,0,0.9)",
  },
  itemLabelText: {
    color: "#FFF",
    fontSize: 10,
    fontWeight: "600",
  },
  itemInfo: {
    paddingHorizontal: 4,
  },
  itemTitle: {
    fontSize: 14,
    fontWeight: "600",
    color: "#333",
    marginBottom: 4,
  },
  itemCondition: {
    fontSize: 12,
    color: "#666",
  },
  exchangeIconContainer: {
    width: 40,
    height: 40,
    marginHorizontal: 10,
    borderRadius: 20,
    overflow: "hidden",
    ...SHADOW.small,
  },
  exchangeIconGradient: {
    width: "100%",
    height: "100%",
    justifyContent: "center",
    alignItems: "center",
  },
  exchangeFooter: {
    padding: 16,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  exchangeDate: {
    fontSize: 14,
    color: "#999",
  },
  actionButtons: {
    flexDirection: "row",
  },
  actionButton: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 20,
    marginLeft: 8,
  },
  cancelButton: {
    backgroundColor: "rgba(255,59,48,0.1)",
  },
  cancelButtonText: {
    color: "#FF3B30",
    fontSize: 14,
    fontWeight: "600",
  },
  chatButton: {
    backgroundColor: "rgba(74,144,226,0.1)",
    flexDirection: "row",
    alignItems: "center",
  },
  chatButtonText: {
    color: "#4A90E2",
    fontSize: 14,
    fontWeight: "600",
    marginLeft: 4,
  },
  rateButton: {
    backgroundColor: "rgba(74,144,226,0.1)",
    flexDirection: "row",
    alignItems: "center",
  },
  rateButtonText: {
    color: "#4A90E2",
    fontSize: 14,
    fontWeight: "600",
    marginLeft: 4,
  },
  cancelReason: {
    fontSize: 14,
    color: "#FF3B30",
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
