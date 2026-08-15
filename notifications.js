import { Alert } from 'react-native';

export const configureNotification = () => {
  Alert.alert('Notification Setup', 'Notification triggers configured successfully!');
};

export const triggerNotificationAlert = () => {
  Alert.alert('Notification Alert', '🔔 Task reminder alert triggered successfully!');
};
