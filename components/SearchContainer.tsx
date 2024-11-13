import React from "react";
import { TextInput, View } from "react-native";
import { GlobalStyle } from "../GlobalStyle";

interface ISearchContainer {
  value: string;
  placeholder: string;
  onChangeText: (value: string) => void;
  icon: JSX.Element;
}

export const SearchContainer = ({
  value,
  onChangeText,
  icon,
  placeholder,
}: ISearchContainer) => {
  return (
    <View style={GlobalStyle.searchBarContainer}>
      <View style={GlobalStyle.searchBar}>
        <TextInput
          placeholder={placeholder}
          value={value}
          style={{ color: "#1870d5", flex: 1 }}
          onChangeText={(value) => onChangeText(value)}
        />
        {icon}
      </View>
    </View>
  );
};
