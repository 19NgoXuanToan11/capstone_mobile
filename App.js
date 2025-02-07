import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { createDrawerNavigator } from "@react-navigation/drawer";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { Ionicons } from "@expo/vector-icons";
import { View, TouchableOpacity, Text } from "react-native";

// Auth Screens
import LoginScreen from "./src/screens/auth/LoginScreen";
import RegisterScreen from "./src/screens/auth/RegisterScreen";
import ForgotPasswordScreen from "./src/screens/auth/ForgotPasswordScreen";

// Main Screens
import HomeScreen from "./src/screens/HomeScreen";
import ExchangeScreen from "./src/screens/ExchangeScreen";
import NotificationListScreen from "./src/screens/notification/NotificationListScreen";
import ChatListScreen from "./src/screens/chat/ChatListScreen";
import ChatDetailScreen from "./src/screens/chat/ChatDetailScreen";

// Profile Screens
import ProfileScreen from "./src/screens/profile/ProfileScreen";
import EditProfileScreen from "./src/screens/profile/EditProfileScreen";
import MyListingsScreen from "./src/screens/profile/MyListingsScreen";
import MyExchangesScreen from "./src/screens/profile/MyExchangesScreen";
import SettingsScreen from "./src/screens/profile/SettingsScreen";

// Product Screens
import ProductDetailScreen from "./src/screens/product/ProductDetailScreen";
import AddProductScreen from "./src/screens/product/AddProductScreen";
import EditProductScreen from "./src/screens/product/EditProductScreen";

// Search Screens
import SearchScreen from "./src/screens/search/SearchScreen";
import SearchFilterScreen from "./src/screens/search/SearchFilterScreen";

// Exchange Process Screens
import ExchangeProposalScreen from "./src/screens/exchange/ExchangeProposalScreen";
import ExchangeConfirmationScreen from "./src/screens/exchange/ExchangeConfirmationScreen";
import ExchangeDetailScreen from "./src/screens/exchange/ExchangeDetailScreen";
import ExchangeReviewScreen from "./src/screens/exchange/ExchangeReviewScreen";

// Custom Components
import CustomTabBar from "./src/components/navigation/CustomTabBar";
import CustomDrawerContent from "./src/components/navigation/CustomDrawerContent";
import Carousel from "./src/components/Carousel";
import Categories from "./src/components/Categories";
import FeaturedProducts from "./src/components/FeaturedProducts";
import Header from "./src/components/Header";

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

function ChatStackNavigator() {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="ChatList"
        component={ChatListScreen}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="ChatDetail"
        component={ChatDetailScreen}
        options={{ headerShown: false }}
      />
    </Stack.Navigator>
  );
}

// Main Tab Navigator
function MainTabs() {
  return (
    <Tab.Navigator
      tabBar={(props) => <CustomTabBar {...props} />}
      screenOptions={{
        headerShown: false,
        tabBarActiveTintColor: "#4A90E2",
        tabBarInactiveTintColor: "#999999",
      }}
    >
      <Tab.Screen
        name="Trang chủ"
        component={HomeScreen}
        options={{
          tabBarIcon: ({ focused, color, size }) => (
            <Ionicons
              name={focused ? "home" : "home-outline"}
              size={size}
              color={color}
            />
          ),
        }}
      />
      <Tab.Screen
        name="Trao đổi"
        component={ExchangeScreen}
        options={{
          tabBarIcon: ({ focused, color, size }) => (
            <Ionicons
              name={focused ? "swap-horizontal" : "swap-horizontal-outline"}
              size={size}
              color={color}
            />
          ),
        }}
      />
      <Tab.Screen
        name="Chat"
        component={ChatStackNavigator}
        options={{
          tabBarIcon: ({ focused, color, size }) => (
            <Ionicons
              name={focused ? "chatbubble" : "chatbubble-outline"}
              size={size}
              color={color}
            />
          ),
        }}
      />
      <Tab.Screen
        name="Thông báo"
        component={NotificationListScreen}
        options={{
          tabBarIcon: ({ focused, color, size }) => (
            <Ionicons
              name={focused ? "notifications" : "notifications-outline"}
              size={size}
              color={color}
            />
          ),
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
      <Drawer.Screen name="MainTabs" component={MainTabs} />
      <Drawer.Screen name="Profile" component={ProfileScreen} />
      <Drawer.Screen name="MyListings" component={MyListingsScreen} />
      <Drawer.Screen name="MyExchanges" component={MyExchangesScreen} />
      <Drawer.Screen name="Notifications" component={NotificationListScreen} />
      <Drawer.Screen name="Settings" component={SettingsScreen} />
    </Drawer.Navigator>
  );
}

export default function App() {
  // TODO: Add authentication state management
  const isAuthenticated = true; // Thay đổi thành false để xem màn hình đăng nhập

  return (
    <SafeAreaProvider>
      <NavigationContainer>
        <Stack.Navigator screenOptions={{ headerShown: false }}>
          {!isAuthenticated ? (
            // Auth Stack
            <>
              <Stack.Screen name="Login" component={LoginScreen} />
              <Stack.Screen name="Register" component={RegisterScreen} />
              <Stack.Screen
                name="ForgotPassword"
                component={ForgotPasswordScreen}
              />
            </>
          ) : (
            // Main App Stack
            <>
              <Stack.Screen name="MainApp" component={DrawerNavigator} />

              {/* Product Stack */}
              <Stack.Screen
                name="ProductDetail"
                component={ProductDetailScreen}
              />
              <Stack.Screen name="AddProduct" component={AddProductScreen} />
              <Stack.Screen name="EditProduct" component={EditProductScreen} />

              {/* Search Stack */}
              <Stack.Screen name="Search" component={SearchScreen} />
              <Stack.Screen
                name="SearchFilter"
                component={SearchFilterScreen}
              />

              {/* Exchange Stack */}
              <Stack.Screen
                name="ExchangeProposal"
                component={ExchangeProposalScreen}
              />
              <Stack.Screen
                name="ExchangeConfirmation"
                component={ExchangeConfirmationScreen}
              />
              <Stack.Screen
                name="ExchangeDetail"
                component={ExchangeDetailScreen}
              />
              <Stack.Screen
                name="ExchangeReview"
                component={ExchangeReviewScreen}
              />

              {/* Notification Stack */}
              <Stack.Screen
                name="NotificationList"
                component={NotificationListScreen}
              />

              {/* Profile Stack */}
              <Stack.Screen name="EditProfile" component={EditProfileScreen} />
              <Stack.Screen name="MyListings" component={MyListingsScreen} />
              <Stack.Screen name="MyExchanges" component={MyExchangesScreen} />
              <Stack.Screen name="Settings" component={SettingsScreen} />
            </>
          )}
        </Stack.Navigator>
      </NavigationContainer>
    </SafeAreaProvider>
  );
}
