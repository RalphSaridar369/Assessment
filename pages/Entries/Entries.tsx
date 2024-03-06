import {
  ScrollView,
  ActivityIndicator,
  View,
  TextInput,
  Text,
  TouchableOpacity,
} from "react-native";
import { GlobalStyle } from "../../GlobalStyle";
import { useEffect, useRef, useState } from "react";
import { IUniversity } from "../../interfaces/University";
import { EntriesAPI } from "../../api/api";
import { Entry } from "./components/Entry";
import { getData, storeData } from "../../utils/AsyncStorage";
import { Ionicons } from "@expo/vector-icons";
import { EntryStyle } from "./Style";
import { SearchContainer } from "../../components/SearchContainer";

function EntriesScreen() {
  const [entries, setEntries] = useState<IUniversity[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [limit, setLimit] = useState<number>(10);
  const [offset, setOffset] = useState<number>(0);
  const [title, setTitle] = useState<string>("");

  useEffect(() => {
    fetchSearch();
    fetchData();
  }, [title]);

  const fetchSearch = async () => {
    const title = (getData && (await getData("title"))) || "";
    setTitle(title);
  };

  const fetchData = async () => {
    try {
      const response = await EntriesAPI.get("", {
        params: {
          title,
          limit,
        },
      });
      const entries = response.data.entries;
      console.log(entries);
      setEntries(entries);
      // setEntries((prevUniversities) => [
      //   ...prevUniversities,
      //   ...entries,
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

  const handleTitleSearch = async (value: string) => {
    console.log(value);
    setTitle(value);
    storeData("title", value);
  };

  return loading ? (
    <View style={[GlobalStyle.container, { justifyContent: "center" }]}>
      <ActivityIndicator size="large" color="#0000ff" />
    </View>
  ) : (
    <>
      <SearchContainer
        placeholder="Search by title"
        value={title}
        icon={<Ionicons name="search" size={24} color="#1870d5" />}
        onChangeText={(value) => handleTitleSearch(value)}
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
        {entries &&
          entries.map((entry, index) => <Entry {...entry} key={index} />)}
      </ScrollView>
    </>
  );
}

export default EntriesScreen;
