import React, { useState } from "react";
import {
  View,
  Text,
  ScrollView,
  Image,
  TouchableOpacity,
  Dimensions,
  Modal,
  FlatList,
  Share,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Ionicons } from "@expo/vector-icons";
import Carousel from "react-native-reanimated-carousel";
import styles from "../../styles/ProductStyles";

const { width } = Dimensions.get("window");

export default function ProductDetailScreen({ navigation, route }) {
  const [liked, setLiked] = useState(false);
  const [showExchangeModal, setShowExchangeModal] = useState(false);
  const [selectedImage, setSelectedImage] = useState(null);
  const [showImageModal, setShowImageModal] = useState(false);

  const product = {
    id: "1",
    title: "iPhone 12 Pro Max",
    images: [
      "https://picsum.photos/800/800?random=1",
      "https://picsum.photos/800/800?random=2",
      "https://picsum.photos/800/800?random=3",
    ],
    condition: "Đã sử dụng - Còn 95%",
    description:
      "iPhone 12 Pro Max 256GB, màu Pacific Blue, mới sử dụng 6 tháng, còn bảo hành chính hãng. Máy hoạt động hoàn hảo, pin 95%, full phụ kiện original.",
    wantToExchange: ["iPhone 13 Pro", "iPhone 13 Pro Max"],
    location: "Quận 1, TP.HCM",
    postedDate: "2024-02-15",
    views: 245,
    owner: {
      id: "123",
      name: "Nguyễn Văn A",
      avatar: "https://picsum.photos/50/50?random=1",
      rating: 4.8,
      totalExchanges: 15,
      memberSince: "2023",
      responseRate: "98%",
    },
  };

  const myProducts = [
    {
      id: "1",
      title: "Samsung Galaxy S21 Ultra",
      image: "https://picsum.photos/200/200?random=4",
      condition: "Đã sử dụng - Còn 98%",
    },
    {
      id: "2",
      title: "iPad Pro 2022",
      image: "https://picsum.photos/200/200?random=5",
      condition: "Mới - 100%",
    },
  ];

  const renderCarouselItem = ({ item }) => (
    <TouchableOpacity
      onPress={() => {
        setSelectedImage(item);
        setShowImageModal(true);
      }}
    >
      <Image source={{ uri: item }} style={styles.carouselImage} />
    </TouchableOpacity>
  );

  const handleShare = async () => {
    try {
      await Share.share({
        message: `Xem sản phẩm "${product.title}" trên ứng dụng Trao đổi thiết bị`,
        url: `https://example.com/products/${product.id}`,
      });
    } catch (error) {
      console.error(error);
    }
  };

  const renderMyProductItem = ({ item }) => (
    <TouchableOpacity style={styles.myProductItem}>
      <Image source={{ uri: item.image }} style={styles.myProductImage} />
      <View style={styles.myProductInfo}>
        <Text style={styles.myProductTitle} numberOfLines={2}>
          {item.title}
        </Text>
        <Text style={styles.myProductCondition}>{item.condition}</Text>
      </View>
      <Ionicons name="chevron-forward" size={20} color="#666" />
    </TouchableOpacity>
  );

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity
          style={styles.headerButton}
          onPress={() => navigation.goBack()}
        >
          <Ionicons name="arrow-back" size={24} color="#333" />
        </TouchableOpacity>
        <View style={styles.headerRight}>
          <TouchableOpacity
            style={styles.headerButton}
            onPress={() => setLiked(!liked)}
          >
            <Ionicons
              name={liked ? "heart" : "heart-outline"}
              size={24}
              color={liked ? "#FF3B30" : "#333"}
            />
          </TouchableOpacity>
          <TouchableOpacity style={styles.headerButton} onPress={handleShare}>
            <Ionicons name="share-outline" size={24} color="#333" />
          </TouchableOpacity>
        </View>
      </View>

      <ScrollView showsVerticalScrollIndicator={false}>
        <View style={styles.carouselContainer}>
          <Carousel
            data={product.images}
            renderItem={renderCarouselItem}
            sliderWidth={width}
            itemWidth={width}
            inactiveSlideScale={1}
            inactiveSlideOpacity={1}
            loop={true}
          />
        </View>

        <View style={styles.productInfo}>
          <Text style={styles.productTitle}>{product.title}</Text>
          <Text style={styles.condition}>{product.condition}</Text>

          <View style={styles.statsRow}>
            <View style={styles.stat}>
              <Ionicons name="eye-outline" size={16} color="#666" />
              <Text style={styles.statText}>{product.views} lượt xem</Text>
            </View>
            <View style={styles.stat}>
              <Ionicons name="time-outline" size={16} color="#666" />
              <Text style={styles.statText}>
                {new Date(product.postedDate).toLocaleDateString("vi-VN")}
              </Text>
            </View>
            <View style={styles.stat}>
              <Ionicons name="location-outline" size={16} color="#666" />
              <Text style={styles.statText}>{product.location}</Text>
            </View>
          </View>

          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Mô tả sản phẩm</Text>
            <Text style={styles.description}>{product.description}</Text>
          </View>

          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Muốn trao đổi với</Text>
            <View style={styles.exchangeWishlist}>
              {product.wantToExchange.map((item, index) => (
                <View key={index} style={styles.wishItem}>
                  <Text style={styles.wishText}>{item}</Text>
                </View>
              ))}
            </View>
          </View>
        </View>

        <View style={styles.ownerCard}>
          <View style={styles.ownerInfo}>
            <Image
              source={{ uri: product.owner.avatar }}
              style={styles.ownerAvatar}
            />
            <View style={styles.ownerDetails}>
              <Text style={styles.ownerName}>{product.owner.name}</Text>
              <View style={styles.ownerStats}>
                <View style={styles.ownerStat}>
                  <Ionicons name="star" size={16} color="#FFD700" />
                  <Text style={styles.ownerStatText}>
                    {product.owner.rating}
                  </Text>
                </View>
                <View style={styles.ownerStat}>
                  <Ionicons name="swap-horizontal" size={16} color="#666" />
                  <Text style={styles.ownerStatText}>
                    {product.owner.totalExchanges} trao đổi
                  </Text>
                </View>
              </View>
              <Text style={styles.memberSince}>
                Thành viên từ {product.owner.memberSince}
              </Text>
            </View>
          </View>
          <TouchableOpacity
            style={styles.viewProfileButton}
            onPress={() =>
              navigation.navigate("UserProfile", { userId: product.owner.id })
            }
          >
            <Text style={styles.viewProfileText}>Xem trang cá nhân</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>

      <View style={styles.bottomBar}>
        <TouchableOpacity
          style={styles.messageButton}
          onPress={() =>
            navigation.navigate("Chat", { userId: product.owner.id })
          }
        >
          <Ionicons name="chatbubble-outline" size={20} color="#4A90E2" />
          <Text style={styles.messageButtonText}>Nhắn tin</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.exchangeButton}
          onPress={() => setShowExchangeModal(true)}
        >
          <Text style={styles.exchangeButtonText}>Đề xuất trao đổi</Text>
        </TouchableOpacity>
      </View>

      <Modal
        visible={showExchangeModal}
        animationType="slide"
        transparent={true}
      >
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <View style={styles.modalHeader}>
              <Text style={styles.modalTitle}>Chọn sản phẩm trao đổi</Text>
              <TouchableOpacity
                onPress={() => setShowExchangeModal(false)}
                style={styles.modalCloseButton}
              >
                <Ionicons name="close" size={24} color="#333" />
              </TouchableOpacity>
            </View>

            <FlatList
              data={myProducts}
              renderItem={renderMyProductItem}
              keyExtractor={(item) => item.id}
              contentContainerStyle={styles.myProductsList}
              showsVerticalScrollIndicator={false}
              ListEmptyComponent={
                <View style={styles.emptyList}>
                  <Text style={styles.emptyText}>
                    Bạn chưa có sản phẩm nào để trao đổi
                  </Text>
                  <TouchableOpacity
                    style={styles.addProductButton}
                    onPress={() => {
                      setShowExchangeModal(false);
                      navigation.navigate("AddProduct");
                    }}
                  >
                    <Text style={styles.addProductText}>Thêm sản phẩm mới</Text>
                  </TouchableOpacity>
                </View>
              }
            />
          </View>
        </View>
      </Modal>

      <Modal visible={showImageModal} transparent={true} animationType="fade">
        <View style={styles.imageModalContainer}>
          <TouchableOpacity
            style={styles.imageModalCloseButton}
            onPress={() => setShowImageModal(false)}
          >
            <Ionicons name="close" size={24} color="#fff" />
          </TouchableOpacity>
          <Image
            source={{ uri: selectedImage }}
            style={styles.fullImage}
            resizeMode="contain"
          />
        </View>
      </Modal>
    </SafeAreaView>
  );
}
