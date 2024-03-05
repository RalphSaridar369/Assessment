import { StyleSheet, Text, View } from 'react-native';
import BottomTabStack from './stacks/BottomTabStack';
import { useFonts } from 'expo-font';
import * as SplashScreen from 'expo-splash-screen';
import { useCallback } from 'react';
import { GlobalStyle } from './GlobalStyle';

export default function App() {

  // const [fontsLoaded, fontError] = useFonts({
  //   'Rubik-Bold': require('./assets/fonts/Rubik-Bold.ttf'),
  //   'Rubik-Light': require('./assets/fonts/Rubik-Light.ttf'),
  //   'Rubik-Regular': require('./assets/fonts/Rubik-Regular.ttf'),
  // });

  // const onLayoutRootView = useCallback(async () => {
  //   if (fontsLoaded || fontError) {
  //     await SplashScreen.hideAsync();
  //   }
  // }, [fontsLoaded, fontError]);

  // if (!fontsLoaded && !fontError) {
  //   return null;
  // }
  
  return (
    <View style={{backgroundColor:'red'}}>
      <Text style={[GlobalStyle.lg,styles.container]}>TTTTTT</Text>
      <Text style={[GlobalStyle.lg,styles.container]}>TTTTTT</Text>
      <Text style={[GlobalStyle.lg,styles.container]}>TTTTTT</Text>
      <Text style={[GlobalStyle.lg,styles.container]}>TTTTTT</Text>
      <Text style={[GlobalStyle.lg,styles.container]}>TTTTTT</Text>
      <Text style={[GlobalStyle.lg,styles.container]}>TTTTTT</Text>
      <Text style={[GlobalStyle.lg,styles.container]}>TTTTTT</Text>
      {/* <BottomTabStack /> */}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
