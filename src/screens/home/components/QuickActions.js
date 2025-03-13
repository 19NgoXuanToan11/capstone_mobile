import React, { useState, useRef } from "react";
import {
  View,
  TouchableOpacity,
  Text,
  StyleSheet,
  Animated,
  Image,
  Dimensions,
  Platform,
  FlatList,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { LinearGradient } from "expo-linear-gradient";
import { BlurView } from "expo-blur";
import { COLORS, SHADOW } from "../../../components/theme";
import { useNavigation } from "@react-navigation/native";

const { width } = Dimensions.get("window");
const CARD_WIDTH = width * 0.7;
const SPACING = 12;

export default function QuickActions() {
  const navigation = useNavigation();
  const scrollX = useRef(new Animated.Value(0)).current;
  const flatListRef = useRef(null);

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
      screen: "CreateExchange",
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
    {
      id: 4,
      name: "Khám phá",
      icon: "compass",
      gradient: ["#A18CD1", "#FBC2EB"],
      description: "Tìm sản phẩm mới",
      image: require("../../../../assets/google.png"),
      screen: "AllProducts",
    },
  ];

  // Animation values for each card
  const animatedValues = useRef(
    actions.map(() => ({
      scale: new Animated.Value(1),
      opacity: new Animated.Value(1),
    }))
  ).current;

  const handlePressIn = (index) => {
    Animated.parallel([
      Animated.timing(animatedValues[index].scale, {
        toValue: 0.95,
        duration: 150,
        useNativeDriver: true,
      }),
      Animated.timing(animatedValues[index].opacity, {
        toValue: 0.9,
        duration: 150,
        useNativeDriver: true,
      }),
    ]).start();
  };

  const handlePressOut = (index) => {
    Animated.parallel([
      Animated.spring(animatedValues[index].scale, {
        toValue: 1,
        friction: 5,
        tension: 40,
        useNativeDriver: true,
      }),
      Animated.timing(animatedValues[index].opacity, {
        toValue: 1,
        duration: 150,
        useNativeDriver: true,
      }),
    ]).start();
  };

  const handlePress = (screen, item) => {
    if (screen) {
      navigation.navigate(screen, { item });
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Thao tác nhanh</Text>
        <TouchableOpacity style={styles.viewAllButton}>
          <Text style={styles.viewAllText}>Xem tất cả</Text>
          <Ionicons name="chevron-forward" size={16} color={COLORS.primary} />
        </TouchableOpacity>
      </View>

      <Animated.FlatList
        ref={flatListRef}
        data={actions}
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.listContent}
        snapToInterval={CARD_WIDTH + SPACING}
        decelerationRate="fast"
        onScroll={Animated.event(
          [{ nativeEvent: { contentOffset: { x: scrollX } } }],
          { useNativeDriver: true }
        )}
        renderItem={({ item, index }) => {
          // Calculate animations for parallax effect
          const inputRange = [
            (index - 1) * (CARD_WIDTH + SPACING),
            index * (CARD_WIDTH + SPACING),
            (index + 1) * (CARD_WIDTH + SPACING),
          ];

          const translateY = scrollX.interpolate({
            inputRange,
            outputRange: [30, 0, 30],
            extrapolate: "clamp",
          });

          const opacity = scrollX.interpolate({
            inputRange,
            outputRange: [0.5, 1, 0.5],
            extrapolate: "clamp",
          });

          const scale = scrollX.interpolate({
            inputRange,
            outputRange: [0.9, 1, 0.9],
            extrapolate: "clamp",
          });

          return (
            <Animated.View
              style={[
                styles.cardContainer,
                {
                  transform: [
                    { translateY },
                    {
                      scale: Animated.multiply(
                        scale,
                        animatedValues[index].scale
                      ),
                    },
                  ],
                  opacity: Animated.multiply(
                    opacity,
                    animatedValues[index].opacity
                  ),
                },
              ]}
            >
              <TouchableOpacity
                activeOpacity={0.9}
                onPressIn={() => handlePressIn(index)}
                onPressOut={() => handlePressOut(index)}
                onPress={() => handlePress(item.screen, item)}
                style={styles.cardTouchable}
              >
                <LinearGradient
                  colors={item.gradient}
                  start={{ x: 0, y: 0 }}
                  end={{ x: 1, y: 1 }}
                  style={styles.cardGradient}
                >
                  <View style={styles.cardContent}>
                    <View style={styles.iconContainer}>
                      <Ionicons name={item.icon} size={28} color="#FFFFFF" />
                    </View>

                    <View style={styles.textContainer}>
                      <Text style={styles.cardTitle}>{item.name}</Text>
                      <Text style={styles.cardDescription}>
                        {item.description}
                      </Text>
                    </View>

                    <View style={styles.arrowContainer}>
                      <BlurView
                        intensity={80}
                        tint="light"
                        style={styles.arrowBlur}
                      >
                        <Ionicons name="arrow-forward" size={18} color="#FFF" />
                      </BlurView>
                    </View>
                  </View>
                </LinearGradient>
              </TouchableOpacity>
            </Animated.View>
          );
        }}
        keyExtractor={(item) => item.id.toString()}
      />

      {/* Pagination Dots */}
      <View style={styles.paginationContainer}>
        {actions.map((_, index) => {
          const inputRange = [
            (index - 1) * (CARD_WIDTH + SPACING),
            index * (CARD_WIDTH + SPACING),
            (index + 1) * (CARD_WIDTH + SPACING),
          ];

          // Instead of animating width directly, we'll use scale transform
          const scale = scrollX.interpolate({
            inputRange,
            outputRange: [1, 3, 1],
            extrapolate: "clamp",
          });

          const opacity = scrollX.interpolate({
            inputRange,
            outputRange: [0.4, 1, 0.4],
            extrapolate: "clamp",
          });

          const backgroundColor = scrollX.interpolate({
            inputRange,
            outputRange: ["#ccc", COLORS.primary, "#ccc"],
            extrapolate: "clamp",
          });

          return (
            <Animated.View
              key={index}
              style={[
                styles.dot,
                {
                  opacity,
                  backgroundColor,
                  transform: [
                    { scaleX: scale }, // Only scale horizontally
                  ],
                },
              ]}
            />
          );
        })}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginVertical: 16,
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 16,
    marginBottom: 16,
  },
  title: {
    fontSize: 20,
    fontWeight: "700",
    color: "#1A1A1A",
  },
  viewAllButton: {
    flexDirection: "row",
    alignItems: "center",
  },
  viewAllText: {
    fontSize: 14,
    color: COLORS.primary,
    fontWeight: "600",
    marginRight: 4,
  },
  listContent: {
    paddingLeft: 16,
    paddingRight: 8,
  },
  cardContainer: {
    width: CARD_WIDTH,
    marginRight: SPACING,
    borderRadius: 24,
    overflow: "hidden",
    ...Platform.select({
      ios: {
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 10 },
        shadowOpacity: 0.2,
        shadowRadius: 15,
      },
      android: {
        elevation: 8,
      },
    }),
  },
  cardTouchable: {
    flex: 1,
    borderRadius: 24,
    overflow: "hidden",
  },
  cardGradient: {
    flex: 1,
    height: 180,
    borderRadius: 24,
    overflow: "hidden",
    position: "relative",
  },
  cardContent: {
    flex: 1,
    padding: 20,
    justifyContent: "space-between",
  },
  iconContainer: {
    width: 50,
    height: 50,
    borderRadius: 15,
    backgroundColor: "rgba(255, 255, 255, 0.2)",
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 12,
  },
  textContainer: {
    flex: 1,
    justifyContent: "flex-end",
  },
  cardTitle: {
    fontSize: 22,
    fontWeight: "700",
    color: "#FFFFFF",
    marginBottom: 4,
    textShadowColor: "rgba(0, 0, 0, 0.1)",
    textShadowOffset: { width: 0, height: 1 },
    textShadowRadius: 2,
  },
  cardDescription: {
    fontSize: 14,
    color: "rgba(255, 255, 255, 0.9)",
  },
  arrowContainer: {
    position: "absolute",
    bottom: 20,
    right: 20,
  },
  arrowBlur: {
    width: 36,
    height: 36,
    borderRadius: 18,
    justifyContent: "center",
    alignItems: "center",
    overflow: "hidden",
    backgroundColor: "rgba(255, 255, 255, 0.2)",
  },
  paginationContainer: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    marginTop: 16,
    height: 8,
  },
  dot: {
    width: 8, // Base width
    height: 8,
    borderRadius: 4,
    marginHorizontal: 4,
  },
});
