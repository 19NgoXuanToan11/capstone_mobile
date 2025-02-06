import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  ScrollView,
  Image,
  Alert,
  ActivityIndicator,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Ionicons } from "@expo/vector-icons";
import * as ImagePicker from "expo-image-picker";
import styles from "../../styles/ProductStyles";

export default function AddProductScreen({ navigation }) {
  const [isLoading, setIsLoading] = useState(false);
  const [images, setImages] = useState([]);
  const [formData, setFormData] = useState({
    title: "",
    condition: "",
    description: "",
    wantToExchange: [""],
    location: "",
  });

  const pickImage = async () => {
    try {
      const result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
        allowsMultipleSelection: true,
        quality: 1,
        aspect: [1, 1],
      });

      if (!result.canceled) {
        const newImages = result.assets.map((asset) => asset.uri);
        if (images.length + newImages.length > 5) {
          Alert.alert("Lỗi", "Bạn chỉ có thể tải lên tối đa 5 ảnh");
          return;
        }
        setImages([...images, ...newImages]);
      }
    } catch (error) {
      Alert.alert("Lỗi", "Không thể chọn ảnh. Vui lòng thử lại.");
    }
  };

  const removeImage = (index) => {
    const newImages = [...images];
    newImages.splice(index, 1);
    setImages(newImages);
  };

  const addExchangeItem = () => {
    if (formData.wantToExchange.length < 5) {
      setFormData({
        ...formData,
        wantToExchange: [...formData.wantToExchange, ""],
      });
    }
  };

  const removeExchangeItem = (index) => {
    const newItems = [...formData.wantToExchange];
    newItems.splice(index, 1);
    setFormData({
      ...formData,
      wantToExchange: newItems,
    });
  };

  const updateExchangeItem = (text, index) => {
    const newItems = [...formData.wantToExchange];
    newItems[index] = text;
    setFormData({
      ...formData,
      wantToExchange: newItems,
    });
  };

  const validateForm = () => {
    if (!formData.title.trim()) {
      Alert.alert("Lỗi", "Vui lòng nhập tên sản phẩm");
      return false;
    }
    if (!formData.condition.trim()) {
      Alert.alert("Lỗi", "Vui lòng chọn tình trạng sản phẩm");
      return false;
    }
    if (!formData.description.trim()) {
      Alert.alert("Lỗi", "Vui lòng nhập mô tả sản phẩm");
      return false;
    }
    if (images.length === 0) {
      Alert.alert("Lỗi", "Vui lòng thêm ít nhất 1 ảnh sản phẩm");
      return false;
    }
    if (!formData.wantToExchange[0].trim()) {
      Alert.alert("Lỗi", "Vui lòng nhập ít nhất 1 sản phẩm muốn trao đổi");
      return false;
    }
    return true;
  };

  const handleSubmit = async () => {
    if (!validateForm()) return;

    setIsLoading(true);
    try {
      // TODO: Implement API call to create product
      await new Promise((resolve) => setTimeout(resolve, 2000)); // Simulate API call
      Alert.alert("Thành công", "Sản phẩm đã được đăng thành công", [
        {
          text: "OK",
          onPress: () => navigation.goBack(),
        },
      ]);
    } catch (error) {
      Alert.alert("Lỗi", "Không thể đăng sản phẩm. Vui lòng thử lại.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity
          style={styles.headerButton}
          onPress={() => navigation.goBack()}
        >
          <Ionicons name="close" size={24} color="#333" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Thêm sản phẩm</Text>
        <TouchableOpacity
          style={[styles.headerButton, isLoading && styles.disabledButton]}
          onPress={handleSubmit}
          disabled={isLoading}
        >
          {isLoading ? (
            <ActivityIndicator size="small" color="#4A90E2" />
          ) : (
            <Text style={styles.submitText}>Đăng</Text>
          )}
        </TouchableOpacity>
      </View>

      <ScrollView style={styles.formContainer}>
        {/* Images Section */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Hình ảnh sản phẩm</Text>
          <Text style={styles.sectionSubtitle}>Tối đa 5 ảnh</Text>
          <ScrollView
            horizontal
            showsHorizontalScrollIndicator={false}
            style={styles.imageList}
          >
            {images.map((uri, index) => (
              <View key={index} style={styles.imageContainer}>
                <Image source={{ uri }} style={styles.productImage} />
                <TouchableOpacity
                  style={styles.removeImageButton}
                  onPress={() => removeImage(index)}
                >
                  <Ionicons name="close-circle" size={24} color="#FF3B30" />
                </TouchableOpacity>
              </View>
            ))}
            {images.length < 5 && (
              <TouchableOpacity
                style={styles.addImageButton}
                onPress={pickImage}
              >
                <Ionicons name="camera-outline" size={32} color="#666" />
                <Text style={styles.addImageText}>Thêm ảnh</Text>
              </TouchableOpacity>
            )}
          </ScrollView>
        </View>

        {/* Basic Info Section */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Thông tin cơ bản</Text>

          <View style={styles.inputGroup}>
            <Text style={styles.inputLabel}>Tên sản phẩm *</Text>
            <TextInput
              style={styles.input}
              value={formData.title}
              onChangeText={(text) => setFormData({ ...formData, title: text })}
              placeholder="VD: iPhone 12 Pro Max 256GB"
              maxLength={100}
            />
          </View>

          <View style={styles.inputGroup}>
            <Text style={styles.inputLabel}>Tình trạng *</Text>
            <TextInput
              style={styles.input}
              value={formData.condition}
              onChangeText={(text) =>
                setFormData({ ...formData, condition: text })
              }
              placeholder="VD: Đã sử dụng - Còn 95%"
            />
          </View>

          <View style={styles.inputGroup}>
            <Text style={styles.inputLabel}>Mô tả chi tiết *</Text>
            <TextInput
              style={[styles.input, styles.textArea]}
              value={formData.description}
              onChangeText={(text) =>
                setFormData({ ...formData, description: text })
              }
              placeholder="Mô tả chi tiết về sản phẩm của bạn..."
              multiline
              numberOfLines={6}
              textAlignVertical="top"
            />
          </View>
        </View>

        {/* Exchange Wishes Section */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Muốn trao đổi với</Text>
          {formData.wantToExchange.map((item, index) => (
            <View key={index} style={styles.exchangeItemContainer}>
              <TextInput
                style={[styles.input, styles.exchangeInput]}
                value={item}
                onChangeText={(text) => updateExchangeItem(text, index)}
                placeholder="VD: iPhone 13 Pro Max"
              />
              {index > 0 && (
                <TouchableOpacity
                  style={styles.removeExchangeButton}
                  onPress={() => removeExchangeItem(index)}
                >
                  <Ionicons
                    name="remove-circle-outline"
                    size={24}
                    color="#FF3B30"
                  />
                </TouchableOpacity>
              )}
            </View>
          ))}
          {formData.wantToExchange.length < 5 && (
            <TouchableOpacity
              style={styles.addExchangeButton}
              onPress={addExchangeItem}
            >
              <Ionicons name="add-circle-outline" size={20} color="#4A90E2" />
              <Text style={styles.addExchangeText}>
                Thêm sản phẩm muốn trao đổi
              </Text>
            </TouchableOpacity>
          )}
        </View>

        {/* Location Section */}
        <View style={[styles.section, styles.lastSection]}>
          <Text style={styles.sectionTitle}>Địa điểm</Text>
          <View style={styles.inputGroup}>
            <TextInput
              style={styles.input}
              value={formData.location}
              onChangeText={(text) =>
                setFormData({ ...formData, location: text })
              }
              placeholder="VD: Quận 1, TP.HCM"
            />
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}
