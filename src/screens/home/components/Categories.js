import React from "react";
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  StyleSheet,
  Image,
} from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { Ionicons } from "@expo/vector-icons";
import { COLORS, SHADOW } from "../../../components/theme";

export default function Categories() {
  const categories = [
    {
      id: 1,
      name: "Điện thoại",
      icon: "phone-portrait-outline",
      count: "1.2k",
      gradient: ["#FF6B6B", "#FF8E8E"],
      image:
        "https://images.unsplash.com/photo-1592899677977-9c10ca588bbd?auto=format&fit=crop&w=240",
    },
    {
      id: 2,
      name: "Laptop",
      icon: "laptop-outline",
      count: "856",
      gradient: ["#4ECDC4", "#45B7D1"],
      image:
        "https://images.unsplash.com/photo-1496181133206-80ce9b88a853?auto=format&fit=crop&w=240",
    },
    {
      id: 3,
      name: "Tablet",
      icon: "tablet-landscape-outline",
      count: "643",
      gradient: ["#A18CD1", "#FBC2EB"],
      image:
        "https://images.unsplash.com/photo-1561154464-82e9adf32764?auto=format&fit=crop&w=240",
    },
    {
      id: 4,
      name: "Đồng hồ",
      icon: "watch-outline",
      count: "459",
      gradient: ["#84FAB0", "#8FD3F4"],
      image:
        "https://images.unsplash.com/photo-1523275335684-37898b6baf30?auto=format&fit=crop&w=240",
    },
    {
      id: 5,
      name: "Phụ kiện",
      icon: "headset-outline",
      count: "1.5k",
      gradient: ["#FFD26F", "#FFA26F"],
      image:
        "https://images.unsplash.com/photo-1505751172876-fa1923c5c528?auto=format&fit=crop&w=240",
    },
  ];

  const renderCategoryCard = (category) => (
    <TouchableOpacity
      key={category.id}
      style={styles.categoryCard}
      activeOpacity={0.9}
    >
      <LinearGradient
        colors={category.gradient}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
        style={styles.gradientBackground}
      >
        <Image
          source={{ uri: category.image }}
          style={styles.backgroundImage}
          blurRadius={2}
        />
        <View style={styles.overlay} />

        <View style={styles.cardContent}>
          <View style={styles.iconContainer}>
            <Ionicons name={category.icon} size={24} color={COLORS.white} />
          </View>

          <View style={styles.textContainer}>
            <Text style={styles.categoryName}>{category.name}</Text>
            <View style={styles.countContainer}>
              <Text style={styles.countText}>{category.count}</Text>
              <Text style={styles.itemsText}> sản phẩm</Text>
            </View>
          </View>

          <TouchableOpacity style={styles.arrowButton}>
            <Ionicons name="arrow-forward" size={16} color={COLORS.white} />
          </TouchableOpacity>
        </View>
      </LinearGradient>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Danh mục</Text>
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
        {categories.map(renderCategoryCard)}
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
  title: {
    fontSize: 20,
    fontWeight: "700",
    color: "#1A1A1A",
  },
  viewAllButton: {
    flexDirection: "row",
    alignItems: "center",
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
  categoryCard: {
    width: 200,
    height: 100,
    marginHorizontal: 4,
    borderRadius: 16,
    overflow: "hidden",
    ...SHADOW.medium,
  },
  gradientBackground: {
    flex: 1,
    position: "relative",
  },
  backgroundImage: {
    ...StyleSheet.absoluteFillObject,
    width: "100%",
    height: "100%",
  },
  overlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: "rgba(0,0,0,0.3)",
  },
  cardContent: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    padding: 12,
  },
  iconContainer: {
    width: 44,
    height: 44,
    borderRadius: 22,
    backgroundColor: "rgba(255,255,255,0.2)",
    justifyContent: "center",
    alignItems: "center",
    marginRight: 12,
  },
  textContainer: {
    flex: 1,
  },
  categoryName: {
    fontSize: 16,
    fontWeight: "700",
    color: COLORS.white,
    marginBottom: 4,
  },
  countContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
  countText: {
    fontSize: 14,
    fontWeight: "600",
    color: COLORS.white,
  },
  itemsText: {
    fontSize: 12,
    color: "rgba(255,255,255,0.8)",
  },
  arrowButton: {
    width: 28,
    height: 28,
    borderRadius: 14,
    backgroundColor: "rgba(255,255,255,0.2)",
    justifyContent: "center",
    alignItems: "center",
  },
});
