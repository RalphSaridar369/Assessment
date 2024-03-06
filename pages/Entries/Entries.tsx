import { ScrollView } from "react-native";
import { GlobalStyle } from "../../GlobalStyle";
import { useEffect, useState } from "react";
import { IUniversity } from "../../interfaces/University";
import { EntriesAPI } from "../../api/api";
import { Entry } from "./components/Entry";
import { getData, storeData } from "../../utils/AsyncStorage";
import { Ionicons } from "@expo/vector-icons";
import { SearchContainer } from "../../components/SearchContainer";
import Loader from "../../components/Loader";

function EntriesScreen() {
  const [entries, setEntries] = useState<IUniversity[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
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
        },
      });
      const entries = response.data.entries;
      console.log(entries);
      if (title.length > 0) {
        setEntries(entries);
      } else {
        setEntries((prevEntries) => [...prevEntries, ...entries]);
      }
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  const handleTitleSearch = async (value: string) => {
    console.log(value);
    setTitle(value);
    storeData("title", value);
  };

  return loading ? (
    <Loader />
  ) : (
    <>
      <SearchContainer
        placeholder="Search by title"
        value={title}
        icon={<Ionicons name="search" size={24} color="#1870d5" />}
        onChangeText={(value) => handleTitleSearch(value)}
      />

      <ScrollView style={GlobalStyle.container}>
        {entries &&
          entries.map((entry, index) => <Entry {...entry} key={index} />)}
      </ScrollView>
    </>
  );
}

export default EntriesScreen;
