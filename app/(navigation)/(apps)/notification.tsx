import React from 'react';
import {
  View,
  Text,
  FlatList,
  StyleSheet,
  useWindowDimensions,
  Image,
  TouchableOpacity,
} from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import BackgroundSvg from '@/components/iconreview';
import { useThemeColor } from '@/components/useThemeColors';

export default function NotificationScreen() {
  const navigation = useNavigation();
  const { colors } = useThemeColor();
  const { width } = useWindowDimensions();
  const svgHeight = width * 0.3;

  const notifications: any[] = [];

  const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: colors.background,
    },
    svgWrapper: {
      position: 'absolute',
      top: 0,
      left: -360,
      right: 0,
      height: svgHeight,
      alignItems: 'center',
      justifyContent: 'center',
      zIndex: 0,
    },
    backButtonWrapper: {
     
      top: 45,
      left: 15,
      zIndex: 2,
     
    },
    backButton: {
    padding: 8,
    borderRadius: 25,
    marginTop:40
   
    },
    notificationItem: {
      backgroundColor: colors.card,
      padding: 15,
      marginVertical: 10,
      marginHorizontal: 16,
      borderRadius: 10,
      shadowColor: '#000',
      shadowOpacity: 0.1,
      shadowRadius: 5,
      elevation: 2,
      
      
    },
    title: {
      fontSize: 16,
      fontWeight: 'bold',
      color: colors.text,
      marginBottom: 5,
    },
    description: {
      fontSize: 14,
      color: colors.text,
      opacity: 0.8,
    
    },
    listContainer: {
      paddingTop: svgHeight + 10,
      paddingBottom: 20,
      flexGrow: 1,
      justifyContent: 'center',
      alignItems: 'center',
     marginTop:-150
     
    },
    emptyImage: {
      width: 300,
      height: 300,
      resizeMode: 'contain',
      marginBottom: 20,
    },
    emptyText: {
      fontSize: 16,
      color: colors.text,
      opacity: 0.6,
      textAlign: 'center',
      marginHorizontal: 20,
    },
  });

  const renderItem = ({ item }) => (
    <View style={styles.notificationItem}>
      <Text style={styles.title}>{item.title}</Text>
      <Text style={styles.description}>{item.description}</Text>
    </View>
  );

  return (
    <View style={styles.container}>
     
      <View style={styles.svgWrapper}>
        <BackgroundSvg
          width={width}
          height={svgHeight}
          preserveAspectRatio="none"
        />
      </View>

     
      <View style={styles.backButtonWrapper}>
        <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
          <MaterialIcons name="arrow-back" size={28} color={colors.text} />
        </TouchableOpacity>
      </View>

     
      <FlatList
        data={notifications}
        renderItem={renderItem}
        keyExtractor={(item, index) => index.toString()}
        contentContainerStyle={styles.listContainer}
        ListEmptyComponent={() => (
          <>
            <Image
              source={require('@/assets/images/notif.png')}
              style={styles.emptyImage}
            />
            <Text style={styles.emptyText}>
              Aucune notification pour le moment. Revenez plus tard !
            </Text>
          </>
        )}
      />
    </View>
  );
}
