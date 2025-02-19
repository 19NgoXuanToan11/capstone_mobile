import React, { useState, useRef, useEffect } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  FlatList,
  Image,
  KeyboardAvoidingView,
  Platform,
  StyleSheet,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Ionicons } from "@expo/vector-icons";
import { LinearGradient } from "expo-linear-gradient";

export default function ChatDetailScreen({ navigation, route }) {
  const { userId, userName, userAvatar, productId } = route.params;
  const [messages, setMessages] = useState([]);
  const [inputText, setInputText] = useState("");
  const flatListRef = useRef(null);

  useEffect(() => {
    setMessages([
      {
        id: "1",
        text: "Chào bạn, sản phẩm này còn không?",
        timestamp: "09:30",
        sender: userId,
        type: "text",
      },
      {
        id: "2",
        text: "Còn bạn nhé, bạn có thể xem thêm hình ảnh ở đây",
        timestamp: "09:31",
        sender: "me",
        type: "text",
      },
      {
        id: "3",
        type: "image",
        imageUrl: "https://picsum.photos/400/300",
        timestamp: "09:32",
        sender: "me",
      },
      {
        id: "4",
        text: "Bạn có thể giảm giá được không?",
        timestamp: "09:33",
        sender: userId,
        type: "text",
      },
    ]);
  }, []);

  const handleSend = () => {
    if (inputText.trim()) {
      const newMessage = {
        id: Date.now().toString(),
        text: inputText,
        timestamp: new Date().toLocaleTimeString([], {
          hour: "2-digit",
          minute: "2-digit",
        }),
        sender: "me",
        type: "text",
      };
      setMessages((prev) => [...prev, newMessage]);
      setInputText("");
      flatListRef.current?.scrollToEnd();
    }
  };

  const renderMessage = ({ item }) => {
    const isMe = item.sender === "me";

    return (
      <View
        style={[
          styles.messageContainer,
          isMe ? styles.myMessage : styles.theirMessage,
        ]}
      >
        {!isMe && (
          <Image source={{ uri: userAvatar }} style={styles.messageAvatar} />
        )}
        <View
          style={[
            styles.messageBubble,
            isMe ? styles.myBubble : styles.theirBubble,
          ]}
        >
          {item.type === "text" ? (
            <Text style={[styles.messageText, isMe && styles.myMessageText]}>
              {item.text}
            </Text>
          ) : (
            <Image
              source={{ uri: item.imageUrl }}
              style={styles.messageImage}
              resizeMode="cover"
            />
          )}
          <Text
            style={[
              styles.timestamp,
              isMe ? styles.myTimestamp : styles.theirTimestamp,
            ]}
          >
            {item.timestamp}
          </Text>
        </View>
      </View>
    );
  };

  return (
    <SafeAreaView style={styles.container}>
      <LinearGradient colors={["#4A90E2", "#357ABD"]} style={styles.header}>
        <TouchableOpacity
          style={styles.backButton}
          onPress={() => navigation.goBack()}
        >
          <Ionicons name="arrow-back" size={24} color="#FFF" />
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.userInfo}
          onPress={() => navigation.navigate("UserProfile", { userId })}
        >
          <Image source={{ uri: userAvatar }} style={styles.avatar} />
          <View style={styles.userTextInfo}>
            <Text style={styles.userName}>{userName}</Text>
            <Text style={styles.userStatus}>Đang hoạt động</Text>
          </View>
        </TouchableOpacity>

        <View style={styles.headerActions}>
          <TouchableOpacity
            style={styles.headerButton}
            onPress={() => navigation.navigate("VoiceCall", { userId })}
          >
            <Ionicons name="call" size={24} color="#FFF" />
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.headerButton}
            onPress={() => navigation.navigate("VideoCall", { userId })}
          >
            <Ionicons name="videocam" size={24} color="#FFF" />
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.headerButton}
            onPress={() => navigation.navigate("ChatSettings", { userId })}
          >
            <Ionicons name="ellipsis-vertical" size={24} color="#FFF" />
          </TouchableOpacity>
        </View>
      </LinearGradient>

      <FlatList
        ref={flatListRef}
        data={messages}
        renderItem={renderMessage}
        keyExtractor={(item) => item.id}
        contentContainerStyle={styles.messagesList}
        onContentSizeChange={() => flatListRef.current?.scrollToEnd()}
      />

      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        keyboardVerticalOffset={Platform.OS === "ios" ? 90 : 0}
        style={styles.inputContainer}
      >
        <TouchableOpacity style={styles.attachButton}>
          <Ionicons name="add-circle-outline" size={24} color="#4A90E2" />
        </TouchableOpacity>

        <View style={styles.inputWrapper}>
          <TextInput
            style={styles.input}
            value={inputText}
            onChangeText={setInputText}
            placeholder="Nhập tin nhắn..."
            multiline
          />
          <TouchableOpacity style={styles.emojiButton}>
            <Ionicons name="happy-outline" size={24} color="#4A90E2" />
          </TouchableOpacity>
        </View>

        <TouchableOpacity
          style={[
            styles.sendButton,
            !inputText.trim() && styles.sendButtonDisabled,
          ]}
          onPress={handleSend}
          disabled={!inputText.trim()}
        >
          <Ionicons
            name="send"
            size={24}
            color={inputText.trim() ? "#4A90E2" : "#B0B0B0"}
          />
        </TouchableOpacity>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F8F9FA",
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: "rgba(255,255,255,0.1)",
  },
  backButton: {
    marginRight: 12,
  },
  userInfo: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
  },
  avatar: {
    width: 40,
    height: 40,
    borderRadius: 20,
    marginRight: 12,
    borderWidth: 2,
    borderColor: "#FFF",
  },
  userTextInfo: {
    flex: 1,
  },
  userName: {
    fontSize: 16,
    fontWeight: "600",
    color: "#FFF",
  },
  userStatus: {
    fontSize: 12,
    color: "#E0E0E0",
  },
  headerActions: {
    flexDirection: "row",
    alignItems: "center",
  },
  headerButton: {
    padding: 8,
    marginLeft: 8,
  },
  messagesList: {
    padding: 16,
  },
  messageContainer: {
    flexDirection: "row",
    marginBottom: 16,
    maxWidth: "80%",
  },
  myMessage: {
    alignSelf: "flex-end",
  },
  theirMessage: {
    alignSelf: "flex-start",
  },
  messageAvatar: {
    width: 32,
    height: 32,
    borderRadius: 16,
    marginRight: 8,
  },
  messageBubble: {
    padding: 12,
    borderRadius: 20,
    maxWidth: "100%",
  },
  myBubble: {
    backgroundColor: "#4A90E2",
    borderTopRightRadius: 4,
  },
  theirBubble: {
    backgroundColor: "#FFF",
    borderTopLeftRadius: 4,
  },
  messageText: {
    fontSize: 16,
    color: "#333",
  },
  myMessageText: {
    color: "#FFF",
  },
  messageImage: {
    width: 200,
    height: 150,
    borderRadius: 12,
  },
  timestamp: {
    fontSize: 12,
    marginTop: 4,
  },
  myTimestamp: {
    color: "rgba(255,255,255,0.7)",
    textAlign: "right",
  },
  theirTimestamp: {
    color: "#999",
  },
  inputContainer: {
    flexDirection: "row",
    alignItems: "center",
    padding: 12,
    backgroundColor: "#FFF",
    borderTopWidth: 1,
    borderTopColor: "#E0E0E0",
  },
  attachButton: {
    padding: 8,
  },
  inputWrapper: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#F0F2F5",
    borderRadius: 24,
    marginHorizontal: 8,
    paddingHorizontal: 16,
  },
  input: {
    flex: 1,
    fontSize: 16,
    maxHeight: 100,
    padding: 8,
  },
  emojiButton: {
    padding: 8,
  },
  sendButton: {
    padding: 8,
  },
  sendButtonDisabled: {
    opacity: 0.5,
  },
});
