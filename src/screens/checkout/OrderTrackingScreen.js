import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  TouchableOpacity,
  ScrollView,
  Image,
  Dimensions,
  StatusBar,
  Platform,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Ionicons } from "@expo/vector-icons";
import { COLORS, SHADOW } from "../../components/theme";

const { width, height } = Dimensions.get("window");

const OrderTrackingScreen = ({ route, navigation }) => {
  const { orderId, product, totalPrice, deliveryAddress, paymentMethod } =
    route.params;
  const [currentStep, setCurrentStep] = useState(1);

  // Giả lập tiến trình đơn hàng
  useEffect(() => {
    const timer = setTimeout(() => {
      if (currentStep < 4) {
        setCurrentStep(currentStep + 1);
      }
    }, 3000);

    return () => clearTimeout(timer);
  }, [currentStep]);

  const steps = [
    {
      id: 1,
      title: "Đơn hàng đã xác nhận",
      description: "Đơn hàng của bạn đã được xác nhận",
      icon: "checkmark-circle",
      time: "Hôm nay, 10:30",
    },
    {
      id: 2,
      title: "Đang chuẩn bị hàng",
      description: "Người bán đang chuẩn bị sản phẩm của bạn",
      icon: "cube",
      time: "Hôm nay, 11:45",
    },
    {
      id: 3,
      title: "Đang giao hàng",
      description: "Đơn hàng đang được vận chuyển đến bạn",
      icon: "bicycle",
      time: "Ngày mai, 09:30",
    },
    {
      id: 4,
      title: "Đã giao hàng",
      description: "Đơn hàng đã được giao thành công",
      icon: "home",
      time: "Dự kiến: 3 ngày tới",
    },
  ];

  const formatCurrency = (amount) => {
    return amount.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".") + "đ";
  };

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

  const handleContactSeller = () => {
    // Thêm logic liên hệ người bán
    alert("Đã gửi tin nhắn đến người bán!");
  };

  const handleCancelOrder = () => {
    // Thêm logic hủy đơn hàng
    alert("Chức năng hủy đơn hàng sẽ được cập nhật sau!");
  };

  return (
    <View style={[styles.container, { width, height }]}>
      <StatusBar
        translucent
        backgroundColor="transparent"
        barStyle="dark-content"
      />

      <View style={styles.header}>
        <TouchableOpacity
          style={styles.backButton}
          onPress={() => navigation.goBack()}
        >
          <Ionicons name="arrow-back" size={24} color="#000" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Theo dõi đơn hàng</Text>
        <View style={{ width: 24 }} />
      </View>

      <ScrollView
        showsVerticalScrollIndicator={false}
        style={styles.scrollView}
        contentContainerStyle={styles.scrollContent}
      >
        <View style={styles.orderIdContainer}>
          <View style={styles.orderIdContent}>
            <Text style={styles.orderIdLabel}>Mã đơn hàng:</Text>
            <Text style={styles.orderId}>{orderId}</Text>
          </View>
          <TouchableOpacity style={styles.copyButton}>
            <Ionicons name="copy-outline" size={18} color={COLORS.primary} />
          </TouchableOpacity>
        </View>

        <View style={styles.trackingContainer}>
          {steps.map((step, index) => (
            <View key={step.id} style={styles.stepContainer}>
              <View
                style={[
                  styles.stepIconContainer,
                  currentStep >= step.id && styles.activeStepIconContainer,
                ]}
              >
                <Ionicons
                  name={step.icon}
                  size={24}
                  color={currentStep >= step.id ? "#FFF" : "#CCC"}
                />
              </View>
              <View style={styles.stepContent}>
                <View style={styles.stepHeader}>
                  <Text
                    style={[
                      styles.stepTitle,
                      currentStep >= step.id && styles.activeStepTitle,
                    ]}
                  >
                    {step.title}
                  </Text>
                  <Text
                    style={[
                      styles.stepTime,
                      currentStep >= step.id && styles.activeStepTime,
                    ]}
                  >
                    {step.time}
                  </Text>
                </View>
                <Text
                  style={[
                    styles.stepDescription,
                    currentStep >= step.id && styles.activeStepDescription,
                  ]}
                >
                  {step.description}
                </Text>
              </View>
              {index < steps.length - 1 && (
                <View
                  style={[
                    styles.stepConnector,
                    currentStep > step.id && styles.activeStepConnector,
                  ]}
                />
              )}
            </View>
          ))}
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Thông tin sản phẩm</Text>
          <View style={styles.productCard}>
            <Image
              source={{ uri: product?.image }}
              style={styles.productImage}
            />
            <View style={styles.productInfo}>
              <Text style={styles.productName} numberOfLines={2}>
                {product?.name}
              </Text>
              <Text style={styles.productPrice}>{product?.price}</Text>
              <Text style={styles.productCondition}>
                Tình trạng: {product?.condition || "Mới"}
              </Text>
            </View>
          </View>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Địa chỉ giao hàng</Text>
          <View style={styles.addressCard}>
            <View style={styles.addressRow}>
              <Ionicons name="person-outline" size={20} color="#666" />
              <Text style={styles.addressText}>
                {deliveryAddress?.fullName}
              </Text>
            </View>
            <View style={styles.addressRow}>
              <Ionicons name="call-outline" size={20} color="#666" />
              <Text style={styles.addressText}>{deliveryAddress?.phone}</Text>
            </View>
            <View style={styles.addressRow}>
              <Ionicons name="location-outline" size={20} color="#666" />
              <Text style={styles.addressText}>
                {deliveryAddress?.address}, {deliveryAddress?.city}
              </Text>
            </View>
          </View>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Thông tin thanh toán</Text>
          <View style={styles.paymentCard}>
            <View style={styles.paymentRow}>
              <Text style={styles.paymentLabel}>Phương thức:</Text>
              <Text style={styles.paymentValue}>{getPaymentMethodText()}</Text>
            </View>
            <View style={styles.paymentRow}>
              <Text style={styles.paymentLabel}>Tổng tiền:</Text>
              <Text style={styles.paymentTotal}>
                {formatCurrency(totalPrice)}
              </Text>
            </View>
            <View style={styles.paymentRow}>
              <Text style={styles.paymentLabel}>Trạng thái:</Text>
              <View style={styles.paymentStatusContainer}>
                <View style={styles.paymentStatusDot} />
                <Text style={styles.paymentStatus}>
                  {paymentMethod === "cod"
                    ? "Chưa thanh toán"
                    : "Đã thanh toán"}
                </Text>
              </View>
            </View>
          </View>
        </View>

        <View style={styles.actionsContainer}>
          <TouchableOpacity
            style={styles.contactButton}
            onPress={handleContactSeller}
          >
            <Ionicons
              name="chatbubble-outline"
              size={20}
              color={COLORS.primary}
            />
            <Text style={styles.contactButtonText}>Liên hệ người bán</Text>
          </TouchableOpacity>

          {currentStep < 3 && (
            <TouchableOpacity
              style={styles.cancelButton}
              onPress={handleCancelOrder}
            >
              <Ionicons name="close-circle-outline" size={20} color="#FF3B30" />
              <Text style={styles.cancelButtonText}>Hủy đơn hàng</Text>
            </TouchableOpacity>
          )}
        </View>

        <View style={{ height: 30 }} />
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F5F5F5",
  },
  scrollView: {
    flex: 1,
  },
  scrollContent: {
    paddingHorizontal: 15,
    paddingBottom: 20,
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 15,
    paddingTop: Platform.OS === "android" ? StatusBar.currentHeight || 30 : 10,
    paddingBottom: 10,
    backgroundColor: "#FFF",
    ...SHADOW.small,
  },
  backButton: {
    marginTop: 50,
    width: 40,
    height: 40,
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 20,
  },
  headerTitle: {
    marginTop: 50,
    fontSize: 18,
    fontWeight: "bold",
    color: "#333",
  },
  orderIdContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    backgroundColor: "#FFF",
    padding: 15,
    marginTop: 15,
    marginHorizontal: 15,
    borderRadius: 10,
    ...SHADOW.small,
  },
  orderIdContent: {
    flexDirection: "row",
    alignItems: "center",
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
  copyButton: {
    width: 36,
    height: 36,
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 18,
    backgroundColor: "#F0F0F0",
  },
  trackingContainer: {
    backgroundColor: "#FFF",
    marginTop: 15,
    marginHorizontal: 15,
    borderRadius: 10,
    padding: 15,
    ...SHADOW.small,
  },
  stepContainer: {
    flexDirection: "row",
    position: "relative",
    paddingBottom: 20,
  },
  stepIconContainer: {
    width: 44,
    height: 44,
    borderRadius: 22,
    backgroundColor: "#F0F0F0",
    alignItems: "center",
    justifyContent: "center",
    marginRight: 15,
    zIndex: 1,
  },
  activeStepIconContainer: {
    backgroundColor: COLORS.primary,
  },
  stepContent: {
    flex: 1,
    paddingVertical: 5,
  },
  stepHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 5,
  },
  stepTitle: {
    fontSize: 16,
    fontWeight: "600",
    color: "#666",
  },
  activeStepTitle: {
    color: "#333",
  },
  stepTime: {
    fontSize: 12,
    color: "#999",
  },
  activeStepTime: {
    color: "#666",
  },
  stepDescription: {
    fontSize: 14,
    color: "#999",
  },
  activeStepDescription: {
    color: "#666",
  },
  stepConnector: {
    position: "absolute",
    left: 22,
    top: 44,
    bottom: 0,
    width: 2,
    backgroundColor: "#F0F0F0",
  },
  activeStepConnector: {
    backgroundColor: COLORS.primary,
  },
  section: {
    backgroundColor: "#FFF",
    marginTop: 15,
    marginHorizontal: 15,
    borderRadius: 10,
    padding: 15,
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
  paymentCard: {
    backgroundColor: "#FFF",
    borderRadius: 8,
    padding: 15,
    borderWidth: 1,
    borderColor: "#EEE",
  },
  paymentRow: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: 10,
  },
  paymentLabel: {
    fontSize: 14,
    color: "#666",
  },
  paymentValue: {
    fontSize: 14,
    color: "#333",
    fontWeight: "500",
  },
  paymentTotal: {
    fontSize: 16,
    fontWeight: "bold",
    color: COLORS.primary,
  },
  paymentStatusContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
  paymentStatusDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: "#4CD964",
    marginRight: 5,
  },
  paymentStatus: {
    fontSize: 14,
    color: "#4CD964",
    fontWeight: "500",
  },
  actionsContainer: {
    flexDirection: "row",
    marginTop: 15,
    marginHorizontal: 15,
    marginBottom: 20,
  },
  contactButton: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#FFF",
    paddingVertical: 12,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: COLORS.primary,
    marginRight: 10,
    ...SHADOW.small,
  },
  contactButtonText: {
    fontSize: 14,
    fontWeight: "600",
    color: COLORS.primary,
    marginLeft: 8,
  },
  cancelButton: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#FFF",
    paddingVertical: 12,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: "#FF3B30",
    ...SHADOW.small,
  },
  cancelButtonText: {
    fontSize: 14,
    fontWeight: "600",
    color: "#FF3B30",
    marginLeft: 8,
  },
});

export default OrderTrackingScreen;
