import axios from "axios";

export function sendEngagementData (params) {
    let data = {
        data: JSON.stringify({
            type: 'report',
            attributes: {
                act_code: params['act_code'],
                report_code: params['report_code'],
                date_notification: params['date_notification'],
                date_received: params['date_received'],
                start_date: params['start_date'],
                end_date: params['end_date'],
                task_type: params['task_type'],
                work_status: params['work_status'],
                place_execution: params['place_execution'],
                coordinates: {
                    N: params['coordinates_north'],
                    E: params['coordinates_east']
                },
                examined: params['examined'],
                persons: params['persons'],
                ammunitions: params['ammunitions'],
                all_ammunitions: params['all_ammunition'],
                tnt: params['tnt'],
                detonator: params['detonator']
            }
        })
    };
    console.log(data)
    axios({
        method: 'post',
        headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json'
        },
        url: 'http://localhost:8000/api/involvement',
        data: data
    })
    .then(response => {
        console.log(response)
    })
    .catch(error => {
        console.log(error)
    })
}