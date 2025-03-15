import React, { useState, useEffect } from "react";
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
  Alert,
  Switch,
  Animated,
  Dimensions,
} from "react-native";
import {
  DrawerContentScrollView,
  DrawerItemList,
} from "@react-navigation/drawer";
import { Ionicons, MaterialCommunityIcons, Feather } from "@expo/vector-icons";
import { LinearGradient } from "expo-linear-gradient";
import { BlurView } from "expo-blur";
import { COLORS, SHADOW } from "../../../components/theme";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useNavigation } from "@react-navigation/native";
import * as Haptics from "expo-haptics";
import { useUser } from "../../../context/UserContext";

const { width } = Dimensions.get("window");

export default function CustomDrawerContent(props) {
  const navigation = useNavigation();
  const [isDarkMode, setIsDarkMode] = useState(false);
  const { userData } = useUser();

  // Animation values
  const fadeAnim = useState(new Animated.Value(0))[0];
  const slideAnim = useState(new Animated.Value(20))[0];

  useEffect(() => {
    // Entrance animation
    Animated.parallel([
      Animated.timing(fadeAnim, {
        toValue: 1,
        duration: 600,
        useNativeDriver: true,
      }),
      Animated.timing(slideAnim, {
        toValue: 0,
        duration: 600,
        useNativeDriver: true,
      }),
    ]).start();
  }, []);

  const stats = [
    { label: "Sản phẩm", value: 12 },
    { label: "Trao đổi", value: 5 },
    { label: "Đánh giá", value: "4.8" },
  ];

  const menuItems = [
    {
      icon: "home",
      iconType: "feather",
      label: "Trang chủ",
      screen: "MainTabs",
      gradient: ["#4F8EF7", "#2D6CDF"],
    },
    {
      icon: "cube-outline",
      iconType: "ionicons",
      label: "Sản phẩm của tôi",
      screen: "MyProducts",
      gradient: ["#4ECDC4", "#45B7D1"],
    },
    {
      icon: "swap-horizontal",
      iconType: "material",
      label: "Trao đổi của tôi",
      screen: "MyExchanges",
      gradient: ["#A18CD1", "#FBC2EB"],
    },
    {
      icon: "heart",
      iconType: "feather",
      label: "Yêu thích",
      screen: "Favorites",
      gradient: ["#FF9A9E", "#FECFEF"],
    },
    {
      icon: "settings",
      iconType: "feather",
      label: "Cài đặt",
      screen: "Settings",
      gradient: ["#A1C4FD", "#C2E9FB"],
    },
  ];

  const handleLogout = () => {
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium);
    Alert.alert(
      "Đăng xuất",
      "Bạn có chắc chắn muốn đăng xuất?",
      [
        {
          text: "Hủy",
          style: "cancel",
        },
        {
          text: "Đăng xuất",
          onPress: async () => {
            try {
              // Xóa token và thông tin người dùng từ AsyncStorage
              await AsyncStorage.multiRemove(["userToken", "userData"]);
              navigation.navigate("Login");
            } catch (error) {
              console.error("Lỗi khi đăng xuất:", error);
              Alert.alert(
                "Lỗi",
                "Đã xảy ra lỗi khi đăng xuất. Vui lòng thử lại."
              );
            }
          },
          style: "destructive",
        },
      ],
      { cancelable: true }
    );
  };

  const toggleDarkMode = () => {
    setIsDarkMode(!isDarkMode);
    // Thêm logic để thay đổi theme của ứng dụng ở đây
  };

  const renderIcon = (item) => {
    if (item.iconType === "feather") {
      return <Feather name={item.icon} size={22} color="#FFF" />;
    } else if (item.iconType === "material") {
      return <MaterialCommunityIcons name={item.icon} size={22} color="#FFF" />;
    } else {
      return <Ionicons name={item.icon} size={22} color="#FFF" />;
    }
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
        colors={["#1A3A4A", "#0F2937", "#081C24"]}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
        style={styles.header}
      >
        <View style={styles.userInfoContainer}>
          <View style={styles.avatarContainer}>
            <Image
              source={
                userData.profileImage
                  ? { uri: userData.profileImage }
                  : require("../../../../assets/profile/avatar.png")
              }
              style={styles.avatar}
            />
            {userData.verified && (
              <View style={styles.verifiedBadge}>
                <Ionicons name="checkmark" size={12} color="#FFF" />
              </View>
            )}
          </View>

          <View style={styles.userInfo}>
            <View style={styles.nameContainer}>
              <Text style={styles.userName}>
                {userData.fullName || "Người dùng"}
              </Text>
            </View>
            <Text style={styles.userEmail}>
              {userData.email || "Chưa có email"}
            </Text>
          </View>
        </View>

        <TouchableOpacity
          style={styles.editButton}
          onPress={() => {
            Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
            props.navigation.navigate("EditProfile");
          }}
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
                onPress={() => {
                  Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
                  props.navigation.navigate(
                    index === 0
                      ? "MyProducts"
                      : index === 1
                      ? "MyExchanges"
                      : "Reviews"
                  );
                }}
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
        showsVerticalScrollIndicator={false}
      >
        <Animated.View
          style={[
            styles.menuContainer,
            {
              opacity: fadeAnim,
              transform: [{ translateX: slideAnim }],
            },
          ]}
        >
          {menuItems.map((item, index) => (
            <TouchableOpacity
              key={index}
              style={styles.menuItem}
              onPress={() => {
                Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
                props.navigation.navigate(item.screen);
              }}
              activeOpacity={0.7}
            >
              <LinearGradient
                colors={item.gradient}
                start={{ x: 0, y: 0 }}
                end={{ x: 1, y: 1 }}
                style={styles.menuIconContainer}
              >
                {renderIcon(item)}
              </LinearGradient>
              <Text style={styles.menuItemText}>{item.label}</Text>
              <Feather name="chevron-right" size={18} color="#9E9E9E" />
            </TouchableOpacity>
          ))}
        </Animated.View>

        <Animated.View
          style={[
            {
              opacity: fadeAnim,
              transform: [{ translateX: slideAnim }],
            },
          ]}
        >
          <TouchableOpacity
            style={styles.logoutMenuItem}
            onPress={handleLogout}
            activeOpacity={0.7}
          >
            <View style={styles.logoutIconContainer}>
              <Feather name="log-out" size={20} color="#FF3B30" />
            </View>
            <Text style={styles.logoutText}>Đăng xuất</Text>
          </TouchableOpacity>
        </Animated.View>
      </DrawerContentScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#FFFFFF",
  },
  header: {
    paddingTop: Platform.OS === "android" ? StatusBar.currentHeight + 20 : 60,
    paddingBottom: 20,
    paddingHorizontal: 20,
    borderBottomLeftRadius: 20,
    borderBottomRightRadius: 20,
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
    backgroundColor: "#1976D2",
    borderRadius: 10,
    width: 20,
    height: 20,
    justifyContent: "center",
    alignItems: "center",
    borderWidth: 2,
    borderColor: "#FFFFFF",
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
    color: "#FFFFFF",
    fontSize: 22,
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
    paddingHorizontal: 12,
    paddingVertical: 5,
    borderRadius: 15,
    marginRight: 10,
  },
  levelText: {
    color: "#FFFFFF",
    fontSize: 12,
    fontWeight: "bold",
  },
  editButton: {
    backgroundColor: "rgba(255, 255, 255, 0.15)",
    borderRadius: 20,
    paddingHorizontal: 15,
    paddingVertical: 6,
    alignSelf: "flex-start",
    marginTop: 15,
    marginBottom: 20,
    borderWidth: 1,
    borderColor: "rgba(255, 255, 255, 0.2)",
  },
  editButtonText: {
    color: "#FFFFFF",
    fontSize: 14,
    fontWeight: "500",
  },
  statsContainer: {
    flexDirection: "row",
    backgroundColor: "rgba(255, 255, 255, 0.1)",
    borderRadius: 15,
    padding: 15,
    borderWidth: 1,
    borderColor: "rgba(255, 255, 255, 0.1)",
  },
  statItem: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  statNumber: {
    color: "#FFFFFF",
    fontSize: 20,
    fontWeight: "bold",
  },
  statLabel: {
    color: "rgba(255, 255, 255, 0.8)",
    fontSize: 13,
    marginTop: 5,
  },
  statDivider: {
    width: 1,
    height: "70%",
    backgroundColor: "rgba(255, 255, 255, 0.2)",
  },
  scrollContent: {
    paddingTop: 10,
  },
  menuContainer: {
    paddingHorizontal: 15,
  },
  menuItem: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 15,
    borderBottomWidth: 1,
    borderBottomColor: "rgba(0, 0, 0, 0.05)",
  },
  menuIconContainer: {
    width: 45,
    height: 45,
    borderRadius: 12,
    justifyContent: "center",
    alignItems: "center",
    marginRight: 15,
    ...SHADOW.small,
  },
  menuItemText: {
    flex: 1,
    fontSize: 16,
    color: "#333333",
    fontWeight: "500",
  },
  logoutMenuItem: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 15,
    paddingHorizontal: 15,
    marginTop: 10,
    marginBottom: 20,
  },
  logoutIconContainer: {
    width: 45,
    height: 45,
    borderRadius: 12,
    justifyContent: "center",
    alignItems: "center",
    marginRight: 15,
    backgroundColor: "#FFF0F0",
    ...SHADOW.small,
  },
  logoutText: {
    fontSize: 16,
    color: "#FF3B30",
    fontWeight: "500",
  },
});
