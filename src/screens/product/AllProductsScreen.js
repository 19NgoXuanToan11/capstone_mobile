import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  TouchableOpacity,
  Image,
  TextInput,
  ActivityIndicator,
  Dimensions,
  Modal,
  ScrollView,
  StatusBar,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Ionicons } from "@expo/vector-icons";
import { LinearGradient } from "expo-linear-gradient";
import { useNavigation } from "@react-navigation/native";
import { COLORS, SHADOW } from "../../components/theme";

const { width } = Dimensions.get("window");
const COLUMN_NUM = 2;
const ITEM_WIDTH = (width - 48) / COLUMN_NUM;

const AllProductsScreen = ({ route }) => {
  const navigation = useNavigation();
  const initialProducts = route.params?.products || [
    {
      id: 1,
      name: "iPhone 14 Pro Max",
      price: "28.990.000đ",
      originalPrice: "32.990.000đ",
      image:
        "https://i.pinimg.com/736x/61/86/03/618603d1665a0d3d20cc29ab8aab2c0d.jpg",
      condition: "Như mới",
      rating: 4.8,
      sold: 126,
      discount: "-20%",
      verified: true,
      category: "Điện thoại",
    },
    {
      id: 2,
      name: "MacBook Pro M2",
      price: "42.990.000đ",
      originalPrice: "48.990.000đ",
      image:
        "https://i.pinimg.com/736x/eb/36/99/eb369990805c29991e933f2654cfe7b0.jpg",
      condition: "Mới 99%",
      rating: 4.9,
      sold: 84,
      discount: "-15%",
      verified: true,
      category: "Laptop",
    },
  ];

  const [products, setProducts] = useState(initialProducts);
  const [filteredProducts, setFilteredProducts] = useState(initialProducts);
  const [searchQuery, setSearchQuery] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [activeCategory, setActiveCategory] = useState("Tất cả");
  const [sortOption, setSortOption] = useState("Phổ biến");
  const [showFilterModal, setShowFilterModal] = useState(false);
  const [priceRange, setPriceRange] = useState([0, 100000000]);
  const [selectedConditions, setSelectedConditions] = useState([]);
  const [selectedCategories, setSelectedCategories] = useState([]);

  const categories = [
    "Tất cả",
    "Điện thoại",
    "Laptop",
    "Máy tính bảng",
    "Đồng hồ thông minh",
    "Tai nghe",
    "Máy chơi game",
    "Máy ảnh",
  ];

  const sortOptions = [
    "Phổ biến",
    "Mới nhất",
    "Giá: Thấp đến cao",
    "Giá: Cao đến thấp",
    "Đánh giá cao",
  ];

  const conditions = ["Mới 100%", "Như mới", "Mới 99%", "Mới 98%", "Mới 95%"];

  useEffect(() => {
    filterProducts();
  }, [activeCategory, sortOption, searchQuery, selectedConditions, selectedCategories, priceRange]);

  const filterProducts = () => {
    setIsLoading(true);

    setTimeout(() => {
      let result = [...products];

      if (activeCategory !== "Tất cả") {
        result = result.filter((item) => item.category === activeCategory);
      }

      if (searchQuery) {
        const query = searchQuery.toLowerCase();
        result = result.filter(
          (item) =>
            item.name.toLowerCase().includes(query) ||
            item.category.toLowerCase().includes(query)
        );
      }

      if (selectedConditions.length > 0) {
        result = result.filter((item) =>
          selectedConditions.includes(item.condition)
        );
      }

      if (selectedCategories.length > 0) {
        result = result.filter((item) =>
          selectedCategories.includes(item.category)
        );
      }

      result = result.filter((item) => {
        const price = parseInt(item.price.replace(/[^\d]/g, ""));
        return price >= priceRange[0] && price <= priceRange[1];
      });

      switch (sortOption) {
        case "Mới nhất":
          result.sort((a, b) => b.id - a.id);
          break;
        case "Giá: Thấp đến cao":
          result.sort((a, b) => {
            const priceA = parseInt(a.price.replace(/[^\d]/g, ""));
            const priceB = parseInt(b.price.replace(/[^\d]/g, ""));
            return priceA - priceB;
          });
          break;
        case "Giá: Cao đến thấp":
          result.sort((a, b) => {
            const priceA = parseInt(a.price.replace(/[^\d]/g, ""));
            const priceB = parseInt(b.price.replace(/[^\d]/g, ""));
            return priceB - priceA;
          });
          break;
        case "Đánh giá cao":
          result.sort((a, b) => b.rating - a.rating);
          break;
        default:
          result.sort((a, b) => b.sold - a.sold);
      }

      setFilteredProducts(result);
      setIsLoading(false);
    }, 500);
  };

  const handleSearch = (text) => {
    setSearchQuery(text);
  };

  const handleCategoryPress = (category) => {
    setActiveCategory(category);
  };

  const handleSortOptionPress = (option) => {
    setSortOption(option);
  };

  const handleFilterPress = () => {
    setShowFilterModal(true);
  };

  const handleApplyFilter = () => {
    setShowFilterModal(false);
  };

  const handleResetFilter = () => {
    setSelectedConditions([]);
    setSelectedCategories([]);
    setPriceRange([0, 100000000]);
  };

  const toggleCondition = (condition) => {
    if (selectedConditions.includes(condition)) {
      setSelectedConditions(
        selectedConditions.filter((item) => item !== condition)
      );
    } else {
      setSelectedConditions([...selectedConditions, condition]);
    }
  };

  const toggleCategory = (category) => {
    if (selectedCategories.includes(category)) {
      setSelectedCategories(
        selectedCategories.filter((item) => item !== category)
      );
    } else {
      setSelectedCategories([...selectedCategories, category]);
    }
  };

  const renderProductItem = ({ item }) => {
    const discountColor = item.discount ? "#FF3B30" : "#4CD964";

    return (
      <TouchableOpacity
        style={styles.productCard}
        onPress={() => navigation.navigate("ProductDetail", { product: item })}
        activeOpacity={0.9}
      >
        <View style={styles.imageContainer}>
          <Image source={{ uri: item.image }} style={styles.productImage} />

          {item.discount && (
            <View
              style={[styles.discountTag, { backgroundColor: discountColor }]}
            >
              <Text style={styles.discountText}>{item.discount}</Text>
            </View>
          )}

          <View style={styles.conditionBadge}>
            <Text style={styles.conditionText}>{item.condition}</Text>
          </View>

          <TouchableOpacity style={styles.favoriteButton}>
            <Ionicons name="heart-outline" size={18} color="#FF3B30" />
          </TouchableOpacity>
        </View>

        <View style={styles.contentContainer}>
          <View style={styles.titleRow}>
            <Text style={styles.productName} numberOfLines={2}>
              {item.name}
            </Text>
            {item.verified && (
              <Ionicons
                name="checkmark-circle"
                size={16}
                color={COLORS.primary}
              />
            )}
          </View>

          <View style={styles.priceContainer}>
            <Text style={styles.price}>{item.price}</Text>
            {item.originalPrice && (
              <Text style={styles.originalPrice}>{item.originalPrice}</Text>
            )}
          </View>

          <View style={styles.metaContainer}>
            <View style={styles.ratingContainer}>
              <Ionicons name="star" size={12} color="#FFC107" />
              <Text style={styles.ratingText}>{item.rating}</Text>
            </View>
            <Text style={styles.soldText}>Đã bán {item.sold}</Text>
          </View>
        </View>
      </TouchableOpacity>
    );
  };

  const renderEmptyComponent = () => (
    <View style={styles.emptyContainer}>
      <Ionicons name="search-outline" size={60} color="#CCC" />
      <Text style={styles.emptyTitle}>Không tìm thấy sản phẩm</Text>
      <Text style={styles.emptyText}>
        Không có sản phẩm nào phù hợp với bộ lọc của bạn. Vui lòng thử lại với
        các tiêu chí khác.
      </Text>
      <TouchableOpacity
        style={styles.resetButton}
        onPress={() => {
          setSearchQuery("");
          setActiveCategory("Tất cả");
          setSortOption("Phổ biến");
          setSelectedConditions([]);
          setSelectedCategories([]);
          setPriceRange([0, 100000000]);
        }}
      >
        <Text style={styles.resetButtonText}>Đặt lại bộ lọc</Text>
      </TouchableOpacity>
    </View>
  );

  const renderCategoryList = () => {
    return (
      <View style={styles.categoriesContainer}>
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={styles.categoriesScrollView}
        >
          {categories.map((category, index) => (
            <TouchableOpacity
              key={index}
              style={[
                styles.categoryItem,
                activeCategory === category && styles.activeCategoryItem,
              ]}
              onPress={() => handleCategoryPress(category)}
            >
              <Text
                style={[
                  styles.categoryText,
                  activeCategory === category && styles.activeCategoryText,
                ]}
              >
                {category}
              </Text>
            </TouchableOpacity>
          ))}
        </ScrollView>
      </View>
    );
  };

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="dark-content" backgroundColor="#FFF" />
      
      {/* Header */}
      <LinearGradient
        colors={['#FFFFFF', '#F8F8F8']}
        style={styles.header}
      >
        <TouchableOpacity
          style={styles.backButton}
          onPress={() => navigation.goBack()}
        >
          <Ionicons name="arrow-back" size={22} color="#000" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Tất cả sản phẩm</Text>
        <View style={styles.headerRight}>
          <TouchableOpacity style={styles.iconButton}>
            <Ionicons name="heart-outline" size={22} color="#000" />
          </TouchableOpacity>
          <TouchableOpacity style={styles.iconButton}>
            <Ionicons name="cart-outline" size={22} color="#000" />
          </TouchableOpacity>
        </View>
      </LinearGradient>

      {/* Search Bar */}
      <View style={styles.searchContainer}>
        <View style={styles.searchInputContainer}>
          <Ionicons name="search" size={20} color="#999" />
          <TextInput
            style={styles.searchInput}
            placeholder="Tìm kiếm sản phẩm..."
            value={searchQuery}
            onChangeText={handleSearch}
          />
          {searchQuery.length > 0 && (
            <TouchableOpacity onPress={() => setSearchQuery("")}>
              <Ionicons name="close-circle" size={20} color="#999" />
            </TouchableOpacity>
          )}
        </View>
      </View>

      {renderCategoryList()}

      <View style={styles.filterSortContainer}>
        <TouchableOpacity
          style={styles.filterButton}
          onPress={handleFilterPress}
        >
          <Ionicons name="options-outline" size={18} color="#333" />
          <Text style={styles.filterButtonText}>Lọc</Text>
        </TouchableOpacity>

        <View style={styles.sortOptionsContainer}>
          <ScrollView
            horizontal
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={styles.sortOptionsScrollView}
          >
            {sortOptions.map((option, index) => (
              <TouchableOpacity
                key={index}
                style={[
                  styles.sortOption,
                  sortOption === option && styles.activeSortOption,
                ]}
                onPress={() => handleSortOptionPress(option)}
              >
                <Text
                  style={[
                    styles.sortOptionText,
                    sortOption === option && styles.activeSortOptionText,
                  ]}
                >
                  {option}
                </Text>
              </TouchableOpacity>
            ))}
          </ScrollView>
        </View>
      </View>

      {/* Results Count */}
      <View style={styles.resultsContainer}>
        <Text style={styles.resultsText}>
          {filteredProducts.length} sản phẩm được tìm thấy
        </Text>
      </View>

      {/* Product Grid */}
      {isLoading ? (
        <View style={styles.loadingContainer}>
          <ActivityIndicator size="large" color={COLORS.primary} />
          <Text style={styles.loadingText}>Đang tải sản phẩm...</Text>
        </View>
      ) : (
        <FlatList
          data={filteredProducts}
          renderItem={renderProductItem}
          keyExtractor={(item) => item.id.toString()}
          numColumns={2}
          contentContainerStyle={styles.productGrid}
          columnWrapperStyle={styles.columnWrapper}
          showsVerticalScrollIndicator={false}
          ListEmptyComponent={renderEmptyComponent}
        />
      )}

      {/* Filter Modal */}
      <Modal
        visible={showFilterModal}
        transparent={true}
        animationType="slide"
        onRequestClose={() => setShowFilterModal(false)}
      >
        <View style={styles.modalOverlay}>
          <View style={styles.modalContainer}>
            <View style={styles.modalHeader}>
              <Text style={styles.modalTitle}>Lọc sản phẩm</Text>
              <TouchableOpacity onPress={() => setShowFilterModal(false)}>
                <Ionicons name="close" size={24} color="#000" />
              </TouchableOpacity>
            </View>

            <ScrollView>
              {/* Condition Filter */}
              <View style={styles.modalSection}>
                <Text style={styles.modalSectionTitle}>Tình trạng</Text>
                <View style={styles.modalCategoriesGrid}>
                  {conditions.map((condition) => (
                    <TouchableOpacity
                      key={condition}
                      style={[
                        styles.categoryButton,
                        selectedConditions.includes(condition) &&
                          styles.activeCategoryButton,
                        { marginRight: 8, marginBottom: 8 },
                      ]}
                      onPress={() => toggleCondition(condition)}
                    >
                      <Text
                        style={[
                          styles.categoryButtonText,
                          selectedConditions.includes(condition) &&
                            styles.activeCategoryButtonText,
                        ]}
                      >
                        {condition}
                      </Text>
                    </TouchableOpacity>
                  ))}
                </View>
              </View>

              {/* Category Filter */}
              <View style={styles.modalSection}>
                <Text style={styles.modalSectionTitle}>Danh mục</Text>
                <View style={styles.modalCategoriesGrid}>
                  {categories
                    .filter((cat) => cat !== "Tất cả")
                    .map((category) => (
                      <TouchableOpacity
                        key={category}
                        style={[
                          styles.categoryButton,
                          selectedCategories.includes(category) &&
                            styles.activeCategoryButton,
                          { marginRight: 8, marginBottom: 8 },
                        ]}
                        onPress={() => toggleCategory(category)}
                      >
                        <Text
                          style={[
                            styles.categoryButtonText,
                            selectedCategories.includes(category) &&
                              styles.activeCategoryButtonText,
                          ]}
                        >
                          {category}
                        </Text>
                      </TouchableOpacity>
                    ))}
                </View>
              </View>
            </ScrollView>

            {/* Action Buttons */}
            <View style={styles.modalActions}>
              <TouchableOpacity
                style={styles.resetFilterButton}
                onPress={handleResetFilter}
              >
                <Text style={styles.resetFilterButtonText}>Đặt lại</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={styles.applyFilterButton}
                onPress={handleApplyFilter}
              >
                <Text style={styles.applyFilterButtonText}>Áp dụng</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F8F8F8",
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 16,
    paddingVertical: 12,
    backgroundColor: "#FFF",
    borderBottomWidth: 1,
    borderBottomColor: "#F0F0F0",
    borderBottomLeftRadius: 15,
    borderBottomRightRadius: 15,
    ...SHADOW.small,
  },
  backButton: {
    width: 40,
    height: 40,
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 20,
    backgroundColor: "rgba(245, 245, 245, 0.8)",
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: "700",
    color: "#1A1A1A",
  },
  headerRight: {
    flexDirection: "row",
    alignItems: "center",
  },
  iconButton: {
    width: 40,
    height: 40,
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 20,
    backgroundColor: "rgba(245, 245, 245, 0.8)",
    marginLeft: 8,
  },
  searchContainer: {
    paddingHorizontal: 16,
    paddingVertical: 12,
    backgroundColor: "#FFF",
    marginTop: 8,
    marginHorizontal: 16,
    borderRadius: 12,
    ...SHADOW.small,
  },
  searchInputContainer: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#F5F5F5",
    borderRadius: 8,
    paddingHorizontal: 12,
    paddingVertical: 8,
  },
  searchInput: {
    flex: 1,
    marginLeft: 8,
    fontSize: 14,
    color: "#333",
  },
  categoriesContainer: {
    marginVertical: 12,
  },
  categoriesScrollView: {
    paddingHorizontal: 16,
    paddingVertical: 4,
  },
  categoryItem: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    marginRight: 10,
    borderRadius: 20,
    backgroundColor: "#F5F5F5",
    borderWidth: 1,
    borderColor: "#F0F0F0",
  },
  activeCategoryItem: {
    backgroundColor: COLORS.primary,
    borderColor: COLORS.primary,
  },
  categoryText: {
    fontSize: 14,
    color: "#666",
    fontWeight: "500",
  },
  activeCategoryText: {
    color: "#FFF",
    fontWeight: "600",
  },
  filterSortContainer: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 16,
    marginBottom: 12,
  },
  filterButton: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 16,
    backgroundColor: "#F5F5F5",
    borderWidth: 1,
    borderColor: "#EBEBEB",
    marginRight: 10,
  },
  filterButtonText: {
    fontSize: 14,
    color: "#333",
    marginLeft: 4,
  },
  sortOptionsContainer: {
    flex: 1,
  },
  sortOptionsScrollView: {
    paddingRight: 15,
  },
  sortOption: {
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 16,
    backgroundColor: "#F5F5F5",
    borderWidth: 1,
    borderColor: "#EBEBEB",
    marginRight: 8,
  },
  activeSortOption: {
    backgroundColor: "#FFF",
    borderColor: COLORS.primary,
  },
  sortOptionText: {
    fontSize: 14,
    color: "#666",
  },
  activeSortOptionText: {
    color: COLORS.primary,
    fontWeight: "600",
  },
  resultsContainer: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    backgroundColor: "#FFF",
    marginHorizontal: 16,
    borderRadius: 8,
    marginBottom: 8,
    ...SHADOW.small,
  },
  resultsText: {
    fontSize: 14,
    color: "#666",
  },
  productGrid: {
    paddingHorizontal: 12,
    paddingVertical: 8,
    paddingBottom: 20,
  },
  columnWrapper: {
    justifyContent: "space-between",
  },
  productCard: {
    width: ITEM_WIDTH,
    backgroundColor: "#FFF",
    borderRadius: 12,
    marginBottom: 16,
    overflow: "hidden",
    ...SHADOW.small,
  },
  imageContainer: {
    position: "relative",
    width: "100%",
    height: 160,
  },
  productImage: {
    width: "100%",
    height: "100%",
    resizeMode: "cover",
  },
  discountTag: {
    position: "absolute",
    top: 8,
    left: 8,
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 4,
  },
  discountText: {
    color: "#FFF",
    fontSize: 12,
    fontWeight: "bold",
  },
  conditionBadge: {
    position: "absolute",
    bottom: 8,
    left: 8,
    backgroundColor: "rgba(0,0,0,0.6)",
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 4,
  },
  conditionText: {
    color: "#FFF",
    fontSize: 10,
    fontWeight: "500",
  },
  favoriteButton: {
    position: "absolute",
    top: 8,
    right: 8,
    width: 30,
    height: 30,
    borderRadius: 15,
    backgroundColor: "rgba(255,255,255,0.9)",
    alignItems: "center",
    justifyContent: "center",
  },
  contentContainer: {
    padding: 12,
  },
  titleRow: {
    flexDirection: "row",
    alignItems: "flex-start",
    marginBottom: 6,
  },
  productName: {
    flex: 1,
    fontSize: 14,
    fontWeight: "600",
    color: "#333",
    marginRight: 4,
  },
  priceContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 6,
  },
  price: {
    fontSize: 16,
    fontWeight: "700",
    color: COLORS.primary,
    marginRight: 6,
  },
  originalPrice: {
    fontSize: 12,
    color: "#999",
    textDecorationLine: "line-through",
  },
  metaContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  ratingContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
  ratingText: {
    fontSize: 12,
    color: "#666",
    marginLeft: 4,
  },
  soldText: {
    fontSize: 12,
    color: "#666",
  },
  loadingContainer: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 30,
  },
  loadingText: {
    marginTop: 10,
    fontSize: 14,
    color: "#666",
  },
  emptyContainer: {
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 40,
    paddingHorizontal: 40,
  },
  emptyTitle: {
    fontSize: 18,
    fontWeight: "600",
    color: "#333",
    marginTop: 16,
    marginBottom: 8,
  },
  emptyText: {
    fontSize: 14,
    color: "#666",
    textAlign: "center",
    marginBottom: 20,
  },
  resetButton: {
    paddingHorizontal: 20,
    paddingVertical: 10,
    backgroundColor: COLORS.primary,
    borderRadius: 8,
  },
  resetButtonText: {
    color: "#FFF",
    fontSize: 14,
    fontWeight: "600",
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: "rgba(0,0,0,0.5)",
    justifyContent: "flex-end",
  },
  modalContainer: {
    backgroundColor: "#FFF",
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    paddingBottom: 30,
    maxHeight: "80%",
  },
  modalHeader: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 20,
    paddingVertical: 16,
    borderBottomWidth: 1,
    borderBottomColor: "#F0F0F0",
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: "700",
    color: "#1A1A1A",
  },
  modalSection: {
    paddingHorizontal: 20,
    paddingVertical: 16,
  },
  modalSectionTitle: {
    fontSize: 16,
    fontWeight: "600",
    color: "#333",
    marginBottom: 12,
  },
  modalCategoriesGrid: {
    flexDirection: "row",
    flexWrap: "wrap",
  },
  categoryButton: {
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: "#EBEBEB",
    backgroundColor: "#F5F5F5",
  },
  activeCategoryButton: {
    backgroundColor: COLORS.primary,
    borderColor: COLORS.primary,
  },
  categoryButtonText: {
    fontSize: 14,
    color: "#666",
  },
  activeCategoryButtonText: {
    color: "#FFF",
    fontWeight: "500",
  },
  modalActions: {
    flexDirection: "row",
    paddingHorizontal: 20,
    paddingTop: 16,
    borderTopWidth: 1,
    borderTopColor: "#F0F0F0",
  },
  resetFilterButton: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 12,
    borderWidth: 1,
    borderColor: "#DDD",
    borderRadius: 8,
    marginRight: 10,
  },
  resetFilterButtonText: {
    fontSize: 16,
    fontWeight: "600",
    color: "#666",
  },
  applyFilterButton: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 12,
    backgroundColor: COLORS.primary,
    borderRadius: 8,
  },
  applyFilterButtonText: {
    fontSize: 16,
    fontWeight: "600",
    color: "#FFF",
  },
});

export default AllProductsScreen;
