import React, { useState } from "react";
import {
  View,
  ScrollView,
  Text,
  TextInput,
  TouchableOpacity,
  Image,
  StyleSheet,
  Platform,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Ionicons } from "@expo/vector-icons";
import { LinearGradient } from "expo-linear-gradient";
import * as ImagePicker from "expo-image-picker";
import { COLORS, SHADOW } from "../../components/theme";

export default function CreateExchangeScreen({ navigation }) {
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    price: "",
    condition: "",
    category: "",
    wantedItems: "",
    location: "",
  });

  const [images, setImages] = useState([]);

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
  ];

  const categories = [
    "Điện thoại",
    "Máy tính",
    "Tablet",
    "Đồng hồ thông minh",
    "Phụ kiện",
    "Khác",
  ];

  const handleSubmit = () => {
    if (!formData.title || !formData.description || !formData.price) {
      alert("Vui lòng điền đầy đủ thông tin!");
      return;
    }

    // TODO: Xử lý đăng tin ở đây

    navigation.goBack();
  };

  return (
    <SafeAreaView style={styles.container}>
      {/* Header với animation và gradient */}
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
          <Text style={styles.headerTitle}>Đăng tin trao đổi</Text>
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
        {/* Image Upload Section - Cải tiến */}
        <View style={styles.section}>
          <View style={styles.sectionHeader}>
            <Ionicons name="images-outline" size={22} color={COLORS.primary} />
            <Text style={styles.sectionTitle}>Hình ảnh sản phẩm</Text>
            <Text style={styles.imageCount}>{images.length}/5</Text>
          </View>

          <View style={styles.imageUploadContainer}>
            <ScrollView horizontal showsHorizontalScrollIndicator={false}>
              <TouchableOpacity
                style={styles.addImageButton}
                onPress={handleImagePick}
              >
                <LinearGradient
                  colors={["#f8f9fa", "#e9ecef"]}
                  style={styles.addImageGradient}
                >
                  <Ionicons
                    name="camera-outline"
                    size={32}
                    color={COLORS.primary}
                  />
                  <Text style={styles.addImageText}>Thêm ảnh</Text>
                </LinearGradient>
              </TouchableOpacity>

              {images.map((uri, index) => (
                <View key={index} style={styles.imageContainer}>
                  <Image source={{ uri }} style={styles.uploadedImage} />
                  <TouchableOpacity
                    style={styles.removeImage}
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
            </ScrollView>
          </View>
        </View>

        {/* Basic Information - Cải tiến */}
        <View style={styles.section}>
          <View style={styles.sectionHeader}>
            <Ionicons
              name="information-circle-outline"
              size={22}
              color={COLORS.primary}
            />
            <Text style={styles.sectionTitle}>Thông tin cơ bản</Text>
          </View>

          <View style={styles.inputGroup}>
            <Text style={styles.label}>Tiêu đề</Text>
            <View style={styles.inputContainer}>
              <TextInput
                style={styles.input}
                placeholder="VD: iPhone 13 Pro Max 256GB"
                value={formData.title}
                onChangeText={(text) =>
                  setFormData({ ...formData, title: text })
                }
              />
            </View>
          </View>

          <View style={styles.inputGroup}>
            <Text style={styles.label}>Mô tả chi tiết</Text>
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
              />
            </View>
          </View>

          <View style={styles.inputGroup}>
            <Text style={styles.label}>Giá</Text>
            <View style={styles.inputContainer}>
              <TextInput
                style={styles.input}
                placeholder="VD: 20.000.000"
                keyboardType="numeric"
                value={formData.price}
                onChangeText={(text) =>
                  setFormData({ ...formData, price: text })
                }
              />
              <Text style={styles.currencyLabel}>VNĐ</Text>
            </View>
          </View>
        </View>

        {/* Condition Selection - Cải tiến */}
        <View style={styles.section}>
          <View style={styles.sectionHeader}>
            <Ionicons
              name="star-half-outline"
              size={22}
              color={COLORS.primary}
            />
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

        {/* Category Selection - Cải tiến */}
        <View style={styles.section}>
          <View style={styles.sectionHeader}>
            <Ionicons name="grid-outline" size={22} color={COLORS.primary} />
            <Text style={styles.sectionTitle}>Danh mục</Text>
          </View>

          <View style={styles.categoryGrid}>
            {categories.map((category, index) => (
              <TouchableOpacity
                key={index}
                style={[
                  styles.categoryButton,
                  formData.category === category && styles.categoryButtonActive,
                ]}
                onPress={() => setFormData({ ...formData, category })}
              >
                <LinearGradient
                  colors={
                    formData.category === category
                      ? [`${COLORS.primary}20`, `${COLORS.primary}40`]
                      : ["#f8f9fa", "#e9ecef"]
                  }
                  style={styles.categoryGradient}
                >
                  <Text
                    style={[
                      styles.categoryText,
                      formData.category === category &&
                        styles.categoryTextActive,
                    ]}
                  >
                    {category}
                  </Text>
                </LinearGradient>
              </TouchableOpacity>
            ))}
          </View>
        </View>

        {/* Exchange Preferences - Cải tiến */}
        <View style={styles.section}>
          <View style={styles.sectionHeader}>
            <Ionicons
              name="swap-horizontal-outline"
              size={22}
              color={COLORS.primary}
            />
            <Text style={styles.sectionTitle}>Muốn trao đổi với</Text>
          </View>

          <View style={styles.textAreaContainer}>
            <TextInput
              style={styles.textArea}
              placeholder="VD: iPhone 14 Pro Max, MacBook Pro M1..."
              multiline
              numberOfLines={3}
              value={formData.wantedItems}
              onChangeText={(text) =>
                setFormData({ ...formData, wantedItems: text })
              }
              textAlignVertical="top"
            />
          </View>
        </View>

        {/* Location - Cải tiến */}
        <View style={styles.section}>
          <View style={styles.sectionHeader}>
            <Ionicons
              name="location-outline"
              size={22}
              color={COLORS.primary}
            />
            <Text style={styles.sectionTitle}>Địa điểm</Text>
          </View>

          <TouchableOpacity
            style={styles.locationButton}
            onPress={() =>
              navigation.navigate("LocationPicker", {
                onSelect: (location) => setFormData({ ...formData, location }),
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
        </View>

        {/* Submit Button - Cải tiến */}
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
            <Text style={styles.floatingSubmitText}>Đăng tin ngay</Text>
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
  sectionTitle: {
    fontSize: 18,
    fontWeight: "600",
    color: "#1A1A1A",
    marginLeft: 8,
    flex: 1,
  },
  imageCount: {
    fontSize: 14,
    color: "#666",
  },
  imageUploadContainer: {
    flexDirection: "row",
  },
  addImageButton: {
    width: 120,
    height: 120,
    borderRadius: 12,
    overflow: "hidden",
    marginRight: 12,
  },
  addImageGradient: {
    width: "100%",
    height: "100%",
    justifyContent: "center",
    alignItems: "center",
    borderWidth: 1,
    borderColor: "#e9ecef",
    borderStyle: "dashed",
    borderRadius: 12,
  },
  addImageText: {
    color: COLORS.primary,
    fontSize: 14,
    marginTop: 8,
    fontWeight: "500",
  },
  imageContainer: {
    width: 120,
    height: 120,
    borderRadius: 12,
    overflow: "hidden",
    marginRight: 12,
    position: "relative",
  },
  uploadedImage: {
    width: "100%",
    height: "100%",
    borderRadius: 12,
  },
  removeImage: {
    position: "absolute",
    top: 8,
    right: 8,
    borderRadius: 12,
    overflow: "hidden",
  },
  removeImageGradient: {
    width: 24,
    height: 24,
    borderRadius: 12,
    justifyContent: "center",
    alignItems: "center",
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
  input: {
    flex: 1,
    fontSize: 16,
    paddingVertical: 12,
    color: "#1A1A1A",
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
    width: "31%",
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
  },
  categoryText: {
    fontSize: 14,
    color: "#666",
    fontWeight: "500",
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
