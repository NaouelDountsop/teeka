import React, { useEffect, useRef } from "react";
import {
  Animated,
  Dimensions,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  Image,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useUser } from "@/context/UserContext";

const { width } = Dimensions.get("window");

type ProfileDrawerProps = {
  visible: boolean;
  onClose: () => void;
};

export default function ProfileDrawer({ visible, onClose }: ProfileDrawerProps) {
  const { user } = useUser();
  const translateX = useRef(new Animated.Value(width)).current;

  useEffect(() => {
    Animated.timing(translateX, {
      toValue: visible ? 0 : width,
      duration: 300,
      useNativeDriver: true,
    }).start();
  }, [visible]);

  if (!visible) return null;

  return (
    <>
      {/* Fond semi-transparent */}
      <TouchableOpacity style={styles.overlay} onPress={onClose} activeOpacity={1} />

      <Animated.View style={[styles.drawer, { transform: [{ translateX }] }]}>
        <TouchableOpacity onPress={onClose} style={styles.closeButton}>
          <Ionicons name="close" size={28} color="#fff" />
        </TouchableOpacity>

        <Image
          source={user?.image ? { uri: user.image } : require("@/assets/images/im3.png")}
          style={styles.avatar}
        />
        <Text style={styles.info}>Nom : {user?.name || "N/A"}</Text>
        <Text style={styles.info}>Email : {user?.email || "N/A"}</Text>
        <Text style={styles.info}>Téléphone : {user?.phone || "N/A"}</Text>
        <Text style={styles.info}>Ville : {user?.city || "N/A"}</Text>
      </Animated.View>
    </>
  );
}

const styles = StyleSheet.create({
  overlay: {
    position: "absolute",
    top: 0,
    left: 0,
    bottom: 0,
    right: 0,
    backgroundColor: "#00000080",
    zIndex: 999,
  },
  drawer: {
    position: "absolute",
    top: 0,
    right: 0,
    bottom: 0,
    width: "75%",
    backgroundColor: "#7E57C2",
    padding: 20,
    zIndex: 1000,
    elevation: 5,
  },
  closeButton: {
    alignSelf: "flex-end",
  },
  avatar: {
    width: 100,
    height: 100,
    borderRadius: 50,
    alignSelf: "center",
    marginBottom: 20,
  },
  info: {
    color: "#fff",
    fontSize: 16,
    marginBottom: 12,
  },
});
