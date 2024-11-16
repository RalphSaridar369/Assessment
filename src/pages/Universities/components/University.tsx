import React, { useState } from "react";
import { Modal, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { IUniversity } from "../../../interfaces/University";
import { GlobalStyle } from "../../../../GlobalStyle";
import { UniversityStyle } from "../Style";
import { Ionicons } from "@expo/vector-icons";
import { getData, storeData } from "../../../utils/AsyncStorage";
import { SafeAreaProvider, SafeAreaView } from "react-native-safe-area-context";
import WebView from "react-native-webview";
import Loader from "../../../components/Loader";

interface UniversityProps {
  university: IUniversity;
  isFavourite: () => boolean;
  setFavourites: (data: IUniversity) => void;
  removeFavourite: (name: string) => void;
}

export const University = (props: UniversityProps) => {
  const [modalVisible, setModalVisible] = useState(false);
  const [loading, setLoading] = useState(true);

  const setFavourite = async (data: IUniversity) => {
    let favourites = await getData("favourites");
    if (favourites) {
      let favouritesParsed = JSON.parse(favourites);
      if (props.isFavourite()) {
        props.removeFavourite(data.name);
      } else {
        favouritesParsed = [...favouritesParsed, data];
      }
      await storeData("favourites", JSON.stringify(favouritesParsed));
      props.setFavourites(data);
    } else {
      await storeData("favourites", JSON.stringify([data]));
      props.setFavourites(data);
    }
  };

  const openModal = () => {
    setModalVisible(true);
  };

  return (
    <>
      <SafeAreaProvider>
        <SafeAreaView style={GlobalStyle.centeredView}>
          <Modal
            animationType="slide"
            transparent={false}
            visible={modalVisible}
            onRequestClose={() => {
              setModalVisible(!modalVisible);
            }}
          >
            <View style={GlobalStyle.centeredView}>
              <View style={GlobalStyle.modalHeaderView}>
                <Text style={GlobalStyle.lg}>{props.university.name}</Text>
                <TouchableOpacity onPress={() => setModalVisible(false)}>
                  <Ionicons name="close" size={32} color="red" />
                </TouchableOpacity>
              </View>
              <View style={GlobalStyle.modalView}>
                {loading && <Loader />}
                <WebView
                  cacheEnabled
                  onLoadStart={() => setLoading(false)}
                  style={{ flex: 1 }}
                  source={{ uri: props.university.web_pages[0] }}
                />
              </View>
            </View>
          </Modal>
        </SafeAreaView>
      </SafeAreaProvider>
      <TouchableOpacity
        style={UniversityStyle.universityContainer}
        onPress={() => openModal()}
      >
        <View style={UniversityStyle.titleContainer}>
          <Text style={[GlobalStyle.md, { width: "80%" }]}>
            {props.university.name}
          </Text>
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
    </>
  );
};
