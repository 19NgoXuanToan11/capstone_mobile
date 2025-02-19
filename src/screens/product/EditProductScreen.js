import React, { useState, useEffect } from "react";
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

export default function EditProductScreen({ navigation, route }) {
  const [isLoading, setIsLoading] = useState(false);
  const [images, setImages] = useState([]);
  const [formData, setFormData] = useState({
    title: "",
    condition: "",
    description: "",
    wantToExchange: [""],
    location: "",
  });

  useEffect(() => {
    const productId = route.params?.productId;
    const mockProduct = {
      id: productId,
      title: "iPhone 12 Pro Max",
      condition: "Đã sử dụng - Còn 95%",
      description:
        "iPhone 12 Pro Max 256GB, màu Pacific Blue, mới sử dụng 6 tháng, còn bảo hành chính hãng. Máy hoạt động hoàn hảo, pin 95%, full phụ kiện original.",
      wantToExchange: ["iPhone 13 Pro", "iPhone 13 Pro Max"],
      location: "Quận 1, TP.HCM",
      images: [
        "https://picsum.photos/800/800?random=1",
        "https://picsum.photos/800/800?random=2",
      ],
    };

    setFormData({
      title: mockProduct.title,
      condition: mockProduct.condition,
      description: mockProduct.description,
      wantToExchange: mockProduct.wantToExchange,
      location: mockProduct.location,
    });
    setImages(mockProduct.images);
  }, []);

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
    Alert.alert("Xác nhận xóa", "Bạn có chắc chắn muốn xóa ảnh này?", [
      {
        text: "Hủy",
        style: "cancel",
      },
      {
        text: "Xóa",
        style: "destructive",
        onPress: () => {
          const newImages = [...images];
          newImages.splice(index, 1);
          setImages(newImages);
        },
      },
    ]);
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
    if (formData.wantToExchange.length > 1) {
      const newItems = [...formData.wantToExchange];
      newItems.splice(index, 1);
      setFormData({
        ...formData,
        wantToExchange: newItems,
      });
    }
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
      await new Promise((resolve) => setTimeout(resolve, 2000));
      Alert.alert("Thành công", "Sản phẩm đã được cập nhật thành công", [
        {
          text: "OK",
          onPress: () => navigation.goBack(),
        },
      ]);
    } catch (error) {
      Alert.alert("Lỗi", "Không thể cập nhật sản phẩm. Vui lòng thử lại.");
    } finally {
      setIsLoading(false);
    }
  };

  const handleDelete = () => {
    Alert.alert(
      "Xác nhận xóa",
      "Bạn có chắc chắn muốn xóa sản phẩm này? Hành động này không thể hoàn tác.",
      [
        {
          text: "Hủy",
          style: "cancel",
        },
        {
          text: "Xóa",
          style: "destructive",
          onPress: async () => {
            setIsLoading(true);
            try {
              await new Promise((resolve) => setTimeout(resolve, 1500));
              navigation.goBack();
            } catch (error) {
              Alert.alert("Lỗi", "Không thể xóa sản phẩm. Vui lòng thử lại.");
            } finally {
              setIsLoading(false);
            }
          },
        },
      ]
    );
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity
          style={styles.headerButton}
          onPress={() => navigation.goBack()}
        >
          <Ionicons name="arrow-back" size={24} color="#333" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Chỉnh sửa sản phẩm</Text>
        <TouchableOpacity
          style={[styles.headerButton, isLoading && styles.disabledButton]}
          onPress={handleSubmit}
          disabled={isLoading}
        >
          {isLoading ? (
            <ActivityIndicator size="small" color="#4A90E2" />
          ) : (
            <Text style={styles.submitText}>Lưu</Text>
          )}
        </TouchableOpacity>
      </View>

      <ScrollView style={styles.formContainer}>
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

        <View style={styles.section}>
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
              
        <TouchableOpacity style={styles.deleteButton} onPress={handleDelete}>
          <Ionicons name="trash-outline" size={20} color="#FF3B30" />
          <Text style={styles.deleteButtonText}>Xóa sản phẩm</Text>
        </TouchableOpacity>
      </ScrollView>
    </SafeAreaView>
  );
}
