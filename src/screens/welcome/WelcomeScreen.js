import React, { useEffect } from "react";
import {
  View,
  Text,
  StyleSheet,
  Image,
  Dimensions,
  StatusBar,
  Animated,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

const { width, height } = Dimensions.get("window");

export default function WelcomeScreen({ navigation }) {
  // Animation values
  const fadeAnim = React.useRef(new Animated.Value(0)).current;
  const scaleAnim = React.useRef(new Animated.Value(0.9)).current;

  useEffect(() => {
    // Start animations when component mounts
    Animated.parallel([
      Animated.timing(fadeAnim, {
        toValue: 1,
        duration: 1000,
        useNativeDriver: true,
      }),
      Animated.timing(scaleAnim, {
        toValue: 1,
        duration: 1000,
        useNativeDriver: true,
      }),
    ]).start();

    // Navigate to OnBoarding screen after 3 seconds
    const timer = setTimeout(() => {
      navigation.replace("OnBoarding");
    }, 3000);

    return () => clearTimeout(timer);
  }, []);

  return (
    <View style={styles.container}>
      <StatusBar
        translucent
        backgroundColor="transparent"
        barStyle="light-content"
      />

      {/* Background với hiệu ứng hiện đại */}
      <View style={styles.background}>
        {/* Các lớp overlay tạo hiệu ứng sâu */}
        <View style={styles.backgroundOverlay} />

        {/* Các đường trang trí */}
        <View style={styles.decorLine1} />
        <View style={styles.decorLine2} />
        <View style={styles.decorLine3} />

        {/* Các điểm sáng */}
        <View style={styles.glowDot1} />
        <View style={styles.glowDot2} />
        <View style={styles.glowDot3} />
      </View>

      {/* Decorative elements */}
      <View style={styles.decorCircle1} />
      <View style={styles.decorCircle2} />
      <View style={styles.decorCircle3} />

      <SafeAreaView style={styles.safeArea}>
        {/* Logo animation */}
        <Animated.View
          style={[
            styles.logoContainer,
            {
              opacity: fadeAnim,
              transform: [{ scale: scaleAnim }],
            },
          ]}
        >
          <Image
            source={require("../../../assets/white_on_trans.png")}
            style={styles.logo}
            resizeMode="contain"
          />
        </Animated.View>
      </SafeAreaView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  background: {
    position: "absolute",
    left: 0,
    right: 0,
    top: 0,
    bottom: 0,
    backgroundColor: "#0A1128", // Màu nền tối hơn, gần như đen xanh
  },
  backgroundOverlay: {
    position: "absolute",
    left: 0,
    right: 0,
    top: 0,
    bottom: 0,
    backgroundColor: "rgba(25, 47, 89, 0.4)", // Lớp phủ xanh dương nhạt
  },
  decorLine1: {
    position: "absolute",
    width: width * 1.5,
    height: 1,
    backgroundColor: "rgba(99, 179, 237, 0.1)",
    transform: [{ rotate: "45deg" }],
    top: height * 0.2,
  },
  decorLine2: {
    position: "absolute",
    width: width * 1.5,
    height: 1,
    backgroundColor: "rgba(99, 179, 237, 0.1)",
    transform: [{ rotate: "-45deg" }],
    top: height * 0.4,
  },
  decorLine3: {
    position: "absolute",
    width: width * 1.5,
    height: 1,
    backgroundColor: "rgba(99, 179, 237, 0.1)",
    transform: [{ rotate: "30deg" }],
    top: height * 0.7,
  },
  glowDot1: {
    position: "absolute",
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: "rgba(56, 189, 248, 0.8)",
    top: height * 0.15,
    left: width * 0.2,
    shadowColor: "#38BDF8",
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.8,
    shadowRadius: 10,
    elevation: 5,
  },
  glowDot2: {
    position: "absolute",
    width: 12,
    height: 12,
    borderRadius: 6,
    backgroundColor: "rgba(56, 189, 248, 0.6)",
    bottom: height * 0.25,
    right: width * 0.15,
    shadowColor: "#38BDF8",
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.8,
    shadowRadius: 15,
    elevation: 5,
  },
  glowDot3: {
    position: "absolute",
    width: 6,
    height: 6,
    borderRadius: 3,
    backgroundColor: "rgba(56, 189, 248, 0.7)",
    top: height * 0.6,
    left: width * 0.7,
    shadowColor: "#38BDF8",
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.8,
    shadowRadius: 8,
    elevation: 5,
  },
  safeArea: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  logoContainer: {
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 30,
  },
  textContainer: {
    alignItems: "center",
    justifyContent: "center",
    width: width * 0.85,
  },
  logo: {
    width: 180,
    height: 180,
  },
  title: {
    fontSize: 48, // Tăng kích thước
    fontWeight: "bold",
    color: "#FFFFFF",
    marginBottom: 12,
    textAlign: "center",
    letterSpacing: 2, // Tăng khoảng cách chữ
    textShadowColor: "rgba(56, 189, 248, 0.5)",
    textShadowOffset: { width: 0, height: 0 },
    textShadowRadius: 10,
  },
  subtitle: {
    fontSize: 18,
    color: "#E2E8F0",
    textAlign: "center",
    paddingHorizontal: 20,
    lineHeight: 26,
  },
  tagline: {
    marginTop: 30,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    flexWrap: "wrap",
  },
  taglineDot: {
    width: 4,
    height: 4,
    borderRadius: 2,
    backgroundColor: "#38BDF8",
    marginHorizontal: 8,
  },
  taglineText: {
    color: "#94A3B8",
    fontSize: 14,
    fontWeight: "600",
  },
  versionText: {
    position: "absolute",
    bottom: 30,
    color: "rgba(255, 255, 255, 0.5)",
    fontSize: 12,
  },
  decorCircle1: {
    position: "absolute",
    width: 300,
    height: 300,
    borderRadius: 150,
    backgroundColor: "rgba(56, 189, 248, 0.03)", // Màu xanh dương nhạt
    top: -100,
    right: -100,
  },
  decorCircle2: {
    position: "absolute",
    width: 200,
    height: 200,
    borderRadius: 100,
    backgroundColor: "rgba(56, 189, 248, 0.04)", // Màu xanh dương nhạt
    bottom: 100,
    left: -50,
    borderWidth: 1,
    borderColor: "rgba(56, 189, 248, 0.1)",
  },
  decorCircle3: {
    position: "absolute",
    width: 150,
    height: 150,
    borderRadius: 75,
    backgroundColor: "rgba(56, 189, 248, 0.02)", // Màu xanh dương nhạt
    bottom: -50,
    right: 20,
  },
});
