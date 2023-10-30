import axios from "axios";

const instance = axios.create({
  baseURL: "https://api.themoviedb.org/3",
  params: {
    api_key: "e4cbf2de7aa9940fdd2a4c270eb1b559",
    language: "ko-KR",
  },
});

export default instance;
