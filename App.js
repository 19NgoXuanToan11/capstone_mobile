import React, { useState } from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { SafeAreaProvider } from "react-native-safe-area-context";
import OnBoardingScreen from "./src/screens/onboarding/OnBoardingScreen";
import MainNavigator from "./src/navigation/navigators/MainNavigator";

const Stack = createNativeStackNavigator();

export default function App() {
  const [hasSeenOnboarding, setHasSeenOnboarding] = useState(false);

  return (
    <SafeAreaProvider>
      <NavigationContainer>
        <Stack.Navigator screenOptions={{ headerShown: false }}>
          {!hasSeenOnboarding ? (
            <Stack.Screen
              name="OnBoarding"
              component={OnBoardingScreen}
              initialParams={{ setHasSeenOnboarding }}
            />
          ) : (
            <Stack.Screen name="Main" component={MainNavigator} />
          )}
        </Stack.Navigator>
      </NavigationContainer>
    </SafeAreaProvider>
  );
}
