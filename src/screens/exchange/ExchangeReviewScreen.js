import React, { useState } from "react";
import {
  View,
  Text,
  ScrollView,
  Image,
  TouchableOpacity,
  TextInput,
  Alert,
  ActivityIndicator,
  StyleSheet,
  Dimensions,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Ionicons } from "@expo/vector-icons";
import { LinearGradient } from "expo-linear-gradient";

const { width } = Dimensions.get("window");

export default function ExchangeReviewScreen({ navigation, route }) {
  const [rating, setRating] = useState(5);
  const [review, setReview] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmitReview = async () => {
    if (!review.trim()) {
      Alert.alert("Lỗi", "Vui lòng nhập đánh giá của bạn");
      return;
    }

    setIsLoading(true);
    try {
      await new Promise((resolve) => setTimeout(resolve, 1000));

      Alert.alert("Thành công", "Cảm ơn bạn đã đánh giá", [
        {
          text: "OK",
          onPress: () => navigation.navigate("ExchangeList"),
        },
      ]);
    } catch (error) {
      Alert.alert("Lỗi", "Không thể gửi đánh giá. Vui lòng thử lại sau.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <LinearGradient
        colors={["#4A90E2", "#357ABD"]}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 0 }}
        style={styles.header}
      >
        <TouchableOpacity
          style={styles.backButton}
          onPress={() => navigation.goBack()}
        >
          <Ionicons name="arrow-back" size={24} color="#FFF" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Đánh giá trao đổi</Text>
        <View style={styles.headerRight} />
      </LinearGradient>

      <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
        <View style={styles.reviewSection}>
          <View style={styles.exchangeSummary}>
            <Image
              source={{ uri: "https://picsum.photos/200" }}
              style={styles.productImage}
            />
            <View style={styles.exchangeInfo}>
              <Text style={styles.exchangeTitle}>Trao đổi thành công!</Text>
              <Text style={styles.exchangeSubtitle}>
                Hãy chia sẻ trải nghiệm của bạn
              </Text>
            </View>
          </View>

          <View style={styles.ratingContainer}>
            <Text style={styles.ratingTitle}>
              Bạn hài lòng với trải nghiệm trao đổi này chứ?
            </Text>
            <View style={styles.starsContainer}>
              {[1, 2, 3, 4, 5].map((star) => (
                <TouchableOpacity
                  key={star}
                  onPress={() => setRating(star)}
                  style={styles.starButton}
                >
                  <Ionicons
                    name={star <= rating ? "star" : "star-outline"}
                    size={36}
                    color={star <= rating ? "#FFD700" : "#ddd"}
                  />
                </TouchableOpacity>
              ))}
            </View>
            <Text style={styles.ratingText}>
              {rating === 5
                ? "Tuyệt vời!"
                : rating === 4
                ? "Hài lòng"
                : rating === 3
                ? "Bình thường"
                : rating === 2
                ? "Không hài lòng"
                : "Rất không hài lòng"}
            </Text>
          </View>

          <View style={styles.reviewInputContainer}>
            <Text style={styles.reviewLabel}>
              Chia sẻ chi tiết trải nghiệm của bạn
            </Text>
            <View style={styles.textInputWrapper}>
              <TextInput
                style={styles.reviewInput}
                multiline
                numberOfLines={6}
                value={review}
                onChangeText={setReview}
                placeholder="Nhập đánh giá của bạn..."
                placeholderTextColor="#999"
                textAlignVertical="top"
              />
            </View>
          </View>
        </View>
      </ScrollView>

      <View style={styles.footer}>
        <TouchableOpacity
          style={[
            styles.submitButton,
            (!review.trim() || isLoading) && styles.disabledButton,
          ]}
          onPress={handleSubmitReview}
          disabled={!review.trim() || isLoading}
        >
          {isLoading ? (
            <ActivityIndicator color="#fff" />
          ) : (
            <>
              <Ionicons
                name="send"
                size={20}
                color="#FFF"
                style={styles.submitIcon}
              />
              <Text style={styles.submitButtonText}>Gửi đánh giá</Text>
            </>
          )}
        </TouchableOpacity>
      </View>
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
    paddingVertical: 16,
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: "600",
    color: "#FFF",
  },
  headerRight: {
    width: 24,
  },
  content: {
    flex: 1,
  },
  reviewSection: {
    padding: 20,
  },
  exchangeSummary: {
    alignItems: "center",
    marginBottom: 30,
  },
  productImage: {
    width: 120,
    height: 120,
    borderRadius: 60,
    marginBottom: 16,
    borderWidth: 4,
    borderColor: "#FFF",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 4,
  },
  exchangeInfo: {
    alignItems: "center",
  },
  exchangeTitle: {
    fontSize: 24,
    fontWeight: "700",
    color: "#333",
    marginBottom: 8,
  },
  exchangeSubtitle: {
    fontSize: 16,
    color: "#666",
  },
  ratingContainer: {
    alignItems: "center",
    marginBottom: 30,
  },
  ratingTitle: {
    fontSize: 18,
    fontWeight: "600",
    color: "#333",
    marginBottom: 16,
    textAlign: "center",
  },
  starsContainer: {
    flexDirection: "row",
    justifyContent: "center",
    marginBottom: 12,
  },
  starButton: {
    padding: 8,
  },
  ratingText: {
    fontSize: 16,
    fontWeight: "500",
    color: "#4A90E2",
  },
  reviewInputContainer: {
    marginBottom: 20,
  },
  reviewLabel: {
    fontSize: 16,
    fontWeight: "600",
    color: "#333",
    marginBottom: 12,
  },
  textInputWrapper: {
    backgroundColor: "#FFF",
    borderRadius: 12,
    padding: 2,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  reviewInput: {
    backgroundColor: "#FFF",
    borderRadius: 12,
    padding: 16,
    fontSize: 16,
    color: "#333",
    minHeight: 120,
  },
  footer: {
    padding: 16,
    backgroundColor: "#FFF",
    borderTopWidth: 1,
    borderTopColor: "#E0E0E0",
  },
  submitButton: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#4A90E2",
    paddingVertical: 16,
    borderRadius: 12,
  },
  disabledButton: {
    backgroundColor: "#B0B0B0",
  },
  submitIcon: {
    marginRight: 8,
  },
  submitButtonText: {
    fontSize: 16,
    fontWeight: "600",
    color: "#FFF",
  },
});
