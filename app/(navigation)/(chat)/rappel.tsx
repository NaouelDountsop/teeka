import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
  useWindowDimensions,
  useColorScheme,
} from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import BackgroundSvg from '@/assets/icon/icon3.svg';
import { useThemeColor } from '@/components/useThemeColors';

export default function RappelSimplifie() {
  const navigation = useNavigation();
  const { colors } = useThemeColor();
  const { width, height } = useWindowDimensions();
  const theme = useColorScheme();

  const [phone, setPhone] = useState('');
  const [message, setMessage] = useState('');

  // Couleur de fond des inputs selon le thème
  const inputBackground = theme === 'dark' ? colors.card : '#f3efff';

  const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: colors.background,
    },
    svgWrapper: {
      position: 'absolute',
      top: 0,
      left: 0,
      right: 0,
      alignItems: 'center',
      zIndex: 0,
    },
    backButtonWrapper: {
      position: 'absolute',
      top: 50,
      left: 10,
      zIndex: 2,
    },
    backButton: {
      padding: 10,
      borderRadius: 25,
      marginTop: 15,
    },
    content: {
      flexGrow: 1,
      paddingHorizontal: 20,
      paddingTop: height * 0.35,
      paddingBottom: 40,
      marginTop: -130,
    },
    title: {
      fontSize: 24,
      fontWeight: 'bold',
      color: colors.text,
      marginBottom: 20,
      textAlign: 'center',
    },
    label: {
      fontSize: 16,
      color: colors.text,
      marginBottom: 6,
    },
    input: {
      borderWidth: 1,
      borderColor: colors.border,
      backgroundColor: inputBackground,
      padding: 12,
      borderRadius: 10,
      marginBottom: 20,
      color: colors.text,
    },
    button: {
      backgroundColor: colors.primary || '#6A4BBC',
      paddingVertical: 14,
      borderRadius: 25,
      alignItems: 'center',
      marginTop: 10,
    },
    buttonText: {
      color: '#fff',
      fontSize: 16,
      fontWeight: 'bold',
    },
    helperText: {
      fontSize: 14,
      color: colors.text,
      marginBottom: 20,
      textAlign: 'center',
      opacity: 0.8,
    },
  });

  return (
    <View style={styles.container}>
      <View style={styles.svgWrapper}>
        <BackgroundSvg width={width} />
      </View>

      <View style={styles.backButtonWrapper}>
        <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
          <MaterialIcons name="arrow-back" size={32} color={colors.text} />
        </TouchableOpacity>
      </View>

      <ScrollView contentContainerStyle={styles.content} keyboardShouldPersistTaps="handled">
        <Text style={styles.title}>Contactez-nous</Text>

        <Text style={styles.helperText}>
          Une question ou une incompréhension ? Écrivez-nous, nous sommes là pour vous aider.
        </Text>

        <Text style={styles.label}>Numéro de téléphone</Text>
        <TextInput
          style={styles.input}
          placeholder="Ex: +237 6XX XX XX XX"
          placeholderTextColor={colors.text + '80'}
          keyboardType="phone-pad"
          value={phone}
          onChangeText={setPhone}
        />

        <Text style={styles.label}>Votre message</Text>
        <TextInput
          style={[styles.input, { height: 100, textAlignVertical: 'top' }]}
          placeholder="Entrez votre message ici..."
          placeholderTextColor={colors.text + '80'}
          multiline
          numberOfLines={5}
          value={message}
          onChangeText={setMessage}
        />

        <TouchableOpacity style={styles.button}>
          <Text style={styles.buttonText}>Envoyer</Text>
        </TouchableOpacity>
      </ScrollView>
    </View>
  );
}
