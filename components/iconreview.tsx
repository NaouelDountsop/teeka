import React from 'react';
import { View, TouchableOpacity, StyleSheet } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import BackgroundSvg from "@/assets/icon/icon3.svg";
import { useThemeColor } from '@/components/useThemeColors';

export default function RappelSimplifie() {
  const navigation = useNavigation();
  const { colors } = useThemeColor();

  const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: colors.background,
    },
    svgWrapper: {
       position: 'absolute',
       alignItems: 'center',
       zIndex: 1,
    },
    backButtonWrapper: {
      top: 40,
      left: 10,
      zIndex: 2,
      marginTop :40,
    },
    backButton: {
      padding: 10,
    },
  });

  return (
    <View style={styles.container}>
    
     
     
      <View style={styles.svgWrapper}>
        <BackgroundSvg />
      </View>
    </View>
  );
}
