import Shapes from "@/assets/icon/Shapes.svg";
import { useThemeColor } from '@/components/useThemeColors';
import { router } from 'expo-router';
import React from 'react';
import { Dimensions, Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native';

const { width, height } = Dimensions.get('window');

const CourbeDesign: React.FC = () => {
  const { colors } = useThemeColor();  

  return (
    <View style={[styles.container, { backgroundColor: colors.background }]}>
      <Shapes width={'100%'} height={'100%'} />

      <Text style={[styles.title, { color: colors.whiteText }]}>Welcome to</Text>
      <Text style={[styles.subtitle, { color: colors.whiteText }]}>TEEKA.SA</Text>

      <Image
        source={require('@/assets/images/im3.png')}
        style={styles.image}
        resizeMode="contain"
      />

      <TouchableOpacity
        style={[
          styles.button,
          {
            backgroundColor: colors.primary,
            width: width * 0.8,
            paddingVertical: height * 0.015,
            borderRadius: width * 0.05,
          },
        ]}
        onPress={() =>
          router.push({
            pathname: '/slide',
            params: { title: 'Hello depuis la page d’accueil' },
          })
        }
      >
        <Text style={[styles.buttonText, { color: colors.whiteText }]}>Get started</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
  },
  title: {
    position: 'absolute',
    top: '10%',
    left: 20,
    fontSize: 28,
    fontWeight: '400',
  },
  subtitle: {
    position: 'absolute',
    top: '15%',
    left: 20,
    fontSize: 36,
    fontWeight: 'bold',
  },
  image: {
    position: 'absolute',
    top: '20%',
    width: 400,
    height: 300,
  },
  button: {
    position: 'absolute',
    bottom: height * 0.08,
    alignItems: 'center',
    justifyContent: 'center',
  },
  buttonText: {
    fontSize: width * 0.05,
    fontWeight: 'bold',
  },
});

export default CourbeDesign;
