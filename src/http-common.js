import axios from "axios"

export default axios.create({
//  baseURL: "http://127.0.0.1:8000/",
    baseURL: "http://192.168.1.12:3000/",
//  baseURL: "http://172.20.10.3:3000/",

  headers: {
    "Content-type": "application/json"
  }
})