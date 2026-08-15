import AsyncStorage from '@react-native-async-storage/async-storage';

export const saveSettings = async (val, setDarkMode) => {
  setDarkMode(val);
  await AsyncStorage.setItem('dark_mode_setting', JSON.stringify(val));
};

export const loadSettings = async (setDarkMode) => {
  const val = await AsyncStorage.getItem('dark_mode_setting');
  if (val !== null) setDarkMode(JSON.parse(val));
};
