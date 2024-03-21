import axios from "axios";
import { toast } from "react-toastify";

const apiHelper = (method, url, data, header) => {
    return axios({
        method,
        baseURL: "https://laravel-backend.syphor.in/api",
        headers: header ? header : {
            "Content-Type": "application/json"
        },
        url,
        data
    })
        .then(response => {
            toast.success(response.data.message)
            return response
        })
        .catch(error => {
            toast.error("Something went wrong!")
            return error
        })
}

export default apiHelper