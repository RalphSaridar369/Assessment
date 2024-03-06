import { ScrollView, ActivityIndicator, View } from "react-native";
import { GlobalStyle } from "../../GlobalStyle";
import { useEffect, useState } from "react";
import { IUniversity } from "../../interfaces/University";
import { UniversityAPI } from "../../api/api";
import { University } from "./components/University";
import { getData, storeData } from "../../utils/AsyncStorage";
import { Ionicons } from "@expo/vector-icons";
import { SearchContainer } from "../../components/SearchContainer";

function UniversitiesScreen() {
  const [universities, setUniversities] = useState<IUniversity[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [limit, setLimit] = useState<number>(10);
  const [offset, setOffset] = useState<number>(0);
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
          // offset,
          country,
        },
      });
      const universities = response.data;
      console.log(universities);
      setUniversities(universities);
      // setUniversities((prevUniversities) => [
      //   ...prevUniversities,
      //   ...universities,
      // ]);
      // setOffset((prevOffset) => prevOffset + limit);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  // const handleScroll = (event: {
  //   nativeEvent: {
  //     layoutMeasurement: { height: number; width: number };
  //     contentOffset: { x: number; y: number };
  //     contentSize: { height: number; width: number };
  //   };
  // }) => {
  //   const paddingToBottom = 20;
  //   if (
  //     event.nativeEvent.layoutMeasurement.height +
  //       event.nativeEvent.contentOffset.y >=
  //     event.nativeEvent.contentSize.height - paddingToBottom
  //   ) {
  //     fetchData();
  //   }
  // };

  const handleSearch = async (value: string) => {
    console.log(value);
    setCountry(value);
    storeData("country", value);
  };

  return loading ? (
    <View style={[GlobalStyle.container, { justifyContent: "center" }]}>
      <ActivityIndicator size="large" color="#0000ff" />
    </View>
  ) : (
    <>
      <SearchContainer
        placeholder="Search by country"
        value={country}
        icon={<Ionicons name="search" size={24} color="#1870d5" />}
        onChangeText={(value) => handleSearch(value)}
      />
      <ScrollView
        style={GlobalStyle.container}
        // onScroll={({ nativeEvent }) => handleScroll({ nativeEvent })}
        // scrollEventThrottle={400}
        // onContentSizeChange={(contentWidth, contentHeight) =>
        //   handleScroll({
        //     nativeEvent: {
        //       layoutMeasurement: { height: contentHeight, width: contentWidth },
        //       contentOffset: { x: 0, y: 0 },
        //       contentSize: { height: contentHeight, width: contentWidth },
        //     },
        //   })
        // }
      >
        {universities &&
          universities.map((university, index) => (
            <University {...university} key={index} />
          ))}
      </ScrollView>
    </>
  );
}

export default UniversitiesScreen;
