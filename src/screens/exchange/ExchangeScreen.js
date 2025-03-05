import React, { useState } from "react";
import {
  View,
  ScrollView,
  Text,
  TouchableOpacity,
  Image,
  TextInput,
  Animated,
  StyleSheet,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Ionicons } from "@expo/vector-icons";
import { LinearGradient } from "expo-linear-gradient";
import { COLORS, SHADOW } from "../../components/theme";

export default function ExchangeScreen({ navigation }) {
  const [searchQuery, setSearchQuery] = useState("");

  const exchangeItems = [
    {
      id: 2,
      title: "Samsung Galaxy S23 Ultra",
      image:
        "https://i.pinimg.com/736x/8a/ca/b5/8acab5f315461ddb9e0393dae2865cca.jpg",
      condition: "Nguyên seal - Chưa kích hoạt",
      price: "26.490.000đ",
      wantToExchange: ["iPhone 14 Pro Max", "MacBook Pro M1"],
      location: "Hà Nội, Cầu Giấy",
      timePosted: "1 giờ trước",
      owner: {
        name: "Hoàng Nam",
        rating: 4.9,
        avatar: "https://randomuser.me/api/portraits/men/2.jpg",
        verified: true,
        totalExchanges: 58,
      },
      tags: ["Samsung", "Flagship", "Brand new"],
      views: 312,
      saves: 18,
    },
    {
      id: 3,
      title: "MacBook Pro 14-inch M2",
      image:
        "https://i.pinimg.com/736x/b8/cf/a7/b8cfa792ac56529df56e69b6035d2b31.jpg",
      condition: "Như mới - 98%",
      price: "39.990.000đ",
      wantToExchange: ["MacBook Air M2 + Tiền", "iPad Pro M1"],
      location: "Đà Nẵng, Hải Châu",
      timePosted: "3 giờ trước",
      owner: {
        name: "Phương Trinh",
        rating: 4.7,
        avatar: "https://randomuser.me/api/portraits/women/3.jpg",
        verified: true,
        totalExchanges: 33,
      },
      tags: ["Apple", "Laptop", "Like new"],
      views: 187,
      saves: 9,
    },
    {
      id: 4,
      title: "Sony PlayStation 5",
      image:
        "https://i.pinimg.com/736x/2d/dc/6e/2ddc6e8492883331f26f6fcf698ccf99.jpg",
      condition: "Mới 100% - Full box",
      price: "14.990.000đ",
      wantToExchange: ["Xbox Series X", "Nintendo Switch OLED"],
      location: "TP.HCM, Bình Thạnh",
      timePosted: "30 phút trước",
      owner: {
        name: "Văn Hậu",
        rating: 4.6,
        avatar: "https://randomuser.me/api/portraits/men/4.jpg",
        verified: false,
        totalExchanges: 20,
      },
      tags: ["Gaming", "Sony", "Brand new"],
      views: 279,
      saves: 22,
    },
    {
      id: 5,
      title: "iPad Pro 12.9-inch M1",
      image:
        "https://i.pinimg.com/736x/47/84/0e/47840ea9c8b39499791fb6f96121b142.jpg",
      condition: "Như mới - 97%",
      price: "25.990.000đ",
      wantToExchange: ["MacBook Air M1", "iPhone 14 Pro"],
      location: "Hà Nội, Hoàn Kiếm",
      timePosted: "1 ngày trước",
      owner: {
        name: "Thu Hà",
        rating: 4.8,
        avatar: "https://randomuser.me/api/portraits/women/5.jpg",
        verified: true,
        totalExchanges: 41,
      },
      tags: ["Apple", "Tablet", "Like new"],
      views: 195,
      saves: 14,
    },
  ];

  const renderExchangeCard = (item) => (
    <TouchableOpacity
      key={item.id}
      style={styles.card}
      onPress={() => navigation.navigate("ExchangeDetail", { item })}
    >
      <View style={styles.cardImageContainer}>
        <Image source={{ uri: item.image }} style={styles.cardImage} />
        <View style={styles.timePostedBadge}>
          <Text style={styles.timePostedText}>{item.timePosted}</Text>
        </View>
        <TouchableOpacity style={styles.favoriteButton}>
          <Ionicons name="heart-outline" size={22} color="#fff" />
        </TouchableOpacity>
      </View>

      <View style={styles.cardContent}>
        <Text style={styles.cardTitle} numberOfLines={2}>
          {item.title}
        </Text>

        <View style={styles.priceRow}>
          <Text style={styles.cardPrice}>{item.price}</Text>
          <View style={styles.conditionBadge}>
            <Text style={styles.conditionText}>{item.condition}</Text>
          </View>
        </View>

        <View style={styles.exchangeInfo}>
          <Text style={styles.exchangeLabel}>Muốn đổi:</Text>
          <View style={styles.wantedItemsContainer}>
            {item.wantToExchange.map((wanted, index) => (
              <View key={index} style={styles.wantedItemChip}>
                <Text style={styles.wantedItemText}>{wanted}</Text>
              </View>
            ))}
          </View>
        </View>

        <View style={styles.cardFooter}>
          <View style={styles.locationContainer}>
            <Ionicons name="location-outline" size={16} color="#666" />
            <Text style={styles.locationText}>{item.location}</Text>
          </View>

          <TouchableOpacity
            style={styles.contactButton}
            onPress={() => navigation.navigate("Chat", { item })}
          >
            <LinearGradient
              colors={[COLORS.primary, `${COLORS.primary}CC`]}
              start={{ x: 0, y: 0 }}
              end={{ x: 1, y: 1 }}
              style={styles.contactGradient}
            >
              <Text style={styles.contactButtonText}>Liên hệ</Text>
            </LinearGradient>
          </TouchableOpacity>
        </View>
      </View>
    </TouchableOpacity>
  );

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Trao đổi</Text>
        <TouchableOpacity
          style={styles.postButton}
          onPress={() => navigation.navigate("CreateExchange")}
        >
          <LinearGradient
            colors={[COLORS.primary, `${COLORS.primary}CC`]}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 1 }}
            style={styles.gradientButton}
          >
            <Ionicons name="add-circle-outline" size={24} color="#fff" />
            <Text style={styles.postButtonText}>Đăng tin</Text>
          </LinearGradient>
        </TouchableOpacity>
      </View>

      <View style={styles.searchContainer}>
        <View style={styles.searchBar}>
          <Ionicons name="search-outline" size={20} color="#666" />
          <TextInput
            placeholder="Tìm kiếm sản phẩm..."
            style={styles.searchInput}
            value={searchQuery}
            onChangeText={setSearchQuery}
            placeholderTextColor="#999"
          />
          {searchQuery.length > 0 && (
            <TouchableOpacity
              onPress={() => setSearchQuery("")}
              style={styles.clearButton}
            >
              <Ionicons name="close-circle" size={20} color="#666" />
            </TouchableOpacity>
          )}
        </View>
        <TouchableOpacity
          style={styles.filterButton}
          onPress={() => navigation.navigate("FilterScreen")}
        >
          <LinearGradient
            colors={["#f8f9fa", "#e9ecef"]}
            style={styles.filterGradient}
          >
            <Ionicons name="filter" size={20} color={COLORS.primary} />
          </LinearGradient>
        </TouchableOpacity>
      </View>

      <View style={styles.categoriesContainer}>
        <ScrollView horizontal showsHorizontalScrollIndicator={false}>
          {[
            "Tất cả",
            "Điện thoại",
            "Laptop",
            "Tablet",
            "Đồng hồ",
            "Phụ kiện",
            "Khác",
          ].map((category, index) => (
            <TouchableOpacity
              key={index}
              style={[
                styles.categoryChip,
                index === 0 && styles.activeCategoryChip,
              ]}
            >
              <Text
                style={[
                  styles.categoryText,
                  index === 0 && styles.activeCategoryText,
                ]}
              >
                {category}
              </Text>
            </TouchableOpacity>
          ))}
        </ScrollView>
      </View>

      <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
        {exchangeItems.map(renderExchangeCard)}
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f8f9fa",
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 16,
    paddingVertical: 12,
    backgroundColor: COLORS.white,
    ...SHADOW.medium,
  },
  headerTitle: {
    fontSize: 22,
    fontWeight: "700",
    color: "#1A1A1A",
  },
  postButton: {
    borderRadius: 25,
    overflow: "hidden",
  },
  gradientButton: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 16,
    paddingVertical: 8,
  },
  postButtonText: {
    color: COLORS.white,
    fontWeight: "600",
    marginLeft: 6,
  },
  searchContainer: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 16,
    paddingVertical: 12,
    backgroundColor: COLORS.white,
  },
  searchBar: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#f1f3f5",
    borderRadius: 12,
    paddingHorizontal: 12,
    paddingVertical: 10,
    marginRight: 12,
  },
  searchInput: {
    flex: 1,
    fontSize: 16,
    marginLeft: 8,
    color: "#1A1A1A",
  },
  clearButton: {
    padding: 4,
  },
  filterButton: {
    borderRadius: 12,
    overflow: "hidden",
  },
  filterGradient: {
    padding: 12,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: "#e9ecef",
  },
  categoriesContainer: {
    paddingVertical: 12,
    paddingLeft: 16,
    backgroundColor: COLORS.white,
    marginBottom: 8,
  },
  categoryChip: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    backgroundColor: "#f1f3f5",
    borderRadius: 20,
    marginRight: 8,
  },
  activeCategoryChip: {
    backgroundColor: `${COLORS.primary}15`,
  },
  categoryText: {
    color: "#666",
    fontWeight: "500",
  },
  activeCategoryText: {
    color: COLORS.primary,
    fontWeight: "600",
  },
  content: {
    flex: 1,
    padding: 16,
  },
  card: {
    backgroundColor: COLORS.white,
    borderRadius: 16,
    marginBottom: 16,
    overflow: "hidden",
    ...SHADOW.medium,
  },
  cardImageContainer: {
    position: "relative",
    height: 200,
  },
  cardImage: {
    width: "100%",
    height: "100%",
    resizeMode: "cover",
  },
  timePostedBadge: {
    position: "absolute",
    top: 12,
    left: 12,
    backgroundColor: "rgba(0,0,0,0.6)",
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 12,
  },
  timePostedText: {
    color: COLORS.white,
    fontSize: 12,
    fontWeight: "500",
  },
  favoriteButton: {
    position: "absolute",
    top: 12,
    right: 12,
    backgroundColor: "rgba(0,0,0,0.3)",
    padding: 8,
    borderRadius: 20,
  },
  cardContent: {
    padding: 16,
  },
  cardTitle: {
    fontSize: 18,
    fontWeight: "600",
    color: "#1A1A1A",
    marginBottom: 8,
  },
  priceRow: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: 12,
  },
  cardPrice: {
    fontSize: 20,
    fontWeight: "700",
    color: COLORS.primary,
  },
  conditionBadge: {
    backgroundColor: `${COLORS.primary}15`,
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 8,
  },
  conditionText: {
    color: COLORS.primary,
    fontSize: 12,
    fontWeight: "500",
  },
  exchangeInfo: {
    marginBottom: 12,
  },
  exchangeLabel: {
    fontSize: 14,
    fontWeight: "600",
    color: "#666",
    marginBottom: 6,
  },
  wantedItemsContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
  },
  wantedItemChip: {
    backgroundColor: "#f1f3f5",
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 8,
    marginRight: 6,
    marginBottom: 6,
  },
  wantedItemText: {
    color: "#666",
    fontSize: 12,
  },
  cardFooter: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginTop: 8,
  },
  locationContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
  locationText: {
    color: "#666",
    fontSize: 14,
    marginLeft: 4,
  },
  contactButton: {
    borderRadius: 8,
    overflow: "hidden",
  },
  contactGradient: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 8,
  },
  contactButtonText: {
    color: COLORS.white,
    fontWeight: "600",
    fontSize: 14,
  },
});
