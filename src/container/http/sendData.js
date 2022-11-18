import axios from "axios";

export function sendEngagementData (params, id = undefined) {
    const url = id === undefined
        ? 'http://localhost:8000/api/involvement'
        : `http://localhost:8000/api/involvement/${id}`;

    const method = id === undefined
        ? 'post'
        : 'patch';

    let data = {
        data:{
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
                ammunition: params['ammunition'],
                all_ammunition: params['all_ammunition'],
                tnt: params['tnt'],
                detonator: params['detonator']
            }
        }
    };

    return axios({
        method: method,
        headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json'
        },
        url: url,
        data: data
    });
}