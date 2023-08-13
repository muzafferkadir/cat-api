import axios from "axios";

export const api = axios.create({
  baseURL: process.env.CAT_API_BASE_URL,
  headers: {
    'x-api-key': process.env.CAT_API_KEY
  }
})

export const getCatImage = async () => {
  return await api.get('/images/search')
}