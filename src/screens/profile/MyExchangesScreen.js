import React, { useState } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  FlatList,
  Image,
  RefreshControl,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Ionicons } from "@expo/vector-icons";
import styles from "../../styles/ProfileStyles";

export default function MyExchangesScreen({ navigation }) {
  const [refreshing, setRefreshing] = useState(false);
  const [activeTab, setActiveTab] = useState("ongoing");

  const exchanges = {
    ongoing: [
      {
        id: "1",
        myItem: {
          title: "iPhone 12 Pro Max",
          image: "https://picsum.photos/300/300?random=1",
          condition: "Đã sử dụng - Còn 95%",
        },
        theirItem: {
          title: "iPhone 13 Pro",
          image: "https://picsum.photos/300/300?random=2",
          condition: "Đã sử dụng - Còn 98%",
        },
        partner: {
          name: "Nguyễn Văn B",
          avatar: "https://picsum.photos/50/50?random=1",
          rating: 4.8,
        },
        status: "pending_confirmation",
        date: "2024-02-15",
      },
    ],
    completed: [
      {
        id: "2",
        myItem: {
          title: "MacBook Air M1",
          image: "https://picsum.photos/300/300?random=3",
          condition: "Mới - 99%",
        },
        theirItem: {
          title: "MacBook Pro M1",
          image: "https://picsum.photos/300/300?random=4",
          condition: "Đã sử dụng - Còn 95%",
        },
        partner: {
          name: "Trần Thị C",
          avatar: "https://picsum.photos/50/50?random=2",
          rating: 4.9,
        },
        status: "completed",
        date: "2024-01-20",
        rating: 5,
      },
    ],
    cancelled: [
      {
        id: "3",
        myItem: {
          title: "iPad Pro 2022",
          image: "https://picsum.photos/300/300?random=5",
          condition: "Mới - 100%",
        },
        theirItem: {
          title: "iPad Air 5",
          image: "https://picsum.photos/300/300?random=6",
          condition: "Đã sử dụng - Còn 90%",
        },
        partner: {
          name: "Lê Văn D",
          avatar: "https://picsum.photos/50/50?random=3",
          rating: 4.7,
        },
        status: "cancelled",
        date: "2024-01-15",
        cancelReason: "Người dùng hủy yêu cầu",
      },
    ],
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

  const onRefresh = React.useCallback(() => {
    setRefreshing(true);
    setTimeout(() => {
      setRefreshing(false);
    }, 2000);
  }, []);

  const renderExchangeItem = ({ item }) => (
    <View style={styles.exchangeCard}>
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
            style={[styles.statusText, { color: getStatusColor(item.status) }]}
          >
            {getStatusText(item.status)}
          </Text>
        </View>
      </View>

      <View style={styles.exchangeItems}>
        <View style={styles.itemBox}>
          <Image source={{ uri: item.myItem.image }} style={styles.itemImage} />
          <View style={styles.itemInfo}>
            <Text style={styles.itemTitle} numberOfLines={2}>
              {item.myItem.title}
            </Text>
            <Text style={styles.itemCondition}>{item.myItem.condition}</Text>
          </View>
        </View>

        <View style={styles.exchangeIcon}>
          <Ionicons name="swap-horizontal" size={24} color="#4A90E2" />
        </View>

        <View style={styles.itemBox}>
          <Image
            source={{ uri: item.theirItem.image }}
            style={styles.itemImage}
          />
          <View style={styles.itemInfo}>
            <Text style={styles.itemTitle} numberOfLines={2}>
              {item.theirItem.title}
            </Text>
            <Text style={styles.itemCondition}>{item.theirItem.condition}</Text>
          </View>
        </View>
      </View>

      <View style={styles.exchangeFooter}>
        <Text style={styles.exchangeDate}>
          {new Date(item.date).toLocaleDateString("vi-VN")}
        </Text>

        {item.status === "pending_confirmation" && (
          <View style={styles.actionButtons}>
            <TouchableOpacity
              style={[styles.actionButton, styles.cancelButton]}
              onPress={() => {
                /* TODO: Handle cancel */
              }}
            >
              <Text style={styles.cancelButtonText}>Hủy yêu cầu</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={[styles.actionButton, styles.chatButton]}
              onPress={() =>
                navigation.navigate("Chat", { partnerId: item.partner.id })
              }
            >
              <Ionicons name="chatbubble-outline" size={16} color="#4A90E2" />
              <Text style={styles.chatButtonText}>Nhắn tin</Text>
            </TouchableOpacity>
          </View>
        )}

        {item.status === "completed" && !item.rating && (
          <TouchableOpacity
            style={[styles.actionButton, styles.rateButton]}
            onPress={() => {
              /* TODO: Handle rating */
            }}
          >
            <Ionicons name="star-outline" size={16} color="#4A90E2" />
            <Text style={styles.rateButtonText}>Đánh giá</Text>
          </TouchableOpacity>
        )}

        {item.status === "cancelled" && (
          <Text style={styles.cancelReason}>{item.cancelReason}</Text>
        )}
      </View>
    </View>
  );

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity
          style={styles.backButton}
          onPress={() => navigation.goBack()}
        >
          <Ionicons name="arrow-back" size={24} color="#333" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Lịch sử trao đổi</Text>
        <View style={styles.headerRight} />
      </View>

      <View style={styles.exchangeTabContainer}>
        <TouchableOpacity
          style={[
            styles.exchangeTab,
            activeTab === "ongoing" && styles.activeExchangeTab,
          ]}
          onPress={() => setActiveTab("ongoing")}
        >
          <Text
            style={[
              styles.exchangeTabText,
              activeTab === "ongoing" && styles.activeExchangeTabText,
            ]}
          >
            Đang trao đổi ({exchanges.ongoing.length})
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[
            styles.exchangeTab,
            activeTab === "completed" && styles.activeExchangeTab,
          ]}
          onPress={() => setActiveTab("completed")}
        >
          <Text
            style={[
              styles.exchangeTabText,
              activeTab === "completed" && styles.activeExchangeTabText,
            ]}
          >
            Hoàn thành ({exchanges.completed.length})
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[
            styles.exchangeTab,
            activeTab === "cancelled" && styles.activeExchangeTab,
          ]}
          onPress={() => setActiveTab("cancelled")}
        >
          <Text
            style={[
              styles.exchangeTabText,
              activeTab === "cancelled" && styles.activeExchangeTabText,
            ]}
          >
            Đã hủy ({exchanges.cancelled.length})
          </Text>
        </TouchableOpacity>
      </View>

      <FlatList
        data={exchanges[activeTab]}
        renderItem={renderExchangeItem}
        keyExtractor={(item) => item.id}
        contentContainerStyle={styles.exchangeList}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }
        showsVerticalScrollIndicator={false}
        ListEmptyComponent={
          <View style={styles.emptyContainer}>
            <Ionicons name="swap-horizontal" size={48} color="#666" />
            <Text style={styles.emptyText}>
              {activeTab === "ongoing"
                ? "Không có trao đổi nào đang diễn ra"
                : activeTab === "completed"
                ? "Chưa có trao đổi nào hoàn thành"
                : "Không có trao đổi nào bị hủy"}
            </Text>
          </View>
        }
      />
    </SafeAreaView>
  );
}
