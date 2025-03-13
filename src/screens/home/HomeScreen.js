import React from "react";
import {
  View,
  ScrollView,
  RefreshControl,
  StatusBar,
  Dimensions,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import Header from "./components/Header";
import QuickActions from "./components/QuickActions";
import Carousel from "./components/Carousel";
import Categories from "./components/Categories";
import RecommendedUsers from "./components/RecommendedUsers";
import FeaturedProducts from "./components/FeaturedProducts";
import styles from "../../styles/HomeStyles";

const { width, height } = Dimensions.get("window");

export default function HomeScreen() {
  const [refreshing, setRefreshing] = React.useState(false);

  const onRefresh = React.useCallback(() => {
    setRefreshing(true);
    // Thêm logic refresh data ở đây
    setTimeout(() => setRefreshing(false), 2000);
  }, []);

  return (
    <View style={[styles.container, { width, height }]}>
      <StatusBar
        translucent
        backgroundColor="transparent"
        barStyle="light-content"
      />
      <Header />
      <ScrollView
        style={styles.scrollView}
        contentContainerStyle={styles.scrollViewContent}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }
      >
        <Carousel />
        <QuickActions />
        <Categories />
        <RecommendedUsers />
        <FeaturedProducts />
      </ScrollView>
    </View>
  );
}
