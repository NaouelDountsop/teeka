import React from 'react';
import { View, StyleSheet, Dimensions, Image, TouchableOpacity, Text } from 'react-native';
import { router } from 'expo-router';
import Shapes from "@/assets/icon/Shapes.svg";
import Fff from './fff';

const { width, height } = Dimensions.get('window');

const CourbeDesign: React.FC = () => {
  return (
    <View style={styles.container}>
      <Shapes width={'100%'} height={'100%'} />

      {/* Texte Welcome aligné à gauche */}
      <Text style={styles.title}>Welcome to</Text>
      <Text style={styles.subtitle}>TEEKA.SA</Text>

      {/* Image PNG superposée */}
      <Image
        source={require('@/assets/images/im3.png')}
        style={styles.image}
        resizeMode="contain"
      />

      {/* Bouton de connexion avec navigation */}
      <TouchableOpacity
        style={styles.button}
        onPress={() => router.push({
          pathname: '/page2',
          params: { title: 'Hello depuis la page d’accueil' }
        })}
      >
        <Text style={styles.buttonText}>Get started</Text>
    
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
  },
  title: {
    position: 'absolute',
    top: '10%',
    left: 20,
    color: '#fff',
    fontSize: 28,
    fontWeight: '400',
  },
  subtitle: {
    position: 'absolute',
    top: '15%',
    left: 20,
    color: '#fff',
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
    bottom: 80,
    backgroundColor: '#0E1F8C',
    paddingHorizontal: 50,
    paddingVertical: 10,
    borderRadius: 25,
  },
  buttonText: {
    color: '#fff',
    fontSize: 20,
    fontWeight: 'bold',
  },
});

export default CourbeDesign;
