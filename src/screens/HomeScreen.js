import { View, ScrollView, Text } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import Header from "../components/Header";
import Carousel from "../components/Carousel";
import Categories from "../components/Categories";
import FeaturedProducts from "../components/FeaturedProducts";
import styles from "../styles/HomeStyles";

export default function HomeScreen() {
  return (
    <SafeAreaView style={styles.container}>
      <Header />
      <ScrollView style={styles.scrollView}>
        <Carousel />
        <Categories />
        <FeaturedProducts />
      </ScrollView>
    </SafeAreaView>
  );
}
