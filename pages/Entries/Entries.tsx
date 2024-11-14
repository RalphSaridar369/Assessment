import { Alert, ScrollView } from "react-native";
import { GlobalStyle } from "../../GlobalStyle";
import { useState } from "react";
import { Favourite } from "./components/Entry";
import { getData, storeData } from "../../utils/AsyncStorage";
import Loader from "../../components/Loader";
import { IUniversity } from "../../interfaces/University";
import { useFocusEffect } from "@react-navigation/native";
import Swipeable from "react-native-gesture-handler/Swipeable";

function FavouritesScreen() {
  const [favourites, setFavourites] = useState<IUniversity[] | undefined>([]);
  const [loading, setLoading] = useState<boolean>(true);

  useFocusEffect(() => {
    fetchData();
  });

  const deleteFavourite = (entry: IUniversity) => {
    Alert.alert(
      "Delete Favourite",
      "Are you sure you want to remove this favourite ?",
      [
        {
          text: "Yes",
          onPress: async () => {
            let favourites = await getData("favourites");
            if (favourites) {
              let parsedFavourites = JSON.parse(favourites);
              parsedFavourites = parsedFavourites.filter(
                (favourite: IUniversity) => favourite.name !== entry.name
              );
              await storeData("favourites", JSON.stringify(parsedFavourites));
              setFavourites(parsedFavourites);
              await fetchData();
            }
          },
        },
        { text: "No" },
      ]
    );
  };

  const fetchData = async () => {
    let _favourites = await getData("favourites");
    if (_favourites) {
      let parsedFavourites = JSON.parse(_favourites);
      if (favourites && parsedFavourites.length > favourites?.length)
        setFavourites(parsedFavourites);
    }
    setLoading(false);
  };

  return loading ? (
    <Loader />
  ) : (
    <>
      <ScrollView style={GlobalStyle.container}>
        {favourites &&
          favourites.map((entry, index) => (
            <Swipeable
              cancelsTouchesInView
              onSwipeableOpen={(direction, Swipeable) => {
                deleteFavourite(entry);
                Swipeable.close();
              }}
            >
              <Favourite university={entry} key={index} />
            </Swipeable>
          ))}
      </ScrollView>
    </>
  );
}

export default FavouritesScreen;
