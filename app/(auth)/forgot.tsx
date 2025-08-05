import PhoneCheckSVG from "@/assets/icon/icon4.svg";
import PngImage from "@/assets/images/OTP.png";
import { useThemeColor } from "@/components/useThemeColors";
import { Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import React, { useState } from "react";
import {
  Dimensions,
  Image,
  SafeAreaView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";

const { width, height } = Dimensions.get("window");

export default function PhoneVerificationScreen() {
  const [phone, setPhone] = useState("");
  const router = useRouter();
  const { colors } = useThemeColor();

  const handleSendCode = () => {
    console.log("Code envoyé à : +237" + phone);
  };

  return (
    <SafeAreaView style={[styles.container, { backgroundColor: colors.background }]}>
      <View style={StyleSheet.absoluteFill}>
        <PhoneCheckSVG
          width={width}
          height={height}
          preserveAspectRatio="xMidYMid slice"
        />
      </View>

      <View style={styles.overlay}>
        <TouchableOpacity style={styles.backArrow} onPress={() => router.back()}>
          <Ionicons name="arrow-back" size={30} color={colors.text} />
        </TouchableOpacity>

        <Text style={[styles.title, { color: colors.text }]}>Check your inbox</Text>

        <Image source={PngImage} style={styles.pngImage} resizeMode="contain" />

        <Text style={[styles.subtitle, { color: colors.text }]}>
          We will send you a one-time password to this mobile number
        </Text>

        <View style={[styles.phoneInput, { borderBottomColor: colors.primary }]}>
          <Text style={[styles.countryCode, { color: colors.text }]}>+237</Text>
          <TextInput
            style={[styles.input, { color: colors.text }]}
            placeholder="Enter your phone number"
            placeholderTextColor={colors.textDim}
            keyboardType="phone-pad"
            value={phone}
            onChangeText={setPhone}
          />
        </View>

        <TouchableOpacity
  style={[styles.button, { backgroundColor: colors.primary }]}
  onPress={() =>
    router.push({
      pathname: "/forgot2",
      params: { phone },
    })
  }
>
  <Text style={styles.buttonText}>Get code</Text>
</TouchableOpacity>


      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    position: "relative",
  },
  overlay: {
    flex: 1,
    paddingHorizontal: 24,
    marginTop: 90,
  },
  backArrow: {
    alignSelf: "flex-start",
    marginBottom: 50, 
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    textAlign: "center",
    marginBottom: 40,
  },
  pngImage: {
    width: "100%",
    height: 150,
    marginBottom: 20,
  },
  subtitle: {
    textAlign: "center",
    fontSize: 14,
    marginBottom: 20,
  },
  phoneInput: {
    flexDirection: "row",
    alignItems: "center",
    borderBottomWidth: 2,
    paddingBottom: 6,
    marginBottom: 30,
  },
  countryCode: {
    fontSize: 16,
    fontWeight: "bold",
    marginRight: 8,
  },
  input: {
    flex: 1,
    fontSize: 16,
  },
  button: {
    paddingVertical: 14,
    borderRadius: 30,
    alignItems: "center",
    marginTop: 40,
  },
  buttonText: {
    color: "#fff",
    fontWeight: "bold",
    fontSize: 16,
  },
});
