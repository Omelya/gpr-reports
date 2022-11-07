import { Form } from "react-router-dom";
import { sendEngagementData } from "../http/sendData";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { useState } from "react";
import PlaceExecutionInput from "./PlaceExecutionInput";
import AmmunitionInput from "./AmmunitionInput";
import InvolvementNumberInput from "./InvolvementNumberInput";
import checkNumberValue from "../validation/checkNumberValue";
import checkFloatNumberValue from "../validation/checkFloatNumberValue";
import checkCoordinates from "../validation/checkCoordinates";
import checkFormData from "../validation/checkFormData";

export async function action () {
    let data = document.getElementById('report'),
        formData = new FormData(data),
        params = {},
        person = [],
        ammunition = {},
        allAmmunitionName = formData.getAll('name_ammunition'),
        allNumberAmmunition = formData.getAll('number_ammunition'),
        year = new Date().getFullYear(),
        keys = [
            'act_type',
            'act_number',
            'report_type',
            'report_number',
            'person',
            'name_ammunition',
            'number_ammunition'
        ];

        let error = checkFormData(formData)

    for (const [key, value] of formData.entries()) {
        if (keys.includes(key)) {
            continue;
        }

        params[key] = value;
    }

    for (let name of formData.getAll('person')) {
        person.push(name);
    }

    for (let i = 0; i < formData.getAll('name_ammunition').length; i++) {
        let name = allAmmunitionName[i].replace(/\s/gi, '_');

        ammunition[name] = allNumberAmmunition[i];
    }

    params['date_notification'] = convertDate(params['date_notification'])
    params['date_received'] = convertDate(params['date_received']);
    params['start_date'] = convertDate(params['start_date']);
    params['end_date'] = convertDate(params['end_date']);
    params['persons'] = person;
    params['ammunition'] = ammunition
    params['act_code'] = [formData.get('act_type'), '-08-', year, '/',formData.get('act_number')].join('');
    params['report_code'] = [formData.get('report_type'), '-08-', year, '/',formData.get('report_number')].join('');

    if (!error) {
        document.getElementById('error').classList.add('hidden');

        await sendEngagementData(params);
    } else {
        document.getElementById('error').classList.remove('hidden');
    }
}

function convertDate(date) {
    let dateObject = new Date(date),
        day = '' + dateObject.getDate(),
        month = '' + (dateObject.getMonth() + 1),
        year = dateObject.getFullYear(),
        split = date.split(' ');

    if (month.length < 2) {
        month = '0' + month;
    }

    if (day.length < 2) {
        day = '0' + day;
    }

    if (split.length > 3) {
        let hour = String(dateObject.getHours()),
            minutes = String(dateObject.getMinutes());

        if (hour.length < 2) {
            hour = '0' + hour;
        }

        if (minutes.length < 2) {
            minutes = '0' + minutes;
        }

        let time = [hour, minutes].join(':'),
            date = [year, month, day].join('-');

        return date + ' ' + time;
    }

    return [year, month, day].join('-');
}

function addPerson () {
    let element = document.getElementById('personnel'),
        select = document.createElement('select'),
        option = document.createElement('option');

    option.innerText = 'Владислав Омеляненко';
    select.className = 'm-2';
    select.name = 'person';

    select.append(option);
    element.append(select);
}

