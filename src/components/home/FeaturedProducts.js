import React from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  FlatList,
  Image,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import { COLORS, SHADOW } from "../theme";
import { Ionicons } from "@expo/vector-icons";

const FeaturedProducts = ({ products }) => {
  const navigation = useNavigation();

  const handleSeeAll = () => {
    navigation.navigate("AllProducts", { products });
  };

  const renderProductItem = ({ item }) => (
    <TouchableOpacity
      style={styles.productCard}
      onPress={() => navigation.navigate("ProductDetail", { product: item })}
    >
      <View style={styles.imageContainer}>
        <Image source={{ uri: item.image }} style={styles.productImage} />
        {item.discount && (
          <View style={styles.discountTag}>
            <Text style={styles.discountText}>{item.discount}</Text>
          </View>
        )}
      </View>
      <View style={styles.productInfo}>
        <Text style={styles.productName} numberOfLines={2}>
          {item.name}
        </Text>
        <View style={styles.priceContainer}>
          <Text style={styles.price}>{item.price}</Text>
          {item.originalPrice && (
            <Text style={styles.originalPrice}>{item.originalPrice}</Text>
          )}
        </View>
        <View style={styles.ratingContainer}>
          <Ionicons name="star" size={12} color="#FFC107" />
          <Text style={styles.rating}>{item.rating}</Text>
          <Text style={styles.sold}>Đã bán {item.sold}</Text>
        </View>
      </View>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Sản phẩm nổi bật</Text>
        <TouchableOpacity onPress={handleSeeAll}>
          <Text style={styles.seeAllText}>Xem tất cả</Text>
        </TouchableOpacity>
      </View>
      <FlatList
        data={products}
        renderItem={renderProductItem}
        keyExtractor={(item) => item.id.toString()}
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.productList}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginVertical: 10,
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 15,
    marginBottom: 10,
  },
  title: {
    fontSize: 18,
    fontWeight: "700",
    color: "#1A1A1A",
  },
  seeAllText: {
    fontSize: 14,
    color: COLORS.primary,
    fontWeight: "600",
  },
  productList: {
    paddingHorizontal: 10,
  },
  productCard: {
    width: 160,
    backgroundColor: "#FFF",
    borderRadius: 10,
    marginHorizontal: 5,
    ...SHADOW.small,
  },
  imageContainer: {
    position: "relative",
    width: "100%",
    height: 160,
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10,
    overflow: "hidden",
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
    backgroundColor: "#FF3B30",
    paddingHorizontal: 6,
    paddingVertical: 2,
    borderRadius: 4,
  },
  discountText: {
    color: "#FFF",
    fontSize: 10,
    fontWeight: "bold",
  },
  productInfo: {
    padding: 10,
  },
  productName: {
    fontSize: 14,
    fontWeight: "500",
    color: "#1A1A1A",
    marginBottom: 6,
    height: 40,
  },
  priceContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 6,
  },
  price: {
    fontSize: 14,
    fontWeight: "700",
    color: COLORS.primary,
    marginRight: 6,
  },
  originalPrice: {
    fontSize: 12,
    color: "#999",
    textDecorationLine: "line-through",
  },
  ratingContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
  rating: {
    fontSize: 12,
    color: "#666",
    marginLeft: 4,
    marginRight: 8,
  },
  sold: {
    fontSize: 12,
    color: "#666",
  },
});

export default FeaturedProducts;