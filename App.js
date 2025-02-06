import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { createDrawerNavigator } from "@react-navigation/drawer";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { Ionicons } from "@expo/vector-icons";
import { View, Platform, TouchableOpacity, Text } from "react-native";

// Auth Screens
import LoginScreen from "./src/screens/auth/LoginScreen";
import RegisterScreen from "./src/screens/auth/RegisterScreen";
import ForgotPasswordScreen from "./src/screens/auth/ForgotPasswordScreen";

// Main Screens
import HomeScreen from "./src/screens/HomeScreen";
import ExchangeScreen from "./src/screens/ExchangeScreen";
import NotificationListScreen from "./src/screens/notification/NotificationListScreen";
import ChatListScreen from "./src/screens/chat/ChatListScreen";

// Profile Screens
import ProfileScreen from "./src/screens/profile/ProfileScreen";
import EditProfileScreen from "./src/screens/profile/EditProfileScreen";
import MyListingsScreen from "./src/screens/profile/MyListingsScreen";
import MyExchangesScreen from "./src/screens/profile/MyExchangesScreen";
import SettingsScreen from "./src/screens/profile/SettingsScreen";

// Product Screens
import ProductDetailScreen from "./src/screens/product/ProductDetailScreen";
import AddProductScreen from "./src/screens/product/AddProductScreen";
import SearchScreen from "./src/screens/search/SearchScreen";

// Custom Components
import CustomTabBar from "./src/components/navigation/CustomTabBar";
import CustomDrawerContent from "./src/components/navigation/CustomDrawerContent";

const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();
const Drawer = createDrawerNavigator();

function TabBar({ state, descriptors, navigation }) {
  return (
    <View
      style={{
        flexDirection: "row",
        backgroundColor: "#ffffff",
        paddingBottom: 5,
        paddingTop: 5,
        borderTopWidth: 1,
        borderTopColor: "#e0e0e0",
      }}
    >
      {state.routes.map((route, index) => {
        const { options } = descriptors[route.key];
        const label =
          options.tabBarLabel !== undefined
            ? options.tabBarLabel
            : options.title !== undefined
            ? options.title
            : route.name;

        const isFocused = state.index === index;

        const onPress = () => {
          const event = navigation.emit({
            type: "tabPress",
            target: route.key,
            canPreventDefault: true,
          });

          if (!isFocused && !event.defaultPrevented) {
            navigation.navigate(route.name);
          }
        };

        let iconName;
        if (route.name === "Home") {
          iconName = isFocused ? "home" : "home-outline";
        } else if (route.name === "Search") {
          iconName = isFocused ? "search" : "search-outline";
        } else if (route.name === "Chat") {
          iconName = isFocused ? "chatbubble" : "chatbubble-outline";
        } else if (route.name === "Profile") {
          iconName = isFocused ? "person" : "person-outline";
        }

        return (
          <TouchableOpacity
            key={index}
            onPress={onPress}
            style={{
              flex: 1,
              alignItems: "center",
              justifyContent: "center",
              padding: 10,
            }}
          >
            <Ionicons
              name={iconName}
              size={24}
              color={isFocused ? "#4A90E2" : "#999999"}
            />
          </TouchableOpacity>
        );
      })}
    </View>
  );
}

// Tab Navigator
function TabNavigator() {
  return (
    <Tab.Navigator tabBar={(props) => <CustomTabBar {...props} />}>
      <Tab.Screen
        name="HomeTab"
        component={HomeScreen}
        options={{
          tabBarLabel: "Trang chủ",
          headerShown: false,
        }}
      />
      <Tab.Screen
        name="ExchangeTab"
        component={ExchangeScreen}
        options={{
          tabBarLabel: "Trao đổi",
          headerShown: false,
        }}
      />
    </Tab.Navigator>
  );
}

// Drawer Navigator
function DrawerNavigator() {
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
      <Drawer.Screen name="MainTabs" component={TabNavigator} />
      <Drawer.Screen name="Profile" component={ProfileScreen} />
      <Drawer.Screen name="MyListings" component={MyListingsScreen} />
      <Drawer.Screen name="MyExchanges" component={MyExchangesScreen} />
      <Drawer.Screen name="Notifications" component={NotificationListScreen} />
      <Drawer.Screen name="Settings" component={SettingsScreen} />
    </Drawer.Navigator>
  );
}

export default function App() {
  return (
    <SafeAreaProvider>
      <NavigationContainer>
        <Stack.Navigator screenOptions={{ headerShown: false }}>
          {/* Auth Stack */}
          <Stack.Group>
            <Stack.Screen name="Login" component={LoginScreen} />
            <Stack.Screen name="Register" component={RegisterScreen} />
            <Stack.Screen
              name="ForgotPassword"
              component={ForgotPasswordScreen}
            />
          </Stack.Group>

          {/* Main App Stack */}
          <Stack.Group>
            <Stack.Screen name="Main" component={DrawerNavigator} />
            <Stack.Screen
              name="ProductDetail"
              component={ProductDetailScreen}
            />
            <Stack.Screen name="AddProduct" component={AddProductScreen} />
            <Stack.Screen name="Search" component={SearchScreen} />
            <Stack.Screen name="Chat" component={ChatListScreen} />
            <Stack.Screen name="EditProfile" component={EditProfileScreen} />
          </Stack.Group>
        </Stack.Navigator>
      </NavigationContainer>
    </SafeAreaProvider>
  );
}
