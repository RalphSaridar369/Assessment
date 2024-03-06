import axios from "axios";

export const UniversityAPI = axios.create({
  baseURL: "http://universities.hipolabs.com",
});

export const EntriesAPI = axios.create({
  baseURL: "https://api.publicapis.org/entries",
});
