import React, { useEffect } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Animated,
  Easing,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Ionicons } from "@expo/vector-icons";
import { LinearGradient } from "expo-linear-gradient";
import { COLORS, SHADOW } from "../../components/theme";

export default function PostSuccessScreen({ navigation, route }) {
  const { productName } = route.params || { productName: "Sản phẩm" };

  const scaleAnim = new Animated.Value(0);
  const opacityAnim = new Animated.Value(0);

  useEffect(() => {
    Animated.parallel([
      Animated.timing(scaleAnim, {
        toValue: 1,
        duration: 500,
        easing: Easing.elastic(1),
        useNativeDriver: true,
      }),
      Animated.timing(opacityAnim, {
        toValue: 1,
        duration: 800,
        useNativeDriver: true,
      }),
    ]).start();
  }, []);

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.content}>
        <Animated.View
          style={[
            styles.successIconContainer,
            {
              transform: [{ scale: scaleAnim }],
              opacity: opacityAnim,
            },
          ]}
        >
          <LinearGradient
            colors={[COLORS.primary, `${COLORS.primary}CC`]}
            style={styles.successIconGradient}
          >
            <Ionicons name="checkmark" size={80} color="#fff" />
          </LinearGradient>
        </Animated.View>

        <Animated.View style={{ opacity: opacityAnim }}>
          <Text style={styles.successTitle}>Đăng tin thành công!</Text>
          <Text style={styles.successMessage}>
            Sản phẩm <Text style={styles.productName}>{productName}</Text> của
            bạn đã được đăng thành công và đang chờ duyệt.
          </Text>

          <View style={styles.infoContainer}>
            <View style={styles.infoItem}>
              <Ionicons name="eye-outline" size={24} color={COLORS.primary} />
              <View style={styles.infoTextContainer}>
                <Text style={styles.infoTitle}>Hiển thị</Text>
                <Text style={styles.infoDescription}>
                  Sản phẩm sẽ được hiển thị trong vòng 24 giờ
                </Text>
              </View>
            </View>

            <View style={styles.infoItem}>
              <Ionicons
                name="notifications-outline"
                size={24}
                color={COLORS.primary}
              />
              <View style={styles.infoTextContainer}>
                <Text style={styles.infoTitle}>Thông báo</Text>
                <Text style={styles.infoDescription}>
                  Bạn sẽ nhận được thông báo khi có người quan tâm
                </Text>
              </View>
            </View>

            <View style={styles.infoItem}>
              <Ionicons
                name="stats-chart-outline"
                size={24}
                color={COLORS.primary}
              />
              <View style={styles.infoTextContainer}>
                <Text style={styles.infoTitle}>Thống kê</Text>
                <Text style={styles.infoDescription}>
                  Theo dõi lượt xem và tương tác với sản phẩm
                </Text>
              </View>
            </View>
          </View>
        </Animated.View>

        <View style={styles.buttonContainer}>
          <TouchableOpacity
            style={styles.viewButton}
            onPress={() =>
              navigation.navigate("ProductDetail", { productId: "new" })
            }
          >
            <LinearGradient
              colors={["#f8f9fa", "#e9ecef"]}
              style={styles.viewButtonGradient}
            >
              <Text style={styles.viewButtonText}>Xem sản phẩm</Text>
            </LinearGradient>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.homeButton}
            onPress={() => navigation.navigate("Trang chủ")}
          >
            <LinearGradient
              colors={[COLORS.primary, `${COLORS.primary}CC`]}
              start={{ x: 0, y: 0 }}
              end={{ x: 1, y: 1 }}
              style={styles.homeButtonGradient}
            >
              <Text style={styles.homeButtonText}>Về trang chủ</Text>
            </LinearGradient>
          </TouchableOpacity>
        </View>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.white,
  },
  content: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    paddingHorizontal: 24,
  },
  successIconContainer: {
    width: 120,
    height: 120,
    borderRadius: 60,
    overflow: "hidden",
    marginBottom: 24,
    ...SHADOW.medium,
  },
  successIconGradient: {
    width: "100%",
    height: "100%",
    alignItems: "center",
    justifyContent: "center",
  },
  successTitle: {
    fontSize: 24,
    fontWeight: "700",
    color: "#1A1A1A",
    textAlign: "center",
    marginBottom: 12,
  },
  successMessage: {
    fontSize: 16,
    color: "#666",
    textAlign: "center",
    marginBottom: 32,
    lineHeight: 24,
  },
  productName: {
    fontWeight: "600",
    color: COLORS.primary,
  },
  infoContainer: {
    width: "100%",
    backgroundColor: "#f8f9fa",
    borderRadius: 16,
    padding: 16,
    marginBottom: 32,
  },
  infoItem: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 16,
  },
  infoTextContainer: {
    marginLeft: 16,
    flex: 1,
  },
  infoTitle: {
    fontSize: 16,
    fontWeight: "600",
    color: "#1A1A1A",
    marginBottom: 4,
  },
  infoDescription: {
    fontSize: 14,
    color: "#666",
  },
  buttonContainer: {
    width: "100%",
    flexDirection: "row",
    justifyContent: "space-between",
  },
  viewButton: {
    flex: 1,
    marginRight: 8,
    borderRadius: 12,
    overflow: "hidden",
  },
  viewButtonGradient: {
    paddingVertical: 16,
    alignItems: "center",
    justifyContent: "center",
  },
  viewButtonText: {
    fontSize: 16,
    fontWeight: "600",
    color: "#666",
  },
  homeButton: {
    flex: 1,
    marginLeft: 8,
    borderRadius: 12,
    overflow: "hidden",
  },
  homeButtonGradient: {
    paddingVertical: 16,
    alignItems: "center",
    justifyContent: "center",
  },
  homeButtonText: {
    fontSize: 16,
    fontWeight: "600",
    color: COLORS.white,
  },
});
