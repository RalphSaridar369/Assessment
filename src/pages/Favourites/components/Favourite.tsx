import React, { useState } from "react";
import { Modal, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { GlobalStyle } from "../../../../GlobalStyle";
import { FavouriteStyle } from "../Style";
import { Ionicons } from "@expo/vector-icons";
import { SafeAreaProvider, SafeAreaView } from "react-native-safe-area-context";
import WebView from "react-native-webview";
import Loader from "../../../components/Loader";
import { IUniversity } from "../../../interfaces/University";

interface FavouriteProps {
  university: IUniversity;
  removeFavourite: (name: string, swipeable?: any) => void;
}

export const Favourite = (props: FavouriteProps) => {
  const [modalVisible, setModalVisible] = useState(false);
  const [loading, setLoading] = useState(true);

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
