import { useColorScheme } from 'react-native';
import { darkColors, lightColors } from './colors'; // OK si color.ts exporte nommé

export const useThemeColor = () => {
  const colorScheme = useColorScheme();

  const colors = colorScheme === 'dark' ? darkColors : lightColors;

  return { colors, isDark: colorScheme === 'dark' };
};
