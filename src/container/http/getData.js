import axios from "axios";

export function getInvolvementData() {
    return axios({
        method: 'get',
        headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json'
        },
        url: 'http://localhost:8000/api/all-involvement',
    })
}