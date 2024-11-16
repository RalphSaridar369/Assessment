import "react-native-gesture-handler";
import { View } from "react-native";
import BottomTabStack from "./src/stacks/BottomTabStack";
import { useFonts } from "expo-font";
import * as SplashScreen from "expo-splash-screen";
import { useCallback, useState } from "react";
import { GlobalStyle } from "./GlobalStyle";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import { Context } from "./src/context/context";
import { IUniversity } from "./src/interfaces/University";

export default function App() {
  const [favourites, setFavourites] = useState<IUniversity[]>([]); // Explicitly define the state type as IUniversity[]
  const [fontsLoaded, fontError] = useFonts({
    "Rubik-Bold": require("./assets/fonts/Rubik-Bold.ttf"),
    "Rubik-Light": require("./assets/fonts/Rubik-Light.ttf"),
    "Rubik-Regular": require("./assets/fonts/Rubik-Regular.ttf"),
  });

  const onLayoutRootView = useCallback(async () => {
    if (fontsLoaded || fontError) {
      await SplashScreen.hideAsync();
    }
  }, [fontsLoaded, fontError]);

  if (!fontsLoaded && !fontError) {
    return null;
  }

  return (
    <GestureHandlerRootView>
      <Context.Provider value={{ favourites, setFavourites }}>
        <View style={GlobalStyle.container} onLayout={onLayoutRootView}>
          <BottomTabStack />
        </View>
      </Context.Provider>
    </GestureHandlerRootView>
  );
}
