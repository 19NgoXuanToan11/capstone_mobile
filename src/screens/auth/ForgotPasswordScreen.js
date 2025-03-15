import React, { useState, useRef, useEffect } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Image,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  Alert,
  Animated,
  Dimensions,
  StatusBar,
  ActivityIndicator,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Ionicons, MaterialCommunityIcons } from "@expo/vector-icons";
import { LinearGradient } from "expo-linear-gradient";
import { BlurView } from "expo-blur";
import * as Haptics from "expo-haptics";
import LottieView from "lottie-react-native";
import styles from "../../styles/AuthStyles";

const { width, height } = Dimensions.get("window");

export default function ForgotPasswordScreen({ navigation }) {
  const [email, setEmail] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [isSent, setIsSent] = useState(false);
  const [emailFocused, setEmailFocused] = useState(false);

  // Animation values
  const fadeAnim = useRef(new Animated.Value(0)).current;
  const slideAnim = useRef(new Animated.Value(50)).current;
  const successAnim = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    // Animate elements when component mounts
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
      Alert.alert("Lỗi", "Vui lòng nhập email của bạn");
      Haptics.notificationAsync(Haptics.NotificationFeedbackType.Error);
      return;
    }

    try {
      setIsLoading(true);
      Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium);

      // Giả lập gửi email khôi phục
      await new Promise((resolve) => setTimeout(resolve, 2000));
      setIsSent(true);
      Haptics.notificationAsync(Haptics.NotificationFeedbackType.Success);
    } catch (error) {
      Alert.alert(
        "Lỗi",
        "Không thể gửi email khôi phục. Vui lòng thử lại sau."
      );
      Haptics.notificationAsync(Haptics.NotificationFeedbackType.Error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <View style={styles.container}>
      <StatusBar
        barStyle="light-content"
        backgroundColor="transparent"
        translucent
      />

      {/* Background Image */}
      <Image
        source={require("../../../assets/login/login.png")}
        style={styles.backgroundImage}
        resizeMode="cover"
      />

      <SafeAreaView style={styles.safeArea}>
        <KeyboardAvoidingView
          behavior={Platform.OS === "ios" ? "padding" : "height"}
          style={styles.keyboardView}
        >
          <ScrollView
            contentContainerStyle={styles.scrollContent}
            showsVerticalScrollIndicator={false}
          >
            {/* Back Button */}
            <TouchableOpacity
              style={styles.backButton}
              onPress={() => {
                Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
                navigation.goBack();
              }}
            >
              <Ionicons name="arrow-back" size={24} color="#FFFFFF" />
            </TouchableOpacity>

            {!isSent ? (
              <>
                {/* Header with Title */}
                <Animated.View
                  style={[
                    styles.header,
                    {
                      opacity: fadeAnim,
                      transform: [{ translateY: slideAnim }],
                    },
                  ]}
                >
                  <Animated.Text
                    style={[styles.welcomeText, { opacity: fadeAnim }]}
                  >
                    Quên mật khẩu?
                  </Animated.Text>
                  <Text style={styles.subText}>
                    Nhập email của bạn để nhận hướng dẫn khôi phục mật khẩu
                  </Text>
                </Animated.View>

                {/* Forgot Password Form */}
                <Animated.View
                  style={[
                    styles.formContainer,
                    {
                      opacity: fadeAnim,
                      transform: [{ translateY: slideAnim }],
                    },
                  ]}
                >
                  <BlurView intensity={60} tint="dark" style={styles.formBlur}>
                    <View style={styles.form}>
                      {/* Email Input */}
                      <View
                        style={[
                          styles.inputContainer,
                          emailFocused && [
                            styles.inputContainerFocused,
                            {
                              borderColor: "rgba(25, 118, 210, 0.6)",
                              shadowColor: "#1976D2",
                            },
                          ],
                        ]}
                      >
                        <View style={styles.iconContainer}>
                          <Ionicons
                            name="mail-outline"
                            size={20}
                            color="#FFFFFF"
                          />
                        </View>
                        <TextInput
                          style={styles.input}
                          placeholder="Email"
                          value={email}
                          onChangeText={setEmail}
                          keyboardType="email-address"
                          autoCapitalize="none"
                          onFocus={() => setEmailFocused(true)}
                          onBlur={() => setEmailFocused(false)}
                          placeholderTextColor="rgba(255,255,255,0.6)"
                          editable={!isLoading}
                        />
                      </View>

                      {/* Reset Password Button */}
                      <TouchableOpacity
                        activeOpacity={0.8}
                        onPress={handleResetPassword}
                        disabled={isLoading}
                      >
                        <LinearGradient
                          colors={["#1976D2", "#1565C0", "#0D47A1"]}
                          start={{ x: 0, y: 0 }}
                          end={{ x: 1, y: 0 }}
                          style={[styles.loginButton, { borderRadius: 8 }]}
                        >
                          {isLoading ? (
                            <ActivityIndicator color="#FFFFFF" size="small" />
                          ) : (
                            <View
                              style={{
                                flexDirection: "row",
                                alignItems: "center",
                                justifyContent: "center",
                                width: "100%",
                                height: 50,
                              }}
                            >
                              <Text
                                style={[
                                  styles.loginButtonText,
                                  { fontSize: 16, fontWeight: "600" },
                                ]}
                              >
                                Gửi yêu cầu
                              </Text>
                              <Ionicons
                                name="arrow-forward"
                                size={20}
                                color="#FFFFFF"
                                style={{ marginLeft: 8 }}
                              />
                            </View>
                          )}
                        </LinearGradient>
                      </TouchableOpacity>

                      {/* Back to Login */}
                      <View style={styles.registerContainer}>
                        <TouchableOpacity
                          onPress={() => {
                            Haptics.impactAsync(
                              Haptics.ImpactFeedbackStyle.Light
                            );
                            navigation.navigate("Login");
                          }}
                        >
                          <Text style={styles.forgotPasswordText}>
                            Quay lại đăng nhập
                          </Text>
                        </TouchableOpacity>
                      </View>
                    </View>
                  </BlurView>
                </Animated.View>
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
                <BlurView intensity={60} tint="dark" style={styles.successBlur}>
                  <View style={styles.successContent}>
                    <View style={styles.successIconContainer}>
                      <MaterialCommunityIcons
                        name="email-check-outline"
                        size={60}
                        color="#4CAF50"
                      />
                    </View>
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
                  </View>
                </BlurView>
              </Animated.View>
            )}
          </ScrollView>
        </KeyboardAvoidingView>
      </SafeAreaView>
    </View>
  );
}
