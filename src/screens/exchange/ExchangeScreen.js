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

export default function ExchangeScreen() {
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
      style={styles.exchangeCard}
      activeOpacity={0.95}
    >
      <LinearGradient colors={["#FFF", "#F8F9FA"]} style={styles.cardGradient}>
        <View style={styles.imageContainer}>
          <Image source={{ uri: item.image }} style={styles.itemImage} />
          <View style={styles.priceTag}>
            <Text style={styles.priceText}>{item.price}</Text>
          </View>
          <TouchableOpacity style={styles.saveButton}>
            <Ionicons name="heart-outline" size={24} color={COLORS.primary} />
          </TouchableOpacity>
        </View>

        <View style={styles.contentContainer}>
          <View style={styles.headerRow}>
            <Text style={styles.itemTitle} numberOfLines={1}>
              {item.title}
            </Text>
            <View style={styles.timeContainer}>
              <Ionicons name="time-outline" size={14} color="#666" />
              <Text style={styles.timeText}>{item.timePosted}</Text>
            </View>
          </View>

          <View style={styles.tagsContainer}>
            {item.tags.map((tag, index) => (
              <View key={index} style={styles.tag}>
                <Text style={styles.tagText}>{tag}</Text>
              </View>
            ))}
          </View>

          <View style={styles.conditionRow}>
            <View style={styles.conditionBadge}>
              <Ionicons name="checkmark-circle" size={16} color="#4CD964" />
              <Text style={styles.conditionText}>{item.condition}</Text>
            </View>
            <View style={styles.statsContainer}>
              <Text style={styles.statsText}>{item.views} lượt xem</Text>
              <Text style={styles.statsText}>{item.saves} đã lưu</Text>
            </View>
          </View>

          <View style={styles.exchangeSection}>
            <Text style={styles.sectionTitle}>Muốn trao đổi với:</Text>
            <View style={styles.wantedItemsContainer}>
              {item.wantToExchange.map((want, index) => (
                <View key={index} style={styles.wantedItem}>
                  <Ionicons
                    name="swap-horizontal"
                    size={14}
                    color={COLORS.primary}
                  />
                  <Text style={styles.wantedItemText}>{want}</Text>
                </View>
              ))}
            </View>
          </View>

          <View style={styles.divider} />

          <View style={styles.ownerSection}>
            <View style={styles.ownerInfo}>
              <Image
                source={{ uri: item.owner.avatar }}
                style={styles.ownerAvatar}
              />
              <View style={styles.ownerDetails}>
                <View style={styles.ownerNameRow}>
                  <Text style={styles.ownerName}>{item.owner.name}</Text>
                  {item.owner.verified && (
                    <Ionicons
                      name="checkmark-circle"
                      size={16}
                      color="#4CD964"
                    />
                  )}
                </View>
                <View style={styles.ownerStats}>
                  <View style={styles.ratingContainer}>
                    <Ionicons name="star" size={14} color="#FFD700" />
                    <Text style={styles.ratingText}>{item.owner.rating}</Text>
                  </View>
                  <Text style={styles.exchangeCount}>
                    {item.owner.totalExchanges} lượt trao đổi
                  </Text>
                </View>
              </View>
            </View>
            <View style={styles.locationContainer}>
              <Ionicons name="location-outline" size={14} color="#666" />
              <Text style={styles.locationText}>{item.location}</Text>
            </View>
          </View>

          <TouchableOpacity style={styles.contactButton}>
            <Text style={styles.contactButtonText}>Liên hệ trao đổi</Text>
            <Ionicons name="arrow-forward" size={20} color={COLORS.white} />
          </TouchableOpacity>
        </View>
      </LinearGradient>
    </TouchableOpacity>
  );

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Trao đổi</Text>
        <TouchableOpacity style={styles.postButton}>
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
        <TouchableOpacity style={styles.filterButton}>
          <Ionicons name="filter" size={20} color={COLORS.primary} />
        </TouchableOpacity>
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
    backgroundColor: "#F8F9FA",
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
    fontSize: 24,
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
    fontSize: 16,
    fontWeight: "600",
    marginLeft: 8,
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
    backgroundColor: "#F1F3F5",
    borderRadius: 12,
    paddingHorizontal: 12,
    marginRight: 12,
  },
  searchInput: {
    flex: 1,
    height: 40,
    fontSize: 16,
    marginLeft: 8,
    color: "#1A1A1A",
  },
  clearButton: {
    padding: 4,
  },
  filterButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: `${COLORS.primary}15`,
    justifyContent: "center",
    alignItems: "center",
  },
  content: {
    flex: 1,
    padding: 16,
  },
  exchangeCard: {
    marginBottom: 16,
    borderRadius: 16,
    backgroundColor: COLORS.white,
    ...SHADOW.medium,
  },
  cardGradient: {
    borderRadius: 16,
    overflow: "hidden",
  },
  imageContainer: {
    height: 200,
    position: "relative",
  },
  itemImage: {
    width: "100%",
    height: "100%",
    resizeMode: "cover",
  },
  priceTag: {
    position: "absolute",
    bottom: 12,
    left: 12,
    backgroundColor: "rgba(0,0,0,0.75)",
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 20,
  },
  priceText: {
    color: COLORS.white,
    fontSize: 16,
    fontWeight: "600",
  },
  saveButton: {
    position: "absolute",
    top: 12,
    right: 12,
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: COLORS.white,
    justifyContent: "center",
    alignItems: "center",
    ...SHADOW.small,
  },
  contentContainer: {
    padding: 16,
  },
  headerRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 8,
  },
  itemTitle: {
    flex: 1,
    fontSize: 18,
    fontWeight: "700",
    color: "#1A1A1A",
    marginRight: 8,
  },
  timeContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
  timeText: {
    fontSize: 12,
    color: "#666",
    marginLeft: 4,
  },
  tagsContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
    marginBottom: 12,
  },
  tag: {
    backgroundColor: `${COLORS.primary}15`,
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 8,
    marginRight: 8,
    marginBottom: 8,
  },
  tagText: {
    color: COLORS.primary,
    fontSize: 12,
    fontWeight: "500",
  },
  conditionRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 16,
  },
  conditionBadge: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#4CD96415",
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 8,
  },
  conditionText: {
    color: "#4CD964",
    fontSize: 14,
    fontWeight: "500",
    marginLeft: 4,
  },
  statsContainer: {
    flexDirection: "row",
  },
  statsText: {
    fontSize: 12,
    color: "#666",
    marginLeft: 12,
  },
  exchangeSection: {
    marginBottom: 16,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: "600",
    color: "#1A1A1A",
    marginBottom: 8,
  },
  wantedItemsContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
  },
  wantedItem: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: `${COLORS.primary}10`,
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 20,
    marginRight: 8,
    marginBottom: 8,
  },
  wantedItemText: {
    color: COLORS.primary,
    fontSize: 14,
    marginLeft: 4,
  },
  divider: {
    height: 1,
    backgroundColor: "#E9ECEF",
    marginVertical: 16,
  },
  ownerSection: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 16,
  },
  ownerInfo: {
    flexDirection: "row",
    alignItems: "center",
  },
  ownerAvatar: {
    width: 40,
    height: 40,
    borderRadius: 20,
    marginRight: 12,
  },
  ownerDetails: {
    flex: 1,
  },
  ownerNameRow: {
    flexDirection: "row",
    alignItems: "center",
  },
  ownerName: {
    fontSize: 16,
    fontWeight: "600",
    color: "#1A1A1A",
    marginRight: 4,
  },
  ownerStats: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 4,
  },
  ratingContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginRight: 12,
  },
  ratingText: {
    fontSize: 14,
    color: "#666",
    marginLeft: 4,
  },
  exchangeCount: {
    fontSize: 14,
    color: "#666",
  },
  locationContainer: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#F8F9FA",
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 20,
  },
  locationText: {
    fontSize: 14,
    color: "#666",
    marginLeft: 4,
  },
  contactButton: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: COLORS.primary,
    paddingVertical: 12,
    borderRadius: 12,
  },
  contactButtonText: {
    color: COLORS.white,
    fontSize: 16,
    fontWeight: "600",
    marginRight: 8,
  },
});
