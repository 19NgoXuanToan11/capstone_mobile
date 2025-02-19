import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  ScrollView,
  Image,
  TouchableOpacity,
  Alert,
  ActivityIndicator,
  StyleSheet,
  Dimensions,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Ionicons } from "@expo/vector-icons";
import { LinearGradient } from "expo-linear-gradient";

const { width } = Dimensions.get("window");

export default function ExchangeDetailScreen({ navigation, route }) {
  const [exchange, setExchange] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchExchangeDetails = async () => {
      try {
        await new Promise((resolve) => setTimeout(resolve, 1000));
        setExchange({
          id: "1",
          status: "in_progress",
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
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity
          style={styles.backButton}
          onPress={() => navigation.goBack()}
        >
          <Ionicons name="arrow-back" size={24} color="#333" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Chi tiết trao đổi</Text>
        <TouchableOpacity style={styles.moreButton}>
          <Ionicons name="ellipsis-horizontal" size={24} color="#333" />
        </TouchableOpacity>
      </View>

      <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
        {/* Status Banner */}
        <LinearGradient
          colors={["#4A90E2", "#357ABD"]}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 0 }}
          style={styles.statusBanner}
        >
          <View style={styles.statusContent}>
            <Ionicons
              name="time-outline"
              size={24}
              color="#FFF"
              style={styles.statusIcon}
            />
            <Text style={styles.statusText}>
              {exchange.status === "in_progress"
                ? "Đang trong quá trình trao đổi"
                : "Trạng thái khác"}
            </Text>
          </View>
        </LinearGradient>

        {/* Exchange Products */}
        <View style={styles.exchangeProducts}>
          <View style={styles.productCard}>
            <Image
              source={{ uri: exchange.proposedProduct.image }}
              style={styles.productImage}
            />
            <View style={styles.productInfo}>
              <Text style={styles.productTitle} numberOfLines={2}>
                {exchange.proposedProduct.title}
              </Text>
              <View style={styles.conditionBadge}>
                <Text style={styles.conditionText}>
                  {exchange.proposedProduct.condition}
                </Text>
              </View>
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

          <View style={styles.exchangeIconContainer}>
            <LinearGradient
              colors={["#4A90E2", "#357ABD"]}
              style={styles.exchangeIconBg}
            >
              <Ionicons name="swap-horizontal" size={24} color="#FFF" />
            </LinearGradient>
          </View>

          <View style={styles.productCard}>
            <Image
              source={{ uri: exchange.offeredProduct.image }}
              style={styles.productImage}
            />
            <View style={styles.productInfo}>
              <Text style={styles.productTitle} numberOfLines={2}>
                {exchange.offeredProduct.title}
              </Text>
              <View style={styles.conditionBadge}>
                <Text style={styles.conditionText}>
                  {exchange.offeredProduct.condition}
                </Text>
              </View>
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
                <LinearGradient
                  colors={["#4A90E2", "#357ABD"]}
                  style={styles.timelineDot}
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
            <Ionicons name="close-circle-outline" size={20} color="#FF3B30" />
            <Text style={styles.cancelButtonText}>Hủy trao đổi</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.completeButton}
            onPress={handleComplete}
          >
            <Ionicons name="checkmark-circle-outline" size={20} color="#FFF" />
            <Text style={styles.completeButtonText}>Hoàn thành</Text>
          </TouchableOpacity>
        </View>
      )}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F8F9FA",
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 16,
    paddingVertical: 12,
    backgroundColor: "#FFF",
    borderBottomWidth: 1,
    borderBottomColor: "#E0E0E0",
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: "600",
    color: "#333",
  },
  content: {
    flex: 1,
  },
  statusBanner: {
    padding: 16,
    marginBottom: 16,
  },
  statusContent: {
    flexDirection: "row",
    alignItems: "center",
  },
  statusIcon: {
    marginRight: 8,
  },
  statusText: {
    fontSize: 16,
    fontWeight: "500",
    color: "#FFF",
  },
  exchangeProducts: {
    padding: 16,
    backgroundColor: "#FFF",
    borderRadius: 12,
    marginHorizontal: 16,
    marginBottom: 16,
    elevation: 2,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  productCard: {
    flexDirection: "row",
    alignItems: "center",
    padding: 12,
    backgroundColor: "#F8F9FA",
    borderRadius: 8,
  },
  productImage: {
    width: 80,
    height: 80,
    borderRadius: 8,
  },
  productInfo: {
    flex: 1,
    marginLeft: 12,
  },
  productTitle: {
    fontSize: 16,
    fontWeight: "600",
    color: "#333",
    marginBottom: 4,
  },
  conditionBadge: {
    backgroundColor: "#E8F0FE",
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 4,
    alignSelf: "flex-start",
    marginBottom: 8,
  },
  conditionText: {
    fontSize: 12,
    color: "#4A90E2",
  },
  ownerInfo: {
    flexDirection: "row",
    alignItems: "center",
  },
  ownerAvatar: {
    width: 24,
    height: 24,
    borderRadius: 12,
    marginRight: 8,
  },
  ownerName: {
    fontSize: 14,
    color: "#666",
  },
  exchangeIconContainer: {
    alignItems: "center",
    marginVertical: 16,
  },
  exchangeIconBg: {
    width: 40,
    height: 40,
    borderRadius: 20,
    justifyContent: "center",
    alignItems: "center",
  },
  timeline: {
    padding: 16,
    backgroundColor: "#FFF",
    borderRadius: 12,
    marginHorizontal: 16,
    marginBottom: 16,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: "600",
    color: "#333",
    marginBottom: 16,
  },
  timelineEvent: {
    flexDirection: "row",
    marginBottom: 24,
  },
  timelineIcon: {
    alignItems: "center",
    marginRight: 12,
  },
  timelineDot: {
    width: 16,
    height: 16,
    borderRadius: 8,
  },
  timelineLine: {
    width: 2,
    height: 40,
    backgroundColor: "#E0E0E0",
    marginTop: 8,
  },
  timelineContent: {
    flex: 1,
  },
  timelineDescription: {
    fontSize: 14,
    color: "#333",
    marginBottom: 4,
  },
  timelineTimestamp: {
    fontSize: 12,
    color: "#666",
  },
  footer: {
    flexDirection: "row",
    padding: 16,
    backgroundColor: "#FFF",
    borderTopWidth: 1,
    borderTopColor: "#E0E0E0",
  },
  cancelButton: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 12,
    marginRight: 8,
    backgroundColor: "#FFE5E5",
    borderRadius: 8,
  },
  cancelButtonText: {
    marginLeft: 8,
    fontSize: 16,
    fontWeight: "600",
    color: "#FF3B30",
  },
  completeButton: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 12,
    marginLeft: 8,
    backgroundColor: "#4CD964",
    borderRadius: 8,
  },
  completeButtonText: {
    marginLeft: 8,
    fontSize: 16,
    fontWeight: "600",
    color: "#FFF",
  },
  contactSection: {
    padding: 16,
    backgroundColor: "#FFF",
    borderTopWidth: 1,
    borderTopColor: "#E0E0E0",
  },
  contactCard: {
    padding: 12,
    backgroundColor: "#F8F9FA",
    borderRadius: 8,
  },
  contactItem: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 12,
  },
  contactLabel: {
    fontSize: 14,
    fontWeight: "600",
    color: "#333",
    marginRight: 8,
  },
  contactValue: {
    fontSize: 14,
    color: "#666",
  },
  contactButton: {
    flexDirection: "row",
    alignItems: "center",
    padding: 8,
    backgroundColor: "#E8F0FE",
    borderRadius: 4,
  },
  contactButtonText: {
    marginLeft: 8,
    fontSize: 14,
    fontWeight: "600",
    color: "#4A90E2",
  },
  moreButton: {
    padding: 8,
  },
});
