import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  FlatList,
  Image,
  Keyboard,
  Animated,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Ionicons } from "@expo/vector-icons";
import styles from "../../styles/SearchStyles";

export default function SearchScreen({ navigation }) {
  const [searchQuery, setSearchQuery] = useState("");
  const [showHistory, setShowHistory] = useState(true);
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [isSearching, setIsSearching] = useState(false);

  // Mock data - thay thế bằng dữ liệu thực từ API
  const searchHistory = [
    "iPhone 13",
    "MacBook Pro",
    "Samsung Galaxy S21",
    "iPad Pro",
  ];

  const suggestions = [
    "iPhone 13 Pro Max",
    "iPhone 13 Pro",
    "iPhone 13 mini",
    "iPhone 12 Pro Max",
  ];

  const searchResults = [
    {
      id: "1",
      title: "iPhone 13 Pro Max",
      image: "https://picsum.photos/200/200?random=1",
      condition: "Đã sử dụng - Còn 95%",
      location: "Quận 1, TP.HCM",
      wantToExchange: ["iPhone 12 Pro Max", "iPhone 12 Pro"],
    },
    // Thêm kết quả tìm kiếm khác...
  ];

  const handleSearch = (text) => {
    setSearchQuery(text);
    if (text.length > 0) {
      setShowHistory(false);
      setShowSuggestions(true);
      setIsSearching(false);
    } else {
      setShowHistory(true);
      setShowSuggestions(false);
      setIsSearching(false);
    }
  };

  const handleSubmitSearch = () => {
    if (searchQuery.trim()) {
      setShowSuggestions(false);
      setIsSearching(true);
      Keyboard.dismiss();
      // TODO: Call API to get search results
    }
  };

  const handleHistoryItemPress = (item) => {
    setSearchQuery(item);
    handleSubmitSearch();
  };

  const handleClearHistory = () => {
    // TODO: Implement clear history logic
    Alert.alert("Xóa lịch sử", "Bạn có chắc chắn muốn xóa lịch sử tìm kiếm?", [
      {
        text: "Hủy",
        style: "cancel",
      },
      {
        text: "Xóa",
        style: "destructive",
        onPress: () => {
          // Clear history logic
        },
      },
    ]);
  };

  const renderSearchResult = ({ item }) => (
    <TouchableOpacity
      style={styles.resultItem}
      onPress={() =>
        navigation.navigate("ProductDetail", { productId: item.id })
      }
    >
      <Image source={{ uri: item.image }} style={styles.resultImage} />
      <View style={styles.resultInfo}>
        <Text style={styles.resultTitle} numberOfLines={2}>
          {item.title}
        </Text>
        <Text style={styles.resultCondition}>{item.condition}</Text>
        <View style={styles.resultLocation}>
          <Ionicons name="location-outline" size={14} color="#666" />
          <Text style={styles.resultLocationText}>{item.location}</Text>
        </View>
        <View style={styles.exchangeWishlist}>
          <Text style={styles.exchangeLabel}>Muốn đổi: </Text>
          <Text style={styles.exchangeItems} numberOfLines={1}>
            {item.wantToExchange.join(", ")}
          </Text>
        </View>
      </View>
    </TouchableOpacity>
  );

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <View style={styles.searchBar}>
          <Ionicons name="search" size={20} color="#666" />
          <TextInput
            style={styles.searchInput}
            value={searchQuery}
            onChangeText={handleSearch}
            onSubmitEditing={handleSubmitSearch}
            placeholder="Tìm kiếm sản phẩm..."
            returnKeyType="search"
            autoCapitalize="none"
          />
          {searchQuery.length > 0 && (
            <TouchableOpacity
              onPress={() => handleSearch("")}
              style={styles.clearButton}
            >
              <Ionicons name="close-circle" size={18} color="#999" />
            </TouchableOpacity>
          )}
        </View>
        <TouchableOpacity
          style={styles.filterButton}
          onPress={() => navigation.navigate("SearchFilter")}
        >
          <Ionicons name="options-outline" size={24} color="#333" />
        </TouchableOpacity>
      </View>

      {showHistory && (
        <View style={styles.historyContainer}>
          <View style={styles.historyHeader}>
            <Text style={styles.historyTitle}>Lịch sử tìm kiếm</Text>
            <TouchableOpacity onPress={handleClearHistory}>
              <Text style={styles.clearHistoryText}>Xóa tất cả</Text>
            </TouchableOpacity>
          </View>
          <FlatList
            data={searchHistory}
            renderItem={({ item }) => (
              <TouchableOpacity
                style={styles.historyItem}
                onPress={() => handleHistoryItemPress(item)}
              >
                <Ionicons name="time-outline" size={20} color="#666" />
                <Text style={styles.historyText}>{item}</Text>
                <TouchableOpacity
                  style={styles.removeHistoryItem}
                  onPress={() => {
                    /* Remove single history item */
                  }}
                >
                  <Ionicons name="close" size={16} color="#999" />
                </TouchableOpacity>
              </TouchableOpacity>
            )}
            keyExtractor={(item) => item}
          />
        </View>
      )}

      {showSuggestions && (
        <FlatList
          data={suggestions}
          renderItem={({ item }) => (
            <TouchableOpacity
              style={styles.suggestionItem}
              onPress={() => handleHistoryItemPress(item)}
            >
              <Ionicons name="search-outline" size={20} color="#666" />
              <Text style={styles.suggestionText}>{item}</Text>
            </TouchableOpacity>
          )}
          keyExtractor={(item) => item}
        />
      )}

      {isSearching && (
        <FlatList
          data={searchResults}
          renderItem={renderSearchResult}
          keyExtractor={(item) => item.id}
          contentContainerStyle={styles.resultsList}
          ListEmptyComponent={
            <View style={styles.emptyContainer}>
              <Ionicons name="search-outline" size={48} color="#666" />
              <Text style={styles.emptyText}>
                Không tìm thấy kết quả nào cho "{searchQuery}"
              </Text>
            </View>
          }
        />
      )}
    </SafeAreaView>
  );
}
