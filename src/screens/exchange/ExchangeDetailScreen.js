import React, { useState, useEffect } from "react";
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

export default function ExchangeDetailScreen({ navigation, route }) {
  const [exchange, setExchange] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  // Mock data - thay thế bằng API call thực tế
  useEffect(() => {
    const fetchExchangeDetails = async () => {
      try {
        // TODO: Call API to get exchange details
        await new Promise((resolve) => setTimeout(resolve, 1000));
        setExchange({
          id: "1",
          status: "in_progress", // pending, confirmed, in_progress, completed, cancelled
          createdAt: "2024-02-15T09:30:00Z",
          proposedProduct: {
            id: "1",
            title: "iPhone 13 Pro Max",
            image: "https://picsum.photos/400/400?random=1",
            condition: "Đã sử dụng - Còn 95%",
            owner: {
              id: "123",
              name: "Nguyễn Văn A",
              avatar: "https://picsum.photos/100/100?random=1",
              phone: "0901234567",
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
              phone: "0909876543",
            },
          },
          timeline: [
            {
              id: "1",
              status: "created",
              timestamp: "2024-02-15T09:30:00Z",
              description: "Đề xuất trao đổi được tạo",
            },
            {
              id: "2",
              status: "confirmed",
              timestamp: "2024-02-15T10:15:00Z",
              description: "Đề xuất được chấp nhận",
            },
            {
              id: "3",
              status: "in_progress",
              timestamp: "2024-02-15T10:30:00Z",
              description: "Đang trong quá trình trao đổi",
            },
          ],
        });
      } catch (error) {
        Alert.alert("Lỗi", "Không thể tải thông tin trao đổi");
      } finally {
        setIsLoading(false);
      }
    };

    fetchExchangeDetails();
  }, []);

  const getStatusColor = (status) => {
    switch (status) {
      case "pending":
        return "#FF9500";
      case "confirmed":
        return "#4CD964";
      case "in_progress":
        return "#4A90E2";
      case "completed":
        return "#4CD964";
      case "cancelled":
        return "#FF3B30";
      default:
        return "#999";
    }
  };

  const getStatusText = (status) => {
    switch (status) {
      case "pending":
        return "Chờ xác nhận";
      case "confirmed":
        return "Đã xác nhận";
      case "in_progress":
        return "Đang trao đổi";
      case "completed":
        return "Hoàn thành";
      case "cancelled":
        return "Đã hủy";
      default:
        return status;
    }
  };

  const handleComplete = () => {
    Alert.alert(
      "Hoàn thành trao đổi",
      "Xác nhận đã hoàn thành trao đổi sản phẩm?",
      [
        {
          text: "Hủy",
          style: "cancel",
        },
        {
          text: "Xác nhận",
          onPress: () => {
            navigation.navigate("ExchangeReview", {
              exchangeId: exchange.id,
            });
          },
        },
      ]
    );
  };

  const handleCancel = () => {
    Alert.alert("Hủy trao đổi", "Bạn có chắc chắn muốn hủy trao đổi này?", [
      {
        text: "Không",
        style: "cancel",
      },
      {
        text: "Có",
        style: "destructive",
        onPress: async () => {
          setIsLoading(true);
          try {
            // TODO: Call API to cancel exchange
            await new Promise((resolve) => setTimeout(resolve, 1000));
            setExchange({
              ...exchange,
              status: "cancelled",
            });
          } catch (error) {
            Alert.alert("Lỗi", "Không thể hủy trao đổi");
          } finally {
            setIsLoading(false);
          }
        },
      },
    ]);
  };

  if (isLoading || !exchange) {
    return (
      <SafeAreaView style={styles.container}>
        <View style={styles.loadingContainer}>
          <ActivityIndicator size="large" color="#4A90E2" />
        </View>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity
          style={styles.backButton}
          onPress={() => navigation.goBack()}
        >
          <Ionicons name="arrow-back" size={24} color="#333" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Chi tiết trao đổi</Text>
        <View style={styles.headerRight} />
      </View>

      <ScrollView style={styles.content}>
        {/* Status Banner */}
        <View
          style={[
            styles.statusBanner,
            { backgroundColor: getStatusColor(exchange.status) },
          ]}
        >
          <Text style={styles.statusText}>
            {getStatusText(exchange.status)}
          </Text>
        </View>

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

        {/* Timeline */}
        <View style={styles.timeline}>
          <Text style={styles.sectionTitle}>Tiến trình trao đổi</Text>
          {exchange.timeline.map((event, index) => (
            <View key={event.id} style={styles.timelineEvent}>
              <View style={styles.timelineIcon}>
                <View
                  style={[
                    styles.timelineDot,
                    { backgroundColor: getStatusColor(event.status) },
                  ]}
                />
                {index !== exchange.timeline.length - 1 && (
                  <View style={styles.timelineLine} />
                )}
              </View>
              <View style={styles.timelineContent}>
                <Text style={styles.timelineDescription}>
                  {event.description}
                </Text>
                <Text style={styles.timelineTimestamp}>
                  {new Date(event.timestamp).toLocaleString()}
                </Text>
              </View>
            </View>
          ))}
        </View>

        {/* Contact Information */}
        {(exchange.status === "confirmed" ||
          exchange.status === "in_progress") && (
          <View style={styles.contactSection}>
            <Text style={styles.sectionTitle}>Thông tin liên hệ</Text>
            <View style={styles.contactCard}>
              <View style={styles.contactItem}>
                <Text style={styles.contactLabel}>Người đề xuất:</Text>
                <Text style={styles.contactValue}>
                  {exchange.proposedProduct.owner.name}
                </Text>
                <TouchableOpacity style={styles.contactButton}>
                  <Ionicons name="call" size={20} color="#4A90E2" />
                  <Text style={styles.contactButtonText}>
                    {exchange.proposedProduct.owner.phone}
                  </Text>
                </TouchableOpacity>
              </View>
              <View style={styles.contactItem}>
                <Text style={styles.contactLabel}>Người nhận đề xuất:</Text>
                <Text style={styles.contactValue}>
                  {exchange.offeredProduct.owner.name}
                </Text>
                <TouchableOpacity style={styles.contactButton}>
                  <Ionicons name="call" size={20} color="#4A90E2" />
                  <Text style={styles.contactButtonText}>
                    {exchange.offeredProduct.owner.phone}
                  </Text>
                </TouchableOpacity>
              </View>
            </View>
          </View>
        )}
      </ScrollView>

      {/* Action Buttons */}
      {exchange.status === "in_progress" && (
        <View style={styles.footer}>
          <TouchableOpacity style={styles.cancelButton} onPress={handleCancel}>
            <Text style={styles.cancelButtonText}>Hủy trao đổi</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.completeButton}
            onPress={handleComplete}
          >
            <Text style={styles.completeButtonText}>Hoàn thành</Text>
          </TouchableOpacity>
        </View>
      )}
    </SafeAreaView>
  );
}
