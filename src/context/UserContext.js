import React, { createContext, useState, useEffect, useContext } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";

// Tạo context
export const UserContext = createContext();

// Provider component
export const UserProvider = ({ children }) => {
  const [userData, setUserData] = useState({
    fullName: "",
    email: "",
    phone: "",
    address: "",
    profileImage: null,
  });
  const [isLoading, setIsLoading] = useState(true);

  // Tải thông tin người dùng từ AsyncStorage khi ứng dụng khởi động
  useEffect(() => {
    const loadUserData = async () => {
      try {
        const userDataString = await AsyncStorage.getItem("userData");
        if (userDataString) {
          const parsedUserData = JSON.parse(userDataString);
          setUserData(parsedUserData);
        }
      } catch (error) {
        console.log("Lỗi khi tải thông tin người dùng:", error);
      } finally {
        setIsLoading(false);
      }
    };

    loadUserData();
  }, []);

  // Hàm cập nhật thông tin người dùng
  const updateUserData = async (newUserData) => {
    try {
      await AsyncStorage.setItem("userData", JSON.stringify(newUserData));
      setUserData(newUserData);
      return true;
    } catch (error) {
      console.log("Lỗi khi cập nhật thông tin người dùng:", error);
      return false;
    }
  };

  return (
    <UserContext.Provider value={{ userData, updateUserData, isLoading }}>
      {children}
    </UserContext.Provider>
  );
};

// Custom hook để sử dụng context
export const useUser = () => useContext(UserContext);
