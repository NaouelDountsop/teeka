import React, { useState, useRef, useEffect } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  FlatList,
  KeyboardAvoidingView,
  Platform,
  Keyboard,
  useWindowDimensions,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useThemeColor } from "@/components/useThemeColors";
import BackgroundSvg from "@/assets/icon/icon3.svg";

type Message = {
  id: string;
  text: string;
  from: "user" | "bot";
  time?: string;
};

export default function ChatSupportScreen() {
  const [messages, setMessages] = useState<Message[]>([]);
  const [inputText, setInputText] = useState("");
  const flatListRef = useRef<FlatList>(null);
  const { colors } = useThemeColor();
  const { width } = useWindowDimensions();

  const [isKeyboardVisible, setKeyboardVisible] = useState(false);

  useEffect(() => {
    const showSubscription = Keyboard.addListener("keyboardDidShow", () =>
      setKeyboardVisible(true)
    );
    const hideSubscription = Keyboard.addListener("keyboardDidHide", () =>
      setKeyboardVisible(false)
    );

    return () => {
      showSubscription.remove();
      hideSubscription.remove();
    };
  }, []);

  const sendMessage = () => {
    if (inputText.trim() === "") return;

    const newMessage: Message = {
      id: Date.now().toString(),
      text: inputText,
      from: "user",
      time: new Date().toLocaleTimeString().slice(0, 5),
    };

    setMessages((prev) => [...prev, newMessage]);
    setInputText("");

    setTimeout(() => {
      setMessages((prev) => [
        ...prev,
        {
          id: (Date.now() + 1).toString(),
          text: "Merci pour votre message. Nous sommes là pour vous aider !",
          from: "bot",
          time: new Date().toLocaleTimeString().slice(0, 5),
        },
      ]);
    }, 1000);

    setTimeout(() => {
      flatListRef.current?.scrollToEnd({ animated: true });
    }, 300);
  };

  const renderItem = ({ item }: { item: Message }) => (
    <View
      style={[
        styles.messageContainer,
        {
          alignSelf: item.from === "user" ? "flex-end" : "flex-start",
          backgroundColor:
            item.from === "user" ? colors.primary : colors.card,
        },
      ]}
    >
      <Text
        style={[
          styles.messageText,
          {
            color: item.from === "user" ? "#fff" : colors.text,
          },
        ]}
      >
        {item.text}
      </Text>
      <Text
        style={[
          styles.messageTime,
          { color: item.from === "user" ? "#eee" : "#888" },
        ]}
      >
        {item.time}
      </Text>
    </View>
  );

  return (
    <View style={{ flex: 1, backgroundColor: colors.background }}>
   
      <View style={{ position: "absolute", top: 0, width: "100%", zIndex: 0 }}>
        <BackgroundSvg
          width={width}
          height={width * 2.2}
          preserveAspectRatio="none"
        />
      </View>

   
      <KeyboardAvoidingView
        style={[styles.container]}
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        keyboardVerticalOffset={100}
      >
        <FlatList
          ref={flatListRef}
          data={messages}
          keyExtractor={(item) => item.id}
          renderItem={renderItem}
          contentContainerStyle={{ flexGrow: 1, padding: 12, paddingTop: width * 0.6 }}
          keyboardShouldPersistTaps="handled"
          onContentSizeChange={() =>
            flatListRef.current?.scrollToEnd({ animated: true })
          }
        />

      
        <View style={[styles.inputContainer]}>
          <View
            style={[
              styles.inputWrapper,
              {
                backgroundColor: colors.card,
                borderColor: colors.border,
                shadowColor: colors.text,
              },
            ]}
          >
            <TextInput
              style={[styles.input, { color: colors.text }]}
              placeholder="Votre message..."
              placeholderTextColor={colors.text + "77"}
              value={inputText}
              onChangeText={setInputText}
              multiline
            />
            <TouchableOpacity
              onPress={sendMessage}
              style={[styles.sendButton, { backgroundColor: colors.primary }]}
            >
              <Ionicons name="send" size={18} color="#fff" />
            </TouchableOpacity>
          </View>
        </View>
      </KeyboardAvoidingView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  messageContainer: {
    maxWidth: "85%",
    padding: 10,
    borderRadius: 16,
    marginBottom: 10,
  },
  messageText: {
    fontSize: 12,
  },
  messageTime: {
    fontSize: 10,
    textAlign: "right",
    marginTop: 4,
  },
  inputContainer: {
    padding: 10,
  },
  inputWrapper: {
    flexDirection: "row",
    borderRadius: 24,
    borderWidth: 1,
    paddingHorizontal: 10,
    paddingVertical: 6,
    alignItems: "flex-end",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    elevation: 3,
  },
  input: {
    flex: 1,
    fontSize: 12,
    paddingHorizontal: 8,
    paddingTop: 8,
    maxHeight: 100,
  },
  sendButton: {
    borderRadius: 20,
    justifyContent: "center",
    alignItems: "center",
    padding: 10,
    marginLeft: 6,
  },
});
