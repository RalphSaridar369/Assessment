import React from "react";
import { ActivityIndicator, View } from "react-native";
import { GlobalStyle } from "../GlobalStyle";

const Loader = () => {
  return (
    <View style={[GlobalStyle.container, { justifyContent: "center" }]}>
      <ActivityIndicator size="large" color="#0000ff" />
    </View>
  );
};

export default Loader;
