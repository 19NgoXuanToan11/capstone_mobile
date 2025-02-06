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
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Ionicons } from "@expo/vector-icons";
import styles from "../../styles/ExchangeStyles";

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
      // TODO: Call API to submit review
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
      <View style={styles.header}>
        <TouchableOpacity
          style={styles.backButton}
          onPress={() => navigation.goBack()}
        >
          <Ionicons name="arrow-back" size={24} color="#333" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Đánh giá trao đổi</Text>
        <View style={styles.headerRight} />
      </View>

      <ScrollView style={styles.content}>
        <View style={styles.reviewSection}>
          <Text style={styles.reviewTitle}>
            Bạn hài lòng với trải nghiệm trao đổi này chứ?
          </Text>

          {/* Rating Stars */}
          <View style={styles.ratingContainer}>
            {[1, 2, 3, 4, 5].map((star) => (
              <TouchableOpacity
                key={star}
                onPress={() => setRating(star)}
                style={styles.starButton}
              >
                <Ionicons
                  name={star <= rating ? "star" : "star-outline"}
                  size={32}
                  color={star <= rating ? "#FFD700" : "#ddd"}
                />
              </TouchableOpacity>
            ))}
          </View>

          {/* Review Input */}
          <View style={styles.reviewInputContainer}>
            <Text style={styles.reviewLabel}>Chia sẻ trải nghiệm của bạn</Text>
            <TextInput
              style={styles.reviewInput}
              multiline
              numberOfLines={4}
              value={review}
              onChangeText={setReview}
              placeholder="Nhập đánh giá của bạn..."
              placeholderTextColor="#999"
            />
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
            <Text style={styles.submitButtonText}>Gửi đánh giá</Text>
          )}
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}
