import { Alert, ScrollView } from "react-native";
import { GlobalStyle } from "../../../GlobalStyle";
import { useContext, useEffect, useState } from "react";
import { Favourite } from "./components/Favourite";
import { getData, storeData } from "../../utils/AsyncStorage";
import Loader from "../../components/Loader";
import { IUniversity } from "../../interfaces/University";
import { useFocusEffect } from "@react-navigation/native";
import Swipeable from "react-native-gesture-handler/Swipeable";
import { View, Text } from "react-native";
import { Context } from "../../context/context";

function Favourites() {
  const { favourites, setFavourites } = useContext(Context);
  const [loading, setLoading] = useState<boolean>(true);

  useFocusEffect(() => {
    fetchData();
  });

  useEffect(() => {}, [favourites]);

  const removeFavourite = async (name: string, swipeable?: any) => {
    Alert.alert(
      "Remove Favourite",
      "Are you sure you want to remove favourite ?",
      [
        {
          text: "Yes",
          onPress: async () => {
            let favourites = await getData("favourites");
            if (favourites) {
              let parsedFavourites = JSON.parse(favourites);
              parsedFavourites = parsedFavourites.filter(
                (favourite: IUniversity) => favourite.name !== name
              );
              await storeData("favourites", JSON.stringify(parsedFavourites));
              setFavourites(parsedFavourites);
              if (swipeable) swipeable.close();
            }
          },
        },
        {
          text: "No",
          onPress: () => {
            if (swipeable) swipeable.close();
          },
        },
      ]
    );
  };

  const renderRightActions = () => (
    <View
      style={{
        justifyContent: "center",
        alignItems: "center",
        width: 75,
        backgroundColor: "red",
      }}
    >
      <Text style={{ color: "white", fontWeight: "bold" }}>Delete</Text>
    </View>
  );

  const fetchData = async () => {
    let _favourites = await getData("favourites");
    if (_favourites) {
      let parsedFavourites = JSON.parse(_favourites);
      if (favourites && parsedFavourites.length > favourites?.length)
        setFavourites(parsedFavourites);
    } else {
      setFavourites([]);
    }
    setLoading(false);
  };

  return loading ? (
    <Loader />
  ) : (
    <ScrollView style={GlobalStyle.container}>
      {favourites &&
        favourites.map((entry, index) => (
          <Swipeable
            key={index}
            renderRightActions={renderRightActions}
            onSwipeableOpen={(direction, swipeable) =>
              removeFavourite(entry.name, swipeable)
            }
          >
            <Favourite removeFavourite={removeFavourite} university={entry} />
          </Swipeable>
        ))}
    </ScrollView>
  );
}

export default Favourites;