export default function Involvement () {
    const [dateReport, setDateReport] = useState(
        new Date()
    );

    const [dateReceipt, setDateReceipt] = useState(
        new Date()
    );

    const [startDate, setStartDate] = useState(
        new Date()
    );

    const [endDate, setEndDate] = useState(
        new Date()
    );

    return (
        <>
            <div>
                <div className='text-center mt-2'>
                    <h3 className='font-serif font-bold text-2xl'>Fill out the form</h3>
                </div>
                <div>
                    <Form method="post" id='report'>
                        <div className='flex flex-col'>
                            <div id='error' className='border-2 border-red-700 bg-red-200 hidden'>
                                <p className='p-2'>There are empty fields</p>
                            </div>
                            <div className='grid grid-cols-2 border-4 m-5 p-5'>
                                <InvolvementNumberInput
                                    name='act_number'
                                    type='act_type'
                                />
                                <InvolvementNumberInput
                                    name='report_number'
                                    type='report_type'
                                />
                                <div className='flex flex-col p-1 font-serif'>
                                    <label className='text-center'>Дата донесення</label>
                                    <div className='text-center'>
                                        <DatePicker
                                            selected={dateReport}
                                            onChange={(date) => setDateReport(date)}
                                            dateFormat="MMMM d, yyyy"
                                            name='date_notification'
                                        />
                                    </div>
                                </div>
                                <div className='flex flex-col p-1 font-serif'>
                                    <label className='text-center'>Тип завдання</label>
                                    <select name='task_type'>
                                        <option>
                                            оперативне реагування на виявлення ВНП
                                        </option>
                                        <option>
                                            технічне обстеження території
                                        </option>
                                        <option>
                                            очищення (розмінування) території
                                        </option>
                                        <option>
                                            роботи на договірній основі
                                        </option>
                                        <option>
                                            навчання населення ризикам пов'язаних з ВНП
                                        </option>
                                        <option>
                                            тощо
                                        </option>
                                    </select>
                                </div>
                            </div>
                            <div className='grid grid-rows-3 grid-flow-col border-4 m-5 p-5 font-serif'>
                                <div className='flex flex-col p-1'>
                                    <label className='text-center'>Дата та час отримання залучення</label>
                                    <div className='text-center'>
                                        <DatePicker
                                            selected={dateReceipt}
                                            onChange={(date) => setDateReceipt(date)}
                                            timeInputLabel="Time:"
                                            showTimeInput
                                            dateFormat="MMMM d, yyyy hh:mm"
                                            name='date_received'
                                        />
                                    </div>
                                </div>
                                <div className='flex flex-col p-1'>
                                    <label className='text-center'>Дата та час початку робіт</label>
                                    <div className='text-center'>
                                        <DatePicker
                                            selected={startDate}
                                            onChange={(date) => setStartDate(date)}
                                            timeInputLabel="Time:"
                                            showTimeInput
                                            dateFormat="MMMM d, yyyy hh:mm"
                                            name='start_date'
                                        />
                                    </div>
                                </div>
                                <div className='flex flex-col p-1'>
                                    <label className='text-center'>Дата та час закінчення робіт</label>
                                    <div className='text-center'>
                                        <DatePicker
                                            selected={endDate}
                                            onChange={(date) => setEndDate(date)}
                                            timeInputLabel="Time:"
                                            showTimeInput
                                            dateFormat="MMMM d, yyyy hh:mm"
                                            name='end_date'
                                        />
                                    </div>
                                </div>
                                <div className='flex flex-col p-1'>
                                    <label className='text-center'>Статус виконання робіт</label>
                                    <select name='work_status'>
                                        <option value='done'>
                                            Виконано
                                        </option>
                                        <option value='is_performed'>
                                            Виконується
                                        </option>
                                        <option value='execution_suspended'>
                                            Призупинено виконання
                                        </option>
                                    </select>
                                </div>
                                <PlaceExecutionInput/>
                                <div className='flex flex-col p-1'>
                                    <p className='text-center'>Координати</p>
                                    <div className='flex justify-center ml-5'>
                                        <div className='flex items-center ml-5'>
                                            <label className='pr-4'>N</label>
                                            <input
                                                type='text'
                                                className='form-input'
                                                name='coordinates_north'
                                                onChange={e => checkCoordinates(e)}
                                            />
                                        </div>
                                        <div className='flex items-center ml-5'>
                                            <label className='pr-4'>E</label>
                                            <input
                                                type='text'
                                                className='form-input'
                                                name='coordinates_east'
                                                onChange={e => checkCoordinates(e)}
                                            />
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className='grid grid-cols-3 font-serif'>
                            <div className='flex flex-col border-4 m-5 p-5'>
                                <div id='personnel' className='flex flex-col'>
                                    <p>Залучений особовий склад</p>
                                    <select className='m-2' name='person'>
                                        <option>Сергій Бондарюк</option>
                                        <option>Михайло Ігнатко</option>
                                    </select>
                                </div>
                                <div>
                                    <button type='button' onClick={() => addPerson()}>
                                        Добавити сапера
                                    </button>
                                </div>
                            </div>
                            <div className='flex flex-col border-4 m-5 p-4'>
                                <label className='text-center'>Обстежено території, га</label>
                                <input
                                    type='text'
                                    className='form-input m-2'
                                    name='examined'
                                    onChange={e => checkFloatNumberValue(e)}
                                />
                            </div>
                            <AmmunitionInput/>
                        </div>
                        <div className='grid grid-cols-2 border-4 m-5 p-5 font-serif'>
                            <div className='flex flex-col m-2'>
                                <label className='text-center'>Використано тротилу</label>
                                <input
                                    type='text'
                                    className='form-input'
                                    name='tnt'
                                    onChange={e => checkFloatNumberValue(e)}
                                />
                            </div>
                            <div className='flex flex-col m-2'>
                                <label className='text-center'>Використано детонаторів</label>
                                <input
                                    type='text'
                                    className='form-input'
                                    name='detonator'
                                    onChange={e => checkNumberValue(e)}
                                />
                            </div>
                        </div>
                        <div className='m-5 font-serif'>
                            <button className='bg-green-600 p-3 rounded' type='submit' >
                                Оформити
                            </button>
                        </div>
                    </Form>
                </div>
            </div>
        </>
    )
}
