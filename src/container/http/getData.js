import axios from "axios";
import {getCsrfToken} from "./getCSRFToken";

export function getAllInvolvementData(order = 'date_notification', direction = 'asc') {
    axios.defaults.withCredentials = true;

    return getCsrfToken().then(() => {
        return axios({
            method: 'GET',
            headers: {
                'Accept': 'application/json',
                'Authorization' : `Bearer ${window.token}`,
            },
            url: 'http://localhost:8000/api/all-involvement?filter[order]=' + order +
                '&filter[direction]=' + direction,
        })
    })
}

export function getReportData(filters) {
    axios.defaults.withCredentials = true;

    return getCsrfToken().then(() => {
        return axios({
            method: 'get',
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json',
                'Authorization' : `Bearer ${window.token}`,
            },
            url: 'http://localhost:8000/api/report?filter[date_from]=' + filters.dateFrom +
                '&filter[date_to]=' + filters.dateTo + '&filter[reports_type]=' + filters.reportsType,
        })
    })
}
