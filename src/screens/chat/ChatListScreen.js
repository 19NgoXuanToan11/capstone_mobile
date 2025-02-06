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
import styles from "../../styles/ChatStyles";

export default function ChatListScreen({ navigation }) {
  const [refreshing, setRefreshing] = useState(false);

  // Mock data - thay thế bằng dữ liệu thực từ API
  const chats = [
    {
      id: "1",
      user: {
        id: "123",
        name: "Nguyễn Văn A",
        avatar: "https://picsum.photos/200/200?random=1",
        online: true,
      },
      lastMessage: {
        text: "Sản phẩm còn không bạn?",
        timestamp: "09:30",
        unread: true,
      },
      product: {
        title: "iPhone 12 Pro Max",
        image: "https://picsum.photos/100/100?random=1",
      },
    },
    {
      id: "2",
      user: {
        id: "456",
        name: "Trần Thị B",
        avatar: "https://picsum.photos/200/200?random=2",
        online: false,
      },
      lastMessage: {
        text: "Ok bạn, hẹn gặp lại",
        timestamp: "Hôm qua",
        unread: false,
      },
      product: {
        title: "MacBook Pro M1",
        image: "https://picsum.photos/100/100?random=2",
      },
    },
  ];

  const onRefresh = React.useCallback(() => {
    setRefreshing(true);
    // TODO: Implement refresh logic
    setTimeout(() => {
      setRefreshing(false);
    }, 2000);
  }, []);

  const renderChatItem = ({ item }) => (
    <TouchableOpacity
      style={styles.chatItem}
      onPress={() =>
        navigation.navigate("ChatDetail", {
          userId: item.user.id,
          userName: item.user.name,
          userAvatar: item.user.avatar,
          productId: item.product.id,
        })
      }
    >
      <View style={styles.avatarContainer}>
        <Image source={{ uri: item.user.avatar }} style={styles.avatar} />
        {item.user.online && <View style={styles.onlineIndicator} />}
      </View>

      <View style={styles.chatContent}>
        <View style={styles.chatHeader}>
          <Text style={styles.userName}>{item.user.name}</Text>
          <Text style={styles.timestamp}>{item.lastMessage.timestamp}</Text>
        </View>

        <View style={styles.messagePreview}>
          <Text
            style={[
              styles.lastMessage,
              item.lastMessage.unread && styles.unreadMessage,
            ]}
            numberOfLines={1}
          >
            {item.lastMessage.text}
          </Text>
          {item.lastMessage.unread && (
            <View style={styles.unreadBadge}>
              <Text style={styles.unreadBadgeText}>1</Text>
            </View>
          )}
        </View>

        <View style={styles.productPreview}>
          <Image
            source={{ uri: item.product.image }}
            style={styles.productImage}
          />
          <Text style={styles.productTitle} numberOfLines={1}>
            {item.product.title}
          </Text>
        </View>
      </View>
    </TouchableOpacity>
  );

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Tin nhắn</Text>
      </View>

      <FlatList
        data={chats}
        renderItem={renderChatItem}
        keyExtractor={(item) => item.id}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }
        contentContainerStyle={styles.chatList}
        ListEmptyComponent={
          <View style={styles.emptyContainer}>
            <Ionicons name="chatbubble-outline" size={48} color="#666" />
            <Text style={styles.emptyText}>
              Bạn chưa có cuộc trò chuyện nào
            </Text>
          </View>
        }
      />
    </SafeAreaView>
  );
}
