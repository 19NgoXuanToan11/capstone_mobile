import React, { useState } from "react";
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  Switch,
  Slider,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Ionicons } from "@expo/vector-icons";
import styles from "../../styles/SearchStyles";

export default function SearchFilterScreen({ navigation }) {
  const [filters, setFilters] = useState({
    condition: [],
    categories: [],
    location: null,
    distance: 10,
    onlyWithImages: true,
    sortBy: "recent",
  });

  const conditions = [
    "Mới - 100%",
    "Đã sử dụng - Còn 95-99%",
    "Đã sử dụng - Còn 90-94%",
    "Đã sử dụng - Còn 80-89%",
    "Đã sử dụng - Dưới 80%",
  ];

  const categories = [
    "Điện thoại",
    "Máy tính bảng",
    "Laptop",
    "Máy ảnh",
    "Phụ kiện",
  ];

  const toggleCondition = (condition) => {
    const newConditions = [...filters.condition];
    const index = newConditions.indexOf(condition);
    if (index > -1) {
      newConditions.splice(index, 1);
    } else {
      newConditions.push(condition);
    }
    setFilters({ ...filters, condition: newConditions });
  };

  const toggleCategory = (category) => {
    const newCategories = [...filters.categories];
    const index = newCategories.indexOf(category);
    if (index > -1) {
      newCategories.splice(index, 1);
    } else {
      newCategories.push(category);
    }
    setFilters({ ...filters, categories: newCategories });
  };

  const handleApplyFilters = () => {
    // TODO: Apply filters and return to search screen
    navigation.goBack();
  };

  const handleResetFilters = () => {
    setFilters({
      condition: [],
      categories: [],
      location: null,
      distance: 10,
      onlyWithImages: true,
      sortBy: "recent",
    });
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.filterHeader}>
        <TouchableOpacity
          style={styles.closeButton}
          onPress={() => navigation.goBack()}
        >
          <Ionicons name="close" size={24} color="#333" />
        </TouchableOpacity>
        <Text style={styles.filterTitle}>Bộ lọc</Text>
        <TouchableOpacity
          style={styles.resetButton}
          onPress={handleResetFilters}
        >
          <Text style={styles.resetText}>Đặt lại</Text>
        </TouchableOpacity>
      </View>

      <ScrollView style={styles.filterContent}>
        {/* Condition Filter */}
        <View style={styles.filterSection}>
          <Text style={styles.filterSectionTitle}>Tình trạng</Text>
          {conditions.map((condition) => (
            <TouchableOpacity
              key={condition}
              style={styles.filterOption}
              onPress={() => toggleCondition(condition)}
            >
              <Text style={styles.filterOptionText}>{condition}</Text>
              <View
                style={[
                  styles.checkbox,
                  filters.condition.includes(condition) &&
                    styles.checkboxSelected,
                ]}
              >
                {filters.condition.includes(condition) && (
                  <Ionicons name="checkmark" size={16} color="#fff" />
                )}
              </View>
            </TouchableOpacity>
          ))}
        </View>

        {/* Categories Filter */}
        <View style={styles.filterSection}>
          <Text style={styles.filterSectionTitle}>Danh mục</Text>
          <View style={styles.categoriesGrid}>
            {categories.map((category) => (
              <TouchableOpacity
                key={category}
                style={[
                  styles.categoryChip,
                  filters.categories.includes(category) &&
                    styles.categoryChipSelected,
                ]}
                onPress={() => toggleCategory(category)}
              >
                <Text
                  style={[
                    styles.categoryChipText,
                    filters.categories.includes(category) &&
                      styles.categoryChipTextSelected,
                  ]}
                >
                  {category}
                </Text>
              </TouchableOpacity>
            ))}
          </View>
        </View>

        {/* Location Filter */}
        <View style={styles.filterSection}>
          <Text style={styles.filterSectionTitle}>Khoảng cách</Text>
          <Slider
            style={styles.slider}
            value={filters.distance}
            onValueChange={(value) =>
              setFilters({ ...filters, distance: value })
            }
            minimumValue={1}
            maximumValue={50}
            step={1}
            minimumTrackTintColor="#4A90E2"
            maximumTrackTintColor="#ddd"
          />
          <Text style={styles.sliderValue}>
            Trong phạm vi {filters.distance} km
          </Text>
        </View>

        {/* Additional Options */}
        <View style={styles.filterSection}>
          <View style={styles.switchOption}>
            <Text style={styles.switchOptionText}>
              Chỉ hiện sản phẩm có ảnh
            </Text>
            <Switch
              value={filters.onlyWithImages}
              onValueChange={(value) =>
                setFilters({ ...filters, onlyWithImages: value })
              }
              trackColor={{ false: "#ddd", true: "#4A90E2" }}
              thumbColor="#fff"
            />
          </View>
        </View>

        {/* Sort Options */}
        <View style={styles.filterSection}>
          <Text style={styles.filterSectionTitle}>Sắp xếp theo</Text>
          {["recent", "popular", "nearest"].map((option) => (
            <TouchableOpacity
              key={option}
              style={styles.sortOption}
              onPress={() => setFilters({ ...filters, sortBy: option })}
            >
              <Text style={styles.sortOptionText}>
                {option === "recent" && "Mới nhất"}
                {option === "popular" && "Phổ biến nhất"}
                {option === "nearest" && "Gần nhất"}
              </Text>
              <View
                style={[
                  styles.radio,
                  filters.sortBy === option && styles.radioSelected,
                ]}
              />
            </TouchableOpacity>
          ))}
        </View>
      </ScrollView>

      <View style={styles.filterFooter}>
        <TouchableOpacity
          style={styles.applyButton}
          onPress={handleApplyFilters}
        >
          <Text style={styles.applyButtonText}>Áp dụng</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}
