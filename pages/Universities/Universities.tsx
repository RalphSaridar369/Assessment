import {
  FlatList,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import { GlobalStyle } from "../../GlobalStyle";
import { useEffect, useState } from "react";
import { IUniversity } from "../../interfaces/University";
import { UniversityAPI } from "../../api/api";
import { University } from "./components/University";
import { getData, storeData } from "../../utils/AsyncStorage";
import { Ionicons } from "@expo/vector-icons";
import Loader from "../../components/Loader";
import { UniversityStyle } from "./Style";
import { Dropdown } from "react-native-element-dropdown";
import { countries } from "../../constants/Countries";

function UniversitiesScreen() {
  const [universities, setUniversities] = useState<IUniversity[]>([]);
  const [favourites, setFavourites] = useState<
    IUniversity[] | undefined | null
  >([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [limit, setLimit] = useState<number>(20);
  const [offset, setOffset] = useState<number>(0);
  const [name, setName] = useState<string>("");
  const [country, setCountry] = useState<string>("");

  useEffect(() => {
    setOffset(0);
    setUniversities([]);
    // fetchSearch();
    fetchData();
    getFavouritesAndSet();
  }, []);

  const getFavouritesAndSet = async () => {
    let favourites = await getData("favourites");
    if (favourites) {
      let parsedFavourites = JSON.parse(favourites);
      setFavourites(parsedFavourites);
    }
  };

  const isFavourite = (name: string) => {
    if (!favourites || favourites?.length == 0) return false;
    return (
      favourites && favourites?.some((favourite) => favourite?.name === name)
    );
  };

  const fetchSearch = async () => {
    const query = (getData && (await getData("query"))) || "";
    setName(query);
  };

  const fetchData = async () => {
    try {
      const response = await UniversityAPI.get("/search", {
        params: {
          limit,
          offset,
          name,
          country,
        },
      });
      const universities = response.data;
      setUniversities((prevUniversities) => [
        ...prevUniversities,
        ...universities,
      ]);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  const handleCountry = async (value: string) => {
    console.log("second");
    setLoading(true);
    setCountry(value);
    await fetchData();
  };

  const handleSearch = async () => {
    console.log("first");
    setLoading(true);
    // await storeData("query", search);
    await fetchData();
  };

  const refetchData = async () => {
    setLoading(true);
    setOffset(limit + offset);
    await fetchData();
  };

  return loading ? (
    <Loader />
  ) : (
    <View style={{ backgroundColor: "#fff" }}>
      <View style={UniversityStyle.headerContainer}>
        {/* <SearchContainer
          placeholder="Search by Name"
          value={search}
          icon={
            
          }
          onChangeText={(value) => setSearch(value)}
        /> */}
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
          placeholder=""
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
        contentContainerStyle={{ backgroundColor: "#ffffff" }}
        data={universities}
        renderItem={({ item }) => (
          <University
            university={item}
            isFavourite={() => isFavourite(item.name)}
            setFavourites={(data: IUniversity) => {
              if (favourites) setFavourites([...favourites, data]);
              else setFavourites([data]);
            }}
          />
        )}
        onEndReached={() => refetchData()}
      />
      {/* <ScrollView style={GlobalStyle.container}>
        {universities &&
          universities.map((university, index) => (
            <University
              university={university}
              key={index}
              isFavourite={() => isFavourite(university.name)}
              setFavourites={(data: IUniversity) => {
                if (favourites) setFavourites([...favourites, data]);
                else setFavourites([data]);
              }}
            />
          ))}
      </ScrollView> */}
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
    marginRight: 5,
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
