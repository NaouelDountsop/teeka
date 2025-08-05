import SvgFullWidth from "@/components/icon3";
import { useThemeColor } from "@/components/useThemeColors";
import { FontAwesome5, Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import React, { useState } from "react";
import {
  Appearance,
  Modal,
  Platform,
  ScrollView,
  StyleSheet,
  Switch,
  Text,
  TouchableOpacity,
  View,
} from "react-native";

export default function SettingsScreen() {
  const router = useRouter();
  const { colors, scheme } = useThemeColor();
  const [visibleModal, setVisibleModal] = useState<string | null>(null);

  const settings = [
    {
      icon: <FontAwesome5 name="globe" size={20} color={colors.primary4} />,
      label: "Langage",
      key: "langage",
      content: "Changer la langue de l'application",
    },
    {
      icon: <Ionicons name="information-circle" size={20} color={colors.primary4} />,
      label: "À propos de TEEKA.SA",
      key: "about",
      content: "Informations sur TEEKA.SA",
    },
    {
      icon: <Ionicons name="sunny" size={22} color={colors.primary4} />,
      label: "Apparence",
      key: "theme",
      content: "",
    },
    {
      icon: <Ionicons name="star" size={24} color={colors.primary4} />,
      label: "Noter l'application",
      key: "rate",
      content: "",
    },
    {
      icon: <Ionicons name="notifications" size={24} color={colors.primary4} />,
      label: "Notifications",
      key: "notification",
      content: "",
    },
  ];

  const ThemeModal = ({ visible, onClose }: { visible: boolean; onClose: () => void }) => {
    const handleThemeChange = async (theme: "light" | "dark") => {
      Appearance.setColorScheme(theme);
    };

    return (
      <Modal visible={visible} transparent animationType="slide" onRequestClose={onClose}>
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <TouchableOpacity style={styles.closeButton} onPress={onClose}>
              <Ionicons name="close" size={24} color="#000" />
            </TouchableOpacity>
            <Text style={styles.modalTitle}>Choisir un thème</Text>
            <TouchableOpacity style={styles.optionButton} onPress={() => handleThemeChange("light")}>
              <Ionicons name="sunny" size={22} color="#FFD700" style={{ marginRight: 8 }} />
              <Text style={styles.optionTextModal}>Clair</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.optionButton} onPress={() => handleThemeChange("dark")}>
              <Ionicons name="moon" size={22} color="#000" style={{ marginRight: 8 }} />
              <Text style={styles.optionTextModal}>Sombre</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    );
  };

  const RatingModal = ({
    visible,
    onClose,
    onSubmit,
  }: {
    visible: boolean;
    onClose: () => void;
    onSubmit: (rating: number) => void;
  }) => {
    const [rating, setRating] = useState(0);

    return (
      <Modal transparent visible={visible} animationType="slide" onRequestClose={onClose}>
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <TouchableOpacity style={styles.closeButton} onPress={onClose}>
              <Ionicons name="close" size={24} />
            </TouchableOpacity>
            <Text style={styles.modalTitle}>Noter l'application</Text>
            <View style={styles.starsContainer}>
              {[...Array(5)].map((_, index) => (
                <TouchableOpacity key={index} onPress={() => setRating(index + 1)}>
                  <Ionicons
                    name={index < rating ? "star" : "star-outline"}
                    size={32}
                    color="gold"
                    style={{ marginHorizontal: 6 }}
                  />
                </TouchableOpacity>
              ))}
            </View>
            <TouchableOpacity
              style={[styles.submitButton, { backgroundColor: "gold" }]}
              onPress={() => {
                onSubmit(rating);
                onClose();
              }}
            >
              <Text style={styles.submitText}>Envoyer</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    );
  };

  const LanguageModal = ({
    visible,
    onClose,
    onSelect,
  }: {
    visible: boolean;
    onClose: () => void;
    onSelect: (lang: string) => void;
  }) => {
    return (
      <Modal transparent visible={visible} animationType="slide" onRequestClose={onClose}>
        <View style={styles.modalContainer}>
          <View style={[styles.modalContent]}>
            <TouchableOpacity style={styles.closeButton} onPress={onClose}>
              <Ionicons
                name="close"
                size={24}
                color={scheme === "light" ? "#fff" : colors.text6}
              />
            </TouchableOpacity>
            <Text
              style={[
                styles.modalTitle,
                { color: scheme === "light" ? "#fff" : colors.text6 },
              ]}
            >
              Choisir une langue
            </Text>
            <TouchableOpacity
              style={styles.optionButton}
              onPress={() => {
                onSelect("fr");
                onClose();
              }}
            >
              <Text style={{ color: scheme === "light" ? "#fff" : colors.text6 }}>
                🇫🇷 Français
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.optionButton}
              onPress={() => {
                onSelect("en");
                onClose();
              }}
            >
              <Text style={{ color: scheme === "light" ? "#fff" : colors.text6 }}>
                🇬🇧 English
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    );
  };

  // ✅ NotificationModal mis à jour ici
  const NotificationModal = ({
    visible,
    onClose,
  }: {
    visible: boolean;
    onClose: () => void;
  }) => {
    const [isEnabled, setIsEnabled] = useState(true);
    const toggleSwitch = () => setIsEnabled((prev) => !prev);

    return (
      <Modal transparent visible={visible} animationType="slide" onRequestClose={onClose}>
        <View style={styles.modalContainer}>
          <View
            style={[
              styles.modalContent,
              { backgroundColor: "#fff" }, // Forcer fond blanc
            ]}
          >
            <TouchableOpacity style={styles.closeButton} onPress={onClose}>
              <Ionicons name="close" size={24} color="#000" />
            </TouchableOpacity>
            <Text style={[styles.modalTitle, { color: "#000" }]}>Notifications</Text>
            <View style={{ flexDirection: "row", justifyContent: "space-between", marginTop: 20 }}>
              <Text style={{ fontSize: 16, color: "#000" }}>Activer les notifications</Text>
              <Switch
                value={isEnabled}
                onValueChange={toggleSwitch}
                trackColor={{ false: "#767577", true: "#007AFF" }}
                thumbColor={"#fff"}
              />
            </View>
          </View>
        </View>
      </Modal>
    );
  };

  return (
    <View style={[styles.container, { backgroundColor: colors.background }]}>
      <SvgFullWidth />

      <View style={[styles.header, { marginTop: -200 }]}>
        <TouchableOpacity onPress={() => router.back()}>
          <Ionicons name="arrow-back" size={25} color={colors.text} />
        </TouchableOpacity>
        <Text style={[styles.headerTitle, { color: colors.text }]}>Paramètres</Text>
        <View style={{ width: 25 }} />
      </View>

      <ScrollView contentContainerStyle={styles.scrollContent}>
        {settings.map((item, index) => (
          <TouchableOpacity
            key={index}
            style={[
              styles.optionCard,
              {
                backgroundColor: colors.card,
                ...(scheme === "light"
                  ? {
                      shadowColor: colors.primary,
                      shadowOffset: { width: 0, height: 4 },
                      shadowOpacity: 0.2,
                      shadowRadius: 1,
                      elevation: 4,
                    }
                  : {
                      borderWidth: 0.15,
                      borderColor: "#FFFFFF",
                    }),
              },
            ]}
            onPress={() => setVisibleModal(item.key)}
          >
            <View style={styles.iconBox}>{item.icon}</View>
            <Text style={[styles.optionText, { color: colors.text }]}>{item.label}</Text>
            <Ionicons name="chevron-forward" size={20} color={colors.outline} />
          </TouchableOpacity>
        ))}
      </ScrollView>

      {settings.map((item) => {
        if (item.key === "theme") {
          return (
            <ThemeModal
              key={item.key}
              visible={visibleModal === item.key}
              onClose={() => setVisibleModal(null)}
            />
          );
        }
        if (item.key === "rate") {
          return (
            <RatingModal
              key={item.key}
              visible={visibleModal === item.key}
              onClose={() => setVisibleModal(null)}
              onSubmit={(rating) => console.log("Note donnée :", rating)}
            />
          );
        }
        if (item.key === "langage") {
          return (
            <LanguageModal
              key={item.key}
              visible={visibleModal === item.key}
              onClose={() => setVisibleModal(null)}
              onSelect={(lang) => console.log("Langue choisie:", lang)}
            />
          );
        }
        if (item.key === "notification") {
          return (
            <NotificationModal
              key={item.key}
              visible={visibleModal === item.key}
              onClose={() => setVisibleModal(null)}
            />
          );
        }
        return (
          <Modal
            key={item.key}
            visible={visibleModal === item.key}
            transparent
            animationType="slide"
            onRequestClose={() => setVisibleModal(null)}
          >
            <View style={styles.modalContainer}>
              <View style={styles.modalContent}>
                <TouchableOpacity
                  style={styles.closeButton}
                  onPress={() => setVisibleModal(null)}
                >
                  <Ionicons name="close" size={24} color="#000" />
                </TouchableOpacity>
                <Text style={styles.modalText}>{item.content}</Text>
              </View>
            </View>
          </Modal>
        );
      })}
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1 },
  header: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 16,
    paddingTop: 10,
    paddingBottom: 16,
  },
  headerTitle: { fontSize: 22, fontWeight: "bold", marginTop: 150 },
  scrollContent: { padding: 16, paddingTop: 0 },
  optionCard: {
    flexDirection: "row",
    alignItems: "center",
    borderRadius: 12,
    paddingVertical: 14,
    paddingHorizontal: 16,
    marginBottom: 12,
    marginTop: 0,
    ...Platform.select({ android: { elevation: 2 } }),
  },
  iconBox: { marginRight: 14 },
  optionText: { flex: 1, fontSize: 16, fontWeight: "500" },
  modalContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
  },
  modalContent: {
    width: "100%",
    borderRadius: 20,
    padding: 20,
    backgroundColor: "#fff",
  },
  modalText: {
    fontSize: 16,
    color: "#000",
    textAlign: "center",
    marginTop: 16,
  },
  closeButton: { alignSelf: "flex-end" },
  modalTitle: {
    fontSize: 18,
    fontWeight: "bold",
    alignSelf: "center",
    marginBottom: 16,
  },
  optionButton: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 12,
  },
  optionTextModal: {
    fontSize: 16,
  },
  starsContainer: {
    flexDirection: "row",
    justifyContent: "center",
    marginBottom: 24,
  },
  submitButton: {
    paddingHorizontal: 24,
    paddingVertical: 10,
    borderRadius: 12,
    alignSelf: "center",
  },
  submitText: {
    fontWeight: "bold",
    color: "#fff",
  },
});
