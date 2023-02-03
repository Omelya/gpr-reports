import axios from "axios";

export const getCsrfToken = () => {
    axios.defaults.withCredentials = true;

    return axios({
        method: 'GET',
        url: 'http://localhost:8000/sanctum/csrf-cookie'
    })
}
