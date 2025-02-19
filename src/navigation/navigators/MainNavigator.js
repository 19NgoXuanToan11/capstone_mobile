import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import CustomTabBar from "../components/tabBars/CustomTabBar";
import HomeScreen from "../../screens/home/HomeScreen";
import ExchangeScreen from "../../screens/exchange/ExchangeScreen";
import ChatScreen from "../../screens/chat/ChatListScreen";
import NotificationScreen from "../../screens/notification/NotificationListScreen";

const Tab = createBottomTabNavigator();

export default function MainNavigator() {
  return (
    <Tab.Navigator
      tabBar={(props) => <CustomTabBar {...props} />}
      screenOptions={{
        headerShown: false,
        tabBarShowLabel: false,
      }}
    >
      <Tab.Screen name="Trang chủ" component={HomeScreen} />
      <Tab.Screen name="Trao đổi" component={ExchangeScreen} />
      <Tab.Screen name="Chat" component={ChatScreen} />
      <Tab.Screen name="Thông báo" component={NotificationScreen} />
    </Tab.Navigator>
  );
}
