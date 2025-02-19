import { View, ScrollView, Text } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import Header from "../home/components/Header";
import Carousel from "../home/components/Carousel";
import Categories from "../home/components/Categories";
import FeaturedProducts from "../home/components/FeaturedProducts";
import styles from "../../styles/HomeStyles";

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
