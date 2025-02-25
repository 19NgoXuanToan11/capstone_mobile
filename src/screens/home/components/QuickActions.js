import React from "react";
import {
  View,
  TouchableOpacity,
  Text,
  StyleSheet,
  Animated,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { LinearGradient } from "expo-linear-gradient";
import { COLORS, SHADOW } from "../../../components/theme";

export default function QuickActions() {
  const actions = [
    {
      id: 1,
      name: "Đăng bán",
      icon: "add-circle",
      gradient: ["#FF6B6B", "#FF8E8E"],
      description: "Đăng tin ngay",
    },
    {
      id: 2,
      name: "Trao đổi",
      icon: "swap-horizontal",
      gradient: ["#4ECDC4", "#45B7D1"],
      description: "Tìm người trao đổi",
    },
    {
      id: 4,
      name: "Yêu thích",
      icon: "heart",
      gradient: ["#FF9A9E", "#FAD0C4"],
      description: "Sản phẩm đã lưu",
    },
  ];

  const scaleAnimation = React.useRef(new Animated.Value(1)).current;

  const handlePressIn = () => {
    Animated.spring(scaleAnimation, {
      toValue: 0.95,
      useNativeDriver: true,
    }).start();
  };

  const handlePressOut = () => {
    Animated.spring(scaleAnimation, {
      toValue: 1,
      useNativeDriver: true,
    }).start();
  };

  return (
    <View style={styles.container}>
      {actions.map((action) => (
        <TouchableOpacity
          key={action.id}
          activeOpacity={0.9}
          onPressIn={handlePressIn}
          onPressOut={handlePressOut}
        >
          <Animated.View
            style={[
              styles.actionCard,
              {
                transform: [{ scale: scaleAnimation }],
              },
            ]}
          >
            <LinearGradient
              colors={action.gradient}
              start={{ x: 0, y: 0 }}
              end={{ x: 1, y: 1 }}
              style={styles.gradientContainer}
            >
              <View style={styles.iconContainer}>
                <Ionicons name={action.icon} size={28} color={COLORS.white} />
              </View>
              <View style={styles.textContainer}>
                <Text style={styles.actionName}>{action.name}</Text>
                <Text style={styles.actionDescription}>
                  {action.description}
                </Text>
              </View>
              <View style={styles.arrowContainer}>
                <Ionicons
                  name="chevron-forward"
                  size={20}
                  color={COLORS.white}
                />
              </View>
            </LinearGradient>
          </Animated.View>
        </TouchableOpacity>
      ))}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 16,
    backgroundColor: COLORS.white,
  },
  actionCard: {
    marginBottom: 12,
    borderRadius: 16,
    overflow: "hidden",
    ...SHADOW.medium,
  },
  gradientContainer: {
    flexDirection: "row",
    alignItems: "center",
    padding: 16,
  },
  iconContainer: {
    width: 50,
    height: 50,
    borderRadius: 25,
    backgroundColor: "rgba(255, 255, 255, 0.2)",
    justifyContent: "center",
    alignItems: "center",
    marginRight: 16,
  },
  textContainer: {
    flex: 1,
  },
  actionName: {
    fontSize: 16,
    fontWeight: "700",
    color: COLORS.white,
    marginBottom: 4,
  },
  actionDescription: {
    fontSize: 12,
    color: "rgba(255, 255, 255, 0.8)",
  },
  arrowContainer: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: "rgba(255, 255, 255, 0.2)",
    justifyContent: "center",
    alignItems: "center",
  },
});
