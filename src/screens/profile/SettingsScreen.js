import React, { useState, useRef } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  Switch,
  ScrollView,
  Alert,
  Linking,
  StyleSheet,
  Animated,
  StatusBar,
  Image,
  Platform,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Ionicons } from "@expo/vector-icons";
import { LinearGradient } from "expo-linear-gradient";
import { BlurView } from "expo-blur";
import { COLORS, SHADOW } from "../../components/theme";

export default function SettingsScreen({ navigation }) {
  const [notifications, setNotifications] = useState({
    newMessages: true,
    exchangeRequests: true,
    statusUpdates: true,
    marketing: false,
  });

  const [darkMode, setDarkMode] = useState(false);
  const scrollY = useRef(new Animated.Value(0)).current;

  const settingSections = [
    {
      title: "Tài khoản",
      icon: "person-circle-outline",
      iconColor: "#4A90E2",
      items: [
        {
          icon: "lock-closed-outline",
          title: "Đổi mật khẩu",
          onPress: () => navigation.navigate("ChangePassword"),
          iconColor: "#4A90E2",
        },
        {
          icon: "shield-checkmark-outline",
          title: "Bảo mật hai lớp",
          onPress: () => navigation.navigate("TwoFactorAuth"),
          iconColor: "#4CD964",
        },
        {
          icon: "phone-portrait-outline",
          title: "Thiết bị đã đăng nhập",
          onPress: () => navigation.navigate("Devices"),
          iconColor: "#FF9500",
        },
      ],
    },
    {
      title: "Thông báo",
      icon: "notifications-outline",
      iconColor: "#FF9500",
      items: [
        {
          icon: "chatbubble-outline",
          title: "Tin nhắn mới",
          type: "switch",
          value: notifications.newMessages,
          onValueChange: (value) =>
            setNotifications({ ...notifications, newMessages: value }),
          iconColor: "#4A90E2",
        },
        {
          icon: "git-pull-request-outline",
          title: "Yêu cầu trao đổi",
          type: "switch",
          value: notifications.exchangeRequests,
          onValueChange: (value) =>
            setNotifications({ ...notifications, exchangeRequests: value }),
          iconColor: "#4CD964",
        },
        {
          icon: "notifications-outline",
          title: "Cập nhật trạng thái",
          type: "switch",
          value: notifications.statusUpdates,
          onValueChange: (value) =>
            setNotifications({ ...notifications, statusUpdates: value }),
          iconColor: "#FF9500",
        },
        {
          icon: "mail-outline",
          title: "Email marketing",
          type: "switch",
          value: notifications.marketing,
          onValueChange: (value) =>
            setNotifications({ ...notifications, marketing: value }),
          iconColor: "#8E8E93",
        },
      ],
    },
    {
      title: "Giao diện",
      icon: "color-palette-outline",
      iconColor: "#4CD964",
      items: [
        {
          icon: "moon-outline",
          title: "Chế độ tối",
          type: "switch",
          value: darkMode,
          onValueChange: (value) => setDarkMode(value),
          iconColor: "#8E8E93",
        },
      ],
    },
    {
      title: "Hỗ trợ & Thông tin",
      icon: "information-circle-outline",
      iconColor: "#8E8E93",
      items: [
        {
          icon: "help-circle-outline",
          title: "Trung tâm trợ giúp",
          onPress: () => Linking.openURL("https://help.example.com"),
          iconColor: "#4A90E2",
        },
        {
          icon: "document-text-outline",
          title: "Điều khoản sử dụng",
          onPress: () => navigation.navigate("Terms"),
          iconColor: "#8E8E93",
        },
        {
          icon: "shield-outline",
          title: "Chính sách bảo mật",
          onPress: () => navigation.navigate("Privacy"),
          iconColor: "#8E8E93",
        },
        {
          icon: "information-circle-outline",
          title: "Về ứng dụng",
          onPress: () => navigation.navigate("About"),
          iconColor: "#8E8E93",
        },
      ],
    },
  ];

  const handleLogout = () => {
    Alert.alert("Đăng xuất", "Bạn có chắc chắn muốn đăng xuất?", [
      {
        text: "Hủy",
        style: "cancel",
      },
      {
        text: "Đăng xuất",
        style: "destructive",
        onPress: () => {
          navigation.replace("Login");
        },
      },
    ]);
  };

  const handleDeleteAccount = () => {
    Alert.alert(
      "Xóa tài khoản",
      "Bạn có chắc chắn muốn xóa tài khoản? Hành động này không thể hoàn tác.",
      [
        {
          text: "Hủy",
          style: "cancel",
        },
        {
          text: "Xóa tài khoản",
          style: "destructive",
          onPress: () => {
            navigation.replace("Login");
          },
        },
      ]
    );
  };

  // Animation for header
  const headerHeight = scrollY.interpolate({
    inputRange: [0, 100],
    outputRange: [200, 100],
    extrapolate: "clamp",
  });

  const headerOpacity = scrollY.interpolate({
    inputRange: [0, 60, 90],
    outputRange: [1, 0.3, 0],
    extrapolate: "clamp",
  });

  const headerTitleOpacity = scrollY.interpolate({
    inputRange: [0, 60, 90],
    outputRange: [0, 0.7, 1],
    extrapolate: "clamp",
  });

  const headerTitleSize = scrollY.interpolate({
    inputRange: [0, 100],
    outputRange: [0, 20],
    extrapolate: "clamp",
  });

  return (
    <SafeAreaView style={styles.container} edges={["right", "left"]}>
      <StatusBar
        barStyle="light-content"
        backgroundColor="transparent"
        translucent
      />

      <Animated.ScrollView
        style={styles.scrollView}
        showsVerticalScrollIndicator={false}
        onScroll={Animated.event(
          [{ nativeEvent: { contentOffset: { y: scrollY } } }],
          { useNativeDriver: false }
        )}
        scrollEventThrottle={16}
      >
        <View style={styles.settingsContainer}>
          {settingSections.map((section, sectionIndex) => (
            <View key={sectionIndex} style={styles.settingSection}>
              <View style={styles.sectionHeader}>
                <View
                  style={[
                    styles.sectionIconContainer,
                    { backgroundColor: `${section.iconColor}15` },
                  ]}
                >
                  <Ionicons
                    name={section.icon}
                    size={18}
                    color={section.iconColor}
                  />
                </View>
                <Text style={styles.sectionTitle}>{section.title}</Text>
              </View>

              <View style={styles.sectionContent}>
                {section.items.map((item, itemIndex) => (
                  <TouchableOpacity
                    key={itemIndex}
                    style={[
                      styles.settingItem,
                      itemIndex === section.items.length - 1 &&
                        styles.lastSettingItem,
                    ]}
                    onPress={item.type !== "switch" ? item.onPress : undefined}
                    activeOpacity={item.type === "switch" ? 1 : 0.7}
                  >
                    <View style={styles.settingItemLeft}>
                      <View
                        style={[
                          styles.itemIconContainer,
                          { backgroundColor: `${item.iconColor}15` },
                        ]}
                      >
                        <Ionicons
                          name={item.icon}
                          size={18}
                          color={item.iconColor}
                        />
                      </View>
                      <Text style={styles.settingItemText}>{item.title}</Text>
                    </View>
                    {item.type === "switch" ? (
                      <Switch
                        value={item.value}
                        onValueChange={item.onValueChange}
                        trackColor={{ false: "#D1D1D6", true: item.iconColor }}
                        thumbColor="#FFFFFF"
                        ios_backgroundColor="#D1D1D6"
                      />
                    ) : (
                      <Ionicons
                        name="chevron-forward"
                        size={18}
                        color="#C7C7CC"
                      />
                    )}
                  </TouchableOpacity>
                ))}
              </View>
            </View>
          ))}

          <View style={styles.dangerZone}>
            <Text style={styles.dangerZoneTitle}>Danger Zone</Text>
            <View style={styles.dangerZoneContent}>
              <TouchableOpacity
                style={styles.dangerButton}
                onPress={handleLogout}
              >
                <View style={styles.dangerIconContainer}>
                  <Ionicons name="log-out-outline" size={18} color="#FF3B30" />
                </View>
                <Text style={styles.dangerButtonText}>Đăng xuất</Text>
                <Ionicons name="chevron-forward" size={18} color="#C7C7CC" />
              </TouchableOpacity>

              <TouchableOpacity
                style={[styles.dangerButton, styles.deleteAccountButton]}
                onPress={handleDeleteAccount}
              >
                <View style={styles.dangerIconContainer}>
                  <Ionicons name="trash-outline" size={18} color="#FF3B30" />
                </View>
                <Text style={styles.dangerButtonText}>Xóa tài khoản</Text>
                <Ionicons name="chevron-forward" size={18} color="#C7C7CC" />
              </TouchableOpacity>
            </View>
          </View>

          <Text style={styles.versionText}>Phiên bản 1.0.0</Text>
        </View>
      </Animated.ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F8F8F8",
  },
  header: {
    width: "100%",
    overflow: "hidden",
  },
  headerGradient: {
    flex: 1,
    paddingTop: Platform.OS === "android" ? StatusBar.currentHeight : 0,
  },
  headerTopRow: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 15,
    height: 60,
  },
  backButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    alignItems: "center",
    justifyContent: "center",
  },
  headerScrolledTitle: {
    color: "#FFF",
    fontWeight: "bold",
  },
  headerRight: {
    width: 40,
  },
  profileContainer: {
    paddingHorizontal: 20,
    paddingBottom: 20,
    flexDirection: "row",
    alignItems: "center",
  },
  avatar: {
    width: 60,
    height: 60,
    borderRadius: 30,
    borderWidth: 2,
    borderColor: "#FFF",
  },
  profileInfo: {
    marginLeft: 15,
    flex: 1,
  },
  profileName: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#FFF",
    marginBottom: 4,
  },
  profileEmail: {
    fontSize: 14,
    color: "rgba(255, 255, 255, 0.8)",
  },
  editProfileButton: {
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: "rgba(255, 255, 255, 0.2)",
    alignItems: "center",
    justifyContent: "center",
  },
  scrollView: {
    flex: 1,
  },
  settingsContainer: {
    paddingHorizontal: 15,
    paddingTop: 20,
    paddingBottom: 40,
  },
  settingSection: {
    marginTop: 30,
    marginBottom: 25,
  },
  sectionHeader: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 15,
  },
  sectionIconContainer: {
    width: 32,
    height: 32,
    borderRadius: 16,
    alignItems: "center",
    justifyContent: "center",
    marginRight: 10,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: "600",
    color: "#333",
  },
  sectionContent: {
    backgroundColor: "#FFF",
    borderRadius: 12,
    ...SHADOW.small,
  },
  settingItem: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingVertical: 15,
    paddingHorizontal: 15,
    borderBottomWidth: 1,
    borderBottomColor: "#F0F0F0",
  },
  lastSettingItem: {
    borderBottomWidth: 0,
  },
  settingItemLeft: {
    flexDirection: "row",
    alignItems: "center",
    flex: 1,
  },
  itemIconContainer: {
    width: 36,
    height: 36,
    borderRadius: 18,
    alignItems: "center",
    justifyContent: "center",
    marginRight: 15,
  },
  settingItemText: {
    fontSize: 15,
    color: "#333",
  },
  dangerZone: {
    marginBottom: 25,
  },
  dangerZoneTitle: {
    fontSize: 16,
    fontWeight: "600",
    color: "#FF3B30",
    marginBottom: 15,
  },
  dangerZoneContent: {
    backgroundColor: "#FFF",
    borderRadius: 12,
    ...SHADOW.small,
  },
  dangerButton: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 15,
    paddingHorizontal: 15,
    borderBottomWidth: 1,
    borderBottomColor: "#F0F0F0",
  },
  deleteAccountButton: {
    borderBottomWidth: 0,
  },
  dangerIconContainer: {
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: "rgba(255, 59, 48, 0.1)",
    alignItems: "center",
    justifyContent: "center",
    marginRight: 15,
  },
  dangerButtonText: {
    fontSize: 15,
    color: "#FF3B30",
    flex: 1,
  },
  versionText: {
    textAlign: "center",
    fontSize: 13,
    color: "#8E8E93",
    marginTop: 20,
  },
});
