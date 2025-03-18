import React from "react";
import {
  View,
  Text,
  StyleSheet,
  Image,
  TouchableOpacity,
  ScrollView,
  Dimensions,
  StatusBar,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Ionicons } from "@expo/vector-icons";
import { COLORS, SHADOW } from "../../components/theme";

const { width, height } = Dimensions.get("window");

const OrderConfirmationScreen = ({ route, navigation }) => {
  const { orderId, product, totalPrice, deliveryAddress, paymentMethod } =
    route.params;

  const getPaymentMethodText = () => {
    switch (paymentMethod) {
      case "cod":
        return "Thanh toán khi nhận hàng";
      case "bank":
        return "Chuyển khoản ngân hàng";
      case "momo":
        return "Ví MoMo";
      default:
        return "Thanh toán khi nhận hàng";
    }
  };

  const formatCurrency = (amount) => {
    return amount.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".") + "đ";
  };

  const handleTrackOrder = () => {
    // Điều hướng đến màn hình theo dõi đơn hàng
    navigation.navigate("OrderTracking", {
      orderId,
      product,
      totalPrice,
      deliveryAddress,
      paymentMethod,
    });
  };

  const handleContinueShopping = () => {
    // Quay lại màn hình Home
    navigation.navigate("Home");
  };

  return (
    <View style={[styles.container, { width, height }]}>
      <StatusBar
        translucent
        backgroundColor="transparent"
        barStyle="dark-content"
      />

      <ScrollView
        showsVerticalScrollIndicator={false}
        style={styles.scrollView}
        contentContainerStyle={styles.scrollContent}
      >
        <View style={styles.successContainer}>
          <View style={styles.successIconContainer}>
            <Ionicons
              name="checkmark-circle"
              size={100}
              color={COLORS.primary}
            />
          </View>
          <Text style={styles.successTitle}>Đặt hàng thành công!</Text>
          <Text style={styles.successMessage}>
            Cảm ơn bạn đã đặt hàng. Đơn hàng của bạn đang được xử lý.
          </Text>
        </View>

        <View style={styles.orderInfoContainer}>
          <View style={styles.orderIdContainer}>
            <Text style={styles.orderIdLabel}>Mã đơn hàng:</Text>
            <Text style={styles.orderId}>{orderId}</Text>
          </View>

          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Thông tin sản phẩm</Text>
            <View style={styles.productCard}>
              <Image
                source={{ uri: product.image }}
                style={styles.productImage}
              />
              <View style={styles.productInfo}>
                <Text style={styles.productName} numberOfLines={2}>
                  {product.name}
                </Text>
                <Text style={styles.productPrice}>{product.price}</Text>
                <Text style={styles.productCondition}>
                  Tình trạng: {product.condition || "Mới"}
                </Text>
              </View>
            </View>
          </View>

          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Địa chỉ giao hàng</Text>
            <View style={styles.addressCard}>
              <Text style={styles.addressName}>{deliveryAddress.fullName}</Text>
              <Text style={styles.addressPhone}>{deliveryAddress.phone}</Text>
              <Text style={styles.addressText}>
                {deliveryAddress.address}, {deliveryAddress.city}
              </Text>
            </View>
          </View>

          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Phương thức thanh toán</Text>
            <View style={styles.paymentCard}>
              <Ionicons
                name={
                  paymentMethod === "cod"
                    ? "cash-outline"
                    : paymentMethod === "bank"
                    ? "card-outline"
                    : "wallet-outline"
                }
                size={24}
                color={COLORS.primary}
              />
              <Text style={styles.paymentText}>{getPaymentMethodText()}</Text>
            </View>
          </View>

          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Tổng thanh toán</Text>
            <View style={styles.totalCard}>
              <Text style={styles.totalAmount}>
                {formatCurrency(totalPrice)}
              </Text>
            </View>
          </View>

          <View style={styles.estimatedDelivery}>
            <Ionicons name="time-outline" size={20} color={COLORS.primary} />
            <Text style={styles.estimatedDeliveryText}>
              Dự kiến giao hàng: 3-5 ngày
            </Text>
          </View>
        </View>

        <View style={styles.actionsContainer}>
          <TouchableOpacity
            style={styles.trackOrderButton}
            onPress={handleTrackOrder}
          >
            <Ionicons name="location-outline" size={20} color="#FFF" />
            <Text style={styles.trackOrderButtonText}>Theo dõi đơn hàng</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.continueShoppingButton}
            onPress={handleContinueShopping}
          >
            <Text style={styles.continueShoppingButtonText}>
              Tiếp tục mua sắm
            </Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F8F8F8",
  },
  scrollView: {
    flex: 1,
  },
  scrollContent: {
    paddingBottom: 30,
  },
  successContainer: {
    alignItems: "center",
    padding: 20,
    backgroundColor: "#FFF",
    marginBottom: 15,
  },
  successIconContainer: {
    marginTop: 40,
    width: 120,
    height: 120,
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 20,
  },
  successTitle: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#333",
    marginBottom: 10,
  },
  successMessage: {
    fontSize: 16,
    color: "#666",
    textAlign: "center",
    lineHeight: 22,
  },
  orderInfoContainer: {
    paddingHorizontal: 15,
  },
  orderIdContainer: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#FFF",
    padding: 15,
    borderRadius: 10,
    marginBottom: 15,
    ...SHADOW.small,
  },
  orderIdLabel: {
    fontSize: 14,
    color: "#666",
    marginRight: 5,
  },
  orderId: {
    fontSize: 16,
    fontWeight: "bold",
    color: COLORS.primary,
  },
  section: {
    backgroundColor: "#FFF",
    borderRadius: 10,
    padding: 15,
    marginBottom: 15,
    ...SHADOW.small,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#333",
    marginBottom: 15,
  },
  productCard: {
    flexDirection: "row",
    backgroundColor: "#FFF",
    borderRadius: 10,
    overflow: "hidden",
    borderWidth: 1,
    borderColor: "#EEE",
  },
  productImage: {
    width: 100,
    height: 100,
    resizeMode: "cover",
  },
  productInfo: {
    flex: 1,
    padding: 10,
  },
  productName: {
    fontSize: 16,
    fontWeight: "600",
    color: "#333",
    marginBottom: 5,
  },
  productPrice: {
    fontSize: 16,
    fontWeight: "bold",
    color: COLORS.primary,
    marginBottom: 5,
  },
  productCondition: {
    fontSize: 14,
    color: "#666",
  },
  addressCard: {
    backgroundColor: "#FFF",
    borderRadius: 8,
    padding: 10,
    borderWidth: 1,
    borderColor: "#EEE",
  },
  addressName: {
    fontSize: 16,
    fontWeight: "600",
    color: "#333",
    marginBottom: 5,
  },
  addressPhone: {
    fontSize: 14,
    color: "#666",
    marginBottom: 5,
  },
  addressText: {
    fontSize: 14,
    color: "#666",
    lineHeight: 20,
  },
  paymentCard: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#FFF",
    borderRadius: 8,
    padding: 10,
    borderWidth: 1,
    borderColor: "#EEE",
  },
  paymentText: {
    fontSize: 15,
    color: "#333",
    marginLeft: 10,
  },
  totalCard: {
    backgroundColor: "#FFF",
    borderRadius: 8,
    padding: 15,
    alignItems: "center",
    borderWidth: 1,
    borderColor: "#EEE",
  },
  totalAmount: {
    fontSize: 24,
    fontWeight: "bold",
    color: COLORS.primary,
  },
  estimatedDelivery: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#FFF",
    padding: 15,
    borderRadius: 10,
    marginBottom: 20,
    ...SHADOW.small,
  },
  estimatedDeliveryText: {
    fontSize: 14,
    color: "#333",
    marginLeft: 10,
  },
  actionsContainer: {
    paddingHorizontal: 15,
    marginBottom: 30,
  },
  trackOrderButton: {
    backgroundColor: COLORS.primary,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 15,
    borderRadius: 10,
    marginBottom: 15,
    ...SHADOW.small,
  },
  trackOrderButtonText: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#FFF",
    marginLeft: 10,
  },
  continueShoppingButton: {
    backgroundColor: "#FFF",
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 15,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: COLORS.primary,
    ...SHADOW.small,
  },
  continueShoppingButtonText: {
    fontSize: 16,
    fontWeight: "600",
    color: COLORS.primary,
  },
});

export default OrderConfirmationScreen;
