import React, { useEffect } from 'react';
import { View, Image, StyleSheet, useColorScheme, useWindowDimensions } from 'react-native';
import { router } from 'expo-router';

export default function SplashScreen() {
  const scheme = useColorScheme();
  const { width } = useWindowDimensions();

  const backgroundColor = scheme === 'dark' ? '#1A1A1A' : '#FFFFFF';
  const logoContainerBackground = scheme === 'dark' ? '#FFFFFF' : 'transparent';

  useEffect(() => {
    const timer = setTimeout(() => {
      router.replace('/(auth)/welcome');
    }, 3000);
    return () => clearTimeout(timer);
  }, []);

  return (
    <View style={[styles.container, { backgroundColor }]}>
      <View
        style={[
          styles.logoContainer,
          { backgroundColor: logoContainerBackground, width: width * 0.7, height: width * 0.7, borderRadius:"100%"},
        ]}
      >
        <Image
          source={require('@/assets/images/logo.png')}
          style={[styles.logo, { width: width * 0.5, height: width * 0.5 }]}
          resizeMode="contain"
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: 'center', alignItems: 'center' },
  logoContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    // Tu peux ajuster ici ombre, bordure, etc.
  },
  logo: {},
});
