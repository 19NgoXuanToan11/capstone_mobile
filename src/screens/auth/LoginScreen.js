import React, { useState, useContext, useRef, useEffect } from "react";
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
import { Ionicons } from "@expo/vector-icons";
import { LinearGradient } from "expo-linear-gradient";
import { BlurView } from "expo-blur";
import * as Haptics from "expo-haptics";
import styles from "../../styles/AuthStyles";
import logo from "../../../assets/logo.png";
import { AuthContext } from "../../../App";

const { width, height } = Dimensions.get("window");

export default function LoginScreen({ navigation, route }) {
  const { signIn } = useContext(AuthContext);
  const returnScreen = route.params?.returnScreen;
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [emailFocused, setEmailFocused] = useState(false);
  const [passwordFocused, setPasswordFocused] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  // Animation values
  const fadeAnim = useRef(new Animated.Value(0)).current;
  const slideAnim = useRef(new Animated.Value(50)).current;
  const logoScale = useRef(new Animated.Value(0.8)).current;

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
      Animated.spring(logoScale, {
        toValue: 1,
        friction: 8,
        tension: 40,
        useNativeDriver: true,
      }),
    ]).start();
  }, []);

  const handleLogin = async () => {
    if (!email || !password) {
      Alert.alert("Lỗi", "Vui lòng nhập đầy đủ thông tin");
      Haptics.notificationAsync(Haptics.NotificationFeedbackType.Error);
      return;
    }

    try {
      setIsLoading(true);
      Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium);

      // Giả sử đăng nhập thành công và nhận được token
      const token = "example_token";
      await signIn(token);

      // Quay lại màn hình trước đó nếu có
      if (returnScreen) {
        navigation.navigate(returnScreen);
      } else {
        navigation.navigate("Main");
      }
    } catch (error) {
      Alert.alert("Lỗi đăng nhập", "Tài khoản hoặc mật khẩu không chính xác");
    } finally {
      setIsLoading(false);
    }
  };

  const handleForgotPassword = () => {
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
    navigation.navigate("ForgotPassword");
  };

  const handleRegister = () => {
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
    navigation.navigate("Register");
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
            {/* Header with Logo */}
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
                Chào mừng trở lại!
              </Animated.Text>
              <Text style={styles.subText}>
                Đăng nhập để tiếp tục trao đổi thiết bị
              </Text>
            </Animated.View>

            {/* Login Form */}
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
                      <Ionicons name="mail-outline" size={20} color="#FFFFFF" />
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
                    />
                  </View>

                  {/* Password Input */}
                  <View
                    style={[
                      styles.inputContainer,
                      passwordFocused && [
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
                        name="lock-closed-outline"
                        size={20}
                        color="#FFFFFF"
                      />
                    </View>
                    <TextInput
                      style={styles.input}
                      placeholder="Mật khẩu"
                      value={password}
                      onChangeText={setPassword}
                      secureTextEntry={!showPassword}
                      onFocus={() => setPasswordFocused(true)}
                      onBlur={() => setPasswordFocused(false)}
                      placeholderTextColor="rgba(255,255,255,0.6)"
                    />
                    <TouchableOpacity
                      onPress={() => {
                        Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
                        setShowPassword(!showPassword);
                      }}
                      style={styles.eyeIcon}
                    >
                      <Ionicons
                        name={showPassword ? "eye-outline" : "eye-off-outline"}
                        size={20}
                        color="#FFFFFF"
                      />
                    </TouchableOpacity>
                  </View>

                  {/* Forgot Password */}
                  <TouchableOpacity
                    onPress={handleForgotPassword}
                    style={styles.forgotPassword}
                  >
                    <Text
                      style={[styles.forgotPasswordText, { color: "#1976D2" }]}
                    >
                      Quên mật khẩu?
                    </Text>
                  </TouchableOpacity>

                  {/* Login Button */}
                  <TouchableOpacity
                    activeOpacity={0.8}
                    onPress={handleLogin}
                    disabled={isLoading}
                  >
                    <LinearGradient
                      colors={["#1976D2", "#1565C0", "#0D47A1"]}
                      start={{ x: 0, y: 0 }}
                      end={{ x: 1, y: 0 }}
                      style={styles.loginButton}
                    >
                      <View style={styles.loginButtonGradient}>
                        {isLoading ? (
                          <ActivityIndicator color="#FFF" size="small" />
                        ) : (
                          <Animated.View
                            style={{
                              flexDirection: "row",
                              alignItems: "center",
                              justifyContent: "center",
                            }}
                          >
                            <Text
                              style={[
                                styles.loginButtonText,
                                { textShadowColor: "rgba(13, 71, 161, 0.6)" },
                              ]}
                            >
                              Đăng nhập
                            </Text>
                            <Animated.View style={{ marginLeft: 8 }}>
                              <Ionicons
                                name="arrow-forward-outline"
                                size={18}
                                color="#FFF"
                              />
                            </Animated.View>
                          </Animated.View>
                        )}
                      </View>
                    </LinearGradient>
                  </TouchableOpacity>

                  {/* Social Login */}
                  <View style={styles.socialLogin}>
                    <View style={styles.divider}>
                      <View style={styles.dividerLine} />
                      <Text style={styles.orText}>Hoặc đăng nhập với</Text>
                      <View style={styles.dividerLine} />
                    </View>

                    <View style={styles.socialButtons}>
                      <TouchableOpacity
                        style={[
                          styles.socialButton,
                          {
                            backgroundColor: "rgba(25, 118, 210, 0.1)",
                          },
                        ]}
                        onPress={() =>
                          Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light)
                        }
                      >
                        <Ionicons
                          name="logo-google"
                          size={20}
                          color="#FFFFFF"
                        />
                      </TouchableOpacity>

                      <TouchableOpacity
                        style={[
                          styles.socialButton,
                          {
                            backgroundColor: "rgba(25, 118, 210, 0.1)",
                          },
                        ]}
                        onPress={() =>
                          Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light)
                        }
                      >
                        <Ionicons
                          name="logo-facebook"
                          size={20}
                          color="#FFFFFF"
                        />
                      </TouchableOpacity>

                      <TouchableOpacity
                        style={[
                          styles.socialButton,
                          {
                            backgroundColor: "rgba(25, 118, 210, 0.1)",
                          },
                        ]}
                        onPress={() =>
                          Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light)
                        }
                      >
                        <Ionicons name="logo-apple" size={20} color="#FFFFFF" />
                      </TouchableOpacity>
                    </View>
                  </View>

                  {/* Register Link */}
                  <View style={styles.registerContainer}>
                    <Text style={styles.noAccountText}>
                      Chưa có tài khoản?{" "}
                    </Text>
                    <TouchableOpacity onPress={handleRegister}>
                      <Text style={[styles.registerText, { color: "#1976D2" }]}>
                        Đăng ký ngay
                      </Text>
                    </TouchableOpacity>
                  </View>
                </View>
              </BlurView>
            </Animated.View>
          </ScrollView>
        </KeyboardAvoidingView>
      </SafeAreaView>
    </View>
  );
}
