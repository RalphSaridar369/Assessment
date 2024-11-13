import { FlatList, ScrollView, TouchableOpacity } from "react-native";
import { GlobalStyle } from "../../GlobalStyle";
import { useEffect, useState } from "react";
import { IUniversity } from "../../interfaces/University";
import { UniversityAPI } from "../../api/api";
import { University } from "./components/University";
import { getData, storeData } from "../../utils/AsyncStorage";
import { Ionicons } from "@expo/vector-icons";
import { SearchContainer } from "../../components/SearchContainer";
import Loader from "../../components/Loader";

function UniversitiesScreen() {
  const [universities, setUniversities] = useState<IUniversity[]>([]);
  const [favourites, setFavourites] = useState<
    IUniversity[] | undefined | null
  >([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [limit, setLimit] = useState<number>(20);
  const [offset, setOffset] = useState<number>(0);
  const [search, setSearch] = useState<string>("");

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
    setSearch(query);
  };

  const fetchData = async () => {
    try {
      const response = await UniversityAPI.get("/search", {
        params: {
          limit,
          offset,
          name: search,
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
    <>
      <SearchContainer
        placeholder="Search by Name"
        value={search}
        icon={
          <TouchableOpacity
            onPress={() => handleSearch()}
            style={{ backgroundColor: "red", flex: 1 }}
          >
            <Ionicons name="search" size={24} color="#1870d5" />
          </TouchableOpacity>
        }
        onChangeText={(value) => setSearch(value)}
      />
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
    </>
  );
}

export default UniversitiesScreen;
