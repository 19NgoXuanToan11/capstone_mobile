import React, { useState, useEffect, useRef } from "react";
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
  StatusBar,
  ActivityIndicator,
  Animated,
  ActionSheetIOS,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Ionicons, MaterialCommunityIcons } from "@expo/vector-icons";
import { LinearGradient } from "expo-linear-gradient";
import { BlurView } from "expo-blur";
import * as Haptics from "expo-haptics";
import * as ImagePicker from "expo-image-picker";
import { useUser } from "../../context/UserContext";
import styles from "../../styles/ProfileStyles";

export default function EditProfileScreen({ navigation }) {
  const { userData: globalUserData, updateUserData } = useUser();
  const [isLoading, setIsLoading] = useState(false);
  const [userData, setUserData] = useState({
    fullName: "",
    email: "",
    phone: "",
    address: "",
    profileImage: null,
  });
  const [fullNameFocused, setFullNameFocused] = useState(false);
  const [emailFocused, setEmailFocused] = useState(false);
  const [phoneFocused, setPhoneFocused] = useState(false);
  const [addressFocused, setAddressFocused] = useState(false);

  // Animation values
  const fadeAnim = useRef(new Animated.Value(0)).current;
  const slideAnim = useRef(new Animated.Value(30)).current;

  useEffect(() => {
    // Animate elements when component mounts
    Animated.parallel([
      Animated.timing(fadeAnim, {
        toValue: 1,
        duration: 600,
        useNativeDriver: true,
      }),
      Animated.timing(slideAnim, {
        toValue: 0,
        duration: 600,
        useNativeDriver: true,
      }),
    ]).start();

    // Sử dụng dữ liệu từ context
    setUserData(globalUserData);

    // Yêu cầu quyền truy cập thư viện ảnh
    (async () => {
      if (Platform.OS !== "web") {
        const { status } =
          await ImagePicker.requestMediaLibraryPermissionsAsync();
        if (status !== "granted") {
          Alert.alert(
            "Thông báo",
            "Cần quyền truy cập thư viện ảnh để thay đổi ảnh đại diện"
          );
        }
      }
    })();
  }, [globalUserData]);

  // Hàm chọn ảnh từ thư viện
  const pickImage = async () => {
    try {
      Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);

      let result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
        allowsEditing: true,
        aspect: [1, 1],
        quality: 0.7,
      });

      if (!result.canceled && result.assets && result.assets.length > 0) {
        const selectedImage = result.assets[0];
        setUserData({ ...userData, profileImage: selectedImage.uri });
      }
    } catch (error) {
      console.log("Lỗi khi chọn ảnh:", error);
      Alert.alert("Lỗi", "Không thể chọn ảnh. Vui lòng thử lại sau.");
    }
  };

  // Hàm chụp ảnh từ camera
  const takePhoto = async () => {
    try {
      Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);

      const { status } = await ImagePicker.requestCameraPermissionsAsync();
      if (status !== "granted") {
        Alert.alert(
          "Thông báo",
          "Cần quyền truy cập camera để chụp ảnh đại diện"
        );
        return;
      }

      let result = await ImagePicker.launchCameraAsync({
        allowsEditing: true,
        aspect: [1, 1],
        quality: 0.7,
      });

      if (!result.canceled && result.assets && result.assets.length > 0) {
        const selectedImage = result.assets[0];
        setUserData({ ...userData, profileImage: selectedImage.uri });
      }
    } catch (error) {
      console.log("Lỗi khi chụp ảnh:", error);
      Alert.alert("Lỗi", "Không thể chụp ảnh. Vui lòng thử lại sau.");
    }
  };

  // Thêm hàm hiển thị tùy chọn chọn ảnh
  const showImageOptions = () => {
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);

    if (Platform.OS === "ios") {
      ActionSheetIOS.showActionSheetWithOptions(
        {
          options: ["Hủy", "Chọn từ thư viện", "Chụp ảnh mới"],
          cancelButtonIndex: 0,
        },
        (buttonIndex) => {
          if (buttonIndex === 1) {
            pickImage();
          } else if (buttonIndex === 2) {
            takePhoto();
          }
        }
      );
    } else {
      // Trên Android, bạn có thể sử dụng thư viện như react-native-action-sheet hoặc tự tạo modal
      Alert.alert("Chọn ảnh đại diện", "Vui lòng chọn nguồn ảnh", [
        { text: "Hủy", style: "cancel" },
        { text: "Chọn từ thư viện", onPress: pickImage },
        { text: "Chụp ảnh mới", onPress: takePhoto },
      ]);
    }
  };

  const handleSaveProfile = async () => {
    if (!userData.fullName || !userData.email || !userData.phone) {
      Alert.alert("Lỗi", "Vui lòng điền đầy đủ thông tin cần thiết");
      Haptics.notificationAsync(Haptics.NotificationFeedbackType.Error);
      return;
    }

    try {
      setIsLoading(true);
      Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium);

      // Cập nhật thông tin người dùng thông qua context
      const success = await updateUserData(userData);

      if (success) {
        setIsLoading(false);
        Alert.alert("Thành công", "Thông tin hồ sơ đã được cập nhật", [
          {
            text: "OK",
            onPress: () => navigation.goBack(),
          },
        ]);
      } else {
        throw new Error("Không thể cập nhật thông tin");
      }
    } catch (error) {
      setIsLoading(false);
      Alert.alert(
        "Lỗi",
        "Không thể cập nhật thông tin hồ sơ. Vui lòng thử lại sau."
      );
      console.log("Lỗi khi lưu thông tin người dùng:", error);
    }
  };

  return (
    <View style={styles.container}>
      <StatusBar
        barStyle="light-content"
        backgroundColor="transparent"
        translucent
      />

      {/* Background Gradient */}
      <LinearGradient
        colors={["#0A1929", "#0F2942", "#0A1929"]}
        style={styles.backgroundGradient}
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
            <View style={styles.header}>
              <TouchableOpacity
                style={styles.backButton}
                onPress={() => {
                  Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
                  navigation.goBack();
                }}
              >
                <Ionicons name="arrow-back" size={24} color="#FFFFFF" />
              </TouchableOpacity>
              <Text style={styles.headerTitle}>Chỉnh sửa hồ sơ</Text>
              <View style={{ width: 24 }} />
            </View>

            {/* Avatar Section - Outside the form for better visual */}
            <Animated.View
              style={[
                styles.avatarContainerLarge,
                {
                  opacity: fadeAnim,
                  transform: [{ translateY: slideAnim }],
                },
              ]}
            >
              <View style={styles.avatarWrapper}>
                <Image
                  source={
                    userData.profileImage
                      ? { uri: userData.profileImage }
                      : require("../../../assets/profile/avatar.png")
                  }
                  style={styles.avatarLarge}
                />
                <TouchableOpacity
                  style={styles.changeAvatarButtonLarge}
                  onPress={showImageOptions}
                >
                  <Ionicons name="camera" size={24} color="#FFFFFF" />
                </TouchableOpacity>
              </View>
            </Animated.View>

            {/* Profile Form */}
            <Animated.View
              style={[
                styles.formContainerModern,
                {
                  opacity: fadeAnim,
                  transform: [{ translateY: slideAnim }],
                },
              ]}
            >
              {/* Full Name Input */}
              <View
                style={[
                  styles.inputContainerModern,
                  fullNameFocused && styles.inputContainerFocusedModern,
                ]}
              >
                <View style={styles.iconContainerModern}>
                  <Ionicons name="person-outline" size={22} color="#FFFFFF" />
                </View>
                <TextInput
                  style={styles.inputModern}
                  placeholder="Họ và tên"
                  value={userData.fullName}
                  onChangeText={(text) =>
                    setUserData({ ...userData, fullName: text })
                  }
                  onFocus={() => setFullNameFocused(true)}
                  onBlur={() => setFullNameFocused(false)}
                  placeholderTextColor="rgba(255,255,255,0.6)"
                />
              </View>

              {/* Email Input */}
              <View
                style={[
                  styles.inputContainerModern,
                  emailFocused && styles.inputContainerFocusedModern,
                ]}
              >
                <View style={styles.iconContainerModern}>
                  <Ionicons name="mail-outline" size={22} color="#FFFFFF" />
                </View>
                <TextInput
                  style={styles.inputModern}
                  placeholder="Email"
                  value={userData.email}
                  onChangeText={(text) =>
                    setUserData({ ...userData, email: text })
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
                  styles.inputContainerModern,
                  phoneFocused && styles.inputContainerFocusedModern,
                ]}
              >
                <View style={styles.iconContainerModern}>
                  <Ionicons name="call-outline" size={22} color="#FFFFFF" />
                </View>
                <TextInput
                  style={styles.inputModern}
                  placeholder="Số điện thoại"
                  value={userData.phone}
                  onChangeText={(text) =>
                    setUserData({ ...userData, phone: text })
                  }
                  keyboardType="phone-pad"
                  onFocus={() => setPhoneFocused(true)}
                  onBlur={() => setPhoneFocused(false)}
                  placeholderTextColor="rgba(255,255,255,0.6)"
                />
              </View>

              {/* Address Input */}
              <View
                style={[
                  styles.inputContainerModern,
                  addressFocused && styles.inputContainerFocusedModern,
                ]}
              >
                <View style={styles.iconContainerModern}>
                  <Ionicons name="location-outline" size={22} color="#FFFFFF" />
                </View>
                <TextInput
                  style={styles.inputModern}
                  placeholder="Địa chỉ"
                  value={userData.address}
                  onChangeText={(text) =>
                    setUserData({ ...userData, address: text })
                  }
                  onFocus={() => setAddressFocused(true)}
                  onBlur={() => setAddressFocused(false)}
                  placeholderTextColor="rgba(255,255,255,0.6)"
                />
              </View>

              {/* Save Button */}
              <TouchableOpacity
                activeOpacity={0.8}
                onPress={handleSaveProfile}
                disabled={isLoading}
                style={styles.saveButtonContainer}
              >
                <LinearGradient
                  colors={["#1976D2", "#1565C0", "#0D47A1"]}
                  start={{ x: 0, y: 0 }}
                  end={{ x: 1, y: 0 }}
                  style={styles.saveButtonModern}
                >
                  {isLoading ? (
                    <ActivityIndicator color="#FFFFFF" size="small" />
                  ) : (
                    <Text style={styles.saveButtonTextModern}>
                      Lưu thay đổi
                    </Text>
                  )}
                </LinearGradient>
              </TouchableOpacity>
            </Animated.View>
          </ScrollView>
        </KeyboardAvoidingView>
      </SafeAreaView>
    </View>
  );
}
