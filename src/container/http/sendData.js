import axios from "axios";
import {getCsrfToken} from "./getCSRFToken";

const INVOLVEMENT = 'http://localhost:8000/api/involvement';
const USER_CREATE = 'http://localhost:8000/api/user/create';
const AUTH = 'http://localhost:8000/api/login';

export function sendEngagementData (params, id = undefined) {
    const url = id === undefined
        ? INVOLVEMENT
        : `${INVOLVEMENT}/${id}`;

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

    return getCsrfToken().then(() => {
        axios({
          method: method,
          headers: {
              'Content-Type': 'application/json',
              'Accept': 'application/json',
              'Authorization': `Bearer ${window.token}`
          },
          url: url,
          data: data
        })
    })
}

export function sendUser(params) {
    const data = {
        data: {
            type: 'users',
            attributes: {
                username: params.get('username'),
                password: params.get('password'),
                password_confirmation: params.get('password_confirmation'),
                first_name: params.get('first_name'),
                last_name: params.get('last_name'),
                father_name: params.get('father_name'),
                birthday: params.get('birthday'),
                position: params.get('position'),
                rank: params.get('rank')
            }
        }
    };

    return getCsrfToken().then(() => {
        return axios({
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json'
            },
            url: USER_CREATE,
            data: data
        })
    })
}

export function authUser(params) {
    const data = {
        data: {
            type: 'users',
            attributes: {
                username: params.get('username'),
                password: params.get('password'),
            }
        }
    };

    return getCsrfToken().then(() => {
        return axios({
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json'
            },
            url: AUTH,
            data: data
        })
    })
}
