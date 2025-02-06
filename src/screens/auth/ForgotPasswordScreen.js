import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  KeyboardAvoidingView,
  Platform,
  Alert,
  ActivityIndicator,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Ionicons } from "@expo/vector-icons";
import styles from "../../styles/AuthStyles";

export default function ForgotPasswordScreen({ navigation }) {
  const [email, setEmail] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [isSent, setIsSent] = useState(false);

  const handleResetPassword = async () => {
    if (!email) {
      Alert.alert("Lỗi", "Vui lòng nhập email của bạn");
      return;
    }

    setIsLoading(true);
    try {
      // TODO: Implement password reset logic
      await new Promise((resolve) => setTimeout(resolve, 2000)); // Simulate API call
      setIsSent(true);
    } catch (error) {
      Alert.alert(
        "Lỗi",
        "Không thể gửi email khôi phục. Vui lòng thử lại sau."
      );
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        style={styles.container}
      >
        {/* Header with back button */}
        <TouchableOpacity
          style={styles.backButton}
          onPress={() => navigation.goBack()}
        >
          <Ionicons name="arrow-back" size={24} color="#333" />
        </TouchableOpacity>

        <View style={styles.forgotContainer}>
          {/* Header */}
          <View style={styles.header}>
            <Ionicons
              name="lock-open-outline"
              size={80}
              color="#4A90E2"
              style={styles.forgotIcon}
            />
            <Text style={styles.welcomeText}>Quên mật khẩu?</Text>
            <Text style={styles.subText}>
              Nhập email của bạn để nhận hướng dẫn khôi phục mật khẩu
            </Text>
          </View>

          {!isSent ? (
            // Reset Password Form
            <View style={styles.form}>
              <View style={styles.inputContainer}>
                <Ionicons name="mail-outline" size={20} color="#666" />
                <TextInput
                  style={styles.input}
                  placeholder="Nhập email của bạn"
                  value={email}
                  onChangeText={setEmail}
                  keyboardType="email-address"
                  autoCapitalize="none"
                  editable={!isLoading}
                />
              </View>

              <TouchableOpacity
                style={[
                  styles.resetButton,
                  isLoading && styles.resetButtonDisabled,
                ]}
                onPress={handleResetPassword}
                disabled={isLoading}
              >
                {isLoading ? (
                  <ActivityIndicator color="#fff" />
                ) : (
                  <Text style={styles.resetButtonText}>Gửi yêu cầu</Text>
                )}
              </TouchableOpacity>
            </View>
          ) : (
            // Success Message
            <View style={styles.successContainer}>
              <Ionicons
                name="checkmark-circle-outline"
                size={80}
                color="#4CAF50"
                style={styles.successIcon}
              />
              <Text style={styles.successTitle}>Đã gửi email!</Text>
              <Text style={styles.successText}>
                Vui lòng kiểm tra hộp thư của bạn và làm theo hướng dẫn để khôi
                phục mật khẩu
              </Text>
              <TouchableOpacity
                style={styles.backToLoginButton}
                onPress={() => navigation.navigate("Login")}
              >
                <Text style={styles.backToLoginText}>Quay lại đăng nhập</Text>
              </TouchableOpacity>
            </View>
          )}

          {/* Help Section */}
          <View style={styles.helpContainer}>
            <Text style={styles.helpText}>Bạn cần hỗ trợ?</Text>
            <TouchableOpacity>
              <Text style={styles.helpLink}>Liên hệ với chúng tôi</Text>
            </TouchableOpacity>
          </View>
        </View>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}
