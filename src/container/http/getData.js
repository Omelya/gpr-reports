import axios from "axios";

export function getAllInvolvementData() {
    return axios({
        method: 'get',
        headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json'
        },
        url: 'http://localhost:8000/api/all-involvement',
    })
}

export function getInvolvementData(id) {
    return axios({
        method: 'get',
        headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json'
        },
        url: 'http://localhost:8000/api/involvement/' + id,
    })
}

export function getReportData(filters) {
    return axios({
        method: 'get',
        headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json'
        },
        url: 'http://localhost:8000/api/report?filter[date_from]=' + filters.dateFrom +
            '&filter[date_to]=' + filters.dateTo + '&filter[reports_type]=' + filters.reportsType,
    })
}
