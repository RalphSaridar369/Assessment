import { StyleSheet } from "react-native";

export const GlobalStyle = StyleSheet.create({
  sm: {
    fontSize: 14,
    fontFamily: "Rubik-Light",
  },
  md: {
    fontSize: 18,
    fontFamily: "Rubik-Regular",
  },
  lg: {
    fontSize: 22,
    fontFamily: "Rubik-Bold",
  },
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  searchBarContainer: {
    flex: 1,
    height: 60,
    padding: 10,
    backgroundColor: "#fff",
  },
  searchBar: {
    width: "80%",
    flex: 1,
    height: 60,
    borderRadius: 10,
    borderWidth: 0.5,
    borderColor: "#1870d5",
    padding: 5,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  link: {
    color: "#1870d5",
    textDecorationLine: "underline",
  },
});
