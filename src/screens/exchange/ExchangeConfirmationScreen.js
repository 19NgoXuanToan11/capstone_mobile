import React, { useState } from "react";
import {
  View,
  Text,
  ScrollView,
  Image,
  TouchableOpacity,
  Alert,
  ActivityIndicator,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Ionicons } from "@expo/vector-icons";
import styles from "../../styles/ExchangeStyles";

export default function ExchangeConfirmationScreen({ navigation, route }) {
  const [isLoading, setIsLoading] = useState(false);
  const [agreement, setAgreement] = useState({
    terms: false,
    meetup: false,
    inspection: false,
  });

  const exchange = {
    id: "1",
    status: "pending",
    proposedProduct: {
      id: "1",
      title: "iPhone 13 Pro Max",
      image: "https://picsum.photos/400/400?random=1",
      condition: "Đã sử dụng - Còn 95%",
      owner: {
        id: "123",
        name: "Nguyễn Văn A",
        avatar: "https://picsum.photos/100/100?random=1",
      },
    },
    offeredProduct: {
      id: "2",
      title: "iPhone 12 Pro Max",
      image: "https://picsum.photos/400/400?random=2",
      condition: "Đã sử dụng - Còn 90%",
      owner: {
        id: "456",
        name: "Trần Thị B",
        avatar: "https://picsum.photos/100/100?random=2",
      },
    },
  };

  const handleConfirm = async () => {
    if (!Object.values(agreement).every((value) => value)) {
      Alert.alert("Lỗi", "Vui lòng đồng ý với tất cả điều khoản");
      return;
    }

    setIsLoading(true);
    try {
      await new Promise((resolve) => setTimeout(resolve, 1000));

      navigation.navigate("ExchangeDetail", {
        exchangeId: exchange.id,
        status: "confirmed",
      });
    } catch (error) {
      Alert.alert("Lỗi", "Không thể xác nhận trao đổi. Vui lòng thử lại sau.");
    } finally {
      setIsLoading(false);
    }
  };

  const handleDecline = () => {
    Alert.alert(
      "Từ chối trao đổi",
      "Bạn có chắc chắn muốn từ chối đề xuất trao đổi này?",
      [
        {
          text: "Hủy",
          style: "cancel",
        },
        {
          text: "Từ chối",
          style: "destructive",
          onPress: async () => {
            setIsLoading(true);
            try {
              await new Promise((resolve) => setTimeout(resolve, 1000));
              navigation.goBack();
            } catch (error) {
              Alert.alert(
                "Lỗi",
                "Không thể từ chối trao đổi. Vui lòng thử lại sau."
              );
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
          style={styles.backButton}
          onPress={() => navigation.goBack()}
        >
          <Ionicons name="arrow-back" size={24} color="#333" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Xác nhận trao đổi</Text>
        <View style={styles.headerRight} />
      </View>

      <ScrollView style={styles.content}>
        {/* Exchange Products */}
        <View style={styles.exchangeProducts}>
          <View style={styles.productCard}>
            <Image
              source={{ uri: exchange.proposedProduct.image }}
              style={styles.productImage}
            />
            <View style={styles.productInfo}>
              <Text style={styles.productTitle}>
                {exchange.proposedProduct.title}
              </Text>
              <Text style={styles.productCondition}>
                {exchange.proposedProduct.condition}
              </Text>
              <View style={styles.ownerInfo}>
                <Image
                  source={{ uri: exchange.proposedProduct.owner.avatar }}
                  style={styles.ownerAvatar}
                />
                <Text style={styles.ownerName}>
                  {exchange.proposedProduct.owner.name}
                </Text>
              </View>
            </View>
          </View>

          <View style={styles.exchangeIcon}>
            <Ionicons name="swap-horizontal" size={24} color="#4A90E2" />
          </View>

          <View style={styles.productCard}>
            <Image
              source={{ uri: exchange.offeredProduct.image }}
              style={styles.productImage}
            />
            <View style={styles.productInfo}>
              <Text style={styles.productTitle}>
                {exchange.offeredProduct.title}
              </Text>
              <Text style={styles.productCondition}>
                {exchange.offeredProduct.condition}
              </Text>
              <View style={styles.ownerInfo}>
                <Image
                  source={{ uri: exchange.offeredProduct.owner.avatar }}
                  style={styles.ownerAvatar}
                />
                <Text style={styles.ownerName}>
                  {exchange.offeredProduct.owner.name}
                </Text>
              </View>
            </View>
          </View>
        </View>

        <View style={styles.agreementSection}>
          <Text style={styles.sectionTitle}>Điều khoản trao đổi</Text>

          <TouchableOpacity
            style={styles.agreementItem}
            onPress={() =>
              setAgreement({ ...agreement, terms: !agreement.terms })
            }
          >
            <View style={styles.checkbox}>
              {agreement.terms && (
                <Ionicons name="checkmark" size={16} color="#4A90E2" />
              )}
            </View>
            <Text style={styles.agreementText}>
              Tôi đã đọc và đồng ý với điều khoản trao đổi
            </Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.agreementItem}
            onPress={() =>
              setAgreement({ ...agreement, meetup: !agreement.meetup })
            }
          >
            <View style={styles.checkbox}>
              {agreement.meetup && (
                <Ionicons name="checkmark" size={16} color="#4A90E2" />
              )}
            </View>
            <Text style={styles.agreementText}>
              Tôi đồng ý gặp mặt trực tiếp để trao đổi sản phẩm
            </Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.agreementItem}
            onPress={() =>
              setAgreement({ ...agreement, inspection: !agreement.inspection })
            }
          >
            <View style={styles.checkbox}>
              {agreement.inspection && (
                <Ionicons name="checkmark" size={16} color="#4A90E2" />
              )}
            </View>
            <Text style={styles.agreementText}>
              Tôi sẽ kiểm tra kỹ sản phẩm trước khi trao đổi
            </Text>
          </TouchableOpacity>
        </View>
      </ScrollView>

      <View style={styles.footer}>
        <TouchableOpacity
          style={styles.declineButton}
          onPress={handleDecline}
          disabled={isLoading}
        >
          <Text style={styles.declineButtonText}>Từ chối</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[
            styles.confirmButton,
            (!Object.values(agreement).every((value) => value) || isLoading) &&
              styles.disabledButton,
          ]}
          onPress={handleConfirm}
          disabled={
            !Object.values(agreement).every((value) => value) || isLoading
          }
        >
          {isLoading ? (
            <ActivityIndicator color="#fff" />
          ) : (
            <Text style={styles.confirmButtonText}>Xác nhận</Text>
          )}
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}
