import { StyleSheet } from "react-native";

export const EntryStyle = StyleSheet.create({
  entryContainer: {
    paddingBottom: 20,
    padding: 10,
  },
  filterContainer: {
    backgroundColor: "#fff",
    padding: 10,
    alignItems: "flex-end",
    justifyContent: "flex-end",
  },
  filterButton: {
    backgroundColor: "#1870d5",
    width: 120,
    height: 40,
    borderRadius: 10,
    paddingLeft: 10,
    paddingRight: 10,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  filterButtonText: {
    color: "white",
  },
});
