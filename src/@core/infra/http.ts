import axios from 'axios'

export const http = axios.create({
    baseURL: 'https://fakestoreapi.com',
    headers: { "Accept-Encoding": "gzip,deflate,compress" }
})