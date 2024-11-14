import React from "react";
import { Text, TouchableOpacity, View } from "react-native";
import { GlobalStyle } from "../../../GlobalStyle";
import * as Linking from "expo-linking";
import { FavouriteStyle } from "../Style";
import { Ionicons } from "@expo/vector-icons";

export const Favourite = (props: any) => {
  const openUrl = (url: string) => {
    Linking.openURL(url);
  };

  return (
    <>
      <TouchableOpacity
        style={FavouriteStyle.favouritesContainer}
        onPress={() => openUrl(props.university.web_pages[0])}
      >
        <View style={FavouriteStyle.titleContainer}>
          <Text style={[GlobalStyle.md, { width: "80%" }]}>
            {props.university.name}
          </Text>
          <TouchableOpacity
            onPress={() => props.removeFavourite(props.university.name)}
          >
            <Ionicons name={"heart"} size={24} color="red" />
          </TouchableOpacity>
        </View>
        <Text style={GlobalStyle.sm}>
          {props.university.country}
          {props.university["state-province"] &&
            props.university["state-province"]}
        </Text>
      </TouchableOpacity>
    </>
  );
};
