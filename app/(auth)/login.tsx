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
  Image,
} from "react-native";

const { width } = Dimensions.get("window");

export default function SignUpScreen() {
  const [form, setForm] = useState({
    name: "",
    password: "",
  });

  const router = useRouter();
  const { colors } = useThemeColor();

  const handleInputChange = (field: string, value: string) => {
    setForm({ ...form, [field]: value });
  };

  const handleSubmit = () => {
    const { name, password } = form;

    if (!name || !password) {
      Alert.alert("Erreur", "Tous les champs sont obligatoires.");
      return;
    }

    Alert.alert("Succès", "Connexion réussie !");
  };

  return (
    <SafeAreaView
      style={[styles.container, { backgroundColor: colors.background }]}
    >
      <TouchableOpacity
        style={[styles.backButton, { zIndex: 10 }]}
        onPress={() => router.push('/(navigation)/(paniers)')}
      >
        <Ionicons name="arrow-back" size={24} color={colors.text} />
      </TouchableOpacity>

      <View style={[styles.header, { backgroundColor: colors.cardBackground }]}>
        <SvgImage />
      </View>

      <View style={styles.formContainer}>
        <Text style={[styles.title, { color: colors.text }]}>Sign in</Text>

       
        <Image
          source={require("@/assets/images/logo.png")} 
          style={{
            width: 350,
            height: 200,
            alignSelf: "center",
            marginBottom: 20,
          }}
          resizeMode="contain"
        />

        {[
          { label: "Name", key: "name" },
          { label: "Password", key: "password", secure: true },
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

        <TouchableOpacity onPress={() => router.push("/forgot")}>
          <Text
            style={{
              color: colors.primary4,
              alignSelf: "flex-end",
              marginBottom: 15,
            }}
          >
            Mot de passe oublié ?
          </Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={[styles.button, { backgroundColor: colors.primary }]}
          onPress={() => router.push("/(navigation)/(paniers)/paiement1")}
        >
          <Text style={styles.buttonText}>Sign in</Text>
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

        <View style={{ alignItems: "center", marginBottom: 20 }}>
          <Text style={{ color: colors.text }}>
            Pas de compte ?{" "}
            <Text
              style={{ color: colors.primary4, fontWeight: "bold" }}
              onPress={() => router.push("/register")}
            >
              S’inscrire
            </Text>
          </Text>
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
  },
  title: {
    fontSize: 40,
    fontWeight: "bold",
    marginVertical: 10,
    alignSelf: "center",
  },
  input: {
    width: "100%",
    borderWidth: 1,
    borderRadius: 10,
    padding: 10,
    marginBottom: 12,
    marginTop: 0,
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
  },
  backButton: {
    position: "absolute",
    top: 50,
    left: 20,
    marginTop: 30,
  },
});
