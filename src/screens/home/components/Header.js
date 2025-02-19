import { View, Text, TextInput, TouchableOpacity, Image } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { LinearGradient } from "expo-linear-gradient";
import { SafeAreaView } from "react-native-safe-area-context";
import styles from "../../../styles/HomeStyles";

export default function Header() {
  return (
    <LinearGradient
      colors={["#4A90E2", "#5C9CE5"]}
      style={styles.headerGradient}
    >
      <SafeAreaView style={styles.header}>
        <View style={styles.headerTop}>
          <View style={styles.logoContainer}>
            <Image
              style={styles.logoImage}
              source={require("../../../../assets/logo.png")}
            />
            <Text style={styles.logoText}>ReTech</Text>
          </View>

          <View style={styles.headerActions}>
            <TouchableOpacity style={styles.headerButton}>
              <Ionicons name="notifications-outline" size={24} color="#FFF" />
              <View style={styles.notificationBadge}>
                <Text style={styles.badgeText}>2</Text>
              </View>
            </TouchableOpacity>
            <TouchableOpacity style={styles.headerButton}>
              <Ionicons name="chatbubble-outline" size={24} color="#FFF" />
            </TouchableOpacity>
            <TouchableOpacity style={styles.headerButton}>
              <Ionicons name="cart-outline" size={24} color="#FFF" />
            </TouchableOpacity>
          </View>
        </View>

        <View style={styles.searchContainer}>
          <View style={styles.searchBar}>
            <Ionicons name="search-outline" size={20} color="#666" />
            <TextInput
              placeholder="Tìm kiếm sản phẩm..."
              placeholderTextColor="#666"
              style={styles.searchInput}
            />
            <TouchableOpacity style={styles.filterButton}>
              <Ionicons name="options-outline" size={20} color="#666" />
            </TouchableOpacity>
          </View>
        </View>

        <View style={styles.quickCategories}>
          <TouchableOpacity style={styles.quickCategoryItem}>
            <Ionicons name="flash-outline" size={16} color="#FFF" />
            <Text style={styles.quickCategoryText}>Flash Sale</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.quickCategoryItem}>
            <Ionicons name="trending-up-outline" size={16} color="#FFF" />
            <Text style={styles.quickCategoryText}>Xu hướng</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.quickCategoryItem}>
            <Ionicons name="gift-outline" size={16} color="#FFF" />
            <Text style={styles.quickCategoryText}>Khuyến mãi</Text>
          </TouchableOpacity>
        </View>
      </SafeAreaView>
    </LinearGradient>
  );
}
