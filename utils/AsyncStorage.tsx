import AsyncStorage from "@react-native-async-storage/async-storage";

export const storeData = async (key: string, value: string) => {
  try {
    await AsyncStorage.setItem(key, value);
  } catch (e) {
    console.log(e);
  }
};

export const getData = async (key: string) => {
  try {
    const value: string | null = await AsyncStorage.getItem(key);
    return value;
  } catch (e) {
    console.log(e);
  }
};
