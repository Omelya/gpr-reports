import axios from "axios";
import {getCsrfToken} from "./getCSRFToken";

export default function removeData (id) {
    return getCsrfToken().then(()=> {
        axios({
            method: 'delete',
            headers: {
                'Accept': 'application/json',
                'Authorization': `Bearer ${window.token}`
            },
            url: 'http://localhost:8000/api/involvement/' + id,
        })
    })
}
