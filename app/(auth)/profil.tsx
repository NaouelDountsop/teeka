import React from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Image,
  ScrollView,
  useWindowDimensions,
  useColorScheme,
} from "react-native";
import * as ImagePicker from "expo-image-picker";
import { Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";

import { useAvatar } from "@/context/AvatarContext";
import { useThemeColor } from "@/components/useThemeColors";
import BackgroundSvg from "@/assets/icon/icon3.svg";

export default function ProfileScreen() {
  const router = useRouter();
  const { colors } = useThemeColor();
  const { width } = useWindowDimensions();
  const svgHeight = Math.min(width * 2, 600);

  const { avatarUri, setAvatarUri } = useAvatar();

  const theme = useColorScheme(); // 'light' ou 'dark'

  const pickImage = async () => {
    const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (status !== "granted") {
      alert("Permission refusée pour accéder à la galerie.");
      return;
    }

    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [1, 1],
      quality: 1,
    });

    if (!result.canceled && result.assets.length > 0) {
      setAvatarUri(result.assets[0].uri);
    }
  };

  const handleLogout = () => {
    router.replace("/slide");
  };

  const user = {
    name: "Naouel DOUNTSOP",
    email: "naouel@example.com",
    phone: "+237 123 456 789",
  };

  const shadowStyle =
    theme === "light"
      ? {
          shadowColor: "#7E57C2",
          shadowOffset: { width: 0.05, height: 0.5 },
          shadowOpacity: 0.001,
          shadowRadius: 0.1,
          elevation: 1,
        }
      : {
          shadowColor: "#000",
          shadowOffset: { width: 0, height: 1 },
          shadowOpacity: 0.1,
          shadowRadius: 2,
          elevation: 2,
        };

  return (
    <View style={[styles.container, { backgroundColor: colors.background }]}>
      {/* SVG en fond */}
      <View style={[styles.svgContainer, { height: svgHeight }]}>
        <BackgroundSvg width={width} height={svgHeight} preserveAspectRatio="none" />
      </View>

      {/* Menu haut */}
      <View style={styles.menuBar}>
        <TouchableOpacity onPress={() => router.back()} style={styles.menuitem}>
          <Ionicons name="arrow-back" size={24} color={colors.text} />
        </TouchableOpacity>
      </View>

      <ScrollView contentContainerStyle={styles.content} showsVerticalScrollIndicator={false}>
        <View style={styles.avatarContainer}>
          <Image source={{ uri: avatarUri || "https://i.pravatar.cc/150?img=5" }} style={styles.avatar} />
          <TouchableOpacity style={styles.cameraButton} onPress={pickImage}>
            <Ionicons name="camera" size={20} color="#fff" />
          </TouchableOpacity>
        </View>

        {/* Infos personnelles stylées */}
        <View style={[styles.infoCard, shadowStyle]}>
          <Ionicons name="person-outline" size={16} color={colors.primary9} />
          <Text style={[styles.value, { color: colors.text }]}>{user.name}</Text>
        </View>

        <View style={[styles.infoCard, shadowStyle]}>
          <Ionicons name="mail-outline" size={16} color={colors.primary9} />
          <Text style={[styles.value, { color: colors.text }]}>{user.email}</Text>
        </View>

        <View style={[styles.infoCard, shadowStyle]}>
          <Ionicons name="call-outline" size={16} color={colors.primary9} />
          <Text style={[styles.value, { color: colors.text }]}>{user.phone}</Text>
        </View>

        <TouchableOpacity
          style={[styles.button, { backgroundColor: colors.primary, marginTop: 30 }]}
          onPress={() => router.push("./profile/edit")}
        >
          <Ionicons name="create-outline" size={18} color="#fff" />
          <Text style={styles.buttonText}>Modifier mes informations</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={[styles.button, { backgroundColor: "#FF3B30", marginTop: 16 }]}
          onPress={handleLogout}
        >
          <Ionicons name="log-out-outline" size={18} color="#fff" />
          <Text style={styles.buttonText}>Se déconnecter</Text>
        </TouchableOpacity>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1 },
  svgContainer: { position: "absolute", top: 0, left: 0, right: 0 },
  menuBar: {
    position: "absolute",
    top: 30,
    left: 10,
    right: 20,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    zIndex: 10,
  },
  menuitem: { marginTop: 40 },
  content: {
    alignItems: "center",
    paddingTop: 140,
    paddingBottom: 30,
    paddingHorizontal: 20,
  },
  avatarContainer: {
    position: "relative",
    width: 130,
    height: 130,
    marginBottom: 10,
  },
  avatar: {
    width: "100%",
    height: "100%",
    borderRadius: 65,
    borderWidth: 3,
    borderColor: "#fff",
  },
  cameraButton: {
    position: "absolute",
    bottom: 0,
    right: 0,
    backgroundColor: "#0008",
    borderRadius: 20,
    padding: 6,
  },
  infoCard: {
    width: "100%",
    backgroundColor: "#fff2",
    borderRadius: 5,
    padding: 16,
    marginVertical: 8,
  },
  value: {
    fontSize: 16,
    fontWeight: "600",
    marginTop: 2,
  },
  button: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderRadius: 10,
  },
  buttonText: { color: "#fff", fontWeight: "bold", marginLeft: 10 },
});
