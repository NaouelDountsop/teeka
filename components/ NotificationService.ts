// src/notifications/NotificationService.ts

import AsyncStorage from '@react-native-async-storage/async-storage';

export const saveNotification = async (title: string, message: string) => {
  try {
    // Récupérer les notifications existantes
    const notifications = await AsyncStorage.getItem('notifications');
    const parsedNotifications = notifications ? JSON.parse(notifications) : [];

    // Ajouter la nouvelle notification
    const newNotification = { title, message };
    parsedNotifications.push(newNotification);

    // Sauvegarder à nouveau dans AsyncStorage
    await AsyncStorage.setItem('notifications', JSON.stringify(parsedNotifications));
  } catch (error) {
    console.error('Erreur lors de la sauvegarde de la notification', error);
  }
};

// Récupérer toutes les notifications
export const getNotifications = async () => {
  try {
    const notifications = await AsyncStorage.getItem('notifications');
    return notifications ? JSON.parse(notifications) : [];
  } catch (error) {
    console.error('Erreur lors de la récupération des notifications', error);
    return [];
  }
};
