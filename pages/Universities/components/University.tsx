import React from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { IUniversity } from "../../../interfaces/University";
import { GlobalStyle } from "../../../GlobalStyle";
import * as Linking from "expo-linking";
import { UniversityStyle } from "../Style";
import { Ionicons } from "@expo/vector-icons";
import { getData, storeData } from "../../../utils/AsyncStorage";

interface UniversityProps {
  university: IUniversity;
  isFavourite: () => boolean;
  setFavourites: (data: IUniversity) => void;
}

export const University = (props: UniversityProps) => {
  const openUrl = (url: string) => {
    Linking.openURL(url);
  };

  const setFavourite = async (data: IUniversity) => {
    let favourites = await getData("favourites");
    if (favourites) {
      let favouritesParsed = JSON.parse(favourites);
      if (
        favouritesParsed.some(
          (favourite: IUniversity) => favourite.name === data.name
        )
      ) {
        //removing from the asyncStorage
        favouritesParsed = favouritesParsed.filter(
          (favourite: IUniversity) => favourite.name !== data.name
        );
      } else {
        //adding to the asyncStorage
        favouritesParsed = [...favourites, data];
      }
      await storeData("favourites", JSON.stringify(favouritesParsed));
      props.setFavourites(favouritesParsed);
    } else {
      console.log("first");
      await storeData("favourites", JSON.stringify(data));
      props.setFavourites(data);
    }
  };

  return (
    <TouchableOpacity
      style={UniversityStyle.universityContainer}
      onPress={() => openUrl(props.university.web_pages[0])}
    >
      <View style={UniversityStyle.titleContainer}>
        <Text style={GlobalStyle.md}>{props.university.name}</Text>
        <TouchableOpacity onPress={() => setFavourite(props.university)}>
          <Ionicons
            name={props.isFavourite() ? "heart" : "heart-outline"}
            size={24}
            color="red"
          />
        </TouchableOpacity>
      </View>
      <Text style={GlobalStyle.sm}>
        {props.university.country}
        {props.university["state-province"] &&
          `, ${props.university["state-province"]}`}
      </Text>
    </TouchableOpacity>
  );
};
