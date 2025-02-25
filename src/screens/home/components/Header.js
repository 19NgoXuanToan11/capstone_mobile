import React from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Image,
  StyleSheet,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { LinearGradient } from "expo-linear-gradient";
import { SafeAreaView } from "react-native-safe-area-context";
import { COLORS, SPACING, SHADOW } from "../../../components/theme";

export default function Header({ navigation }) {
  return (
    <LinearGradient
      colors={["#2C5364", "#203A43", "#0F2027"]}
      start={{ x: 0, y: 0 }}
      end={{ x: 1, y: 1 }}
      style={styles.container}
    >
      <SafeAreaView style={styles.content}>
        {/* Top Section */}
        <View style={styles.topSection}>
          <TouchableOpacity
            style={styles.iconButton}
            onPress={() => navigation.openDrawer()}
          >
            <Ionicons name="menu-outline" size={24} color={COLORS.white} />
          </TouchableOpacity>

          <View style={styles.centerContainer}>
            <View style={styles.locationButton}>
              <Ionicons
                name="location-outline"
                size={18}
                color={COLORS.white}
              />
              <Text style={styles.locationText}>Hồ Chí Minh</Text>
              <Ionicons name="chevron-down" size={16} color={COLORS.white} />
            </View>
          </View>

          <View style={styles.rightButtons}>
            <TouchableOpacity style={styles.iconButton}>
              <Ionicons
                name="notifications-outline"
                size={24}
                color={COLORS.white}
              />
              <View style={styles.badge}>
                <Text style={styles.badgeText}>2</Text>
              </View>
            </TouchableOpacity>
            <TouchableOpacity style={styles.avatarButton}>
              <Image
                source={{ uri: "https://picsum.photos/200" }}
                style={styles.avatar}
              />
            </TouchableOpacity>
          </View>
        </View>

        {/* Search Section */}
        <View style={styles.searchSection}>
          <View style={styles.searchBar}>
            <Ionicons name="search-outline" size={20} color="#666" />
            <TextInput
              placeholder="Bạn đang tìm gì?"
              placeholderTextColor="#666"
              style={styles.searchInput}
            />
            <TouchableOpacity style={styles.filterButton}>
              <Ionicons
                name="options-outline"
                size={20}
                color={COLORS.primary}
              />
            </TouchableOpacity>
          </View>
        </View>

        {/* Quick Actions */}
        <View style={styles.quickActions}>
          <TouchableOpacity style={styles.actionItem}>
            <View style={[styles.actionIcon, { backgroundColor: "#FF6B6B" }]}>
              <Ionicons name="flash" size={20} color={COLORS.white} />
            </View>
            <Text style={styles.actionText}>Flash Sale</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.actionItem}>
            <View style={[styles.actionIcon, { backgroundColor: "#4ECDC4" }]}>
              <Ionicons name="trending-up" size={20} color={COLORS.white} />
            </View>
            <Text style={styles.actionText}>Xu hướng</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.actionItem}>
            <View style={[styles.actionIcon, { backgroundColor: "#45B7D1" }]}>
              <Ionicons name="gift" size={20} color={COLORS.white} />
            </View>
            <Text style={styles.actionText}>Ưu đãi</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.actionItem}>
            <View style={[styles.actionIcon, { backgroundColor: "#96CEB4" }]}>
              <Ionicons name="grid" size={20} color={COLORS.white} />
            </View>
            <Text style={styles.actionText}>Danh mục</Text>
          </TouchableOpacity>
        </View>
      </SafeAreaView>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  container: {
    width: "100%",
    paddingBottom: SPACING.medium,
  },
  content: {
    paddingHorizontal: SPACING.medium,
  },
  topSection: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginVertical: SPACING.medium,
  },
  iconButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: "rgba(255, 255, 255, 0.1)",
    justifyContent: "center",
    alignItems: "center",
    position: "relative",
  },
  centerContainer: {
    flex: 1,
    alignItems: "center",
  },
  locationButton: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "rgba(255, 255, 255, 0.1)",
    paddingHorizontal: SPACING.medium,
    paddingVertical: SPACING.small,
    borderRadius: 20,
  },
  locationText: {
    color: COLORS.white,
    marginHorizontal: SPACING.small,
    fontSize: 14,
    fontWeight: "500",
  },
  rightButtons: {
    flexDirection: "row",
    alignItems: "center",
    gap: SPACING.small,
  },
  avatarButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    overflow: "hidden",
    borderWidth: 2,
    borderColor: COLORS.white,
  },
  avatar: {
    width: "100%",
    height: "100%",
  },
  badge: {
    position: "absolute",
    top: -2,
    right: -2,
    backgroundColor: "#FF3B30",
    borderRadius: 10,
    minWidth: 18,
    height: 18,
    justifyContent: "center",
    alignItems: "center",
    borderWidth: 1.5,
    borderColor: COLORS.white,
  },
  badgeText: {
    color: COLORS.white,
    fontSize: 10,
    fontWeight: "600",
  },
  searchSection: {
    marginBottom: SPACING.medium,
  },
  searchBar: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: COLORS.white,
    borderRadius: 16,
    paddingHorizontal: SPACING.medium,
    paddingVertical: SPACING.medium,
    ...SHADOW.medium,
  },
  searchInput: {
    flex: 1,
    marginLeft: SPACING.small,
    fontSize: 15,
  },
  filterButton: {
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: "#F5F5F5",
    justifyContent: "center",
    alignItems: "center",
  },
  quickActions: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingHorizontal: SPACING.small,
  },
  actionItem: {
    alignItems: "center",
  },
  actionIcon: {
    width: 50,
    height: 50,
    borderRadius: 25,
    justifyContent: "center",
    alignItems: "center",
    marginBottom: SPACING.small,
    ...SHADOW.small,
  },
  actionText: {
    color: COLORS.white,
    fontSize: 12,
    fontWeight: "500",
  },
});
