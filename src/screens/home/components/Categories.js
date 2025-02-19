import { View, Text, ScrollView, TouchableOpacity, Image } from "react-native";
import styles from "../../../styles/HomeStyles";

export default function Categories() {
  const categories = [
    { id: 1, name: "Điện thoại", icon: "📱" },
    { id: 2, name: "Laptop", icon: "💻" },
    { id: 3, name: "Máy tính bảng", icon: "📱" },
    { id: 4, name: "Đồng hồ", icon: "⌚" },
    { id: 5, name: "Phụ kiện", icon: "🎧" },
  ];

  return (
    <View style={styles.categorySection}>
      <Text style={styles.sectionTitle}>Danh mục</Text>
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        style={styles.categoryScroll}
      >
        {categories.map((category) => (
          <TouchableOpacity key={category.id} style={styles.categoryItem}>
            <Text style={styles.categoryIcon}>{category.icon}</Text>
            <Text style={styles.categoryName}>{category.name}</Text>
          </TouchableOpacity>
        ))}
      </ScrollView>
    </View>
  );
}
