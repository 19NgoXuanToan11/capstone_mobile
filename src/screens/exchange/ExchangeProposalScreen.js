import React, { useState } from "react";
import {
  View,
  Text,
  ScrollView,
  Image,
  TouchableOpacity,
  Alert,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Ionicons } from "@expo/vector-icons";
import styles from "../../styles/ExchangeStyles";

export default function ExchangeProposalScreen({ navigation, route }) {
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  const targetProduct = {
    id: "1",
    title: "iPhone 13 Pro Max",
    image: "https://picsum.photos/400/400?random=1",
    condition: "Đã sử dụng - Còn 95%",
    owner: {
      id: "123",
      name: "Nguyễn Văn A",
      avatar: "https://picsum.photos/100/100?random=1",
    },
    wantToExchange: ["iPhone 12 Pro Max", "iPhone 12 Pro"],
  };

  const myProducts = [
    {
      id: "2",
      title: "iPhone 12 Pro Max",
      image: "https://picsum.photos/400/400?random=2",
      condition: "Đã sử dụng - Còn 90%",
    },
    {
      id: "3",
      title: "iPhone 12 Pro",
      image: "https://picsum.photos/400/400?random=3",
      condition: "Đã sử dụng - Còn 95%",
    },
  ];

  const handleSubmitProposal = async () => {
    if (!selectedProduct) {
      Alert.alert("Lỗi", "Vui lòng chọn sản phẩm để trao đổi");
      return;
    }

    setIsLoading(true);
    try {
      await new Promise((resolve) => setTimeout(resolve, 1000));

      Alert.alert("Thành công", "Đề xuất trao đổi đã được gửi", [
        {
          text: "OK",
          onPress: () =>
            navigation.navigate("ExchangeDetail", {
              exchangeId: "new_exchange_id",
            }),
        },
      ]);
    } catch (error) {
      Alert.alert("Lỗi", "Không thể gửi đề xuất. Vui lòng thử lại sau.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity
          style={styles.backButton}
          onPress={() => navigation.goBack()}
        >
          <Ionicons name="arrow-back" size={24} color="#333" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Đề xuất trao đổi</Text>
        <View style={styles.headerRight} />
      </View>

      <ScrollView style={styles.content}>
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Sản phẩm muốn trao đổi</Text>
          <View style={styles.productCard}>
            <Image
              source={{ uri: targetProduct.image }}
              style={styles.productImage}
            />
            <View style={styles.productInfo}>
              <Text style={styles.productTitle}>{targetProduct.title}</Text>
              <Text style={styles.productCondition}>
                {targetProduct.condition}
              </Text>
              <View style={styles.ownerInfo}>
                <Image
                  source={{ uri: targetProduct.owner.avatar }}
                  style={styles.ownerAvatar}
                />
                <Text style={styles.ownerName}>{targetProduct.owner.name}</Text>
              </View>
            </View>
          </View>
          <View style={styles.exchangeWishes}>
            <Text style={styles.wishesLabel}>Muốn trao đổi với:</Text>
            {targetProduct.wantToExchange.map((item, index) => (
              <Text key={index} style={styles.wishItem}>
                • {item}
              </Text>
            ))}
          </View>
        </View>
                
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Chọn sản phẩm của bạn</Text>
          {myProducts.map((product) => (
            <TouchableOpacity
              key={product.id}
              style={[
                styles.productCard,
                selectedProduct?.id === product.id && styles.selectedCard,
              ]}
              onPress={() => setSelectedProduct(product)}
            >
              <Image
                source={{ uri: product.image }}
                style={styles.productImage}
              />
              <View style={styles.productInfo}>
                <Text style={styles.productTitle}>{product.title}</Text>
                <Text style={styles.productCondition}>{product.condition}</Text>
              </View>
              {selectedProduct?.id === product.id && (
                <View style={styles.selectedIndicator}>
                  <Ionicons name="checkmark-circle" size={24} color="#4A90E2" />
                </View>
              )}
            </TouchableOpacity>
          ))}

          <TouchableOpacity
            style={styles.addProductButton}
            onPress={() => navigation.navigate("AddProduct")}
          >
            <Ionicons name="add-circle-outline" size={24} color="#4A90E2" />
            <Text style={styles.addProductText}>Thêm sản phẩm mới</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>

      <View style={styles.footer}>
        <TouchableOpacity
          style={[
            styles.submitButton,
            (!selectedProduct || isLoading) && styles.disabledButton,
          ]}
          onPress={handleSubmitProposal}
          disabled={!selectedProduct || isLoading}
        >
          {isLoading ? (
            <ActivityIndicator color="#fff" />
          ) : (
            <Text style={styles.submitButtonText}>Gửi đề xuất trao đổi</Text>
          )}
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}
