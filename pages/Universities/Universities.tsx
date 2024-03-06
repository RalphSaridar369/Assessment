import { ScrollView, ActivityIndicator, View, TextInput } from "react-native";
import { GlobalStyle } from "../../GlobalStyle";
import { useEffect, useState } from "react";
import { IUniversity } from "../../interfaces/University";
import { UniversityAPI } from "../../api/api";
import { University } from "./components/University";
import axios from "axios";

function UniversitiesScreen() {
  const [universities, setUniversities] = useState<IUniversity[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [limit, setLimit] = useState<number>(10);
  const [offset, setOffset] = useState<number>(0);
  const [country, setCountry] = useState<string>("");

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const response = await UniversityAPI.get("/search", {
        params: {
          limit,
          // offset,
          country,
        },
      });
      const newUniversities = response.data;
      console.log(newUniversities);
      setUniversities(newUniversities);
      // setUniversities((prevUniversities) => [
      //   ...prevUniversities,
      //   ...newUniversities,
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
    await fetchData();
  };

  return loading ? (
    <View style={[GlobalStyle.container, { justifyContent: "center" }]}>
      <ActivityIndicator size="large" color="#0000ff" />
    </View>
  ) : (
    <>
      <TextInput
        placeholder="Search by country"
        value={country}
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
