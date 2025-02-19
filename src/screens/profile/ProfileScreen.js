import React from "react";
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  ScrollView,
  RefreshControl,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Ionicons } from "@expo/vector-icons";
import styles from "../../styles/ProfileStyles";

export default function ProfileScreen({ navigation }) {
  const [refreshing, setRefreshing] = React.useState(false);

  const userInfo = {
    name: "Nguyễn Văn A",
    email: "nguyenvana@gmail.com",
    avatar: "https://picsum.photos/200",
    phone: "0123456789",
    location: "TP.HCM",
    rating: 4.8,
    totalExchanges: 15,
    memberSince: "2023",
  };

  const menuItems = [
    {
      icon: "person-outline",
      title: "Chỉnh sửa thông tin",
      screen: "EditProfile",
    },
    {
      icon: "list-outline",
      title: "Sản phẩm của tôi",
      screen: "MyListings",
      badge: "3",
    },
    {
      icon: "repeat-outline",
      title: "Lịch sử trao đổi",
      screen: "MyExchanges",
    },
    {
      icon: "heart-outline",
      title: "Sản phẩm yêu thích",
      screen: "Favorites",
      badge: "5",
    },
    {
      icon: "notifications-outline",
      title: "Thông báo",
      screen: "Notifications",
      badge: "2",
    },
    {
      icon: "settings-outline",
      title: "Cài đặt",
      screen: "Settings",
    },
  ];

  const onRefresh = React.useCallback(() => {
    setRefreshing(true);
    setTimeout(() => {
      setRefreshing(false);
    }, 2000);
  }, []);

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }
      >
        <View style={styles.header}>
          <TouchableOpacity
            style={styles.menuButton}
            onPress={() => navigation.openDrawer()}
          >
            <Ionicons name="menu-outline" size={24} color="#333" />
          </TouchableOpacity>
          <Text style={styles.headerTitle}>Hồ sơ</Text>
          <TouchableOpacity style={styles.settingsButton}>
            <Ionicons name="settings-outline" size={24} color="#333" />
          </TouchableOpacity>
        </View>

        <View style={styles.profileCard}>
          <View style={styles.avatarContainer}>
            <Image source={{ uri: userInfo.avatar }} style={styles.avatar} />
            <TouchableOpacity style={styles.editAvatarButton}>
              <Ionicons name="camera-outline" size={20} color="#fff" />
            </TouchableOpacity>
          </View>

          <View style={styles.userInfo}>
            <Text style={styles.userName}>{userInfo.name}</Text>
            <View style={styles.ratingContainer}>
              <Ionicons name="star" size={16} color="#FFD700" />
              <Text style={styles.ratingText}>{userInfo.rating}</Text>
              <Text style={styles.exchangeCount}>
                ({userInfo.totalExchanges} lượt trao đổi)
              </Text>
            </View>
            <Text style={styles.memberSince}>
              Thành viên từ {userInfo.memberSince}
            </Text>
          </View>

          <TouchableOpacity
            style={styles.editProfileButton}
            onPress={() => navigation.navigate("EditProfile")}
          >
            <Text style={styles.editProfileText}>Chỉnh sửa hồ sơ</Text>
          </TouchableOpacity>
        </View>

        <View style={styles.statsContainer}>
          <View style={styles.statItem}>
            <Text style={styles.statNumber}>{userInfo.totalExchanges}</Text>
            <Text style={styles.statLabel}>Trao đổi</Text>
          </View>
          <View style={styles.statDivider} />
          <View style={styles.statItem}>
            <Text style={styles.statNumber}>4.8</Text>
            <Text style={styles.statLabel}>Đánh giá</Text>
          </View>
          <View style={styles.statDivider} />
          <View style={styles.statItem}>
            <Text style={styles.statNumber}>12</Text>
            <Text style={styles.statLabel}>Sản phẩm</Text>
          </View>
        </View>

        <View style={styles.menuContainer}>
          {menuItems.map((item, index) => (
            <TouchableOpacity
              key={index}
              style={styles.menuItem}
              onPress={() => navigation.navigate(item.screen)}
            >
              <View style={styles.menuItemLeft}>
                <Ionicons name={item.icon} size={24} color="#333" />
                <Text style={styles.menuItemText}>{item.title}</Text>
              </View>
              <View style={styles.menuItemRight}>
                {item.badge && (
                  <View style={styles.badge}>
                    <Text style={styles.badgeText}>{item.badge}</Text>
                  </View>
                )}
                <Ionicons name="chevron-forward" size={20} color="#666" />
              </View>
            </TouchableOpacity>
          ))}
        </View>

        <TouchableOpacity
          style={styles.logoutButton}
          onPress={() => {
            navigation.replace("Login");
          }}
        >
          <Ionicons name="log-out-outline" size={24} color="#FF3B30" />
          <Text style={styles.logoutText}>Đăng xuất</Text>
        </TouchableOpacity>
      </ScrollView>
    </SafeAreaView>
  );
}
