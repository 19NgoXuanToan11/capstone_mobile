import React from "react";
import { Ionicons } from "@expo/vector-icons";
import { COLORS } from "../../../theme";

export function TabIcon({ routeName, isFocused }) {
  let iconName;

  switch (routeName) {
    case "Trang chủ":
      iconName = isFocused ? "home" : "home-outline";
      break;
    case "Trao đổi":
      iconName = isFocused ? "swap-horizontal" : "swap-horizontal-outline";
      break;
    case "Chat":
      iconName = isFocused ? "chatbubble" : "chatbubble-outline";
      break;
    case "Thông báo":
      iconName = isFocused ? "notifications" : "notifications-outline";
      break;
    default:
      iconName = "help-outline";
  }

  return (
    <Ionicons
      name={iconName}
      size={24}
      color={isFocused ? COLORS.primary : COLORS.inactive}
    />
  );
}
