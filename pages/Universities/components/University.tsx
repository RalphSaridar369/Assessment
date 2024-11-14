import React, { useState } from "react";
import { Modal, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { IUniversity } from "../../../interfaces/University";
import { GlobalStyle } from "../../../GlobalStyle";
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
}

export const University = (props: UniversityProps) => {
  const [modalVisible, setModalVisible] = useState(false);
  const [loading, setLoading] = useState(true);

  const setFavourite = async (data: IUniversity) => {
    console.log("first");
    let favourites = await getData("favourites");
    if (favourites) {
      let favouritesParsed = JSON.parse(favourites);
      if (
        favouritesParsed?.some(
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
        <SafeAreaView style={styles.centeredView}>
          <Modal
            animationType="slide"
            transparent={false}
            visible={modalVisible}
            onRequestClose={() => {
              setModalVisible(!modalVisible);
            }}
          >
            <View style={styles.centeredView}>
              <View style={styles.modalHeaderView}>
                <Text style={GlobalStyle.lg}>{props.university.name}</Text>
                <TouchableOpacity onPress={() => setModalVisible(false)}>
                  <Ionicons name="close" size={32} color="red" />
                </TouchableOpacity>
              </View>
              <View style={styles.modalView}>
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
const styles = StyleSheet.create({
  centeredView: {
    flex: 1,
    width: "100%",
    paddingVertical: 20,
  },
  modalHeaderView: {
    paddingHorizontal: 20,
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  modalView: {
    flex: 1,
    width: "100%",
    backgroundColor: "white",
    paddingVertical: 20,
  },
});
