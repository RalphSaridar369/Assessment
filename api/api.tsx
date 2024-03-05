import axios from "axios";

export const UniversityAPI = axios.create({
  baseURL: "http://universities.hipolabs.com",
});

export const API2 = axios.create({
  baseURL: "https://some-domain.com/api/",
});
