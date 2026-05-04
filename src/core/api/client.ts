import axios from "axios";
import { ENV } from "../config/env";

const BASE_URL = ENV.API_URL;

export const apiClient = axios.create({
  baseURL: BASE_URL,
  withCredentials: true,
});
