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
import { Ionicons } from "@expo/vector-icons";
import { LinearGradient } from "expo-linear-gradient";
import { BlurView } from "expo-blur";
import * as Haptics from "expo-haptics";
import styles from "../../styles/AuthStyles";

const { width, height } = Dimensions.get("window");

export default function RegisterScreen({ navigation }) {
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    phone: "",
    password: "",
    confirmPassword: "",
  });
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [fullNameFocused, setFullNameFocused] = useState(false);
  const [emailFocused, setEmailFocused] = useState(false);
  const [phoneFocused, setPhoneFocused] = useState(false);
  const [passwordFocused, setPasswordFocused] = useState(false);
  const [confirmPasswordFocused, setConfirmPasswordFocused] = useState(false);
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

  const handleRegister = async () => {
    if (
      !formData.fullName ||
      !formData.email ||
      !formData.phone ||
      !formData.password ||
      !formData.confirmPassword
    ) {
      Alert.alert("Lỗi", "Vui lòng điền đầy đủ thông tin");
      Haptics.notificationAsync(Haptics.NotificationFeedbackType.Error);
      return;
    }

    if (formData.password !== formData.confirmPassword) {
      Alert.alert("Lỗi", "Mật khẩu không khớp");
      Haptics.notificationAsync(Haptics.NotificationFeedbackType.Error);
      return;
    }

    try {
      setIsLoading(true);
      Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium);

      // Giả lập đăng ký thành công
      setTimeout(() => {
        setIsLoading(false);
        Alert.alert(
          "Đăng ký thành công",
          "Vui lòng đăng nhập với tài khoản của bạn",
          [
            {
              text: "OK",
              onPress: () => navigation.navigate("Login"),
            },
          ]
        );
      }, 1500);
    } catch (error) {
      setIsLoading(false);
      Alert.alert(
        "Lỗi đăng ký",
        "Không thể tạo tài khoản. Vui lòng thử lại sau."
      );
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
            {/* Header with Back Button */}
            <TouchableOpacity
              style={styles.backButton}
              onPress={() => {
                Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
                navigation.goBack();
              }}
            >
              <Ionicons name="arrow-back" size={24} color="#FFFFFF" />
            </TouchableOpacity>

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
                Tạo tài khoản mới
              </Animated.Text>
              <Text style={styles.subText}>
                Đăng ký để bắt đầu trao đổi thiết bị
              </Text>
            </Animated.View>

            {/* Registration Form */}
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
                  {/* Full Name Input */}
                  <View
                    style={[
                      styles.inputContainer,
                      fullNameFocused && [
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
                        name="person-outline"
                        size={20}
                        color="#FFFFFF"
                      />
                    </View>
                    <TextInput
                      style={styles.input}
                      placeholder="Họ và tên"
                      value={formData.fullName}
                      onChangeText={(text) =>
                        setFormData({ ...formData, fullName: text })
                      }
                      onFocus={() => setFullNameFocused(true)}
                      onBlur={() => setFullNameFocused(false)}
                      placeholderTextColor="rgba(255,255,255,0.6)"
                    />
                  </View>

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
                      value={formData.email}
                      onChangeText={(text) =>
                        setFormData({ ...formData, email: text })
                      }
                      keyboardType="email-address"
                      autoCapitalize="none"
                      onFocus={() => setEmailFocused(true)}
                      onBlur={() => setEmailFocused(false)}
                      placeholderTextColor="rgba(255,255,255,0.6)"
                    />
                  </View>

                  {/* Phone Input */}
                  <View
                    style={[
                      styles.inputContainer,
                      phoneFocused && [
                        styles.inputContainerFocused,
                        {
                          borderColor: "rgba(25, 118, 210, 0.6)",
                          shadowColor: "#1976D2",
                        },
                      ],
                    ]}
                  >
                    <View style={styles.iconContainer}>
                      <Ionicons name="call-outline" size={20} color="#FFFFFF" />
                    </View>
                    <TextInput
                      style={styles.input}
                      placeholder="Số điện thoại"
                      value={formData.phone}
                      onChangeText={(text) =>
                        setFormData({ ...formData, phone: text })
                      }
                      keyboardType="phone-pad"
                      onFocus={() => setPhoneFocused(true)}
                      onBlur={() => setPhoneFocused(false)}
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
                      value={formData.password}
                      onChangeText={(text) =>
                        setFormData({ ...formData, password: text })
                      }
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

                  {/* Confirm Password Input */}
                  <View
                    style={[
                      styles.inputContainer,
                      confirmPasswordFocused && [
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
                      placeholder="Xác nhận mật khẩu"
                      value={formData.confirmPassword}
                      onChangeText={(text) =>
                        setFormData({ ...formData, confirmPassword: text })
                      }
                      secureTextEntry={!showConfirmPassword}
                      onFocus={() => setConfirmPasswordFocused(true)}
                      onBlur={() => setConfirmPasswordFocused(false)}
                      placeholderTextColor="rgba(255,255,255,0.6)"
                    />
                    <TouchableOpacity
                      onPress={() => {
                        Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
                        setShowConfirmPassword(!showConfirmPassword);
                      }}
                      style={styles.eyeIcon}
                    >
                      <Ionicons
                        name={
                          showConfirmPassword
                            ? "eye-outline"
                            : "eye-off-outline"
                        }
                        size={20}
                        color="#FFFFFF"
                      />
                    </TouchableOpacity>
                  </View>

                  {/* Register Button */}
                  <TouchableOpacity
                    activeOpacity={0.8}
                    onPress={handleRegister}
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
                            Đăng ký
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

                  {/* Login Link */}
                  <View style={styles.registerContainer}>
                    <Text style={styles.noAccountText}>Đã có tài khoản? </Text>
                    <TouchableOpacity
                      onPress={() => {
                        Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
                        navigation.navigate("Login");
                      }}
                    >
                      <Text style={styles.registerText}>Đăng nhập</Text>
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
