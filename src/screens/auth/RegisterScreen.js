import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  ScrollView,
  KeyboardAvoidingView,
  Platform,
  Alert,
  Animated,
  Dimensions,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Ionicons, MaterialIcons } from "@expo/vector-icons";
import { LinearGradient } from "expo-linear-gradient";
import * as Haptics from "expo-haptics";
import styles from "../../styles/AuthStyles";

const { width } = Dimensions.get("window");

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
  const [focusedInput, setFocusedInput] = useState(null);

  // Animation values
  const fadeAnim = useState(new Animated.Value(0))[0];
  const slideAnim = useState(new Animated.Value(30))[0];

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

  const handleRegister = () => {
    if (
      !formData.fullName ||
      !formData.email ||
      !formData.phone ||
      !formData.password ||
      !formData.confirmPassword
    ) {
      Haptics.notificationAsync(Haptics.NotificationFeedbackType.Error);
      Alert.alert("Lỗi", "Vui lòng điền đầy đủ thông tin");
      return;
    }

    if (formData.password !== formData.confirmPassword) {
      Haptics.notificationAsync(Haptics.NotificationFeedbackType.Error);
      Alert.alert("Lỗi", "Mật khẩu không khớp");
      return;
    }

    Haptics.notificationAsync(Haptics.NotificationFeedbackType.Success);
    navigation.navigate("Login");
  };

  const handleFocus = (inputName) => {
    setFocusedInput(inputName);
  };

  const handleBlur = () => {
    setFocusedInput(null);
  };

  return (
    <SafeAreaView style={styles.container}>
      <LinearGradient
        colors={["#0A1929", "#0F2942", "#0A1929"]}
        style={styles.container}
      >
        <KeyboardAvoidingView
          behavior={Platform.OS === "ios" ? "padding" : "height"}
          style={styles.container}
        >
          <ScrollView contentContainerStyle={styles.scrollContent}>
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
                styles.header,
                {
                  opacity: fadeAnim,
                  transform: [{ translateY: slideAnim }],
                },
              ]}
            >
              <View
                style={[
                  styles.iconCircle,
                  {
                    backgroundColor: "rgba(25, 118, 210, 0.2)",
                    borderColor: "rgba(25, 118, 210, 0.5)",
                  },
                ]}
              >
                <MaterialIcons name="person-add" size={40} color="#1976D2" />
              </View>
              <Text style={[styles.welcomeText, { color: "#FFFFFF" }]}>
                Tạo tài khoản mới
              </Text>
              <Text
                style={[styles.subText, { color: "rgba(255, 255, 255, 0.8)" }]}
              >
                Đăng ký để bắt đầu trao đổi thiết bị
              </Text>
            </Animated.View>

            <Animated.View
              style={[
                styles.form,
                {
                  opacity: fadeAnim,
                  transform: [{ translateY: slideAnim }],
                },
              ]}
            >
              <View
                style={[
                  styles.inputContainer,
                  focusedInput === "fullName" && [
                    styles.inputContainerFocused,
                    {
                      borderColor: "rgba(25, 118, 210, 0.6)",
                      shadowColor: "#1976D2",
                    },
                  ],
                ]}
              >
                <View style={styles.iconContainer}>
                  <Ionicons name="person-outline" size={20} color="#FFFFFF" />
                </View>
                <TextInput
                  style={styles.input}
                  placeholder="Họ và tên"
                  placeholderTextColor="rgba(255, 255, 255, 0.5)"
                  value={formData.fullName}
                  onChangeText={(text) =>
                    setFormData({ ...formData, fullName: text })
                  }
                  onFocus={() => handleFocus("fullName")}
                  onBlur={handleBlur}
                />
              </View>

              <View
                style={[
                  styles.inputContainer,
                  focusedInput === "email" && [
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
                  placeholderTextColor="rgba(255, 255, 255, 0.5)"
                  value={formData.email}
                  onChangeText={(text) =>
                    setFormData({ ...formData, email: text })
                  }
                  keyboardType="email-address"
                  autoCapitalize="none"
                  onFocus={() => handleFocus("email")}
                  onBlur={handleBlur}
                />
              </View>

              <View
                style={[
                  styles.inputContainer,
                  focusedInput === "phone" && [
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
                  placeholderTextColor="rgba(255, 255, 255, 0.5)"
                  value={formData.phone}
                  onChangeText={(text) =>
                    setFormData({ ...formData, phone: text })
                  }
                  keyboardType="phone-pad"
                  onFocus={() => handleFocus("phone")}
                  onBlur={handleBlur}
                />
              </View>

              <View
                style={[
                  styles.inputContainer,
                  focusedInput === "password" && [
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
                  placeholderTextColor="rgba(255, 255, 255, 0.5)"
                  value={formData.password}
                  onChangeText={(text) =>
                    setFormData({ ...formData, password: text })
                  }
                  secureTextEntry={!showPassword}
                  onFocus={() => handleFocus("password")}
                  onBlur={handleBlur}
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

              <View
                style={[
                  styles.inputContainer,
                  focusedInput === "confirmPassword" && [
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
                  placeholderTextColor="rgba(255, 255, 255, 0.5)"
                  value={formData.confirmPassword}
                  onChangeText={(text) =>
                    setFormData({ ...formData, confirmPassword: text })
                  }
                  secureTextEntry={!showConfirmPassword}
                  onFocus={() => handleFocus("confirmPassword")}
                  onBlur={handleBlur}
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
                      showConfirmPassword ? "eye-outline" : "eye-off-outline"
                    }
                    size={20}
                    color="#FFFFFF"
                  />
                </TouchableOpacity>
              </View>

              <TouchableOpacity activeOpacity={0.8} onPress={handleRegister}>
                <LinearGradient
                  colors={["#1976D2", "#1565C0", "#0D47A1"]}
                  start={{ x: 0, y: 0 }}
                  end={{ x: 1, y: 0 }}
                  style={[styles.loginButton, { marginBottom: 15 }]}
                >
                  <View style={styles.loginButtonGradient}>
                    <Text
                      style={[
                        styles.loginButtonText,
                        { textShadowColor: "rgba(13, 71, 161, 0.6)" },
                      ]}
                    >
                      Đăng ký
                    </Text>
                  </View>
                </LinearGradient>
              </TouchableOpacity>

              <View style={styles.loginContainer}>
                <Text style={styles.haveAccountText}>Đã có tài khoản? </Text>
                <TouchableOpacity
                  onPress={() => {
                    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
                    navigation.navigate("Login");
                  }}
                >
                  <Text style={[styles.loginLink, { color: "#1976D2" }]}>
                    Đăng nhập
                  </Text>
                </TouchableOpacity>
              </View>
            </Animated.View>
          </ScrollView>
        </KeyboardAvoidingView>
      </LinearGradient>
    </SafeAreaView>
  );
}
