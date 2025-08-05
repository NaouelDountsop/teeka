import SvgImage from "@/components/icon4";
import { useThemeColor } from "@/components/useThemeColors";
import { Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import React, { useState } from "react";
import {
  Alert,
  Dimensions,
  SafeAreaView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";

// Import du hook useUser depuis le contexte
import { useUser } from "@/context/UserContext";

const { width } = Dimensions.get("window");

export default function SignUpScreen() {
  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    city: "",
    password: "",
    confirmPassword: "",
  });

  const [agree, setAgree] = useState(false);
  const router = useRouter();

  const { colors } = useThemeColor(); 

  // Récupération de la fonction setUser du contexte
  const { setUser } = useUser();

  const handleInputChange = (field: string, value: string) => {
    setForm({ ...form, [field]: value });
  };

  const handleSubmit = () => {
    const { name, email, phone, city, password, confirmPassword } = form;

    if (!name || !email || !phone || !city || !password || !confirmPassword) {
      Alert.alert("Erreur", "Tous les champs sont obligatoires.");
      return;
    }

    if (password !== confirmPassword) {
      Alert.alert("Erreur", "Les mots de passe ne correspondent pas.");
      return;
    }

    if (!agree) {
      Alert.alert("Erreur", "Vous devez accepter les conditions.");
      return;
    }

    // Enregistre les données utilisateur dans le contexte
    setUser({ name, email, phone, city, password });

    Alert.alert("Succès", "Compte créé avec succès !");
    router.push("/login");
  };

  return (
    <SafeAreaView
      style={[styles.container, { backgroundColor: colors.background }]}
    >
      <TouchableOpacity
        style={[styles.backButton, { zIndex: 10 }]}
        onPress={() => router.back()}
      >
        <Ionicons name="arrow-back" size={24} color={colors.text} />
      </TouchableOpacity>

      <View style={[styles.header, { backgroundColor: colors.cardBackground }]}>
        <SvgImage />
      </View>

      <View style={styles.formContainer}>
        <Text style={[styles.title, { color: colors.text }]}>Sign up</Text>

        {[
          { label: "Name", key: "name" },
          { label: "E-mail", key: "email" },
          { label: "Phone", key: "phone" },
          { label: "City", key: "city" },
          { label: "Password", key: "password", secure: true },
          { label: "Confirm password", key: "confirmPassword", secure: true },
        ].map((field) => (
          <TextInput
            key={field.key}
            style={[
              styles.input,
              {
                borderColor: colors.border,
                color: colors.text,
                backgroundColor: colors.cardBackground,
              },
            ]}
            placeholder={field.label}
            placeholderTextColor={colors.placeholderText || "gray"}
            secureTextEntry={field.secure}
            onChangeText={(text) => handleInputChange(field.key, text)}
          />
        ))}

        <View style={styles.checkboxContainer}>
          <TouchableOpacity onPress={() => setAgree(!agree)}>
            <Ionicons
              name={agree ? "checkbox" : "square-outline"}
              size={24}
              color={agree ? colors.primary : colors.textSecondary || "gray"}
            />
          </TouchableOpacity>
          <Text style={[styles.checkboxLabel, { color: colors.text }]}>
            I agree the terms and conditions
          </Text>
        </View>

        <TouchableOpacity
          style={[styles.button, { backgroundColor: colors.primary }]}
          onPress={handleSubmit}
        >
          <Text style={styles.buttonText}>Sign up</Text>
        </TouchableOpacity>

        <Text style={[styles.orText, { color: colors.text }]}>
          or sign in with social account
        </Text>

        <View style={styles.socialContainer}>
          <TouchableOpacity>
            <Ionicons name="logo-facebook" size={40} color="#1877F2" />
          </TouchableOpacity>
          <TouchableOpacity>
            <Ionicons name="logo-google" size={40} color="#DB4437" />
          </TouchableOpacity>
        </View>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    alignItems: "center",
  },
  formContainer: {
    flex: 1,
    paddingHorizontal: 20,
    justifyContent: "center",
    marginTop: 30,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginVertical: 10,
    alignSelf: "center",
    marginTop: 30,
  },
  input: {
    width: "100%",
    borderWidth: 1,
    borderRadius: 10,
    padding: 10,
    marginBottom: 12,
    marginTop: 5,
  },
  checkboxContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 20,
    marginTop: 25,
  },
  checkboxLabel: {
    marginLeft: 8,
    fontWeight: "500",
  },
  button: {
    paddingVertical: 15,
    borderRadius: 50,
    width: "100%",
    alignItems: "center",
    marginBottom: 10,
  },
  buttonText: {
    color: "#fff",
    fontWeight: "bold",
    fontSize: 16,
  },
  orText: {
    textAlign: "center",
    marginVertical: 10,
  },
  socialContainer: {
    flexDirection: "row",
    justifyContent: "center",
    gap: 25,
    marginTop: 5,
  },
  backButton: {
    position: "absolute",
    top: 50,
    left: 20,
    marginTop: 30,
  },
});
