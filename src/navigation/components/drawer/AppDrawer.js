import React from "react";
import { createDrawerNavigator } from "@react-navigation/drawer";
import CustomDrawerContent from "./CustomDrawerContent";
import MainNavigator from "../../navigators/MainNavigator";
import ProfileScreen from "../../../screens/profile/ProfileScreen";
import MyListingsScreen from "../../../screens/profile/MyListingsScreen";
import MyExchangesScreen from "../../../screens/profile/MyExchangesScreen";
import SettingsScreen from "../../../screens/profile/SettingsScreen";
import NotificationListScreen from "../../../screens/notification/NotificationListScreen";
import HomeScreen from "../../../screens/home/HomeScreen";
import FavoritesScreen from "../../../screens/favorite/FavoritesScreen";
import ProductDetailScreen from "../../../screens/product/ProductDetailScreen";
const Drawer = createDrawerNavigator();

export default function AppDrawer() {
  return (
    <Drawer.Navigator
      drawerContent={(props) => <CustomDrawerContent {...props} />}
      screenOptions={{
        headerShown: false,
        drawerStyle: {
          width: "75%",
        },
      }}
    >
      <Drawer.Screen name="MainTabs" component={MainNavigator} />
      <Drawer.Screen name="Home" component={HomeScreen} />
      <Drawer.Screen name="ProductDetail" component={ProductDetailScreen} />
      <Drawer.Screen name="Profile" component={ProfileScreen} />
      <Drawer.Screen name="MyProducts" component={MyListingsScreen} />
      <Drawer.Screen name="MyExchanges" component={MyExchangesScreen} />
      <Drawer.Screen name="Settings" component={SettingsScreen} />
      <Drawer.Screen name="Favorites" component={FavoritesScreen} />
      <Drawer.Screen name="Notifications" component={NotificationListScreen} />
    </Drawer.Navigator>
  );
}
