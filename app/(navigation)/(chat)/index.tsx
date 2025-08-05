import React from "react";
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  useColorScheme,
  Image,
} from "react-native";
import { Ionicons, FontAwesome5 } from "@expo/vector-icons";
import { useRouter } from "expo-router";

type OptionProps = {
  icon: React.ReactNode;
  title: string;
  subtitle: string;
  onPress: () => void;
  isDark: boolean;
};

function SupportOption({ icon, title, subtitle, onPress, isDark }: OptionProps) {
  return (
    <TouchableOpacity
      style={[
        styles.option,
        {
          backgroundColor: isDark ? "#2C2C2E" : "#F1ECF9",
        },
      ]}
      onPress={onPress}
    >
      <View
        style={[
          styles.iconContainer,
          {
            backgroundColor: isDark ? "#3A3A3C" : "#E3D5F7",
          },
        ]}
      >
        {icon}
      </View>
      <View>
        <Text
          style={[
            styles.title,
            { color: isDark ? "#FFFFFF" : "#000000" },
          ]}
        >
          {title}
        </Text>
        <Text
          style={[
            styles.subtitle,
            { color: isDark ? "#D1D5DB" : "#4B0082" },
          ]}
        >
          {subtitle}
        </Text>
      </View>
    </TouchableOpacity>
  );
}

export default function SupportScreen() {
  const router = useRouter();
  const theme = useColorScheme();
  const isDark = theme === "dark";

  const background = isDark ? "#000000" : "#FFFFFF";
  const titleColor = isDark ? "#FFFFFF" : "#000000";

  return (
    <View style={[styles.container, { backgroundColor: background }]}>
      <Text style={[styles.header, { color: titleColor }]}>
        Assistance client
      </Text>

    
      <Image
        source={require("@/assets/images/chat.png")} 
        
        style={styles.banner}
        resizeMode="contain"
      />

      <ScrollView contentContainerStyle={styles.scroll}>
        <SupportOption
          icon={<Ionicons name="chatbox-ellipses" size={24} color="#7C3AED" />}
          title="Chat"
          subtitle="Chat textuel"
          onPress={() => router.push('/(navigation)/(chat)/chat1')}
          isDark={isDark}
        />
        <SupportOption
          icon={<Ionicons name="call" size={24} color="#7C3AED" />}
          title="Rappel"
          subtitle="Demander un rappel"
          onPress={() => router.push('/(navigation)/(chat)/rappel')}
          isDark={isDark}
        />
       
        <SupportOption
          icon={<Ionicons name="phone-portrait" size={24} color="#7C3AED" />}
          title="Contacts"
          subtitle="E-mail, téléphone, etc."
          onPress={() => router.push("/support/contacts")}
          isDark={isDark}
        />
       
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 60,
    paddingHorizontal: 16,
  },
  header: {
    fontSize: 22,
    fontWeight: "700",
    marginBottom: 10,
  },
  banner: {
    width: "100%",
    height: 250,
    marginBottom: 20,
    borderRadius: 12,
  },
  scroll: {
    paddingBottom: 50,
  },
  option: {
    flexDirection: "row",
    alignItems: "center",
    padding: 16,
    borderRadius: 12,
    marginVertical: 6,
  },
  iconContainer: {
    marginRight: 16,
    padding: 10,
    borderRadius: 50,
  },
  title: {
    fontSize: 16,
    fontWeight: "600",
  },
  subtitle: {
    fontSize: 14,
  },
});
