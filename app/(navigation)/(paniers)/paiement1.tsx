import React from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Image,
  useWindowDimensions,
  ScrollView,
  useColorScheme,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";

export default function PaymentMethodScreen() {
  const router = useRouter();
  const { width } = useWindowDimensions();
  const colorScheme = useColorScheme();

  // Couleurs dynamiques selon le thème
  const isDark = colorScheme === "dark";
  const backgroundColor = isDark ? "#000" : "#fff";
  const textColor = isDark ? "#fff" : "#000";
  const borderColor = isDark ? "#444" : "#ccc";
  const cardBackground = isDark ? "#111" : "#fff";

  return (
    <ScrollView contentContainerStyle={[styles.container, { backgroundColor }]}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => router.push("/(auth)/login")}>
          <Ionicons name="arrow-back" size={24} color={textColor} />
        </TouchableOpacity>
        <Text style={[styles.title, { color: textColor }]}>Payment method</Text>
      </View>

      <Image
        source={require("@/assets/images/p1.png")}
        style={[
          styles.illustration,
          { width: width * 0.8, height: width * 0.8 },
        ]}
        resizeMode="contain"
      />

      

      <TouchableOpacity
        style={[
          styles.paymentButton,
          {
            backgroundColor: cardBackground,
            borderColor,
            shadowColor: isDark ? "transparent" : "#000", 
            shadowOpacity: isDark ? 0 : 0.1,
            shadowOffset: { width: 0, height: 4 },
            shadowRadius: 6,
            elevation: isDark ? 0 : 4,
          },
        ]}
        onPress={() => router.push("./payment/orange")}
      >
        <Image
          source={require("@/assets/images/image 1.png")}
          style={styles.logo}
        />
        <Text style={[styles.buttonText, { color: textColor }]}>
          Orange Money
        </Text>
        <Ionicons name="chevron-forward" size={16} color={textColor} />
      </TouchableOpacity>

      <TouchableOpacity
        style={[
          styles.paymentButton,
          {
            backgroundColor: cardBackground,
            borderColor,
            shadowColor: isDark ? "transparent" : "#000",
            shadowOpacity: isDark ? 0 : 0.1,
            shadowOffset: { width: 0, height: 4 },
            shadowRadius: 6,
            elevation: isDark ? 0 : 4,
          },
        ]}
        onPress={() => router.push("./payment/mtn")}
      >
        <Image
          source={require("@/assets/images/image 2.png")}
          style={styles.logo}
        />
        <Text style={[styles.buttonText, { color: textColor }]}>
          Mobile Money
        </Text>
        <Ionicons name="chevron-forward" size={16} color={textColor} />
      </TouchableOpacity>

      <TouchableOpacity
        style={[
          styles.paymentButton,
          {
            backgroundColor: cardBackground,
            borderColor,
            shadowColor: isDark ? "transparent" : "#000",
            shadowOpacity: isDark ? 0 : 0.1,
            shadowOffset: { width: 0, height: 4 },
            shadowRadius: 6,
            elevation: isDark ? 0 : 4,
          },
        ]}
        onPress={() => router.push("./payment/billion")}
      >
        <Image
          source={require("@/assets/images/golden.jpg")}
          style={styles.logo}
        />
        <Text style={[styles.buttonText, { color: textColor }]}>
          Golden Billion
        </Text>
        <Ionicons name="chevron-forward" size={16} color={textColor} />
      </TouchableOpacity>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    alignItems: "center",
    paddingTop: 60,
    paddingBottom: 30,
    flexGrow: 1,
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    width: "90%",
    marginBottom: 20,
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
    marginLeft: 10,
  },
  illustration: {
    marginVertical: 20,
  },
  paymentButton: {
    flexDirection: "row",
    alignItems: "center",
    borderWidth: 1,
    borderRadius: 14,
    paddingVertical: 12,
    paddingHorizontal: 16,
    width: "90%",
    marginVertical: 10,
    justifyContent: "space-between",
  },
  logo: {
    width: 40,
    height: 40,
    resizeMode: "contain",
  },
  buttonText: {
    flex: 1,
    marginLeft: 15,
    fontSize: 16,
    fontWeight: "500",
  },
});
