import React, { useState, useRef } from "react";
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  FlatList,
  Dimensions,
  Animated,
  StatusBar,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { StyleSheet } from "react-native";
import { Ionicons } from "@expo/vector-icons";

const { width, height } = Dimensions.get("window");

const slides = [
  {
    id: "1",
    image: require("../../../assets/onboarding/onboarding1.png"),
    titleTop: "Chào mừng đến với",
    titleBottom: "ReTech",
    description:
      "Nơi lý tưởng để mua bán và trao đổi thiết bị điện tử cũ chất lượng.",
  },
  {
    id: "2",
    image: require("../../../assets/onboarding/onboarding2.png"),
    titleTop: "Khám phá",
    titleBottom: "Thiết bị điện tử mới",
    description:
      "Tìm kiếm những thiết bị điện tử cũ với giá cả hợp lý và chất lượng tốt.",
  },
  {
    id: "3",
    image: require("../../../assets/onboarding/onboarding3.png"),
    titleTop: "Khám phá phong cách",
    titleBottom: "Mua sắm thông minh",
    description:
      "Tham gia cộng đồng mua bán thiết bị điện tử cũ và tiết kiệm chi phí.",
  },
];

const AnimatedFlatList = Animated.createAnimatedComponent(FlatList);

export default function OnBoardingScreen({ navigation, route }) {
  const { setHasSeenOnboarding } = route.params;
  const [currentIndex, setCurrentIndex] = useState(0);
  const scrollX = useRef(new Animated.Value(0)).current;
  const slidesRef = useRef(null);

  const viewableItemsChanged = useRef(({ viewableItems }) => {
    setCurrentIndex(viewableItems[0]?.index || 0);
  }).current;

  const viewConfig = useRef({ viewAreaCoveragePercentThreshold: 50 }).current;

  const scrollTo = () => {
    if (currentIndex < slides.length - 1) {
      slidesRef.current.scrollToIndex({ index: currentIndex + 1 });
    } else {
      handleFinishOnboarding();
    }
  };

  const handleSkip = () => {
    handleFinishOnboarding();
  };

  const handleFinishOnboarding = async () => {
    try {
      await setHasSeenOnboarding(true);
    } catch (error) {
      console.error("Error finishing onboarding:", error);
    }
  };

  const renderSlide = ({ item }) => {
    return (
      <View style={styles.slide}>
        <Image source={item.image} style={styles.backgroundImage} />
        <View style={styles.overlay}>
          <View style={styles.contentContainer}>
            <View style={styles.titleContainer}>
              <Text style={styles.titleTop}>{item.titleTop}</Text>
              <Text style={styles.titleBottom}>{item.titleBottom}</Text>
            </View>
            <Text style={styles.description}>{item.description}</Text>
          </View>
        </View>
      </View>
    );
  };

  const Paginator = () => {
    return (
      <View style={styles.paginatorContainer}>
        {slides.map((_, index) => {
          const inputRange = [
            (index - 1) * width,
            index * width,
            (index + 1) * width,
          ];

          const scale = scrollX.interpolate({
            inputRange,
            outputRange: [1, 2.5, 1],
            extrapolate: "clamp",
          });

          const opacity = scrollX.interpolate({
            inputRange,
            outputRange: [0.5, 1, 0.5],
            extrapolate: "clamp",
          });

          return (
            <Animated.View
              style={[
                styles.dot,
                {
                  opacity,
                  transform: [{ scaleX: scale }],
                },
              ]}
              key={index}
            />
          );
        })}
      </View>
    );
  };

  return (
    <View style={styles.container}>
      <StatusBar
        translucent
        backgroundColor="transparent"
        barStyle="light-content"
      />

      <TouchableOpacity style={styles.skipButton} onPress={handleSkip}>
        <Text style={styles.skipText}>Skip</Text>
      </TouchableOpacity>

      <View style={styles.slidesContainer}>
        <AnimatedFlatList
          data={slides}
          renderItem={renderSlide}
          horizontal
          showsHorizontalScrollIndicator={false}
          pagingEnabled
          bounces={false}
          keyExtractor={(item) => item.id}
          onScroll={Animated.event(
            [{ nativeEvent: { contentOffset: { x: scrollX } } }],
            { useNativeDriver: true }
          )}
          onViewableItemsChanged={viewableItemsChanged}
          viewabilityConfig={viewConfig}
          ref={slidesRef}
        />
      </View>

      <View style={styles.bottomContainer}>
        <View style={styles.bottomContentContainer}>
          <Paginator />

          {currentIndex === slides.length - 1 ? (
            <TouchableOpacity
              style={styles.startButton}
              onPress={() => setHasSeenOnboarding(true)}
            >
              <Text style={styles.startButtonText}>Bắt đầu</Text>
            </TouchableOpacity>
          ) : (
            <TouchableOpacity style={styles.nextButton} onPress={scrollTo}>
              <Ionicons name="arrow-forward" size={24} color="#fff" />
            </TouchableOpacity>
          )}
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: "100%",
    height: "100%",
  },
  skipButton: {
    position: "absolute",
    top: 50,
    right: 20,
    zIndex: 2,
    backgroundColor: "rgba(255,255,255,0.2)",
    paddingHorizontal: 20,
    paddingVertical: 8,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: "rgba(255,255,255,0.3)",
  },
  skipText: {
    fontSize: 14,
    color: "#fff",
    fontWeight: "500",
  },
  slidesContainer: {
    flex: 1,
  },
  slide: {
    width,
    height: height,
  },
  backgroundImage: {
    position: "absolute",
    width: "100%",
    height: "100%",
    resizeMode: "cover",
  },
  overlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: "rgba(0,0,0,0.35)",
    justifyContent: "flex-end",
    paddingBottom: 130,
  },
  contentContainer: {
    paddingHorizontal: 30,
  },
  titleContainer: {
    marginBottom: 15,
  },
  titleTop: {
    fontSize: 32,
    fontWeight: "400",
    color: "#fff",
    fontStyle: "italic",
  },
  titleBottom: {
    fontSize: 48,
    fontWeight: "700",
    color: "#E41E3F",
    marginTop: -5,
    textTransform: "uppercase",
    letterSpacing: 1,
  },
  description: {
    fontSize: 16,
    color: "#fff",
    lineHeight: 24,
    opacity: 0.9,
    maxWidth: "100%",
    marginBottom: 40,
  },
  bottomContainer: {
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0,
    paddingVertical: 20,
    paddingHorizontal: 20,
  },
  bottomContentContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    height: 60,
  },
  paginatorContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
  dot: {
    height: 6,
    width: 6,
    borderRadius: 3,
    backgroundColor: "#fff",
    marginHorizontal: 3,
  },
  activeDot: {
    width: 20,
    opacity: 1,
  },
  nextButton: {
    width: 54,
    height: 54,
    borderRadius: 27,
    backgroundColor: "rgba(255,255,255,0.2)",
    justifyContent: "center",
    alignItems: "center",
    backdropFilter: "blur(10px)",
    borderWidth: 1,
    borderColor: "rgba(255,255,255,0.3)",
  },
  startButton: {
    width: width - 200,
    height: 54,
    borderRadius: 27,
    backgroundColor: "rgba(255,255,255,0.2)",
    justifyContent: "center",
    alignItems: "center",
    backdropFilter: "blur(10px)",
    borderColor: "rgba(255,255,255,0.3)",
  },
  startButtonText: {
    color: "#fff",
    fontSize: 24,
    fontWeight: "800",
    letterSpacing: 1,
  },
});
