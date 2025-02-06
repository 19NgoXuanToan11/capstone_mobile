import React, { useState } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  Switch,
  ScrollView,
  Alert,
  Linking,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Ionicons } from "@expo/vector-icons";
import styles from "../../styles/ProfileStyles";

export default function SettingsScreen({ navigation }) {
  const [notifications, setNotifications] = useState({
    newMessages: true,
    exchangeRequests: true,
    statusUpdates: true,
    marketing: false,
  });

  const [darkMode, setDarkMode] = useState(false);

  const settingSections = [
    {
      title: "Tài khoản",
      items: [
        {
          icon: "lock-closed-outline",
          title: "Đổi mật khẩu",
          onPress: () => navigation.navigate("ChangePassword"),
        },
        {
          icon: "shield-checkmark-outline",
          title: "Bảo mật hai lớp",
          onPress: () => navigation.navigate("TwoFactorAuth"),
        },
        {
          icon: "phone-portrait-outline",
          title: "Thiết bị đã đăng nhập",
          onPress: () => navigation.navigate("Devices"),
        },
      ],
    },
    {
      title: "Thông báo",
      items: [
        {
          icon: "chatbubble-outline",
          title: "Tin nhắn mới",
          type: "switch",
          value: notifications.newMessages,
          onValueChange: (value) =>
            setNotifications({ ...notifications, newMessages: value }),
        },
        {
          icon: "git-pull-request-outline",
          title: "Yêu cầu trao đổi",
          type: "switch",
          value: notifications.exchangeRequests,
          onValueChange: (value) =>
            setNotifications({ ...notifications, exchangeRequests: value }),
        },
        {
          icon: "notifications-outline",
          title: "Cập nhật trạng thái",
          type: "switch",
          value: notifications.statusUpdates,
          onValueChange: (value) =>
            setNotifications({ ...notifications, statusUpdates: value }),
        },
        {
          icon: "mail-outline",
          title: "Email marketing",
          type: "switch",
          value: notifications.marketing,
          onValueChange: (value) =>
            setNotifications({ ...notifications, marketing: value }),
        },
      ],
    },
    {
      title: "Giao diện",
      items: [
        {
          icon: "moon-outline",
          title: "Chế độ tối",
          type: "switch",
          value: darkMode,
          onValueChange: (value) => setDarkMode(value),
        },
      ],
    },
    {
      title: "Hỗ trợ & Thông tin",
      items: [
        {
          icon: "help-circle-outline",
          title: "Trung tâm trợ giúp",
          onPress: () => Linking.openURL("https://help.example.com"),
        },
        {
          icon: "document-text-outline",
          title: "Điều khoản sử dụng",
          onPress: () => navigation.navigate("Terms"),
        },
        {
          icon: "shield-outline",
          title: "Chính sách bảo mật",
          onPress: () => navigation.navigate("Privacy"),
        },
        {
          icon: "information-circle-outline",
          title: "Về ứng dụng",
          onPress: () => navigation.navigate("About"),
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
          // TODO: Implement logout logic
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
            // TODO: Implement account deletion logic
            navigation.replace("Login");
          },
        },
      ]
    );
  };

  return (
    <SafeAreaView style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity
          style={styles.backButton}
          onPress={() => navigation.goBack()}
        >
          <Ionicons name="arrow-back" size={24} color="#333" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Cài đặt</Text>
        <View style={styles.headerRight} />
      </View>

      <ScrollView style={styles.settingsContainer}>
        {settingSections.map((section, sectionIndex) => (
          <View key={sectionIndex} style={styles.settingSection}>
            <Text style={styles.sectionTitle}>{section.title}</Text>
            <View style={styles.sectionContent}>
              {section.items.map((item, itemIndex) => (
                <TouchableOpacity
                  key={itemIndex}
                  style={styles.settingItem}
                  onPress={item.type !== "switch" ? item.onPress : undefined}
                >
                  <View style={styles.settingItemLeft}>
                    <Ionicons name={item.icon} size={22} color="#666" />
                    <Text style={styles.settingItemText}>{item.title}</Text>
                  </View>
                  {item.type === "switch" ? (
                    <Switch
                      value={item.value}
                      onValueChange={item.onValueChange}
                      trackColor={{ false: "#D1D1D6", true: "#4A90E2" }}
                      thumbColor="#FFFFFF"
                    />
                  ) : (
                    <Ionicons name="chevron-forward" size={20} color="#666" />
                  )}
                </TouchableOpacity>
              ))}
            </View>
          </View>
        ))}

        {/* Danger Zone */}
        <View style={styles.dangerZone}>
          <Text style={styles.dangerZoneTitle}>Danger Zone</Text>
          <View style={styles.dangerZoneContent}>
            <TouchableOpacity
              style={styles.dangerButton}
              onPress={handleLogout}
            >
              <Ionicons name="log-out-outline" size={22} color="#FF3B30" />
              <Text style={styles.dangerButtonText}>Đăng xuất</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={[styles.dangerButton, styles.deleteAccountButton]}
              onPress={handleDeleteAccount}
            >
              <Ionicons name="trash-outline" size={22} color="#FF3B30" />
              <Text style={styles.dangerButtonText}>Xóa tài khoản</Text>
            </TouchableOpacity>
          </View>
        </View>

        <Text style={styles.versionText}>Phiên bản 1.0.0</Text>
      </ScrollView>
    </SafeAreaView>
  );
}
