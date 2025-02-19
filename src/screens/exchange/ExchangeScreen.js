import React from "react";
import { View, ScrollView, Text, TouchableOpacity, Image, TextInput } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Ionicons } from "@expo/vector-icons";
import styles from "../../styles/ExchangeStyles";
import { LinearGradient } from "expo-linear-gradient";

export default function ExchangeScreen() {
  const exchangeItems = [
    {
      id: 1,
      title: "iPhone 12 Pro",
      image: "https://picsum.photos/200",
      condition: "Đã sử dụng 6 tháng",
      wantToExchange: ["iPhone 13", "iPhone 13 Pro"],
      location: "TP.HCM",
      owner: {
        name: "Nguyễn Văn A",
        rating: 4.8,
        avatar: "https://picsum.photos/50",
      },
    },
    {
      id: 2,
      title: "MacBook Pro M1",
      image: "https://picsum.photos/201",
      condition: "Mới 95%",
      wantToExchange: ["MacBook Pro M2", "iMac"],
      location: "Hà Nội",
      owner: {
        name: "Trần Thị B",
        rating: 4.9,
        avatar: "https://picsum.photos/51",
      },
    },
  ];

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Trao đổi thiết bị</Text>
        <TouchableOpacity style={styles.postButton}>
          <LinearGradient
            colors={["#1976D2", "#1565C0"]}
            style={styles.gradientButton}
          >
            <Ionicons name="add-circle-outline" size={24} color="#fff" />
            <Text style={styles.postButtonText}>Đăng tin</Text>
          </LinearGradient>
        </TouchableOpacity>
      </View>

      <View style={styles.searchContainer}>
        <View style={styles.searchBar}>
          <Ionicons name="search-outline" size={20} color="#666" />
          <TextInput
            placeholder="Tìm kiếm thiết bị..."
            style={styles.searchInput}
            placeholderTextColor="#999"
          />
        </View>
      </View>

      <ScrollView style={styles.content}>
        {exchangeItems.map((item) => (
          <TouchableOpacity 
            key={item.id} 
            style={styles.exchangeCard}
            activeOpacity={0.7}
          >
            <View style={styles.imageContainer}>
              <Image source={{ uri: item.image }} style={styles.itemImage} />
              <View style={styles.conditionBadge}>
                <Text style={styles.conditionText}>{item.condition}</Text>
              </View>
            </View>
            
            <View style={styles.itemInfo}>
              <Text style={styles.itemTitle} numberOfLines={1}>{item.title}</Text>

              <View style={styles.exchangeFor}>
                <Text style={styles.exchangeForTitle}>Muốn trao đổi với:</Text>
                <View style={styles.wantedItemsContainer}>
                  {item.wantToExchange.map((want, index) => (
                    <View key={index} style={styles.wantedItem}>
                      <Text style={styles.wantedItemText}>{want}</Text>
                    </View>
                  ))}
                </View>
              </View>

              <View style={styles.itemFooter}>
                <View style={styles.owner}>
                  <Image
                    source={{ uri: item.owner.avatar }}
                    style={styles.ownerAvatar}
                  />
                  <View>
                    <Text style={styles.ownerName}>{item.owner.name}</Text>
                    <View style={styles.rating}>
                      <Ionicons name="star" size={14} color="#FFD700" />
                      <Text style={styles.ratingText}>{item.owner.rating}</Text>
                    </View>
                  </View>
                </View>
                <View style={styles.location}>
                  <Ionicons name="location-outline" size={14} color="#666" />
                  <Text style={styles.locationText}>{item.location}</Text>
                </View>
              </View>
            </View>
          </TouchableOpacity>
        ))}
      </ScrollView>
    </SafeAreaView>
  );
}
