import { useThemeColor } from "@/components/useThemeColors";
import { Ionicons } from "@expo/vector-icons";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useRouter } from "expo-router";
import React, { useEffect, useState } from "react";
import {
  StyleSheet,
  Text,
  TouchableOpacity,
  View
} from "react-native";

const LANGUAGES = [
  { code: "en", label: "English" },
  { code: "fr", label: "Français" },
];

export default function LanguageScreen() {
  const { colors } = useThemeColor();
  const router = useRouter();
  const [selectedLang, setSelectedLang] = useState<string | null>(null);

  useEffect(() => {
    const loadLang = async () => {
      const savedLang = await AsyncStorage.getItem("appLanguage");
      if (savedLang) setSelectedLang(savedLang);
    };
    loadLang();
  }, []);

  const selectLanguage = async (lang: string) => {
    await AsyncStorage.setItem("appLanguage", lang);
    setSelectedLang(lang);
  };

  return (
    <View style={[styles.container, { backgroundColor: colors.background }]}>
   
      <TouchableOpacity onPress={() => router.back()} style={styles.backButton}>
        <Ionicons name="arrow-back" size={24} color={colors.text} />
      </TouchableOpacity>

      <Text style={[styles.title, { color: colors.text }]}>Choose Language</Text>

      {LANGUAGES.map((lang) => (
        <TouchableOpacity
          key={lang.code}
          onPress={() => selectLanguage(lang.code)}
          style={[
            styles.button,
            {
              backgroundColor:
                selectedLang === lang.code ? colors.primary : colors.card,
            },
          ]}
        >
          <Text
            style={{
              color:
                selectedLang === lang.code
                  ? colors.buttonText
                  : colors.text,
            }}
          >
            {lang.label}
          </Text>
        </TouchableOpacity>
      ))}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 100,
    paddingHorizontal: 20,
  },
  backButton: {
    position: "absolute",
    top: 50,
    left: 20,
    padding: 10,
  },
  title: {
    fontSize: 22,
    fontWeight: "bold",
    marginBottom: 30,
    textAlign: "center",
  },
  button: {
    padding: 15,
    borderRadius: 10,
    marginBottom: 15,
    alignItems: "center",
  },
});
