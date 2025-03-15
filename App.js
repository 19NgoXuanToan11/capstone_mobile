import React, { useState, useEffect } from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { SafeAreaProvider } from "react-native-safe-area-context";
import AsyncStorage from "@react-native-async-storage/async-storage";

import WelcomeScreen from "./src/screens/welcome/WelcomeScreen";
import OnBoardingScreen from "./src/screens/onboarding/OnBoardingScreen";
import AppDrawer from "./src/navigation/components/drawer/AppDrawer";
import LoginScreen from "./src/screens/auth/LoginScreen";
import RegisterScreen from "./src/screens/auth/RegisterScreen";
import ForgotPasswordScreen from "./src/screens/auth/ForgotPasswordScreen";

const Stack = createNativeStackNavigator();

export default function App() {
  const [hasSeenOnboarding, setHasSeenOnboarding] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  // Kiểm tra trạng thái đăng nhập khi khởi động ứng dụng
  useEffect(() => {
    const checkLoginStatus = async () => {
      try {
        const userToken = await AsyncStorage.getItem("userToken");
        if (userToken) {
          setIsLoggedIn(true);
        }
      } catch (error) {
        console.log("Lỗi khi kiểm tra trạng thái đăng nhập:", error);
      }
    };

    checkLoginStatus();
  }, []);

  // Hàm xử lý đăng nhập/đăng xuất để truyền xuống các màn hình con
  const authContext = React.useMemo(
    () => ({
      signIn: async () => {
        try {
          await AsyncStorage.setItem("userToken", "dummy-token");
          setIsLoggedIn(true);
        } catch (error) {
          console.log("Lỗi khi đăng nhập:", error);
        }
      },
      signOut: async () => {
        try {
          await AsyncStorage.removeItem("userToken");
          setIsLoggedIn(false);
        } catch (error) {
          console.log("Lỗi khi đăng xuất:", error);
        }
      },
    }),
    []
  );

  return (
    <AuthContext.Provider value={authContext}>
      <SafeAreaProvider>
        <NavigationContainer>
          <Stack.Navigator screenOptions={{ headerShown: false }}>
            {!hasSeenOnboarding ? (
              <>
                <Stack.Screen name="Welcome" component={WelcomeScreen} />
                <Stack.Screen
                  name="OnBoarding"
                  component={OnBoardingScreen}
                  initialParams={{ setHasSeenOnboarding }}
                />
              </>
            ) : (
              <>
                <Stack.Screen
                  name="Main"
                  component={AppDrawer}
                  initialParams={{ isLoggedIn }}
                />
                <Stack.Screen name="Login" component={LoginScreen} />
                <Stack.Screen name="Register" component={RegisterScreen} />
                <Stack.Screen
                  name="ForgotPassword"
                  component={ForgotPasswordScreen}
                />
              </>
            )}
          </Stack.Navigator>
        </NavigationContainer>
      </SafeAreaProvider>
    </AuthContext.Provider>
  );
}

// Tạo context để quản lý trạng thái đăng nhập
export const AuthContext = React.createContext();
