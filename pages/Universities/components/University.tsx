import React from "react";
import { Text, View } from "react-native";
import { IUniversity } from "../../../interfaces/University";
import { GlobalStyle } from "../../../GlobalStyle";
import * as Linking from "expo-linking";
import { UniversityStyle } from "../Style";

export const University = (props: IUniversity) => {
  const openUrl = (url: string) => {
    Linking.openURL(url);
  };

  return (
    <View style={UniversityStyle.universityContainer}>
      <Text style={GlobalStyle.md}>{props.name}</Text>
      <Text style={GlobalStyle.sm}>{props.country}</Text>
      <Text style={GlobalStyle.sm}>{props["state-province"]}</Text>
      <Text style={GlobalStyle.sm}>{props.alpha_two_code}</Text>
      {props.domains.map((domain, index) => (
        <Text
          style={GlobalStyle.link}
          onPress={() => openUrl(props.web_pages[index])}
          key={index}
        >
          {domain}
        </Text>
      ))}
    </View>
  );
};
