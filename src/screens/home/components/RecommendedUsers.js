import React from "react";
import {
  View,
  ScrollView,
  TouchableOpacity,
  Image,
  Text,
  StyleSheet,
  Animated,
} from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { Ionicons } from "@expo/vector-icons";
import { COLORS, SHADOW } from "../../../components/theme";

export default function RecommendedUsers() {
  const users = [
    {
      id: 1,
      name: "Minh Anh",
      avatar: "https://randomuser.me/api/portraits/women/1.jpg",
      rating: 4.9,
      products: 45,
      verified: true,
      badge: "Top Seller",
      badgeColor: ["#FF6B6B", "#FF8E8E"],
      followers: "2.5k",
      responseRate: "98%",
      categories: ["Điện thoại", "Laptop"],
    },
    {
      id: 2,
      name: "Hoàng Nam",
      avatar: "https://randomuser.me/api/portraits/men/2.jpg",
      rating: 4.8,
      products: 38,
      verified: true,
      badge: "Rising Star",
      badgeColor: ["#4ECDC4", "#45B7D1"],
      followers: "1.8k",
      responseRate: "95%",
      categories: ["Máy ảnh", "Phụ kiện"],
    },
    {
      id: 3,
      name: "Thu Hà",
      avatar: "https://randomuser.me/api/portraits/women/3.jpg",
      rating: 4.7,
      products: 52,
      verified: true,
      badge: "Pro Seller",
      badgeColor: ["#A18CD1", "#FBC2EB"],
      followers: "3.2k",
      responseRate: "97%",
      categories: ["Thời trang", "Mỹ phẩm"],
    },
  ];

  const renderUserCard = (user) => (
    <TouchableOpacity key={user.id} style={styles.userCard}>
      <LinearGradient
        colors={["rgba(255,255,255,0.1)", "rgba(255,255,255,0.05)"]}
        style={styles.cardGradient}
      >
        <View style={styles.cardHeader}>
          <Image source={{ uri: user.avatar }} style={styles.avatar} />
          <LinearGradient
            colors={user.badgeColor}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 0 }}
            style={styles.badgeContainer}
          >
            <Text style={styles.badgeText}>{user.badge}</Text>
          </LinearGradient>
        </View>

        <View style={styles.userInfo}>
          <View style={styles.nameContainer}>
            <Text style={styles.userName}>{user.name}</Text>
            {user.verified && (
              <Ionicons name="checkmark-circle" size={18} color="#4CD964" />
            )}
          </View>

          <View style={styles.statsContainer}>
            <View style={styles.statItem}>
              <Ionicons name="star" size={16} color="#FFD700" />
              <Text style={styles.statText}>{user.rating}</Text>
            </View>
            <View style={styles.statDivider} />
            <View style={styles.statItem}>
              <Ionicons name="cube" size={16} color={COLORS.primary} />
              <Text style={styles.statText}>{user.products}</Text>
            </View>
            <View style={styles.statDivider} />
            <View style={styles.statItem}>
              <Ionicons name="people" size={16} color="#FF6B6B" />
              <Text style={styles.statText}>{user.followers}</Text>
            </View>
          </View>

          <View style={styles.categoryContainer}>
            {user.categories.map((category, index) => (
              <View key={index} style={styles.categoryTag}>
                <Text style={styles.categoryText}>{category}</Text>
              </View>
            ))}
          </View>

          <View style={styles.responseContainer}>
            <Ionicons name="time" size={14} color="#666" />
            <Text style={styles.responseText}>
              Tỷ lệ phản hồi: {user.responseRate}
            </Text>
          </View>
        </View>

        <TouchableOpacity style={styles.followButton}>
          <Text style={styles.followButtonText}>Theo dõi</Text>
          <Ionicons name="add" size={18} color={COLORS.white} />
        </TouchableOpacity>
      </LinearGradient>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <View style={styles.titleContainer}>
          <Ionicons name="people-circle" size={28} color={COLORS.primary} />
          <Text style={styles.title}>Người bán nổi bật</Text>
          <View style={styles.recommendBadge}>
            <Text style={styles.recommendText}>Đề xuất</Text>
          </View>
        </View>
        <TouchableOpacity style={styles.viewAllButton}>
          <Text style={styles.viewAllText}>Xem tất cả</Text>
          <Ionicons name="chevron-forward" size={16} color={COLORS.primary} />
        </TouchableOpacity>
      </View>

      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.scrollContent}
      >
        {users.map(renderUserCard)}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginVertical: 16,
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 16,
    marginBottom: 16,
  },
  titleContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
  title: {
    fontSize: 20,
    fontWeight: "700",
    marginLeft: 8,
    color: "#1A1A1A",
  },
  recommendBadge: {
    backgroundColor: COLORS.primary,
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 12,
    marginLeft: 8,
  },
  recommendText: {
    color: COLORS.white,
    fontSize: 12,
    fontWeight: "600",
  },
  viewAllButton: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: `${COLORS.primary}15`,
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 20,
  },
  viewAllText: {
    color: COLORS.primary,
    fontSize: 14,
    fontWeight: "600",
    marginRight: 4,
  },
  scrollContent: {
    paddingHorizontal: 12,
  },
  userCard: {
    width: 280,
    marginHorizontal: 4,
    borderRadius: 16,
    backgroundColor: COLORS.white,
    ...SHADOW.medium,
  },
  cardGradient: {
    borderRadius: 16,
    padding: 16,
  },
  cardHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 12,
  },
  avatar: {
    width: 60,
    height: 60,
    borderRadius: 30,
    borderWidth: 3,
    borderColor: COLORS.white,
  },
  badgeContainer: {
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 20,
  },
  badgeText: {
    color: COLORS.white,
    fontSize: 12,
    fontWeight: "600",
  },
  userInfo: {
    marginBottom: 16,
  },
  nameContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 8,
  },
  userName: {
    fontSize: 18,
    fontWeight: "700",
    color: "#1A1A1A",
    marginRight: 4,
  },
  statsContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 12,
  },
  statItem: {
    flexDirection: "row",
    alignItems: "center",
  },
  statText: {
    marginLeft: 4,
    fontSize: 14,
    color: "#666",
    fontWeight: "500",
  },
  statDivider: {
    width: 1,
    height: 12,
    backgroundColor: "#E0E0E0",
    marginHorizontal: 8,
  },
  categoryContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
    marginBottom: 8,
  },
  categoryTag: {
    backgroundColor: `${COLORS.primary}15`,
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 12,
    marginRight: 8,
    marginBottom: 8,
  },
  categoryText: {
    color: COLORS.primary,
    fontSize: 12,
    fontWeight: "500",
  },
  responseContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
  responseText: {
    marginLeft: 4,
    fontSize: 12,
    color: "#666",
  },
  followButton: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: COLORS.primary,
    paddingVertical: 10,
    borderRadius: 12,
    marginTop: 8,
  },
  followButtonText: {
    color: COLORS.white,
    fontSize: 14,
    fontWeight: "600",
    marginRight: 4,
  },
});
