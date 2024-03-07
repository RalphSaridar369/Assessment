import { FlatList, ScrollView } from "react-native";
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
  const [loading, setLoading] = useState<boolean>(true);
  const [limit, setLimit] = useState<number>(20);
  const [offset, setOffset] = useState<number>(0);
  const [country, setCountry] = useState<string>("");

  useEffect(() => {
    setOffset(0);
    setUniversities([]);
    fetchSearch();
    fetchData();
  }, [country]);

  const fetchSearch = async () => {
    const country = (getData && (await getData("country"))) || "";
    setCountry(country);
  };

  const fetchData = async () => {
    try {
      const response = await UniversityAPI.get("/search", {
        params: {
          limit,
          offset,
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

  const handleSearch = async (value: string) => {
    setCountry(value);
    storeData("country", value);
  };

  const refetchData = async () => {
    setOffset(limit + offset);
    await fetchData();
  };

  return loading ? (
    <Loader />
  ) : (
    <>
      <SearchContainer
        placeholder="Search by country"
        value={country}
        icon={<Ionicons name="search" size={24} color="#1870d5" />}
        onChangeText={(value) => handleSearch(value)}
      />
      <FlatList
        data={universities}
        renderItem={({ item }) => <University {...item} />}
        onEndReached={() => refetchData()}
      />
      <ScrollView style={GlobalStyle.container}>
        {universities &&
          universities.map((university, index) => (
            <University {...university} key={index} />
          ))}
      </ScrollView>
    </>
  );
}

export default UniversitiesScreen;
