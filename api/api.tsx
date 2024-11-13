import axios from "axios";

export const UniversityAPI = axios.create({
  baseURL: "http://universities.hipolabs.com",
});
