import axios from "axios";

export default function removeData (id) {
    return axios({
        method: 'delete',
        url: 'http://localhost:8000/api/involvement/' + id,
    })
}