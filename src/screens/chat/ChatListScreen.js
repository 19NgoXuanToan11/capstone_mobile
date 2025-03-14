import React, { useState, useRef } from "react";
import {
  View,
  Text,
  FlatList,
  TouchableOpacity,
  Image,
  RefreshControl,
  TextInput,
  Animated,
  StyleSheet,
  StatusBar,
  Platform,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Ionicons } from "@expo/vector-icons";
import { LinearGradient } from "expo-linear-gradient";
import { COLORS, SHADOW } from "../../components/theme";

export default function ChatListScreen({ navigation }) {
  const [refreshing, setRefreshing] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [activeTab, setActiveTab] = useState("all");
  const translateX = useRef(new Animated.Value(0)).current;

  const chats = [
    {
      id: "1",
      user: {
        id: "123",
        name: "Nguyễn Văn A",
        avatar: "https://randomuser.me/api/portraits/men/32.jpg",
        online: true,
        lastActive: "",
        verified: true,
      },
      lastMessage: {
        text: "Sản phẩm còn không bạn?",
        timestamp: "09:30",
        unread: true,
        isImage: false,
        isSent: false,
        isDelivered: false,
        isRead: false,
      },
      product: {
        id: "p1",
        title: "iPhone 14 Pro Max 256GB",
        image: "https://example.com/iphone.jpg",
        price: "28.990.000đ",
        status: "available",
      },
      pinned: true,
    },
    {
      id: "2",
      user: {
        id: "456",
        name: "Trần Thị B",
        avatar: "https://randomuser.me/api/portraits/women/44.jpg",
        online: false,
        lastActive: "2 giờ trước",
        verified: false,
      },
      lastMessage: {
        text: "Ok bạn, hẹn gặp lại",
        timestamp: "Hôm qua",
        unread: false,
        isImage: false,
        isSent: true,
        isDelivered: true,
        isRead: true,
      },
      product: {
        id: "p2",
        title: "MacBook Pro M1 13 inch",
        image: "https://example.com/macbook.jpg",
        price: "24.990.000đ",
        status: "sold",
      },
      pinned: false,
    },
    {
      id: "3",
      user: {
        id: "789",
        name: "Lê Văn C",
        avatar: "https://randomuser.me/api/portraits/men/67.jpg",
        online: true,
        lastActive: "",
        verified: true,
      },
      lastMessage: {
        text: "Đã gửi một hình ảnh",
        timestamp: "Thứ 2",
        unread: true,
        isImage: true,
        isSent: false,
        isDelivered: false,
        isRead: false,
      },
      product: {
        id: "p3",
        title: "Apple Watch Series 7",
        image: "https://example.com/watch.jpg",
        price: "9.990.000đ",
        status: "available",
      },
      pinned: false,
    },
  ];

  const filteredChats = chats.filter((chat) => {
    if (activeTab === "unread" && !chat.lastMessage.unread) return false;
    if (searchQuery) {
      return (
        chat.user.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        chat.product.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        chat.lastMessage.text.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }
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

  const renderChatItem = ({ item }) => (
    <TouchableOpacity
      style={[styles.chatItem, item.pinned && styles.pinnedChat]}
      onPress={() => {
        navigation.navigate("Chat", {
          screen: "ChatDetail",
          params: {
            userId: item.user.id,
            userName: item.user.name,
            userAvatar: item.user.avatar,
            productId: item.product.id,
            productTitle: item.product.title,
            productImage: item.product.image,
            productPrice: item.product.price,
          },
        });
      }}
    >
      <View style={styles.chatItemContent}>
        <View style={styles.avatarContainer}>
          <Image source={{ uri: item.user.avatar }} style={styles.avatar} />
          {item.user.online ? (
            <View style={styles.onlineIndicator} />
          ) : (
            item.user.lastActive && (
              <View style={styles.lastActiveContainer}>
                <Text style={styles.lastActiveText}>
                  {item.user.lastActive}
                </Text>
              </View>
            )
          )}
        </View>

        <View style={styles.chatContent}>
          <View style={styles.chatHeader}>
            <View style={styles.nameContainer}>
              <Text style={styles.userName}>{item.user.name}</Text>
              {item.user.verified && (
                <Ionicons name="checkmark-circle" size={16} color="#4CD964" />
              )}
              {item.pinned && (
                <Ionicons
                  name="pin"
                  size={14}
                  color="#FF9500"
                  style={styles.pinIcon}
                />
              )}
            </View>
            <Text style={styles.timestamp}>{item.lastMessage.timestamp}</Text>
          </View>

          <View style={styles.messagePreview}>
            <View style={styles.messageTextContainer}>
              {item.lastMessage.isSent && (
                <Ionicons
                  name={
                    item.lastMessage.isRead ? "checkmark-done" : "checkmark"
                  }
                  size={16}
                  color={item.lastMessage.isRead ? "#4CD964" : "#999"}
                  style={styles.messageStatus}
                />
              )}
              {item.lastMessage.isImage && (
                <Ionicons
                  name="image"
                  size={16}
                  color="#666"
                  style={styles.messageIcon}
                />
              )}
              <Text
                style={[
                  styles.lastMessage,
                  item.lastMessage.unread && styles.unreadMessage,
                ]}
                numberOfLines={1}
              >
                {item.lastMessage.text}
              </Text>
            </View>
            {item.lastMessage.unread && (
              <View style={styles.unreadBadge}>
                <Text style={styles.unreadBadgeText}>1</Text>
              </View>
            )}
          </View>

          <View style={styles.productPreview}>
            <View style={styles.productImageContainer}>
              <Image
                source={{ uri: item.product.image }}
                style={styles.productImage}
              />
              {item.product.status === "sold" && (
                <View style={styles.soldOverlay}>
                  <Text style={styles.soldText}>Đã bán</Text>
                </View>
              )}
            </View>
            <View style={styles.productInfo}>
              <Text style={styles.productTitle} numberOfLines={1}>
                {item.product.title}
              </Text>
              <Text style={styles.productPrice}>{item.product.price}</Text>
            </View>
          </View>
        </View>
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
          <Text
            style={[
              styles.tabText,
              activeTab === "unread" && styles.activeTabText,
            ]}
          >
            Chưa đọc
            {chats.filter((chat) => chat.lastMessage.unread).length > 0 && (
              <View style={styles.tabBadge}>
                <Text style={styles.tabBadgeText}>
                  {chats.filter((chat) => chat.lastMessage.unread).length}
                </Text>
              </View>
            )}
          </Text>
        </TouchableOpacity>
      </View>
    </View>
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
          <Text style={styles.headerTitle}>Tin nhắn</Text>
          <View style={styles.headerActions}>
            <TouchableOpacity style={styles.headerButton}>
              <Ionicons name="search" size={24} color="#1A1A1A" />
            </TouchableOpacity>
            <TouchableOpacity style={styles.headerButton}>
              <Ionicons name="ellipsis-horizontal" size={24} color="#1A1A1A" />
            </TouchableOpacity>
          </View>
        </View>
      </View>

      <View style={styles.searchContainer}>
        <View style={styles.searchBar}>
          <Ionicons name="search" size={20} color="#999" />
          <TextInput
            style={styles.searchInput}
            placeholder="Tìm kiếm tin nhắn..."
            value={searchQuery}
            onChangeText={setSearchQuery}
            placeholderTextColor="#999"
          />
          {searchQuery.length > 0 && (
            <TouchableOpacity
              onPress={() => setSearchQuery("")}
              style={styles.clearButton}
            >
              <Ionicons name="close-circle" size={20} color="#999" />
            </TouchableOpacity>
          )}
        </View>
      </View>

      <FlatList
        data={filteredChats}
        renderItem={renderChatItem}
        keyExtractor={(item) => item.id}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }
        contentContainerStyle={styles.chatList}
        ListHeaderComponent={renderHeader}
        ListEmptyComponent={
          <View style={styles.emptyContainer}>
            <Ionicons name="chatbubble-outline" size={64} color="#CCC" />
            <Text style={styles.emptyText}>
              {searchQuery
                ? "Không tìm thấy tin nhắn nào"
                : activeTab === "unread"
                ? "Không có tin nhắn chưa đọc"
                : "Bạn chưa có cuộc trò chuyện nào"}
            </Text>
            {!searchQuery && activeTab === "all" && (
              <TouchableOpacity style={styles.startChatButton}>
                <Text style={styles.startChatText}>Bắt đầu trò chuyện</Text>
              </TouchableOpacity>
            )}
          </View>
        }
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F8F9FA",
  },
  headerContainer: {
    backgroundColor: "#FFFFFF",
    paddingTop: Platform.OS === "android" ? StatusBar.currentHeight : 44,
    ...SHADOW.medium,
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 16,
    paddingVertical: 12,
    backgroundColor: COLORS.white,
  },
  headerTitle: {
    fontSize: 28,
    fontWeight: "700",
    color: "#1A1A1A",
  },
  headerActions: {
    flexDirection: "row",
  },
  headerButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    justifyContent: "center",
    alignItems: "center",
    marginLeft: 8,
    backgroundColor: "#F1F3F5",
  },
  searchContainer: {
    padding: 12,
    backgroundColor: COLORS.white,
    borderBottomWidth: 1,
    borderBottomColor: "#EEEEEE",
  },
  searchBar: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#F1F3F5",
    borderRadius: 12,
    paddingHorizontal: 12,
    height: 40,
  },
  searchInput: {
    flex: 1,
    fontSize: 16,
    marginLeft: 8,
    color: "#1A1A1A",
  },
  clearButton: {
    padding: 4,
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
  chatList: {
    paddingBottom: 16,
  },
  chatItem: {
    backgroundColor: COLORS.white,
    marginHorizontal: 16,
    marginVertical: 6,
    borderRadius: 16,
    ...SHADOW.small,
  },
  pinnedChat: {
    borderLeftWidth: 3,
    borderLeftColor: "#FF9500",
  },
  chatItemContent: {
    flexDirection: "row",
    padding: 12,
  },
  avatarContainer: {
    position: "relative",
    marginRight: 12,
  },
  avatar: {
    width: 56,
    height: 56,
    borderRadius: 28,
    borderWidth: 2,
    borderColor: COLORS.white,
  },
  onlineIndicator: {
    position: "absolute",
    bottom: 0,
    right: 0,
    width: 14,
    height: 14,
    borderRadius: 7,
    backgroundColor: "#4CD964",
    borderWidth: 2,
    borderColor: COLORS.white,
  },
  lastActiveContainer: {
    position: "absolute",
    bottom: -4,
    right: -4,
    backgroundColor: "rgba(0,0,0,0.6)",
    borderRadius: 8,
    paddingHorizontal: 4,
    paddingVertical: 2,
  },
  lastActiveText: {
    color: COLORS.white,
    fontSize: 8,
    fontWeight: "500",
  },
  chatContent: {
    flex: 1,
  },
  chatHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 4,
  },
  nameContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
  userName: {
    fontSize: 16,
    fontWeight: "600",
    color: "#1A1A1A",
    marginRight: 4,
  },
  pinIcon: {
    marginLeft: 4,
  },
  timestamp: {
    fontSize: 12,
    color: "#999",
  },
  messagePreview: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 8,
  },
  messageTextContainer: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
  },
  messageStatus: {
    marginRight: 4,
  },
  messageIcon: {
    marginRight: 4,
  },
  lastMessage: {
    fontSize: 14,
    color: "#666",
    flex: 1,
  },
  unreadMessage: {
    color: "#1A1A1A",
    fontWeight: "500",
  },
  unreadBadge: {
    backgroundColor: COLORS.primary,
    width: 20,
    height: 20,
    borderRadius: 10,
    justifyContent: "center",
    alignItems: "center",
    marginLeft: 8,
  },
  unreadBadgeText: {
    color: COLORS.white,
    fontSize: 12,
    fontWeight: "600",
  },
  productPreview: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#F8F9FA",
    borderRadius: 8,
    padding: 8,
  },
  productImageContainer: {
    position: "relative",
    marginRight: 8,
  },
  productImage: {
    width: 40,
    height: 40,
    borderRadius: 8,
  },
  soldOverlay: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: "rgba(0,0,0,0.5)",
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 8,
  },
  soldText: {
    color: COLORS.white,
    fontSize: 10,
    fontWeight: "600",
  },
  productInfo: {
    flex: 1,
  },
  productTitle: {
    fontSize: 12,
    color: "#1A1A1A",
    marginBottom: 2,
  },
  productPrice: {
    fontSize: 12,
    fontWeight: "600",
    color: COLORS.primary,
  },
  emptyContainer: {
    alignItems: "center",
    justifyContent: "center",
    padding: 32,
  },
  emptyText: {
    fontSize: 16,
    color: "#666",
    textAlign: "center",
    marginTop: 16,
    marginBottom: 24,
  },
  startChatButton: {
    backgroundColor: COLORS.primary,
    paddingHorizontal: 24,
    paddingVertical: 12,
    borderRadius: 24,
  },
  startChatText: {
    color: COLORS.white,
    fontSize: 16,
    fontWeight: "600",
  },
});
