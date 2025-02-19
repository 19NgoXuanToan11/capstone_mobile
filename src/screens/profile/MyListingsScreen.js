import React, { useState } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  FlatList,
  Image,
  RefreshControl,
  Alert,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Ionicons } from "@expo/vector-icons";
import styles from "../../styles/ProfileStyles";

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
        date: "2024-02-15",
        status: "active",
      },
      {
        id: "2",
        title: "MacBook Pro M1",
        image: "https://picsum.photos/300/300?random=2",
        condition: "Mới - 99%",
        wantToExchange: ["MacBook Pro M2", "MacBook Air M2"],
        views: 189,
        interested: 8,
        date: "2024-02-14",
        status: "active",
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
        date: "2024-01-20",
        status: "inactive",
      },
    ],
  };

  const onRefresh = React.useCallback(() => {
    setRefreshing(true);
    setTimeout(() => {
      setRefreshing(false);
    }, 2000);
  }, []);

  const handleDeleteListing = (itemId) => {
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
  };

  const renderItem = ({ item }) => (
    <View style={styles.listingCard}>
      <Image source={{ uri: item.image }} style={styles.listingImage} />

      <View style={styles.listingContent}>
        <View style={styles.listingHeader}>
          <Text style={styles.listingTitle} numberOfLines={1}>
            {item.title}
          </Text>
          <TouchableOpacity
            onPress={() => handleDeleteListing(item.id)}
            style={styles.deleteButton}
          >
            <Ionicons name="trash-outline" size={20} color="#FF3B30" />
          </TouchableOpacity>
        </View>

        <Text style={styles.listingCondition}>{item.condition}</Text>

        <View style={styles.exchangeWishlist}>
          <Text style={styles.exchangeLabel}>Muốn đổi: </Text>
          {item.wantToExchange.map((wish, index) => (
            <Text key={index} style={styles.exchangeItem}>
              {index > 0 ? ", " : ""}
              {wish}
            </Text>
          ))}
        </View>

        <View style={styles.listingStats}>
          <View style={styles.statItem}>
            <Ionicons name="eye-outline" size={16} color="#666" />
            <Text style={styles.statText}>{item.views}</Text>
          </View>
          <View style={styles.statItem}>
            <Ionicons name="heart-outline" size={16} color="#666" />
            <Text style={styles.statText}>{item.interested}</Text>
          </View>
          <Text style={styles.listingDate}>
            {new Date(item.date).toLocaleDateString("vi-VN")}
          </Text>
        </View>

        <View style={styles.listingActions}>
          <TouchableOpacity
            style={[styles.actionButton, styles.editButton]}
            onPress={() => navigation.navigate("EditListing", { id: item.id })}
          >
            <Ionicons name="create-outline" size={16} color="#4A90E2" />
            <Text style={styles.editButtonText}>Chỉnh sửa</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={[
              styles.actionButton,
              item.status === "active"
                ? styles.deactivateButton
                : styles.activateButton,
            ]}
            onPress={() => {
              console.log("Toggle status for:", item.id);
            }}
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
                styles.actionButtonText,
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
        <Text style={styles.headerTitle}>Sản phẩm của tôi</Text>
        <TouchableOpacity
          style={styles.addButton}
          onPress={() => navigation.navigate("AddProduct")}
        >
          <Ionicons name="add" size={24} color="#4A90E2" />
        </TouchableOpacity>
      </View>
    
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

      <FlatList
        data={listings[activeTab]}
        renderItem={renderItem}
        keyExtractor={(item) => item.id}
        contentContainerStyle={styles.listContainer}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }
        showsVerticalScrollIndicator={false}
        ListEmptyComponent={
          <View style={styles.emptyContainer}>
            <Ionicons name="cube-outline" size={48} color="#666" />
            <Text style={styles.emptyText}>
              {activeTab === "active"
                ? "Bạn chưa có sản phẩm nào đang hiển thị"
                : "Bạn chưa có sản phẩm nào đã ẩn"}
            </Text>
          </View>
        }
      />
    </SafeAreaView>
  );
}
