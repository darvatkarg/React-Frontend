import axios from "axios";

const apiHelper = (method, url, data, header) => {
  return axios({
    method,
    baseURL: "http://localhost:8000/api",
    // baseURL: "https://laravel-backend.syphor.in/api",
    headers: header
      ? header
      : {
          "Content-Type": "application/json",
        },
    url,
    data,
  })
    .then((response) => {
      return response;
    })
    .catch((error) => {
      return error;
    });
};

export default apiHelper;
