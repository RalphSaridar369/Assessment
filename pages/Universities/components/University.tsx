import React from "react";
import { Text, TouchableOpacity } from "react-native";
import { IUniversity } from "../../../interfaces/University";
import { GlobalStyle } from "../../../GlobalStyle";
import * as Linking from "expo-linking";
import { UniversityStyle } from "../Style";

export const University = (props: IUniversity) => {
  const openUrl = (url: string) => {
    Linking.openURL(url);
  };

  return (
    <TouchableOpacity
      style={UniversityStyle.universityContainer}
      onPress={() => openUrl(props.web_pages[0])}
    >
      <Text style={GlobalStyle.md}>{props.name}</Text>
    </TouchableOpacity>
  );
};
