import React, { useState } from "react";
import {
  View,
  Text,
  FlatList,
  TouchableOpacity,
  Image,
  RefreshControl,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Ionicons } from "@expo/vector-icons";
import styles from "../../styles/NotificationStyles";

export default function NotificationListScreen({ navigation }) {
  const [refreshing, setRefreshing] = useState(false);

  // Mock data - thay thế bằng dữ liệu thực từ API
  const notifications = [
    {
      id: "1",
      type: "exchange_request",
      title: "Yêu cầu trao đổi mới",
      message: "Nguyễn Văn A muốn trao đổi iPhone 13 Pro với sản phẩm của bạn",
      image: "https://picsum.photos/100/100?random=1",
      timestamp: "2 phút trước",
      read: false,
      data: {
        exchangeId: "123",
        productId: "456",
      },
    },
    {
      id: "2",
      type: "message",
      title: "Tin nhắn mới",
      message: "Bạn có tin nhắn mới từ Trần Thị B",
      image: "https://picsum.photos/100/100?random=2",
      timestamp: "1 giờ trước",
      read: true,
      data: {
        chatId: "789",
      },
    },
    {
      id: "3",
      type: "system",
      title: "Cập nhật ứng dụng",
      message: "Phiên bản mới đã sẵn sàng để cập nhật",
      timestamp: "Hôm qua",
      read: false,
      data: {
        url: "app_store_url",
      },
    },
  ];

  const onRefresh = React.useCallback(() => {
    setRefreshing(true);
    // TODO: Fetch new notifications
    setTimeout(() => {
      setRefreshing(false);
    }, 2000);
  }, []);

  const handleNotificationPress = (notification) => {
    // Đánh dấu đã đọc
    // TODO: Mark as read API call

    // Điều hướng dựa trên loại thông báo
    switch (notification.type) {
      case "exchange_request":
        navigation.navigate("ExchangeDetail", {
          exchangeId: notification.data.exchangeId,
        });
        break;
      case "message":
        navigation.navigate("ChatDetail", {
          chatId: notification.data.chatId,
        });
        break;
      case "system":
        navigation.navigate("NotificationDetail", {
          notificationId: notification.id,
        });
        break;
    }
  };

  const renderNotificationItem = ({ item }) => (
    <TouchableOpacity
      style={[styles.notificationItem, !item.read && styles.unreadItem]}
      onPress={() => handleNotificationPress(item)}
    >
      {item.image ? (
        <Image source={{ uri: item.image }} style={styles.notificationImage} />
      ) : (
        <View style={[styles.iconContainer, styles[`${item.type}Icon`]]}>
          <Ionicons
            name={
              item.type === "exchange_request"
                ? "git-pull-request"
                : item.type === "message"
                ? "chatbubble"
                : "information-circle"
            }
            size={24}
            color="#fff"
          />
        </View>
      )}

      <View style={styles.notificationContent}>
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
      </View>

      {!item.read && <View style={styles.unreadDot} />}
    </TouchableOpacity>
  );

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Thông báo</Text>
        <TouchableOpacity
          style={styles.settingsButton}
          onPress={() => navigation.navigate("NotificationSettings")}
        >
          <Ionicons name="settings-outline" size={24} color="#333" />
        </TouchableOpacity>
      </View>

      <FlatList
        data={notifications}
        renderItem={renderNotificationItem}
        keyExtractor={(item) => item.id}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }
        contentContainerStyle={styles.notificationList}
        ListEmptyComponent={
          <View style={styles.emptyContainer}>
            <Ionicons name="notifications-outline" size={48} color="#666" />
            <Text style={styles.emptyText}>Bạn chưa có thông báo nào</Text>
          </View>
        }
      />
    </SafeAreaView>
  );
}
