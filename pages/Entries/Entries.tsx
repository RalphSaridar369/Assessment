import { ScrollView } from "react-native";
import { GlobalStyle } from "../../GlobalStyle";
import { useEffect, useState } from "react";
import { Favourite } from "./components/Entry";
import { getData } from "../../utils/AsyncStorage";
import Loader from "../../components/Loader";
import { IUniversity } from "../../interfaces/University";

function FavouritesScreen() {
  const [favourites, setFavourites] = useState<IUniversity[] | undefined>([]);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    let favourites = await getData("favourites");
    if (favourites) {
      let parsedFavourites = JSON.parse("favourites");
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
            <Favourite {...entry} key={index} />
          ))}
      </ScrollView>
    </>
  );
}

export default FavouritesScreen;
