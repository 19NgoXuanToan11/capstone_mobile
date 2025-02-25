import React from "react";
import {
  View,
  TouchableOpacity,
  Text,
  StyleSheet,
  Animated,
  Image,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { LinearGradient } from "expo-linear-gradient";
import { BlurView } from "expo-blur";
import { COLORS, SHADOW } from "../../../components/theme";
import { useNavigation } from "@react-navigation/native";

export default function QuickActions() {
  const navigation = useNavigation();

  const actions = [
    {
      id: 1,
      name: "Đăng bán",
      icon: "add-circle",
      gradient: ["#FF6B6B", "#FF8E8E"],
      description: "Đăng tin ngay",
      image: require("../../../../assets/google.png"),
      screen: "PostProduct",
    },
    {
      id: 2,
      name: "Trao đổi",
      icon: "swap-horizontal",
      gradient: ["#4ECDC4", "#45B7D1"],
      description: "Tìm người trao đổi",
      image: require("../../../../assets/google.png"),
      screen: "Trao đổi",
    },
    {
      id: 3,
      name: "Yêu thích",
      icon: "heart",
      gradient: ["#FF9A9E", "#FAD0C4"],
      description: "Sản phẩm đã lưu",
      image: require("../../../../assets/google.png"),
      screen: "Favorites",
    },
  ];

  // Animation values for each card
  const animatedValues = React.useRef(
    actions.map(() => new Animated.Value(1))
  ).current;

  const handlePressIn = (index) => {
    Animated.spring(animatedValues[index], {
      toValue: 0.95,
      useNativeDriver: true,
    }).start();
  };

  const handlePressOut = (index) => {
    Animated.spring(animatedValues[index], {
      toValue: 1,
      useNativeDriver: true,
    }).start();
  };

  const handlePress = (screen) => {
    if (screen) {
      navigation.navigate(screen);
    }
  };

  return (
    <View style={styles.container}>
      {actions.map((action, index) => (
        <Animated.View
          key={action.id}
          style={[
            styles.actionCardContainer,
            {
              transform: [{ scale: animatedValues[index] }],
            },
          ]}
        >
          <TouchableOpacity
            activeOpacity={0.9}
            onPressIn={() => handlePressIn(index)}
            onPressOut={() => handlePressOut(index)}
            onPress={() => handlePress(action.screen)}
            style={styles.touchable}
          >
            <LinearGradient
              colors={action.gradient}
              start={{ x: 0, y: 0 }}
              end={{ x: 1, y: 1 }}
              style={styles.gradientContainer}
            >
              <View style={styles.contentContainer}>
                <View style={styles.leftSection}>
                  <View style={styles.iconContainer}>
                    <Ionicons
                      name={action.icon}
                      size={28}
                      color={COLORS.white}
                    />
                  </View>
                  <View style={styles.textContainer}>
                    <Text style={styles.actionName}>{action.name}</Text>
                    <Text style={styles.actionDescription}>
                      {action.description}
                    </Text>
                  </View>
                </View>

                <View style={styles.arrowContainer}>
                  <BlurView intensity={20} tint="light" style={styles.blurView}>
                    <Ionicons
                      name="chevron-forward"
                      size={20}
                      color={COLORS.white}
                    />
                  </BlurView>
                </View>
              </View>

              {/* Decorative elements */}
              <View style={styles.decorCircle1} />
              <View style={styles.decorCircle2} />
              <View style={styles.decorCircle3} />
            </LinearGradient>
          </TouchableOpacity>
        </Animated.View>
      ))}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 16,
    backgroundColor: COLORS.white,
  },
  actionCardContainer: {
    marginBottom: 12,
    borderRadius: 16,
    overflow: "hidden",
    ...SHADOW.medium,
  },
  touchable: {
    width: "100%",
  },
  gradientContainer: {
    position: "relative",
    overflow: "hidden",
  },
  contentContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    padding: 16,
  },
  leftSection: {
    flexDirection: "row",
    alignItems: "center",
  },
  iconContainer: {
    width: 50,
    height: 50,
    borderRadius: 25,
    backgroundColor: "rgba(255, 255, 255, 0.2)",
    justifyContent: "center",
    alignItems: "center",
    marginRight: 16,
    ...SHADOW.small,
  },
  textContainer: {
    flex: 1,
  },
  actionName: {
    fontSize: 18,
    fontWeight: "700",
    color: COLORS.white,
    marginBottom: 4,
  },
  actionDescription: {
    fontSize: 13,
    color: "rgba(255, 255, 255, 0.8)",
  },
  arrowContainer: {
    width: 36,
    height: 36,
    borderRadius: 18,
    overflow: "hidden",
  },
  blurView: {
    width: "100%",
    height: "100%",
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(255, 255, 255, 0.2)",
  },
  // Decorative elements
  decorCircle1: {
    position: "absolute",
    width: 100,
    height: 100,
    borderRadius: 50,
    backgroundColor: "rgba(255, 255, 255, 0.1)",
    top: -50,
    right: -20,
  },
  decorCircle2: {
    position: "absolute",
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: "rgba(255, 255, 255, 0.1)",
    bottom: -20,
    right: 40,
  },
  decorCircle3: {
    position: "absolute",
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: "rgba(255, 255, 255, 0.1)",
    top: 10,
    right: 100,
  },
});
