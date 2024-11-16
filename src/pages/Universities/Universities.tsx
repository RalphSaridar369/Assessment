import {
  Alert,
  FlatList,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import { GlobalStyle } from "../../../GlobalStyle";
import { useContext, useEffect, useState } from "react";
import { IUniversity } from "../../interfaces/University";
import { UniversityAPI } from "../../api/api";
import { University } from "./components/University";
import { getData, storeData } from "../../utils/AsyncStorage";
import { Ionicons } from "@expo/vector-icons";
import Loader from "../../components/Loader";
import { UniversityStyle } from "./Style";
import { Dropdown } from "react-native-element-dropdown";
import { countries } from "../../constants/Countries";
import { AxiosError } from "axios";
import { Context } from "../../context/context";

function UniversitiesScreen() {
  const [universities, setUniversities] = useState<IUniversity[]>([]);
  const { favourites, setFavourites } = useContext(Context);
  const [loading, setLoading] = useState<boolean>(true);
  const [loadingMore, setLoadingMore] = useState<boolean>(false);
  const [limit] = useState<number>(20);
  const [offset, setOffset] = useState<number>(0);
  const [name, setName] = useState<string>("");
  const [country, setCountry] = useState<string>("");

  useEffect(() => {
    setOffset(0);
    setUniversities([]);
    getFavouritesAndSet();
    fetchData(0);
  }, []);

  const getFavouritesAndSet = async () => {
    let favourites = await getData("favourites");
    if (favourites) {
      let parsedFavourites = JSON.parse(favourites);
      setFavourites(parsedFavourites);
    }
  };

  const isFavourite = (name: string) => {
    if (!favourites || favourites?.length == 0) {
      return false;
    }
    return (
      favourites && favourites?.some((favourite) => favourite?.name === name)
    );
  };

  const handleCountry = async (value: string) => {
    if (value !== country) {
      setLoading(true);
      setOffset(0);
      setUniversities([]);
      await storeData("name", "");
      await storeData("country", value === "All" ? "" : value);
      await fetchData(0);
    }
  };

  const handleSearch = async () => {
    setLoading(true);
    setOffset(0);
    setUniversities([]);
    await storeData("name", name);
    await fetchData(0);
  };

  const removeFavourite = async (name: string) => {
    Alert.alert(
      "Remove Favourite",
      "Are you sure you want to remove favourite?",
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
            }
          },
        },
        { text: "No" },
      ]
    );
  };

  const fetchData = async (offsetParam: number) => {
    try {
      let params: {
        limit: number;
        offset: number;
        country?: string;
        name?: string;
      } = { limit, offset: offsetParam };

      let _name = await getData("name");
      if (_name) setName(_name);
      let _country = await getData("country");
      if (_country) setCountry(_country);

      if (_country || country) params["country"] = _country || country;
      if (_name || name) params["name"] = _name || name;

      const response = await UniversityAPI.get("/search", { params });
      const newUniversities = response.data;

      if (response.data)
        setUniversities((prev) => [...prev, ...newUniversities]);

      setLoading(false);
      setLoadingMore(false);
    } catch (error: AxiosError | any) {
      console.error(error?.message);
      setLoading(false);
      setLoadingMore(false);
      Alert.alert("Error");
    }
  };

  const loadMoreData = async () => {
    if (!loadingMore) {
      setLoadingMore(true);
      const newOffset = offset + limit;
      setOffset(newOffset);
      await fetchData(newOffset);
    }
  };

  return loading ? (
    <Loader />
  ) : (
    <View style={{ backgroundColor: "#fff" }}>
      <View style={UniversityStyle.headerContainer}>
        <View style={GlobalStyle.searchBar}>
          <TextInput
            placeholder="Search by Name"
            value={name}
            style={{ color: "#1870d5", flex: 1 }}
            onChangeText={(value) => setName(value)}
          />
          <TouchableOpacity onPress={() => handleSearch()}>
            <Ionicons name="search" size={32} color="#1870d5" />
          </TouchableOpacity>
        </View>
        <Dropdown
          style={styles.dropdown}
          placeholderStyle={styles.placeholderStyle}
          selectedTextStyle={styles.selectedTextStyle}
          inputSearchStyle={styles.inputSearchStyle}
          iconStyle={styles.iconStyle}
          data={countries}
          mode="modal"
          search
          maxHeight={300}
          labelField="label"
          valueField="label"
          placeholder="Search by Country"
          searchPlaceholder="Search..."
          value={country}
          onChange={(item) => {
            handleCountry(item.label);
          }}
          renderLeftIcon={() => (
            <Ionicons
              style={styles.icon}
              color="#1870d5"
              name="globe"
              size={32}
            />
          )}
        />
      </View>
      <FlatList
        contentContainerStyle={{ minHeight: "100%" }}
        data={universities}
        renderItem={({ item }) => (
          <University
            university={item}
            isFavourite={() => isFavourite(item.name)}
            removeFavourite={removeFavourite}
            setFavourites={async (data: IUniversity) => {
              if (favourites) setFavourites([...favourites, data]);
              else setFavourites([data]);
            }}
          />
        )}
        onEndReached={!loading && !loadingMore ? loadMoreData : null}
        ListFooterComponent={loadingMore ? <Loader /> : null}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  dropdown: {
    flex: 1,
    margin: 16,
    height: 50,
    borderBottomColor: "gray",
    borderBottomWidth: 0.5,
  },
  icon: {
    marginRight: 20,
  },
  placeholderStyle: {
    fontSize: 16,
  },
  selectedTextStyle: {
    fontSize: 16,
  },
  iconStyle: {
    width: 20,
    height: 20,
  },
  inputSearchStyle: {
    height: 40,
    fontSize: 16,
  },
});

export default UniversitiesScreen;
