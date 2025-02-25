import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import CustomTabBar from "../components/navigation/CustomTabBar";
import HomeScreen from "../screens/home/HomeScreen";
import ExchangeScreen from "../screens/exchange/ExchangeScreen";
import ChatScreen from "../screens/chat/ChatScreen";
import NotificationScreen from "../screens/notification/NotificationScreen";

const Tab = createBottomTabNavigator();

export default function MainNavigator() {
  return (
    <Tab.Navigator tabBar={(props) => <CustomTabBar {...props} />}>
      <Tab.Screen name="Trang chủ" component={HomeScreen} />
      <Tab.Screen name="Trao đổi" component={ExchangeScreen} />
      <Tab.Screen name="Chat" component={ChatScreen} />
      <Tab.Screen name="Thông báo" component={NotificationScreen} />
    </Tab.Navigator>
  );
}
