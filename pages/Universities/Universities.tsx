import { ScrollView } from "react-native";
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
  const [limit, setLimit] = useState<number>(60);
  const [country, setCountry] = useState<string>("");

  useEffect(() => {
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
          country,
        },
      });
      const universities = response.data;
      if (country.length > 0) {
        setUniversities(universities);
      } else {
        setUniversities((prevUniversities) => [
          ...prevUniversities,
          ...universities,
        ]);
      }
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
