import PhoneCheckSVG from "@/assets/icon/icon4.svg";
import PngImage from "@/assets/images/OTP.png";
import { useThemeColor } from "@/components/useThemeColors";
import { Ionicons } from "@expo/vector-icons";
import { useLocalSearchParams, useRouter } from "expo-router";
import React, { useState } from "react";
import {
  Alert,
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

export default function OtpVerificationScreen() {
  const [otp, setOtp] = useState(["", "", "", ""]);
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const router = useRouter();
  const { colors } = useThemeColor();
  const { phone } = useLocalSearchParams();

  const handleChange = (text: string, index: number) => {
    const newOtp = [...otp];
    newOtp[index] = text;
    setOtp(newOtp);
  };

  const handleVerify = () => {
    if (!newPassword || !confirmPassword) {
      Alert.alert("Erreur", "Veuillez remplir les deux champs de mot de passe.");
      return;
    }
    if (newPassword !== confirmPassword) {
      Alert.alert("Erreur", "Les mots de passe ne correspondent pas.");
      return;
    }
    
    router.push("./succes");
  };

  return (
    <SafeAreaView style={[styles.container, { backgroundColor: colors.background }]}>
      <View style={StyleSheet.absoluteFill}>
        <PhoneCheckSVG width={width} height={height} preserveAspectRatio="xMidYMid slice" />
      </View>

      <View style={styles.overlay}>
        <TouchableOpacity style={styles.backArrow} onPress={() => router.back()}>
          <Ionicons name="arrow-back" size={30} color={colors.text} />
        </TouchableOpacity>

        <Image source={PngImage} style={styles.pngImage} resizeMode="contain" />

        <TextInput
          placeholder="Nouveau mot de passe"
          secureTextEntry
          value={newPassword}
          onChangeText={setNewPassword}
          placeholderTextColor={colors.textSecondary1 || "#888"}
          style={[styles.input, { borderColor: colors.primary, color: colors.text }]}
        />

        <TextInput
          placeholder="Confirmer le mot de passe"
          secureTextEntry
          value={confirmPassword}
          onChangeText={setConfirmPassword}
          placeholderTextColor={colors.textSecondary1|| "#888"}
          style={[styles.input, { borderColor: colors.primary, color: colors.text }]}
        />

        <TouchableOpacity
          style={[styles.button, { backgroundColor: colors.primary }]}
          onPress={handleVerify}
        >
          <Text style={styles.buttonText}>Apply change</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
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
  input: {
    width: "100%",
    borderWidth: 1,
    borderRadius: 10,
    padding: 12,
    marginBottom: 15,
  },
  pngImage: {
    width: "100%",
    height: 150,
    marginBottom: 20,
  },
  button: {
    paddingVertical: 14,
    borderRadius: 30,
    alignItems: "center",
    marginTop: 20,
  },
  buttonText: {
    color: "#fff",
    fontWeight: "bold",
    fontSize: 16,
  },
});
