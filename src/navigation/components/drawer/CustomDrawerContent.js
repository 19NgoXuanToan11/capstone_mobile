import React from "react";
import {
  View,
  Text,
  StyleSheet,
  Image,
  TouchableOpacity,
  ScrollView,
  Linking,
} from "react-native";
import {
  DrawerContentScrollView,
  DrawerItemList,
  DrawerItem,
} from "@react-navigation/drawer";
import { Ionicons } from "@expo/vector-icons";
import { COLORS } from "../../../components/theme";

export default function CustomDrawerContent(props) {
  const user = {
    name: "Nguyễn Văn A",
    email: "nguyenvana@gmail.com",
    avatar: "https://picsum.photos/200",
    verified: true,
  };

  const handleLogout = () => {
    // Xử lý logout sau này
    console.log("Logout pressed");
  };

  const handleSupport = () => {
    Linking.openURL("mailto:support@yourapp.com");
  };

  return (
    <DrawerContentScrollView {...props}>
      <View style={styles.userSection}>
        <View style={styles.userInfo}>
          <Image source={{ uri: user.avatar }} style={styles.avatar} />
          <View style={styles.userTextContainer}>
            <View style={styles.nameContainer}>
              <Text style={styles.userName}>{user.name}</Text>
              {user.verified && (
                <Ionicons
                  name="checkmark-circle"
                  size={16}
                  color={COLORS.primary}
                />
              )}
            </View>
            <Text style={styles.userEmail}>{user.email}</Text>
          </View>
        </View>
        <TouchableOpacity
          style={styles.editButton}
          onPress={() => props.navigation.navigate("EditProfile")}
        >
          <Text style={styles.editButtonText}>Chỉnh sửa</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.statsContainer}>
        <TouchableOpacity
          style={styles.statItem}
          onPress={() => props.navigation.navigate("MyProducts")}
        >
          <Text style={styles.statNumber}>12</Text>
          <Text style={styles.statLabel}>Sản phẩm</Text>
        </TouchableOpacity>
        <View style={styles.statDivider} />
        <TouchableOpacity
          style={styles.statItem}
          onPress={() => props.navigation.navigate("MyExchanges")}
        >
          <Text style={styles.statNumber}>5</Text>
          <Text style={styles.statLabel}>Trao đổi</Text>
        </TouchableOpacity>
        <View style={styles.statDivider} />
        <TouchableOpacity
          style={styles.statItem}
          onPress={() => props.navigation.navigate("Reviews")}
        >
          <Text style={styles.statNumber}>4.8</Text>
          <Text style={styles.statLabel}>Đánh giá</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.navigationSection}>
        <DrawerItem
          label="Trang chủ"
          icon={({ color, size }) => (
            <Ionicons name="home-outline" color={color} size={size} />
          )}
          onPress={() => props.navigation.navigate("Home")}
        />
        <DrawerItem
          label="Sản phẩm của tôi"
          icon={({ color, size }) => (
            <Ionicons name="cube-outline" color={color} size={size} />
          )}
          onPress={() => props.navigation.navigate("MyProducts")}
        />
        <DrawerItem
          label="Trao đổi của tôi"
          icon={({ color, size }) => (
            <Ionicons
              name="swap-horizontal-outline"
              color={color}
              size={size}
            />
          )}
          onPress={() => props.navigation.navigate("MyExchanges")}
        />
        <DrawerItem
          label="Thông báo"
          icon={({ color, size }) => (
            <Ionicons name="notifications-outline" color={color} size={size} />
          )}
          onPress={() => props.navigation.navigate("Notifications")}
        />
        <DrawerItem
          label="Cài đặt"
          icon={({ color, size }) => (
            <Ionicons name="settings-outline" color={color} size={size} />
          )}
          onPress={() => props.navigation.navigate("Settings")}
        />
      </View>

      <View style={styles.footerSection}>
        <DrawerItem
          label="Hỗ trợ"
          icon={({ color, size }) => (
            <Ionicons name="help-circle-outline" color={color} size={size} />
          )}
          onPress={handleSupport}
        />
        <DrawerItem
          label="Đăng xuất"
          icon={({ color, size }) => (
            <Ionicons name="log-out-outline" color={color} size={size} />
          )}
          onPress={handleLogout}
          style={styles.logoutItem}
          labelStyle={styles.logoutLabel}
        />
      </View>
    </DrawerContentScrollView>
  );
}

const styles = StyleSheet.create({
  userSection: {
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: COLORS.border,
  },
  userInfo: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 12,
  },
  avatar: {
    width: 60,
    height: 60,
    borderRadius: 30,
    marginRight: 12,
  },
  userTextContainer: {
    flex: 1,
  },
  nameContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
  userName: {
    fontSize: 18,
    fontWeight: "600",
    color: "#333",
    marginRight: 4,
  },
  userEmail: {
    fontSize: 14,
    color: "#666",
    marginTop: 2,
  },
  editButton: {
    backgroundColor: "#F5F5F5",
    padding: 8,
    borderRadius: 20,
    alignSelf: "flex-start",
  },
  editButtonText: {
    color: COLORS.primary,
    fontSize: 14,
    fontWeight: "500",
  },
  statsContainer: {
    flexDirection: "row",
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: COLORS.border,
  },
  statItem: {
    flex: 1,
    alignItems: "center",
  },
  statNumber: {
    fontSize: 18,
    fontWeight: "600",
    color: "#333",
  },
  statLabel: {
    fontSize: 12,
    color: "#666",
    marginTop: 4,
  },
  statDivider: {
    width: 1,
    backgroundColor: COLORS.border,
    marginHorizontal: 12,
  },
  navigationSection: {
    paddingTop: 8,
  },
  footerSection: {
    borderTopWidth: 1,
    borderTopColor: COLORS.border,
    marginTop: 8,
  },
  logoutItem: {
    marginTop: "auto",
  },
  logoutLabel: {
    color: "#FF3B30",
  },
});
