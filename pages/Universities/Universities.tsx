import { Text, View } from "react-native";
import { GlobalStyle } from "../../GlobalStyle";

function UniversitiesScreen() {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <Text style={GlobalStyle.md}>Home!</Text>
      </View>
    );
  }

  export default UniversitiesScreen