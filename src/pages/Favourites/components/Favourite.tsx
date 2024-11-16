import React, { useState } from "react";
import { Modal, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { GlobalStyle } from "../../../../GlobalStyle";
import * as Linking from "expo-linking";
import { FavouriteStyle } from "../Style";
import { Ionicons } from "@expo/vector-icons";
import { SafeAreaProvider, SafeAreaView } from "react-native-safe-area-context";
import WebView from "react-native-webview";
import Loader from "../../../components/Loader";

export const Favourite = (props: any) => {
  const [modalVisible, setModalVisible] = useState(false);
  const [loading, setLoading] = useState(true);

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
        style={FavouriteStyle.favouritesContainer}
        onPress={() => setModalVisible(true)}
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
