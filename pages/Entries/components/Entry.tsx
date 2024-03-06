import React from "react";
import { Text, TouchableOpacity } from "react-native";
import { GlobalStyle } from "../../../GlobalStyle";
import * as Linking from "expo-linking";
import { EntryStyle } from "../Style";

export const Entry = (props: any) => {
  const openUrl = (url: string) => {
    Linking.openURL(url);
  };

  return (
    <TouchableOpacity style={EntryStyle.entryContainer}>
      <Text style={GlobalStyle.md}>{props.Description}</Text>
    </TouchableOpacity>
  );
};