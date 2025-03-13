import React, { useState, useRef, useEffect, useContext } from "react";
import {
  View,
  ScrollView,
  Text,
  TextInput,
  TouchableOpacity,
  Image,
  StyleSheet,
  Platform,
  Animated,
  Dimensions,
  StatusBar,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Ionicons, MaterialCommunityIcons } from "@expo/vector-icons";
import { LinearGradient } from "expo-linear-gradient";
import * as ImagePicker from "expo-image-picker";
import { BlurView } from "expo-blur";
import { COLORS, SHADOW } from "../../components/theme";
import { AuthContext } from "../../../App";

const { width } = Dimensions.get("window");

export default function PostProductScreen({ navigation }) {
  const { isLoggedIn } = useContext(AuthContext);
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    price: "",
    condition: "",
    category: "",
    location: "",
    quantity: "1",
    brand: "",
    warranty: "",
  });

  const [images, setImages] = useState([]);
  const [activeTab, setActiveTab] = useState("basic"); // 'basic', 'details', 'shipping'
  const scrollViewRef = useRef(null);
  const scrollX = useRef(new Animated.Value(0)).current;
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  useEffect(() => {
    // Kiểm tra nếu chưa đăng nhập thì chuyển đến màn hình đăng nhập
    if (!isLoggedIn) {
      navigation.navigate("Login", { returnTo: "PostProduct" });
    }
  }, [isLoggedIn]);

  const handleImagePick = async () => {
    const permissionResult =
      await ImagePicker.requestMediaLibraryPermissionsAsync();

    if (permissionResult.granted === false) {
      alert("Cần cấp quyền truy cập thư viện ảnh!");
      return;
    }

    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    if (!result.canceled) {
      setImages([...images, result.assets[0].uri]);
    }
  };

  const removeImage = (index) => {
    const newImages = [...images];
    newImages.splice(index, 1);
    setImages(newImages);
  };

  const conditions = [
    "Mới 100%",
    "Như mới (99%)",
    "Rất tốt (95%)",
    "Tốt (90%)",
    "Khá tốt (80%)",
    "Đã qua sử dụng",
  ];

  const categories = [
    {
      name: "Điện thoại",
      icon: "phone-portrait-outline",
    },
    {
      name: "Máy tính",
      icon: "laptop-outline",
    },
    {
      name: "Tablet",
      icon: "tablet-portrait-outline",
    },
    {
      name: "Đồng hồ",
      icon: "watch-outline",
    },
    {
      name: "Phụ kiện",
      icon: "headset-outline",
    },
    {
      name: "Thời trang",
      icon: "shirt-outline",
    },
    {
      name: "Đồ gia dụng",
      icon: "home-outline",
    },
    {
      name: "Khác",
      icon: "grid-outline",
    },
  ];

  const handleSubmit = () => {
    // Validate form
    if (
      !formData.title ||
      !formData.description ||
      !formData.price ||
      !formData.category
    ) {
      alert("Vui lòng điền đầy đủ thông tin cần thiết!");
      return;
    }

    if (images.length === 0) {
      alert("Vui lòng thêm ít nhất 1 hình ảnh sản phẩm!");
      return;
    }

    // TODO: Submit form data to backend
    console.log("Form data:", formData);
    console.log("Images:", images);

    // Navigate to success screen
    navigation.navigate("PostSuccess", { productName: formData.title });
  };

  const renderTabContent = () => {
    switch (activeTab) {
      case "basic":
        return (
          <>
            {/* Basic Information */}
            <View style={styles.section}>
              <View style={styles.sectionHeader}>
                <LinearGradient
                  colors={[`${COLORS.primary}20`, `${COLORS.primary}40`]}
                  style={styles.iconBackground}
                >
                  <Ionicons
                    name="information-circle-outline"
                    size={22}
                    color={COLORS.primary}
                  />
                </LinearGradient>
                <Text style={styles.sectionTitle}>Thông tin cơ bản</Text>
              </View>

              <View style={styles.inputGroup}>
                <Text style={styles.label}>
                  Tiêu đề <Text style={styles.required}>*</Text>
                </Text>
                <View style={styles.inputContainer}>
                  <TextInput
                    style={styles.input}
                    placeholder="VD: iPhone 13 Pro Max 256GB"
                    value={formData.title}
                    onChangeText={(text) =>
                      setFormData({ ...formData, title: text })
                    }
                    placeholderTextColor="#999"
                  />
                </View>
                <Text style={styles.inputHint}>
                  Tiêu đề hấp dẫn sẽ thu hút người mua hơn
                </Text>
              </View>

              <View style={styles.inputGroup}>
                <Text style={styles.label}>
                  Mô tả chi tiết <Text style={styles.required}>*</Text>
                </Text>
                <View style={styles.textAreaContainer}>
                  <TextInput
                    style={styles.textArea}
                    placeholder="Mô tả chi tiết về sản phẩm của bạn..."
                    multiline
                    numberOfLines={4}
                    value={formData.description}
                    onChangeText={(text) =>
                      setFormData({ ...formData, description: text })
                    }
                    textAlignVertical="top"
                    placeholderTextColor="#999"
                  />
                </View>
                <Text style={styles.inputHint}>
                  Mô tả đầy đủ thông tin, tính năng, tình trạng sản phẩm
                </Text>
              </View>

              <View style={styles.inputGroup}>
                <Text style={styles.label}>
                  Giá <Text style={styles.required}>*</Text>
                </Text>
                <View style={styles.inputContainer}>
                  <TextInput
                    style={styles.input}
                    placeholder="VD: 20.000.000"
                    keyboardType="numeric"
                    value={formData.price}
                    onChangeText={(text) =>
                      setFormData({ ...formData, price: text })
                    }
                    placeholderTextColor="#999"
                  />
                  <Text style={styles.currencyLabel}>VNĐ</Text>
                </View>
                <Text style={styles.inputHint}>
                  Đặt giá hợp lý để bán nhanh hơn
                </Text>
              </View>

              <View style={styles.inputGroup}>
                <Text style={styles.label}>Số lượng</Text>
                <View style={styles.quantityContainer}>
                  <TouchableOpacity
                    style={styles.quantityButton}
                    onPress={() => {
                      const currentQty = parseInt(formData.quantity) || 1;
                      if (currentQty > 1) {
                        setFormData({
                          ...formData,
                          quantity: (currentQty - 1).toString(),
                        });
                      }
                    }}
                  >
                    <LinearGradient
                      colors={["#f1f3f5", "#e9ecef"]}
                      style={styles.quantityButtonGradient}
                    >
                      <Ionicons name="remove" size={20} color="#666" />
                    </LinearGradient>
                  </TouchableOpacity>
                  <TextInput
                    style={styles.quantityInput}
                    value={formData.quantity}
                    onChangeText={(text) => {
                      // Only allow numbers
                      const filtered = text.replace(/[^0-9]/g, "");
                      setFormData({ ...formData, quantity: filtered || "1" });
                    }}
                    keyboardType="numeric"
                    textAlign="center"
                  />
                  <TouchableOpacity
                    style={styles.quantityButton}
                    onPress={() => {
                      const currentQty = parseInt(formData.quantity) || 1;
                      setFormData({
                        ...formData,
                        quantity: (currentQty + 1).toString(),
                      });
                    }}
                  >
                    <LinearGradient
                      colors={[`${COLORS.primary}20`, `${COLORS.primary}40`]}
                      style={styles.quantityButtonGradient}
                    >
                      <Ionicons name="add" size={20} color={COLORS.primary} />
                    </LinearGradient>
                  </TouchableOpacity>
                </View>
              </View>
            </View>

            {/* Category Selection */}
            <View style={styles.section}>
              <View style={styles.sectionHeader}>
                <LinearGradient
                  colors={[`${COLORS.primary}20`, `${COLORS.primary}40`]}
                  style={styles.iconBackground}
                >
                  <Ionicons
                    name="grid-outline"
                    size={22}
                    color={COLORS.primary}
                  />
                </LinearGradient>
                <Text style={styles.sectionTitle}>
                  Danh mục <Text style={styles.required}>*</Text>
                </Text>
              </View>

              <View style={styles.categoryGrid}>
                {categories.map((category, index) => (
                  <TouchableOpacity
                    key={index}
                    style={[
                      styles.categoryButton,
                      formData.category === category.name &&
                        styles.categoryButtonActive,
                    ]}
                    onPress={() =>
                      setFormData({ ...formData, category: category.name })
                    }
                  >
                    <LinearGradient
                      colors={
                        formData.category === category.name
                          ? [`${COLORS.primary}20`, `${COLORS.primary}40`]
                          : ["#f8f9fa", "#e9ecef"]
                      }
                      style={styles.categoryGradient}
                    >
                      <Ionicons
                        name={category.icon}
                        size={24}
                        color={
                          formData.category === category.name
                            ? COLORS.primary
                            : "#666"
                        }
                      />
                      <Text
                        style={[
                          styles.categoryText,
                          formData.category === category.name &&
                            styles.categoryTextActive,
                        ]}
                      >
                        {category.name}
                      </Text>
                    </LinearGradient>
                  </TouchableOpacity>
                ))}
              </View>
            </View>
          </>
        );

      case "details":
        return (
          <>
            {/* Condition Selection */}
            <View style={styles.section}>
              <View style={styles.sectionHeader}>
                <LinearGradient
                  colors={[`${COLORS.primary}20`, `${COLORS.primary}40`]}
                  style={styles.iconBackground}
                >
                  <Ionicons
                    name="star-half-outline"
                    size={22}
                    color={COLORS.primary}
                  />
                </LinearGradient>
                <Text style={styles.sectionTitle}>Tình trạng sản phẩm</Text>
              </View>

              <View style={styles.conditionContainer}>
                {conditions.map((condition, index) => (
                  <TouchableOpacity
                    key={index}
                    style={[
                      styles.conditionButton,
                      formData.condition === condition &&
                        styles.conditionButtonActive,
                    ]}
                    onPress={() => setFormData({ ...formData, condition })}
                  >
                    <LinearGradient
                      colors={
                        formData.condition === condition
                          ? [`${COLORS.primary}20`, `${COLORS.primary}40`]
                          : ["#f8f9fa", "#e9ecef"]
                      }
                      style={styles.conditionGradient}
                    >
                      {formData.condition === condition && (
                        <View style={styles.conditionCheckmark}>
                          <Ionicons
                            name="checkmark-circle"
                            size={18}
                            color={COLORS.primary}
                          />
                        </View>
                      )}
                      <Text
                        style={[
                          styles.conditionText,
                          formData.condition === condition &&
                            styles.conditionTextActive,
                        ]}
                      >
                        {condition}
                      </Text>
                    </LinearGradient>
                  </TouchableOpacity>
                ))}
              </View>
            </View>

            {/* Additional Details */}
            <View style={styles.section}>
              <View style={styles.sectionHeader}>
                <LinearGradient
                  colors={[`${COLORS.primary}20`, `${COLORS.primary}40`]}
                  style={styles.iconBackground}
                >
                  <Ionicons
                    name="list-outline"
                    size={22}
                    color={COLORS.primary}
                  />
                </LinearGradient>
                <Text style={styles.sectionTitle}>Thông tin bổ sung</Text>
              </View>

              <View style={styles.inputGroup}>
                <Text style={styles.label}>Thương hiệu</Text>
                <View style={styles.inputContainer}>
                  <Ionicons
                    name="briefcase-outline"
                    size={20}
                    color="#999"
                    style={styles.inputIcon}
                  />
                  <TextInput
                    style={styles.input}
                    placeholder="VD: Apple, Samsung, Sony..."
                    value={formData.brand}
                    onChangeText={(text) =>
                      setFormData({ ...formData, brand: text })
                    }
                    placeholderTextColor="#999"
                  />
                </View>
              </View>

              <View style={styles.inputGroup}>
                <Text style={styles.label}>Bảo hành</Text>
                <View style={styles.inputContainer}>
                  <Ionicons
                    name="shield-checkmark-outline"
                    size={20}
                    color="#999"
                    style={styles.inputIcon}
                  />
                  <TextInput
                    style={styles.input}
                    placeholder="VD: 12 tháng, còn 6 tháng..."
                    value={formData.warranty}
                    onChangeText={(text) =>
                      setFormData({ ...formData, warranty: text })
                    }
                    placeholderTextColor="#999"
                  />
                </View>
              </View>
            </View>
          </>
        );

      case "shipping":
        return (
          <>
            {/* Location */}
            <View style={styles.section}>
              <View style={styles.sectionHeader}>
                <LinearGradient
                  colors={[`${COLORS.primary}20`, `${COLORS.primary}40`]}
                  style={styles.iconBackground}
                >
                  <Ionicons
                    name="location-outline"
                    size={22}
                    color={COLORS.primary}
                  />
                </LinearGradient>
                <Text style={styles.sectionTitle}>Địa điểm</Text>
              </View>

              <TouchableOpacity
                style={styles.locationButton}
                onPress={() =>
                  navigation.navigate("LocationPicker", {
                    onSelect: (location) =>
                      setFormData({ ...formData, location }),
                  })
                }
              >
                <View style={styles.locationContent}>
                  <Ionicons
                    name="location-outline"
                    size={24}
                    color={COLORS.primary}
                  />
                  <Text style={styles.locationText}>
                    {formData.location || "Chọn địa điểm của bạn"}
                  </Text>
                </View>
                <Ionicons name="chevron-forward" size={24} color="#666" />
              </TouchableOpacity>

              {!formData.location && (
                <View style={styles.mapPlaceholder}>
                  <Ionicons name="map-outline" size={40} color="#ccc" />
                  <Text style={styles.mapPlaceholderText}>
                    Chọn địa điểm để hiển thị bản đồ
                  </Text>
                </View>
              )}
            </View>

            {/* Shipping Options */}
            <View style={styles.section}>
              <View style={styles.sectionHeader}>
                <LinearGradient
                  colors={[`${COLORS.primary}20`, `${COLORS.primary}40`]}
                  style={styles.iconBackground}
                >
                  <Ionicons
                    name="car-outline"
                    size={22}
                    color={COLORS.primary}
                  />
                </LinearGradient>
                <Text style={styles.sectionTitle}>Phương thức giao hàng</Text>
              </View>

              <View style={styles.shippingOptions}>
                <TouchableOpacity style={styles.shippingOption}>
                  <LinearGradient
                    colors={[`${COLORS.primary}20`, `${COLORS.primary}40`]}
                    style={styles.shippingOptionIcon}
                  >
                    <Ionicons
                      name="person-outline"
                      size={24}
                      color={COLORS.primary}
                    />
                  </LinearGradient>
                  <View style={styles.shippingOptionContent}>
                    <Text style={styles.shippingOptionTitle}>
                      Gặp mặt trực tiếp
                    </Text>
                    <Text style={styles.shippingOptionDescription}>
                      Gặp người mua tại địa điểm thỏa thuận
                    </Text>
                  </View>
                  <Ionicons
                    name="checkmark-circle"
                    size={24}
                    color={COLORS.primary}
                  />
                </TouchableOpacity>

                <TouchableOpacity style={styles.shippingOption}>
                  <LinearGradient
                    colors={["#f8f9fa", "#e9ecef"]}
                    style={styles.shippingOptionIcon}
                  >
                    <Ionicons name="car-outline" size={24} color="#666" />
                  </LinearGradient>
                  <View style={styles.shippingOptionContent}>
                    <Text style={styles.shippingOptionTitle}>Giao hàng</Text>
                    <Text style={styles.shippingOptionDescription}>
                      Giao hàng qua đơn vị vận chuyển
                    </Text>
                  </View>
                  <Ionicons name="ellipse-outline" size={24} color="#666" />
                </TouchableOpacity>

                <TouchableOpacity style={styles.shippingOption}>
                  <LinearGradient
                    colors={["#f8f9fa", "#e9ecef"]}
                    style={styles.shippingOptionIcon}
                  >
                    <Ionicons name="card-outline" size={24} color="#666" />
                  </LinearGradient>
                  <View style={styles.shippingOptionContent}>
                    <Text style={styles.shippingOptionTitle}>
                      Thanh toán khi nhận hàng
                    </Text>
                    <Text style={styles.shippingOptionDescription}>
                      Người mua thanh toán khi nhận được hàng
                    </Text>
                  </View>
                  <Ionicons name="ellipse-outline" size={24} color="#666" />
                </TouchableOpacity>
              </View>
            </View>
          </>
        );

      default:
        return null;
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="dark-content" backgroundColor={COLORS.white} />

      {/* Header */}
      <LinearGradient
        colors={[COLORS.white, "#f8f9fa"]}
        style={styles.headerGradient}
      >
        <View style={styles.header}>
          <TouchableOpacity
            style={styles.backButton}
            onPress={() => navigation.goBack()}
          >
            <Ionicons name="arrow-back" size={24} color="#1A1A1A" />
          </TouchableOpacity>
          <Text style={styles.headerTitle}>Đăng bán sản phẩm</Text>
          <TouchableOpacity style={styles.submitButton} onPress={handleSubmit}>
            <LinearGradient
              colors={[COLORS.primary, `${COLORS.primary}CC`]}
              start={{ x: 0, y: 0 }}
              end={{ x: 1, y: 1 }}
              style={styles.submitGradient}
            >
              <Text style={styles.submitButtonText}>Đăng tin</Text>
            </LinearGradient>
          </TouchableOpacity>
        </View>
      </LinearGradient>

      <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
        {/* Image Upload Section - Enhanced */}
        <View style={styles.section}>
          <View style={styles.sectionHeader}>
            <LinearGradient
              colors={[`${COLORS.primary}20`, `${COLORS.primary}40`]}
              style={styles.iconBackground}
            >
              <Ionicons
                name="images-outline"
                size={22}
                color={COLORS.primary}
              />
            </LinearGradient>
            <Text style={styles.sectionTitle}>
              Hình ảnh sản phẩm <Text style={styles.required}>*</Text>
            </Text>
            <Text style={styles.imageCount}>{images.length}/5</Text>
          </View>

          {images.length > 0 ? (
            <View style={styles.imagePreviewContainer}>
              <Animated.ScrollView
                ref={scrollViewRef}
                horizontal
                pagingEnabled
                showsHorizontalScrollIndicator={false}
                onScroll={Animated.event(
                  [{ nativeEvent: { contentOffset: { x: scrollX } } }],
                  { useNativeDriver: true }
                )}
                onMomentumScrollEnd={(event) => {
                  const index = Math.round(
                    event.nativeEvent.contentOffset.x / (width - 32)
                  );
                  setCurrentImageIndex(index);
                }}
                style={styles.imagePreviewScroll}
              >
                {images.map((uri, index) => (
                  <View key={index} style={styles.imagePreviewItem}>
                    <Image source={{ uri }} style={styles.previewImage} />
                    <TouchableOpacity
                      style={styles.removeImageButton}
                      onPress={() => removeImage(index)}
                    >
                      <LinearGradient
                        colors={["rgba(0,0,0,0.5)", "rgba(0,0,0,0.7)"]}
                        style={styles.removeImageGradient}
                      >
                        <Ionicons name="close" size={16} color={COLORS.white} />
                      </LinearGradient>
                    </TouchableOpacity>
                  </View>
                ))}
              </Animated.ScrollView>

              {/* Pagination dots */}
              <View style={styles.paginationContainer}>
                {images.map((_, index) => (
                  <TouchableOpacity
                    key={index}
                    style={[
                      styles.paginationDot,
                      currentImageIndex === index && styles.paginationDotActive,
                    ]}
                    onPress={() => {
                      scrollViewRef.current?.scrollTo({
                        x: index * (width - 32),
                        animated: true,
                      });
                      setCurrentImageIndex(index);
                    }}
                  />
                ))}
              </View>
            </View>
          ) : (
            <View style={styles.emptyImageContainer}>
              <Ionicons name="images-outline" size={60} color="#ccc" />
              <Text style={styles.emptyImageText}>Chưa có hình ảnh nào</Text>
            </View>
          )}

          <TouchableOpacity
            style={styles.addImageButton}
            onPress={handleImagePick}
          >
            <LinearGradient
              colors={[COLORS.primary, `${COLORS.primary}CC`]}
              start={{ x: 0, y: 0 }}
              end={{ x: 1, y: 1 }}
              style={styles.addImageGradient}
            >
              <Ionicons name="camera-outline" size={24} color={COLORS.white} />
              <Text style={styles.addImageText}>Thêm hình ảnh</Text>
            </LinearGradient>
          </TouchableOpacity>
        </View>

        {/* Progress Bar */}
        <View style={styles.progressContainer}>
          <View style={styles.progressBar}>
            <View
              style={[
                styles.progressFill,
                {
                  width: `${Math.min(
                    100,
                    (formData.title ? 15 : 0) +
                      (formData.description ? 15 : 0) +
                      (formData.price ? 15 : 0) +
                      (formData.category ? 15 : 0) +
                      (images.length > 0 ? 20 : 0) +
                      (formData.condition ? 10 : 0) +
                      (formData.location ? 10 : 0)
                  )}%`,
                },
              ]}
            />
          </View>
          <Text style={styles.progressText}>
            {Math.min(
              100,
              (formData.title ? 15 : 0) +
                (formData.description ? 15 : 0) +
                (formData.price ? 15 : 0) +
                (formData.category ? 15 : 0) +
                (images.length > 0 ? 20 : 0) +
                (formData.condition ? 10 : 0) +
                (formData.location ? 10 : 0)
            )}
            % hoàn thành
          </Text>
        </View>

        {/* Tabs - Enhanced */}
        <View style={styles.tabContainer}>
          <TouchableOpacity
            style={[styles.tab, activeTab === "basic" && styles.activeTab]}
            onPress={() => setActiveTab("basic")}
          >
            <LinearGradient
              colors={
                activeTab === "basic"
                  ? [`${COLORS.primary}20`, `${COLORS.primary}40`]
                  : ["transparent", "transparent"]
              }
              style={styles.tabGradient}
            >
              <Ionicons
                name="information-circle-outline"
                size={20}
                color={activeTab === "basic" ? COLORS.primary : "#666"}
              />
              <Text
                style={[
                  styles.tabText,
                  activeTab === "basic" && styles.activeTabText,
                ]}
              >
                Cơ bản
              </Text>
            </LinearGradient>
          </TouchableOpacity>

          <TouchableOpacity
            style={[styles.tab, activeTab === "details" && styles.activeTab]}
            onPress={() => setActiveTab("details")}
          >
            <LinearGradient
              colors={
                activeTab === "details"
                  ? [`${COLORS.primary}20`, `${COLORS.primary}40`]
                  : ["transparent", "transparent"]
              }
              style={styles.tabGradient}
            >
              <Ionicons
                name="list-outline"
                size={20}
                color={activeTab === "details" ? COLORS.primary : "#666"}
              />
              <Text
                style={[
                  styles.tabText,
                  activeTab === "details" && styles.activeTabText,
                ]}
              >
                Chi tiết
              </Text>
            </LinearGradient>
          </TouchableOpacity>

          <TouchableOpacity
            style={[styles.tab, activeTab === "shipping" && styles.activeTab]}
            onPress={() => setActiveTab("shipping")}
          >
            <LinearGradient
              colors={
                activeTab === "shipping"
                  ? [`${COLORS.primary}20`, `${COLORS.primary}40`]
                  : ["transparent", "transparent"]
              }
              style={styles.tabGradient}
            >
              <Ionicons
                name="car-outline"
                size={20}
                color={activeTab === "shipping" ? COLORS.primary : "#666"}
              />
              <Text
                style={[
                  styles.tabText,
                  activeTab === "shipping" && styles.activeTabText,
                ]}
              >
                Giao hàng
              </Text>
            </LinearGradient>
          </TouchableOpacity>
        </View>

        {/* Tab Content */}
        {renderTabContent()}

        {/* Submit Button */}
        <TouchableOpacity
          style={styles.floatingSubmitButton}
          onPress={handleSubmit}
        >
          <LinearGradient
            colors={[COLORS.primary, `${COLORS.primary}CC`]}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 1 }}
            style={styles.floatingSubmitGradient}
          >
            <Ionicons name="checkmark-circle-outline" size={24} color="#fff" />
            <Text style={styles.floatingSubmitText}>Đăng bán ngay</Text>
          </LinearGradient>
        </TouchableOpacity>

        {/* Padding bottom để tránh bị che bởi floating button */}
        <View style={{ height: 80 }} />
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f8f9fa",
  },
  headerGradient: {
    ...SHADOW.medium,
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 16,
    paddingVertical: 16,
  },
  backButton: {
    padding: 8,
    borderRadius: 20,
    backgroundColor: "#f1f3f5",
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: "700",
    color: "#1A1A1A",
  },
  submitButton: {
    borderRadius: 20,
    overflow: "hidden",
  },
  submitGradient: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 20,
  },
  submitButtonText: {
    color: COLORS.white,
    fontWeight: "600",
  },
  content: {
    flex: 1,
    paddingHorizontal: 16,
  },
  section: {
    backgroundColor: COLORS.white,
    borderRadius: 16,
    padding: 16,
    marginTop: 16,
    ...SHADOW.small,
  },
  sectionHeader: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 16,
  },
  iconBackground: {
    width: 36,
    height: 36,
    borderRadius: 18,
    justifyContent: "center",
    alignItems: "center",
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: "600",
    color: "#1A1A1A",
    marginLeft: 8,
    flex: 1,
  },
  required: {
    color: "red",
  },
  imageCount: {
    fontSize: 14,
    color: "#666",
  },
  imagePreviewContainer: {
    marginBottom: 16,
  },
  imagePreviewScroll: {
    width: width - 32,
    height: 240,
  },
  imagePreviewItem: {
    width: width - 32,
    height: 240,
    borderRadius: 16,
    overflow: "hidden",
  },
  previewImage: {
    width: "100%",
    height: "100%",
    resizeMode: "cover",
  },
  removeImageButton: {
    position: "absolute",
    top: 12,
    right: 12,
    borderRadius: 12,
    overflow: "hidden",
  },
  removeImageGradient: {
    width: 28,
    height: 28,
    borderRadius: 14,
    justifyContent: "center",
    alignItems: "center",
  },
  paginationContainer: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    marginTop: 12,
  },
  paginationDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: "#ccc",
    marginHorizontal: 4,
  },
  paginationDotActive: {
    backgroundColor: COLORS.primary,
    width: 12,
    height: 12,
    borderRadius: 6,
  },
  emptyImageContainer: {
    height: 200,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#f1f3f5",
    borderRadius: 16,
    marginBottom: 16,
  },
  emptyImageText: {
    fontSize: 16,
    color: "#999",
    marginTop: 12,
  },
  addImageButton: {
    borderRadius: 12,
    overflow: "hidden",
  },
  addImageGradient: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 14,
  },
  addImageText: {
    color: COLORS.white,
    fontSize: 16,
    fontWeight: "600",
    marginLeft: 8,
  },
  progressContainer: {
    marginTop: 16,
    paddingHorizontal: 16,
  },
  progressBar: {
    height: 8,
    backgroundColor: "#e9ecef",
    borderRadius: 4,
    overflow: "hidden",
  },
  progressFill: {
    height: "100%",
    backgroundColor: COLORS.primary,
    borderRadius: 4,
  },
  progressText: {
    fontSize: 14,
    color: "#666",
    marginTop: 4,
    textAlign: "right",
  },
  tabContainer: {
    flexDirection: "row",
    backgroundColor: COLORS.white,
    borderRadius: 16,
    marginTop: 16,
    ...SHADOW.small,
    padding: 4,
  },
  tab: {
    flex: 1,
    borderRadius: 12,
    overflow: "hidden",
  },
  tabGradient: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 12,
  },
  activeTab: {
    backgroundColor: `${COLORS.primary}10`,
  },
  tabText: {
    fontSize: 14,
    color: "#666",
    marginLeft: 4,
  },
  activeTabText: {
    color: COLORS.primary,
    fontWeight: "600",
  },
  inputGroup: {
    marginBottom: 16,
  },
  label: {
    fontSize: 16,
    fontWeight: "500",
    color: "#1A1A1A",
    marginBottom: 8,
  },
  inputContainer: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#f1f3f5",
    borderRadius: 12,
    paddingHorizontal: 16,
  },
  inputIcon: {
    marginRight: 8,
  },
  input: {
    flex: 1,
    fontSize: 16,
    paddingVertical: 12,
    color: "#1A1A1A",
  },
  inputHint: {
    fontSize: 12,
    color: "#999",
    marginTop: 4,
    marginLeft: 4,
  },
  currencyLabel: {
    fontSize: 16,
    color: "#666",
    fontWeight: "500",
  },
  textAreaContainer: {
    backgroundColor: "#f1f3f5",
    borderRadius: 12,
    paddingHorizontal: 16,
  },
  textArea: {
    fontSize: 16,
    paddingVertical: 12,
    minHeight: 120,
    color: "#1A1A1A",
  },
  quantityContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
  },
  quantityButton: {
    borderRadius: 8,
    overflow: "hidden",
  },
  quantityButtonGradient: {
    width: 36,
    height: 36,
    justifyContent: "center",
    alignItems: "center",
  },
  quantityInput: {
    width: 60,
    fontSize: 18,
    fontWeight: "600",
    color: "#1A1A1A",
    marginHorizontal: 12,
  },
  conditionContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
    marginHorizontal: -4,
  },
  conditionButton: {
    width: "48%",
    margin: "1%",
    borderRadius: 12,
    overflow: "hidden",
    marginBottom: 8,
  },
  conditionGradient: {
    paddingVertical: 12,
    paddingHorizontal: 8,
    alignItems: "center",
    borderRadius: 12,
    position: "relative",
  },
  conditionCheckmark: {
    position: "absolute",
    top: 8,
    right: 8,
  },
  conditionText: {
    fontSize: 14,
    color: "#666",
    fontWeight: "500",
  },
  conditionTextActive: {
    color: COLORS.primary,
    fontWeight: "600",
  },
  categoryGrid: {
    flexDirection: "row",
    flexWrap: "wrap",
    marginHorizontal: -4,
  },
  categoryButton: {
    width: "23%",
    margin: "1%",
    borderRadius: 12,
    overflow: "hidden",
    marginBottom: 8,
  },
  categoryGradient: {
    paddingVertical: 12,
    paddingHorizontal: 8,
    alignItems: "center",
    borderRadius: 12,
    height: 80,
    justifyContent: "center",
  },
  categoryText: {
    fontSize: 12,
    color: "#666",
    fontWeight: "500",
    marginTop: 8,
    textAlign: "center",
  },
  categoryTextActive: {
    color: COLORS.primary,
    fontWeight: "600",
  },
  locationButton: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    backgroundColor: "#f1f3f5",
    borderRadius: 12,
    padding: 16,
  },
  locationContent: {
    flexDirection: "row",
    alignItems: "center",
  },
  locationText: {
    fontSize: 16,
    color: "#666",
    marginLeft: 12,
  },
  mapPlaceholder: {
    height: 160,
    backgroundColor: "#f1f3f5",
    borderRadius: 12,
    marginTop: 16,
    justifyContent: "center",
    alignItems: "center",
  },
  mapPlaceholderText: {
    fontSize: 14,
    color: "#999",
    marginTop: 8,
  },
  shippingOptions: {
    backgroundColor: "#f1f3f5",
    borderRadius: 12,
    overflow: "hidden",
  },
  shippingOption: {
    flexDirection: "row",
    alignItems: "center",
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: "#e9ecef",
  },
  shippingOptionIcon: {
    width: 40,
    height: 40,
    borderRadius: 20,
    justifyContent: "center",
    alignItems: "center",
  },
  shippingOptionContent: {
    flex: 1,
    marginLeft: 12,
  },
  shippingOptionTitle: {
    fontSize: 16,
    fontWeight: "500",
    color: "#1A1A1A",
  },
  shippingOptionDescription: {
    fontSize: 12,
    color: "#666",
    marginTop: 2,
  },
  floatingSubmitButton: {
    position: "absolute",
    bottom: 20,
    left: 32,
    right: 32,
    borderRadius: 30,
    overflow: "hidden",
    ...SHADOW.medium,
  },
  floatingSubmitGradient: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 16,
  },
  floatingSubmitText: {
    color: COLORS.white,
    fontSize: 18,
    fontWeight: "600",
    marginLeft: 8,
  },
});
