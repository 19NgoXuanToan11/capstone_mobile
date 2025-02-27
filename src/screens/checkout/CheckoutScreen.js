import React, { useState } from "react";
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  StyleSheet,
  Image,
  TextInput,
  Alert,
  ActivityIndicator,
  Dimensions,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Ionicons } from "@expo/vector-icons";
import { COLORS, SHADOW } from "../../components/theme";

const { width } = Dimensions.get("window");

const CheckoutScreen = ({ route, navigation }) => {
  const { product } = route.params;
  const [deliveryAddress, setDeliveryAddress] = useState({
    fullName: "Nguyễn Văn A",
    phone: "0901234567",
    address: "123 Đường ABC, Phường XYZ, Quận 1",
    city: "TP. Hồ Chí Minh",
  });
  const [paymentMethod, setPaymentMethod] = useState("cod");
  const [isLoading, setIsLoading] = useState(false);
  const [couponCode, setCouponCode] = useState("");
  const [couponApplied, setCouponApplied] = useState(false);

  // Giá sản phẩm và phí vận chuyển
  const productPrice = parseFloat(product.price?.replace(/[^\d]/g, "")) || 0;
  const shippingFee = 30000;
  const discount = couponApplied ? productPrice * 0.05 : 0;
  const totalPrice = productPrice + shippingFee - discount;

  const handleApplyCoupon = () => {
    if (couponCode.toLowerCase() === "welcome5") {
      setCouponApplied(true);
      Alert.alert("Thành công", "Đã áp dụng mã giảm giá 5%");
    } else {
      Alert.alert("Lỗi", "Mã giảm giá không hợp lệ");
    }
  };

  const handlePlaceOrder = () => {
    setIsLoading(true);
    // Giả lập quá trình đặt hàng
    setTimeout(() => {
      setIsLoading(false);
      navigation.navigate("OrderConfirmation", {
        orderId: "ORD" + Math.floor(Math.random() * 1000000),
        product,
        totalPrice,
        deliveryAddress,
        paymentMethod,
      });
    }, 2000);
  };

  const formatCurrency = (amount) => {
    return amount.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".") + "đ";
  };

  return (
    <SafeAreaView style={styles.container}>
      {/* Modern Header with Gradient */}
      <View style={styles.header}>
        <TouchableOpacity
          style={styles.backButton}
          onPress={() => navigation.goBack()}
        >
          <Ionicons name="arrow-back" size={24} color="#FFF" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Thanh toán</Text>
        <View style={{ width: 24 }} />
      </View>

      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.scrollContent}
      >
        {/* Progress Indicator */}
        <View style={styles.progressContainer}>
          <View style={styles.progressStep}>
            <View style={[styles.progressDot, styles.activeProgressDot]}>
              <Ionicons name="cart" size={16} color="#FFF" />
            </View>
            <Text style={[styles.progressText, styles.activeProgressText]}>
              Giỏ hàng
            </Text>
          </View>
          <View style={[styles.progressLine, styles.activeProgressLine]} />
          <View style={styles.progressStep}>
            <View style={[styles.progressDot, styles.activeProgressDot]}>
              <Ionicons name="card" size={16} color="#FFF" />
            </View>
            <Text style={[styles.progressText, styles.activeProgressText]}>
              Thanh toán
            </Text>
          </View>
          <View style={styles.progressLine} />
          <View style={styles.progressStep}>
            <View style={styles.progressDot}>
              <Ionicons name="checkmark" size={16} color="#AAA" />
            </View>
            <Text style={styles.progressText}>Hoàn tất</Text>
          </View>
        </View>

        {/* Product Summary */}
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
              <View style={styles.productConditionContainer}>
                <Text style={styles.productCondition}>
                  Tình trạng: {product.condition || "Mới"}
                </Text>
              </View>
            </View>
          </View>
        </View>

        {/* Delivery Address */}
        <View style={styles.section}>
          <View style={styles.sectionHeader}>
            <View style={styles.sectionTitleContainer}>
              <Ionicons
                name="location-outline"
                size={20}
                color={COLORS.primary}
              />
              <Text style={styles.sectionTitle}>Địa chỉ giao hàng</Text>
            </View>
            <TouchableOpacity style={styles.editButton}>
              <Text style={styles.editButtonText}>Thay đổi</Text>
            </TouchableOpacity>
          </View>
          <View style={styles.addressCard}>
            <View style={styles.addressRow}>
              <Ionicons name="person-outline" size={20} color="#666" />
              <Text style={styles.addressText}>{deliveryAddress.fullName}</Text>
            </View>
            <View style={styles.addressRow}>
              <Ionicons name="call-outline" size={20} color="#666" />
              <Text style={styles.addressText}>{deliveryAddress.phone}</Text>
            </View>
            <View style={styles.addressRow}>
              <Ionicons name="location-outline" size={20} color="#666" />
              <Text style={styles.addressText}>
                {deliveryAddress.address}, {deliveryAddress.city}
              </Text>
            </View>
          </View>
        </View>

        {/* Payment Method */}
        <View style={styles.section}>
          <View style={styles.sectionTitleContainer}>
            <Ionicons name="wallet-outline" size={20} color={COLORS.primary} />
            <Text style={styles.sectionTitle}>Phương thức thanh toán</Text>
          </View>
          <View style={styles.paymentOptions}>
            <TouchableOpacity
              style={[
                styles.paymentOption,
                paymentMethod === "cod" && styles.selectedPayment,
              ]}
              onPress={() => setPaymentMethod("cod")}
            >
              <View style={styles.paymentIconContainer}>
                <Ionicons
                  name="cash-outline"
                  size={24}
                  color={paymentMethod === "cod" ? "#FFF" : "#666"}
                />
              </View>
              <View style={styles.paymentTextContainer}>
                <Text
                  style={[
                    styles.paymentText,
                    paymentMethod === "cod" && styles.selectedPaymentText,
                  ]}
                >
                  Thanh toán khi nhận hàng
                </Text>
                <Text style={styles.paymentDescription}>
                  Thanh toán bằng tiền mặt khi nhận hàng
                </Text>
              </View>
              {paymentMethod === "cod" && (
                <Ionicons
                  name="checkmark-circle"
                  size={20}
                  color={COLORS.primary}
                  style={styles.checkIcon}
                />
              )}
            </TouchableOpacity>

            <TouchableOpacity
              style={[
                styles.paymentOption,
                paymentMethod === "bank" && styles.selectedPayment,
              ]}
              onPress={() => setPaymentMethod("bank")}
            >
              <View
                style={[
                  styles.paymentIconContainer,
                  paymentMethod === "bank" &&
                    styles.selectedPaymentIconContainer,
                ]}
              >
                <Ionicons
                  name="card-outline"
                  size={24}
                  color={paymentMethod === "bank" ? "#FFF" : "#666"}
                />
              </View>
              <View style={styles.paymentTextContainer}>
                <Text
                  style={[
                    styles.paymentText,
                    paymentMethod === "bank" && styles.selectedPaymentText,
                  ]}
                >
                  Chuyển khoản ngân hàng
                </Text>
                <Text style={styles.paymentDescription}>
                  Chuyển khoản qua tài khoản ngân hàng
                </Text>
              </View>
              {paymentMethod === "bank" && (
                <Ionicons
                  name="checkmark-circle"
                  size={20}
                  color={COLORS.primary}
                  style={styles.checkIcon}
                />
              )}
            </TouchableOpacity>

            <TouchableOpacity
              style={[
                styles.paymentOption,
                paymentMethod === "momo" && styles.selectedPayment,
              ]}
              onPress={() => setPaymentMethod("momo")}
            >
              <View
                style={[
                  styles.paymentIconContainer,
                  paymentMethod === "momo" &&
                    styles.selectedPaymentIconContainer,
                ]}
              >
                <Ionicons
                  name="wallet-outline"
                  size={24}
                  color={paymentMethod === "momo" ? "#FFF" : "#666"}
                />
              </View>
              <View style={styles.paymentTextContainer}>
                <Text
                  style={[
                    styles.paymentText,
                    paymentMethod === "momo" && styles.selectedPaymentText,
                  ]}
                >
                  Ví MoMo
                </Text>
                <Text style={styles.paymentDescription}>
                  Thanh toán qua ví điện tử MoMo
                </Text>
              </View>
              {paymentMethod === "momo" && (
                <Ionicons
                  name="checkmark-circle"
                  size={20}
                  color={COLORS.primary}
                  style={styles.checkIcon}
                />
              )}
            </TouchableOpacity>
          </View>
        </View>

        {/* Coupon Code */}
        <View style={styles.section}>
          <View style={styles.sectionTitleContainer}>
            <Ionicons
              name="pricetag-outline"
              size={20}
              color={COLORS.primary}
            />
            <Text style={styles.sectionTitle}>Mã giảm giá</Text>
          </View>
          <View style={styles.couponContainer}>
            <TextInput
              style={styles.couponInput}
              placeholder="Nhập mã giảm giá"
              value={couponCode}
              onChangeText={setCouponCode}
            />
            <TouchableOpacity
              style={styles.couponButton}
              onPress={handleApplyCoupon}
            >
              <Text style={styles.couponButtonText}>Áp dụng</Text>
            </TouchableOpacity>
          </View>
          {couponApplied && (
            <View style={styles.appliedCoupon}>
              <Ionicons name="checkmark-circle" size={16} color="green" />
              <Text style={styles.appliedCouponText}>
                Đã áp dụng mã giảm giá 5%
              </Text>
            </View>
          )}
        </View>

        {/* Order Summary */}
        <View style={styles.section}>
          <View style={styles.sectionTitleContainer}>
            <Ionicons name="receipt-outline" size={20} color={COLORS.primary} />
            <Text style={styles.sectionTitle}>Tổng thanh toán</Text>
          </View>
          <View style={styles.summaryCard}>
            <View style={styles.summaryRow}>
              <Text style={styles.summaryLabel}>Giá sản phẩm</Text>
              <Text style={styles.summaryValue}>
                {formatCurrency(productPrice)}
              </Text>
            </View>
            <View style={styles.summaryRow}>
              <Text style={styles.summaryLabel}>Phí vận chuyển</Text>
              <Text style={styles.summaryValue}>
                {formatCurrency(shippingFee)}
              </Text>
            </View>
            {couponApplied && (
              <View style={styles.summaryRow}>
                <Text style={styles.summaryLabel}>Giảm giá</Text>
                <Text style={[styles.summaryValue, styles.discountValue]}>
                  -{formatCurrency(discount)}
                </Text>
              </View>
            )}
            <View style={styles.divider} />
            <View style={styles.summaryRow}>
              <Text style={styles.totalLabel}>Tổng cộng</Text>
              <Text style={styles.totalValue}>
                {formatCurrency(totalPrice)}
              </Text>
            </View>
          </View>
        </View>

        {/* Bottom Padding */}
        <View style={{ height: 100 }} />
      </ScrollView>

      {/* Bottom Action */}
      <View style={styles.bottomAction}>
        <View style={styles.priceContainer}>
          <Text style={styles.totalPriceLabel}>Tổng thanh toán</Text>
          <Text style={styles.totalPriceValue}>
            {formatCurrency(totalPrice)}
          </Text>
        </View>
        <TouchableOpacity
          style={styles.placeOrderButton}
          onPress={handlePlaceOrder}
          disabled={isLoading}
        >
          {isLoading ? (
            <ActivityIndicator color="#FFF" size="small" />
          ) : (
            <>
              <Text style={styles.placeOrderButtonText}>Đặt hàng</Text>
              <Ionicons name="arrow-forward" size={20} color="#FFF" />
            </>
          )}
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F8F9FA",
  },
  scrollContent: {
    paddingBottom: 20,
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 15,
    paddingVertical: 15,
    backgroundColor: COLORS.primary,
    borderBottomLeftRadius: 15,
    borderBottomRightRadius: 15,
    ...SHADOW.medium,
  },
  backButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "rgba(255, 255, 255, 0.2)",
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#FFF",
  },
  progressContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 30,
    paddingVertical: 20,
    backgroundColor: "#FFF",
    marginHorizontal: 15,
    marginTop: 15,
    borderRadius: 15,
    ...SHADOW.small,
  },
  progressStep: {
    alignItems: "center",
  },
  progressDot: {
    width: 30,
    height: 30,
    borderRadius: 15,
    backgroundColor: "#F0F0F0",
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 5,
  },
  activeProgressDot: {
    backgroundColor: COLORS.primary,
  },
  progressText: {
    fontSize: 12,
    color: "#AAA",
  },
  activeProgressText: {
    color: COLORS.primary,
    fontWeight: "600",
  },
  progressLine: {
    flex: 1,
    height: 3,
    backgroundColor: "#F0F0F0",
    marginHorizontal: 5,
  },
  activeProgressLine: {
    backgroundColor: COLORS.primary,
  },
  section: {
    backgroundColor: "#FFF",
    borderRadius: 15,
    padding: 15,
    marginHorizontal: 15,
    marginTop: 15,
    ...SHADOW.small,
  },
  sectionHeader: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: 15,
  },
  sectionTitleContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#333",
    marginLeft: 8,
  },
  editButton: {
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 20,
    backgroundColor: "rgba(0, 122, 255, 0.1)",
  },
  editButtonText: {
    fontSize: 12,
    color: COLORS.primary,
    fontWeight: "600",
  },
  productCard: {
    flexDirection: "row",
    backgroundColor: "#FFF",
    borderRadius: 10,
    overflow: "hidden",
    borderWidth: 1,
    borderColor: "#F0F0F0",
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
  productConditionContainer: {
    backgroundColor: "rgba(0, 122, 255, 0.1)",
    paddingHorizontal: 8,
    paddingVertical: 3,
    borderRadius: 12,
    alignSelf: "flex-start",
  },
  productCondition: {
    fontSize: 12,
    color: COLORS.primary,
  },
  addressCard: {
    backgroundColor: "#FFF",
    borderRadius: 10,
    padding: 15,
    borderWidth: 1,
    borderColor: "#F0F0F0",
  },
  addressRow: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 10,
  },
  addressText: {
    fontSize: 14,
    color: "#333",
    marginLeft: 10,
    flex: 1,
  },
  paymentOptions: {
    marginTop: 10,
  },
  paymentOption: {
    flexDirection: "row",
    alignItems: "center",
    padding: 15,
    borderRadius: 10,
    marginBottom: 10,
    backgroundColor: "#FFF",
    borderWidth: 1,
    borderColor: "#F0F0F0",
  },
  selectedPayment: {
    borderColor: COLORS.primary,
    backgroundColor: "rgba(0, 122, 255, 0.05)",
  },
  paymentIconContainer: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: "#F5F5F5",
    alignItems: "center",
    justifyContent: "center",
    marginRight: 15,
  },
  selectedPaymentIconContainer: {
    backgroundColor: COLORS.primary,
  },
  paymentTextContainer: {
    flex: 1,
  },
  paymentText: {
    fontSize: 15,
    fontWeight: "600",
    color: "#333",
    marginBottom: 3,
  },
  selectedPaymentText: {
    color: COLORS.primary,
  },
  paymentDescription: {
    fontSize: 12,
    color: "#888",
  },
  checkIcon: {
    marginLeft: 10,
  },
  couponContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 10,
  },
  couponInput: {
    flex: 1,
    height: 45,
    borderWidth: 1,
    borderColor: "#EEE",
    borderRadius: 8,
    paddingHorizontal: 15,
    backgroundColor: "#FFF",
  },
  couponButton: {
    backgroundColor: COLORS.primary,
    height: 45,
    paddingHorizontal: 15,
    borderRadius: 8,
    alignItems: "center",
    justifyContent: "center",
    marginLeft: 10,
  },
  couponButtonText: {
    color: "#FFF",
    fontWeight: "600",
  },
  appliedCoupon: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 10,
  },
  appliedCouponText: {
    fontSize: 14,
    color: "green",
    marginLeft: 5,
  },
  summaryCard: {
    backgroundColor: "#FFF",
    borderRadius: 10,
    padding: 15,
    borderWidth: 1,
    borderColor: "#F0F0F0",
  },
  summaryRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 10,
  },
  summaryLabel: {
    fontSize: 14,
    color: "#666",
  },
  summaryValue: {
    fontSize: 14,
    color: "#333",
    fontWeight: "500",
  },
  discountValue: {
    color: "green",
  },
  divider: {
    height: 1,
    backgroundColor: "#F0F0F0",
    marginVertical: 10,
  },
  totalLabel: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#333",
  },
  totalValue: {
    fontSize: 18,
    fontWeight: "bold",
    color: COLORS.primary,
  },
  bottomAction: {
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: "#FFF",
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 15,
    paddingVertical: 15,
    borderTopWidth: 1,
    borderTopColor: "#F0F0F0",
    ...SHADOW.medium,
  },
  priceContainer: {
    flex: 1,
  },
  totalPriceLabel: {
    fontSize: 12,
    color: "#666",
  },
  totalPriceValue: {
    fontSize: 18,
    fontWeight: "bold",
    color: COLORS.primary,
  },
  placeOrderButton: {
    backgroundColor: COLORS.primary,
    paddingVertical: 12,
    paddingHorizontal: 25,
    borderRadius: 25,
    flexDirection: "row",
    alignItems: "center",
    ...SHADOW.small,
  },
  placeOrderButtonText: {
    color: "#FFF",
    fontWeight: "bold",
    fontSize: 16,
    marginRight: 5,
  },
});

export default CheckoutScreen;
