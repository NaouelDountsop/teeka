// context/AvatarContext.tsx
import React, { createContext, useContext, useState, useEffect } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";

const AVATAR_KEY = "user_avatar_uri";

type AvatarContextType = {
  avatarUri: string | null;
  setAvatarUri: (uri: string) => void;
};

const AvatarContext = createContext<AvatarContextType | undefined>(undefined);

export const AvatarProvider = ({ children }: { children: React.ReactNode }) => {
  const [avatarUri, setAvatarUriState] = useState<string | null>(null);

  useEffect(() => {
    const loadAvatar = async () => {
      try {
        const savedUri = await AsyncStorage.getItem(AVATAR_KEY);
        if (savedUri) {
          setAvatarUriState(savedUri);
        }
      } catch (err) {
        console.warn("Erreur chargement avatar :", err);
      }
    };

    loadAvatar();
  }, []);

  const setAvatarUri = (uri: string) => {
    setAvatarUriState(uri);
    AsyncStorage.setItem(AVATAR_KEY, uri).catch(console.warn);
  };

  return (
    <AvatarContext.Provider value={{ avatarUri, setAvatarUri }}>
      {children}
    </AvatarContext.Provider>
  );
};

export const useAvatar = () => {
  const context = useContext(AvatarContext);
  if (!context) {
    throw new Error("useAvatar must be used within an AvatarProvider");
  }
  return context;
};
