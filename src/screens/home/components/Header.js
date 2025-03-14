import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Image,
  StyleSheet,
  Animated,
  StatusBar,
  Platform,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { LinearGradient } from "expo-linear-gradient";
import { BlurView } from "expo-blur";
import { useNavigation, DrawerActions } from "@react-navigation/native";
import { COLORS, SPACING, SHADOW } from "../../../components/theme";

export default function Header() {
  const [searchFocused, setSearchFocused] = useState(false);
  const [weatherExpanded, setWeatherExpanded] = useState(false);
  const navigation = useNavigation();

  return (
    <View style={styles.outerContainer}>
      <StatusBar
        barStyle="light-content"
        backgroundColor="transparent"
        translucent
      />
      <LinearGradient
        colors={["#2C5364", "#203A43", "#0F2027"]}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
        style={[styles.container]}
      >
        {/* Top Section with Weather - Positioned at the very top */}
        <View style={styles.topSection}>
          <TouchableOpacity
            style={styles.menuButton}
            onPress={() => navigation.dispatch(DrawerActions.openDrawer())}
          >
            <Ionicons name="menu-outline" size={22} color={COLORS.white} />
          </TouchableOpacity>

          <TouchableOpacity style={styles.weatherWidget}>
            <View style={styles.weatherIconContainer}>
              <Ionicons name="partly-sunny" size={18} color="#FFD700" />
            </View>
            <View style={styles.weatherInfo}>
              <Text style={styles.temperature}>32°C</Text>
              <View style={styles.locationContainer}>
                <Ionicons
                  name="location-outline"
                  size={12}
                  color={COLORS.white}
                />
                <Text style={styles.locationText}>Hồ Chí Minh</Text>
                <Ionicons name="chevron-down" size={12} color={COLORS.white} />
              </View>
            </View>
          </TouchableOpacity>

          <View style={styles.rightButtons}>
            <TouchableOpacity style={styles.avatarButton}>
              <Image
                source={{
                  uri: "https://randomuser.me/api/portraits/men/32.jpg",
                }}
                style={styles.avatar}
              />
              <View style={styles.statusDot} />
            </TouchableOpacity>
          </View>
        </View>

        {/* Search Section - Follows immediately after top section */}
        <View style={styles.searchSection}>
          <Animated.View
            style={[styles.searchBar, searchFocused && styles.searchBarFocused]}
          >
            <Ionicons name="search-outline" size={18} color="#666" />
            <TextInput
              placeholder="Bạn đang tìm gì?"
              placeholderTextColor="#666"
              style={styles.searchInput}
              onFocus={() => setSearchFocused(true)}
              onBlur={() => setSearchFocused(false)}
            />
            <TouchableOpacity style={styles.filterButton}>
              <Ionicons name="options-outline" size={18} color={COLORS.white} />
            </TouchableOpacity>
          </Animated.View>
        </View>

        {/* Quick Actions - Follows immediately after search */}
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
            <View style={[styles.actionIcon, { backgroundColor: "#A18CD1" }]}>
              <Ionicons name="gift" size={20} color={COLORS.white} />
            </View>
            <Text style={styles.actionText}>Ưu đãi</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.actionItem}>
            <View style={[styles.actionIcon, { backgroundColor: "#84FAB0" }]}>
              <Ionicons name="grid" size={20} color={COLORS.white} />
            </View>
            <Text style={styles.actionText}>Danh mục</Text>
          </TouchableOpacity>
        </View>
      </LinearGradient>
    </View>
  );
}

const styles = StyleSheet.create({
  outerContainer: {
    width: "100%",
    zIndex: 10,
    marginTop: 0,
  },
  container: {
    width: "100%",
    paddingBottom: 10,
    paddingHorizontal: 16,
    paddingTop: Platform.OS === "android" ? StatusBar.currentHeight : 44,
  },
  topSection: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginTop: -10,
    marginBottom: 8,
    height: 60,
  },
  menuButton: {
    width: 36,
    height: 36,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(255, 255, 255, 0.1)",
    borderRadius: 18,
  },
  weatherWidget: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "rgba(255, 255, 255, 0.1)",
    borderRadius: 20,
    paddingHorizontal: 10,
    paddingVertical: 6,
    marginHorizontal: 10,
    height: 36,
  },
  weatherIconContainer: {
    width: 30,
    height: 30,
    borderRadius: 15,
    backgroundColor: "rgba(255, 255, 255, 0.15)",
    justifyContent: "center",
    alignItems: "center",
    marginRight: 6,
  },
  weatherInfo: {
    flexDirection: "column",
  },
  temperature: {
    color: COLORS.white,
    fontSize: 14,
    fontWeight: "600",
  },
  locationContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
  locationText: {
    color: "rgba(255, 255, 255, 0.8)",
    fontSize: 10,
    marginHorizontal: 2,
  },
  rightButtons: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
  },
  notificationButton: {
    width: 36,
    height: 36,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(255, 255, 255, 0.1)",
    borderRadius: 18,
    position: "relative",
  },
  avatarButton: {
    width: 36,
    height: 36,
    borderRadius: 18,
    overflow: "hidden",
    borderWidth: 2,
    borderColor: COLORS.white,
    position: "relative",
  },
  avatar: {
    width: "100%",
    height: "100%",
  },
  statusDot: {
    position: "absolute",
    bottom: 0,
    right: 0,
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: "#4CD964",
    borderWidth: 1.5,
    borderColor: COLORS.white,
  },
  badge: {
    position: "absolute",
    top: 0,
    right: 0,
    backgroundColor: "#FF3B30",
    borderRadius: 8,
    minWidth: 16,
    height: 16,
    justifyContent: "center",
    alignItems: "center",
    borderWidth: 1,
    borderColor: COLORS.white,
    zIndex: 1,
  },
  badgeText: {
    color: COLORS.white,
    fontSize: 8,
    fontWeight: "600",
  },
  searchSection: {
    marginBottom: 20,
    height: 50,
  },
  searchBar: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: COLORS.white,
    borderRadius: 20,
    paddingHorizontal: 12,
    paddingVertical: 8,
    height: "100%",
  },
  searchBarFocused: {
    borderWidth: 1,
    borderColor: COLORS.primary,
  },
  searchInput: {
    flex: 1,
    marginLeft: 8,
    fontSize: 14,
    height: "100%",
    padding: 0,
  },
  filterButton: {
    width: 30,
    height: 30,
    borderRadius: 15,
    backgroundColor: COLORS.primary,
    justifyContent: "center",
    alignItems: "center",
  },
  quickActions: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingHorizontal: 8,
    height: 70,
  },
  actionItem: {
    alignItems: "center",
  },
  actionIcon: {
    width: 48,
    height: 48,
    borderRadius: 24,
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 6,
  },
  actionText: {
    color: COLORS.white,
    fontSize: 12,
    fontWeight: "500",
  },
});
