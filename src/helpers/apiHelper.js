import axios from "axios";

const apiHelper = (method, url, data, header) => {
  return axios({
    method,
    baseURL: "http://localhost:8000/api",
    // baseURL: "https://laravel-backend.syphor.in/api",
    headers: { ...header, "Content-Type": "application/json", "Accept": "application/json" },
    url,
    data,
    withCredentials: true
  })
    .then((response) => {
      return response;
    })
    .catch((error) => {
      return error;
    });
};

export default apiHelper;
