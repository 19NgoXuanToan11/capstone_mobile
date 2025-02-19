  import React from "react";
  import { createDrawerNavigator } from "@react-navigation/drawer";
  import CustomDrawerContent from "./CustomDrawerContent";
  import ProfileScreen from "../../../screens/profile/ProfileScreen";
  import MyListingsScreen from "../../../screens/profile/MyListingsScreen";
  import MyExchangesScreen from "../../../screens/profile/MyExchangesScreen";
  import NotificationListScreen from "../../../screens/notification/NotificationListScreen";
  import SettingsScreen from "../../../screens/profile/SettingsScreen";

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
        <Drawer.Screen name="MainTabs" component={MainTabs} />
        <Drawer.Screen name="Profile" component={ProfileScreen} />
        <Drawer.Screen name="MyListings" component={MyListingsScreen} />
        <Drawer.Screen name="MyExchanges" component={MyExchangesScreen} />
        <Drawer.Screen name="Notifications" component={NotificationListScreen} />
        <Drawer.Screen name="Settings" component={SettingsScreen} />
      </Drawer.Navigator>
    );
  }
