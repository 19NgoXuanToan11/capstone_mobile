import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  KeyboardAvoidingView,
  Platform,
  Alert,
  ActivityIndicator,
  Animated,
  Dimensions,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Ionicons, MaterialCommunityIcons } from "@expo/vector-icons";
import { LinearGradient } from "expo-linear-gradient";
import * as Haptics from "expo-haptics";
import LottieView from "lottie-react-native";
import styles from "../../styles/AuthStyles";

const { width } = Dimensions.get("window");

export default function ForgotPasswordScreen({ navigation }) {
  const [email, setEmail] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [isSent, setIsSent] = useState(false);
  const [isFocused, setIsFocused] = useState(false);

  // Animation values
  const fadeAnim = useState(new Animated.Value(0))[0];
  const slideAnim = useState(new Animated.Value(50))[0];
  const successAnim = useState(new Animated.Value(0))[0];

  useEffect(() => {
    // Entrance animation
    Animated.parallel([
      Animated.timing(fadeAnim, {
        toValue: 1,
        duration: 800,
        useNativeDriver: true,
      }),
      Animated.timing(slideAnim, {
        toValue: 0,
        duration: 800,
        useNativeDriver: true,
      }),
    ]).start();
  }, []);

  useEffect(() => {
    // Success animation
    if (isSent) {
      Animated.timing(successAnim, {
        toValue: 1,
        duration: 500,
        useNativeDriver: true,
      }).start();
    }
  }, [isSent]);

  const handleResetPassword = async () => {
    if (!email) {
      Haptics.notificationAsync(Haptics.NotificationFeedbackType.Error);
      Alert.alert("Lỗi", "Vui lòng nhập email của bạn");
      return;
    }

    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium);
    setIsLoading(true);
    try {
      await new Promise((resolve) => setTimeout(resolve, 2000));
      setIsSent(true);
      Haptics.notificationAsync(Haptics.NotificationFeedbackType.Success);
    } catch (error) {
      Haptics.notificationAsync(Haptics.NotificationFeedbackType.Error);
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
      <LinearGradient
        colors={["#121212", "#1E1E1E", "#121212"]}
        style={styles.container}
      >
        <KeyboardAvoidingView
          behavior={Platform.OS === "ios" ? "padding" : "height"}
          style={styles.container}
        >
          <TouchableOpacity
            style={styles.backButton}
            onPress={() => {
              Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
              navigation.goBack();
            }}
          >
            <Ionicons name="arrow-back" size={24} color="#FFFFFF" />
          </TouchableOpacity>

          <Animated.View
            style={[
              styles.forgotContainer,
              {
                opacity: fadeAnim,
                transform: [{ translateY: slideAnim }],
              },
            ]}
          >
            {!isSent ? (
              <>
                <View style={styles.header}>
                  <View style={styles.iconCircle}>
                    <MaterialCommunityIcons
                      name="lock-reset"
                      size={40}
                      color="#FFFFFF"
                    />
                  </View>
                  <Text style={styles.welcomeText}>Quên mật khẩu?</Text>
                  <Text style={styles.subText}>
                    Nhập email của bạn để nhận hướng dẫn khôi phục mật khẩu
                  </Text>
                </View>

                <View style={styles.form}>
                  <View
                    style={[
                      styles.inputContainer,
                      isFocused && styles.inputContainerFocused,
                    ]}
                  >
                    <View style={styles.iconContainer}>
                      <Ionicons name="mail-outline" size={20} color="#FFFFFF" />
                    </View>
                    <TextInput
                      style={styles.input}
                      placeholder="Nhập email của bạn"
                      placeholderTextColor="rgba(255, 255, 255, 0.5)"
                      value={email}
                      onChangeText={setEmail}
                      keyboardType="email-address"
                      autoCapitalize="none"
                      editable={!isLoading}
                      onFocus={() => setIsFocused(true)}
                      onBlur={() => setIsFocused(false)}
                    />
                  </View>

                  <TouchableOpacity
                    activeOpacity={0.8}
                    onPress={handleResetPassword}
                    disabled={isLoading}
                  >
                    <LinearGradient
                      colors={
                        isLoading
                          ? ["#555555", "#333333"]
                          : ["#1E88E5", "#0D47A1"]
                      }
                      start={{ x: 0, y: 0 }}
                      end={{ x: 1, y: 0 }}
                      style={styles.loginButton}
                    >
                      <View style={styles.loginButtonGradient}>
                        {isLoading ? (
                          <ActivityIndicator color="#fff" />
                        ) : (
                          <Text style={styles.loginButtonText}>
                            Gửi yêu cầu
                          </Text>
                        )}
                      </View>
                    </LinearGradient>
                  </TouchableOpacity>
                </View>
              </>
            ) : (
              <Animated.View
                style={[
                  styles.successContainer,
                  {
                    opacity: successAnim,
                    transform: [
                      {
                        scale: successAnim.interpolate({
                          inputRange: [0, 1],
                          outputRange: [0.9, 1],
                        }),
                      },
                    ],
                  },
                ]}
              >
                <LottieView
                  source={require("../../../assets/login/login.png")}
                  autoPlay
                  loop={false}
                  style={{ width: 150, height: 150 }}
                />
                <Text style={styles.successTitle}>Đã gửi email!</Text>
                <Text style={styles.successText}>
                  Vui lòng kiểm tra hộp thư của bạn và làm theo hướng dẫn để
                  khôi phục mật khẩu
                </Text>
                <TouchableOpacity
                  style={styles.backToLoginButton}
                  onPress={() => {
                    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
                    navigation.navigate("Login");
                  }}
                >
                  <LinearGradient
                    colors={["#4CAF50", "#2E7D32"]}
                    start={{ x: 0, y: 0 }}
                    end={{ x: 1, y: 0 }}
                    style={styles.backToLoginGradient}
                  >
                    <Text style={styles.backToLoginText}>
                      Quay lại đăng nhập
                    </Text>
                  </LinearGradient>
                </TouchableOpacity>
              </Animated.View>
            )}
          </Animated.View>
        </KeyboardAvoidingView>
      </LinearGradient>
    </SafeAreaView>
  );
}
