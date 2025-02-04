import React, { useRef, useState, useEffect } from "react";
import {
  View,
  ScrollView,
  Image,
  Dimensions,
  TouchableOpacity,
  Text,
} from "react-native";
import { LinearGradient } from "expo-linear-gradient";

const { width } = Dimensions.get("window");

const Carousel = () => {
  const [activeIndex, setActiveIndex] = useState(0);
  const scrollViewRef = useRef(null);

  const carouselData = [
    {
      id: 1,
      image:
        "https://i.pinimg.com/736x/f6/6d/5c/f66d5ca01e3b4e493a341c6ea95ae4c5.jpg",
      title: "Khuyến mãi mùa hè",
      description: "Giảm giá đến 50%",
    },
    {
      id: 2,
      image:
        "https://i.pinimg.com/736x/75/99/ce/7599ce1c76a0b20de31d7aeeaa7a89af.jpg",
      title: "Flash Sale",
      description: "Săn deal hot mỗi ngày",
    },
    {
      id: 3,
      image:
        "https://i.pinimg.com/736x/07/1c/53/071c53176bfaf432b2616a6cb8bae3b8.jpg",
      title: "Sản phẩm mới",
      description: "Khám phá ngay",
    },
  ];

  useEffect(() => {
    const timer = setInterval(() => {
      if (activeIndex < carouselData.length - 1) {
        setActiveIndex(activeIndex + 1);
        scrollViewRef.current?.scrollTo({
          x: width * (activeIndex + 1),
          animated: true,
        });
      } else {
        setActiveIndex(0);
        scrollViewRef.current?.scrollTo({
          x: 0,
          animated: true,
        });
      }
    }, 3000);

    return () => clearInterval(timer);
  }, [activeIndex]);

  const handleScroll = (event) => {
    const scrollPosition = event.nativeEvent.contentOffset.x;
    const index = Math.round(scrollPosition / width);
    setActiveIndex(index);
  };

  return (
    <View style={styles.container}>
      <ScrollView
        ref={scrollViewRef}
        horizontal
        pagingEnabled
        showsHorizontalScrollIndicator={false}
        onScroll={handleScroll}
        scrollEventThrottle={16}
        style={styles.scrollView}
      >
        {carouselData.map((item) => (
          <TouchableOpacity
            key={item.id}
            activeOpacity={0.9}
            style={styles.slideContainer}
          >
            <Image source={{ uri: item.image }} style={styles.image} />
            <LinearGradient
              colors={["transparent", "rgba(0,0,0,0.8)"]}
              style={styles.gradient}
            >
              <Text style={styles.title}>{item.title}</Text>
              <Text style={styles.description}>{item.description}</Text>
            </LinearGradient>
          </TouchableOpacity>
        ))}
      </ScrollView>

      <View style={styles.pagination}>
        {carouselData.map((_, index) => (
          <View
            key={index}
            style={[
              styles.paginationDot,
              index === activeIndex && styles.paginationDotActive,
            ]}
          />
        ))}
      </View>
    </View>
  );
};

const styles = {
  container: {
    height: 200,
    position: "relative",
  },
  scrollView: {
    flex: 1,
  },
  slideContainer: {
    width: width,
    height: "100%",
  },
  image: {
    width: "100%",
    height: "100%",
    resizeMode: "cover",
  },
  gradient: {
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0,
    height: "50%",
    justifyContent: "flex-end",
    paddingHorizontal: 16,
    paddingBottom: 20,
  },
  title: {
    color: "#fff",
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 8,
  },
  description: {
    color: "#fff",
    fontSize: 14,
    opacity: 0.8,
  },
  pagination: {
    flexDirection: "row",
    position: "absolute",
    bottom: 15,
    alignSelf: "center",
  },
  paginationDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: "rgba(255, 255, 255, 0.5)",
    marginHorizontal: 4,
  },
  paginationDotActive: {
    width: 24,
    backgroundColor: "#fff",
  },
};

export default Carousel;
