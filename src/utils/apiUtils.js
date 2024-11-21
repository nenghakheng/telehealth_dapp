import axios from "axios";

export const createStartonApi = (baseUrl, apiKey) =>
  axios.create({
    baseURL: baseUrl,
    headers: { "x-api-key": apiKey },
  });
