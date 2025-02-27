import React from "react";
import {
  View,
  Text,
  StyleSheet,
  Image,
  TouchableOpacity,
  ScrollView,
  Linking,
  StatusBar,
  Platform,
} from "react-native";
import { DrawerContentScrollView } from "@react-navigation/drawer";
import { Ionicons } from "@expo/vector-icons";
import { LinearGradient } from "expo-linear-gradient";
import { BlurView } from "expo-blur";
import { COLORS, SHADOW } from "../../../components/theme";

export default function CustomDrawerContent(props) {
  const userInfo = {
    name: "Nguyễn Văn A",
    email: "nguyenvana@example.com",
    avatar: "https://randomuser.me/api/portraits/men/32.jpg",
    level: "Thành viên Vàng",
    verified: true,
  };

  const stats = [
    { label: "Sản phẩm", value: 12 },
    { label: "Trao đổi", value: 5 },
    { label: "Đánh giá", value: "4.8" },
  ];

  const menuItems = [
    {
      icon: "home-outline",
      label: "Trang chủ",
      screen: "MainTabs",
      gradient: ["#4F8EF7", "#2D6CDF"],
    },
    {
      icon: "cube-outline",
      label: "Sản phẩm của tôi",
      screen: "MyProducts",
      gradient: ["#4ECDC4", "#45B7D1"],
    },
    {
      icon: "swap-horizontal-outline",
      label: "Trao đổi của tôi",
      screen: "MyExchanges",
      gradient: ["#A18CD1", "#FBC2EB"],
    },
    {
      icon: "notifications-outline",
      label: "Thông báo",
      screen: "Notifications",
      gradient: ["#FF9A9E", "#FAD0C4"],
    },
    {
      icon: "heart-outline",
      label: "Yêu thích",
      screen: "Favorites",
      gradient: ["#FF9A9E", "#FECFEF"],
    },
    {
      icon: "settings-outline",
      label: "Cài đặt",
      screen: "Settings",
      gradient: ["#A1C4FD", "#C2E9FB"],
    },
  ];

  const handleSupport = () => {
    Linking.openURL("mailto:support@yourapp.com");
  };

  const handleLogout = () => {
    // Xử lý đăng xuất
    console.log("Logout pressed");
    props.navigation.closeDrawer();
  };

  return (
    <View style={styles.container}>
      <StatusBar
        barStyle="light-content"
        backgroundColor="transparent"
        translucent
      />

      {/* Header with user info */}
      <LinearGradient
        colors={["#2C5364", "#203A43", "#0F2027"]}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
        style={styles.header}
      >
        <View style={styles.userInfoContainer}>
          <View style={styles.avatarContainer}>
            <Image source={{ uri: userInfo.avatar }} style={styles.avatar} />
            {userInfo.verified && (
              <View style={styles.verifiedBadge}>
                <Ionicons name="checkmark" size={12} color="#FFF" />
              </View>
            )}
          </View>

          <View style={styles.userInfo}>
            <View style={styles.nameContainer}>
              <Text style={styles.userName}>{userInfo.name}</Text>
            </View>
            <Text style={styles.userEmail}>{userInfo.email}</Text>

            <View style={styles.levelContainer}>
              <LinearGradient
                colors={["#FFD700", "#FFA500"]}
                start={{ x: 0, y: 0 }}
                end={{ x: 1, y: 0 }}
                style={styles.levelBadge}
              >
                <Text style={styles.levelText}>{userInfo.level}</Text>
              </LinearGradient>
            </View>
          </View>
        </View>

        <TouchableOpacity
          style={styles.editButton}
          onPress={() => props.navigation.navigate("EditProfile")}
        >
          <Text style={styles.editButtonText}>Chỉnh sửa</Text>
        </TouchableOpacity>

        {/* User stats */}
        <View style={styles.statsContainer}>
          {stats.map((stat, index) => (
            <React.Fragment key={index}>
              {index > 0 && <View style={styles.statDivider} />}
              <TouchableOpacity
                style={styles.statItem}
                onPress={() =>
                  props.navigation.navigate(
                    index === 0
                      ? "MyProducts"
                      : index === 1
                      ? "MyExchanges"
                      : "Reviews"
                  )
                }
              >
                <Text style={styles.statNumber}>{stat.value}</Text>
                <Text style={styles.statLabel}>{stat.label}</Text>
              </TouchableOpacity>
            </React.Fragment>
          ))}
        </View>
      </LinearGradient>

      {/* Menu Items */}
      <DrawerContentScrollView
        {...props}
        contentContainerStyle={styles.scrollContent}
      >
        <View style={styles.menuContainer}>
          {menuItems.map((item, index) => (
            <TouchableOpacity
              key={index}
              style={styles.menuItem}
              onPress={() => {
                props.navigation.navigate(item.screen);
              }}
            >
              <LinearGradient
                colors={item.gradient}
                start={{ x: 0, y: 0 }}
                end={{ x: 1, y: 1 }}
                style={styles.menuIconContainer}
              >
                <Ionicons name={item.icon} size={22} color={COLORS.white} />
              </LinearGradient>
              <Text style={styles.menuItemText}>{item.label}</Text>
              <Ionicons
                name="chevron-forward"
                size={18}
                color={COLORS.inactive}
              />
            </TouchableOpacity>
          ))}
        </View>

        {/* Footer Items */}
        <View style={styles.footerMenu}>
          <TouchableOpacity
            style={styles.footerMenuItem}
            onPress={handleSupport}
          >
            <View
              style={[
                styles.footerMenuIconContainer,
                { backgroundColor: "#F0F0F0" },
              ]}
            >
              <Ionicons
                name="help-circle-outline"
                size={22}
                color={COLORS.primary}
              />
            </View>
            <Text style={styles.footerMenuItemText}>Hỗ trợ</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={[styles.footerMenuItem, styles.logoutMenuItem]}
            onPress={handleLogout}
          >
            <View
              style={[
                styles.footerMenuIconContainer,
                { backgroundColor: "#FFF0F0" },
              ]}
            >
              <Ionicons name="log-out-outline" size={22} color="#FF3B30" />
            </View>
            <Text style={styles.logoutText}>Đăng xuất</Text>
          </TouchableOpacity>
        </View>
      </DrawerContentScrollView>

      <View style={styles.versionContainer}>
        <Text style={styles.versionText}>Phiên bản 1.0.0</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.white,
  },
  header: {
    paddingTop: Platform.OS === "android" ? StatusBar.currentHeight + 20 : 60,
    paddingBottom: 15,
    paddingHorizontal: 20,
  },
  userInfoContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
  avatarContainer: {
    position: "relative",
  },
  avatar: {
    width: 70,
    height: 70,
    borderRadius: 35,
    borderWidth: 3,
    borderColor: "rgba(255, 255, 255, 0.8)",
  },
  verifiedBadge: {
    position: "absolute",
    bottom: 0,
    right: 0,
    backgroundColor: COLORS.primary,
    borderRadius: 10,
    width: 20,
    height: 20,
    justifyContent: "center",
    alignItems: "center",
    borderWidth: 2,
    borderColor: COLORS.white,
  },
  userInfo: {
    marginLeft: 15,
    flex: 1,
  },
  nameContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
  userName: {
    color: COLORS.white,
    fontSize: 20,
    fontWeight: "bold",
  },
  userEmail: {
    color: "rgba(255, 255, 255, 0.8)",
    fontSize: 14,
    marginBottom: 8,
  },
  levelContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
  levelBadge: {
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 12,
    marginRight: 10,
  },
  levelText: {
    color: COLORS.white,
    fontSize: 12,
    fontWeight: "bold",
  },
  pointsContainer: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "rgba(255, 255, 255, 0.2)",
    borderRadius: 12,
    paddingHorizontal: 8,
    paddingVertical: 4,
  },
  pointsText: {
    color: COLORS.white,
    fontSize: 12,
    marginLeft: 4,
  },
  editButton: {
    backgroundColor: "rgba(255, 255, 255, 0.2)",
    borderRadius: 20,
    paddingHorizontal: 15,
    paddingVertical: 6,
    alignSelf: "flex-start",
    marginTop: 10,
    marginBottom: 15,
  },
  editButtonText: {
    color: COLORS.white,
    fontSize: 14,
    fontWeight: "500",
  },
  statsContainer: {
    flexDirection: "row",
    backgroundColor: "rgba(255, 255, 255, 0.1)",
    borderRadius: 12,
    padding: 10,
  },
  statItem: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  statNumber: {
    color: COLORS.white,
    fontSize: 18,
    fontWeight: "bold",
  },
  statLabel: {
    color: "rgba(255, 255, 255, 0.8)",
    fontSize: 12,
    marginTop: 4,
  },
  statDivider: {
    width: 1,
    height: "70%",
    backgroundColor: "rgba(255, 255, 255, 0.2)",
  },
  scrollContent: {
    paddingTop: 0,
  },
  menuContainer: {
    paddingTop: 15,
    paddingHorizontal: 15,
  },
  menuItem: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: "rgba(0, 0, 0, 0.05)",
  },
  menuIconContainer: {
    width: 40,
    height: 40,
    borderRadius: 20,
    justifyContent: "center",
    alignItems: "center",
    marginRight: 15,
    ...SHADOW.small,
  },
  menuItemText: {
    flex: 1,
    fontSize: 16,
    color: COLORS.text,
    fontWeight: "500",
  },
  footerMenu: {
    marginTop: 20,
    paddingHorizontal: 15,
    borderTopWidth: 1,
    borderTopColor: "rgba(0, 0, 0, 0.05)",
    paddingTop: 15,
  },
  footerMenuItem: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 12,
  },
  footerMenuIconContainer: {
    width: 40,
    height: 40,
    borderRadius: 20,
    justifyContent: "center",
    alignItems: "center",
    marginRight: 15,
  },
  footerMenuItemText: {
    flex: 1,
    fontSize: 16,
    color: COLORS.text,
    fontWeight: "500",
  },
  logoutMenuItem: {
    marginTop: 10,
  },
  logoutText: {
    fontSize: 16,
    color: "#FF3B30",
    fontWeight: "500",
  },
  versionContainer: {
    padding: 15,
    alignItems: "center",
  },
  versionText: {
    fontSize: 12,
    color: COLORS.inactive,
  },
});
