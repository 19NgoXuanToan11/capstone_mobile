import React from "react";
import { View, StyleSheet, Animated } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { LinearGradient } from "expo-linear-gradient";
import { COLORS } from "../../../components/theme";

export function TabIcon({ routeName, isFocused }) {
  let iconName;
  let gradientColors;

  switch (routeName) {
    case "Trang chủ":
      iconName = isFocused ? "home" : "home-outline";
      gradientColors = ["#4F8EF7", "#2D6CDF"];
      break;
    case "Trao đổi":
      iconName = isFocused ? "swap-horizontal" : "swap-horizontal-outline";
      gradientColors = ["#4ECDC4", "#45B7D1"];
      break;
    case "Chat":
      iconName = isFocused ? "chatbubble" : "chatbubble-outline";
      gradientColors = ["#A18CD1", "#FBC2EB"];
      break;
    case "Thông báo":
      iconName = isFocused ? "notifications" : "notifications-outline";
      gradientColors = ["#FF9A9E", "#FAD0C4"];
      break;
    default:
      iconName = "help-outline";
      gradientColors = ["#84FAB0", "#8FD3F4"];
  }

  // Animation for scale effect
  const scale = React.useRef(new Animated.Value(1)).current;

  React.useEffect(() => {
    Animated.spring(scale, {
      toValue: isFocused ? 1.2 : 1,
      friction: 5,
      useNativeDriver: true,
    }).start();
  }, [isFocused]);

  return (
    <View style={styles.container}>
      {isFocused ? (
        <Animated.View
          style={[styles.iconContainer, { transform: [{ scale }] }]}
        >
          <LinearGradient
            colors={gradientColors}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 1 }}
            style={styles.gradient}
          >
            <Ionicons
              name={iconName}
              size={22}
              color={COLORS.white}
              style={styles.icon}
            />
          </LinearGradient>
        </Animated.View>
      ) : (
        <Animated.View style={{ transform: [{ scale }] }}>
          <Ionicons
            name={iconName}
            size={24}
            color={COLORS.inactive}
            style={styles.icon}
          />
        </Animated.View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    alignItems: "center",
    justifyContent: "center",
    height: 50,
  },
  iconContainer: {
    width: 40,
    height: 40,
    borderRadius: 20,
    overflow: "hidden",
    justifyContent: "center",
    alignItems: "center",
  },
  gradient: {
    width: "100%",
    height: "100%",
    justifyContent: "center",
    alignItems: "center",
  },
  icon: {
    marginBottom: 0,
  },
});
