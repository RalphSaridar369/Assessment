import { ScrollView, Text, View } from "react-native";
import { GlobalStyle } from "../../GlobalStyle";
import { useEffect, useState } from "react";
import { IUniversity } from "../../interfaces/University";
import { UniversityAPI } from "../../api/api";

function UniversitiesScreen() {
  const [universities, setUniversities] = useState<IUniversity[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await UniversityAPI.get<IUniversity[]>(
          "/search?limit=1"
        );
        setUniversities(response.data);
      } catch (error) {
        console.log(error);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  return (
    <ScrollView style={{ flex: 1 }}>
      {universities &&
        universities.map((university, index) => (
          <View style={GlobalStyle.center} key={index}>
            <Text style={GlobalStyle.lg}>{university.name}</Text>
          </View>
        ))}
      <Text style={GlobalStyle.md}>Home!</Text>
    </ScrollView>
  );
}

export default UniversitiesScreen;
