import axios from "axios";

const ENDPOINT = "http://localhost:3131";

export const api = axios.create({
  baseURL: ENDPOINT,
});
