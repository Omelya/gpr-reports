import { Form } from "react-router-dom";
import { sendEngagementData } from "../http/sendData";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { useState } from "react";
import closeIcons from "../../img/icons/icons.svg"

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

    await sendEngagementData(params);
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

function addFields () {
    let element = document.getElementById('ammunition'),
        div = document.createElement('div'),
        select = document.createElement('select'),
        option = document.createElement('option'),
        input = document.createElement('input'),
        closeButton = document.createElement('button'),
        img = document.createElement('img');

    div.className = 'grid grid-cols-7 items-center';
    select.className = 'm-2 col-span-4';
    select.name = 'name_ammunition';
    option.innerText = 'Граната Ф-1';
    input.className = 'form-input m-2 number col-span-2'
    input.type = 'text';
    input.name = 'number_ammunition';
    closeButton.className = 'bg-gray-200 rounded-md h-8 w-8 col-start-7';
    closeButton.type = 'button';
    img.src = closeIcons + '#close';
    input.addEventListener('change', numberAmmunition, false);

    closeButton.append(img);
    select.append(option);
    div.append(select, input, closeButton);
    element.append(div);
}

function numberAmmunition () {
    let input = document.getElementById('all_ammunition'),
        ammunition = document.querySelectorAll('.number'),
        value = 0;

    for (let i = 0; i < ammunition.length; i++) {
        value += Number(ammunition[i].value);
    }

    input.value = value;
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
    let year = new Date().getFullYear();

    return (
        <>
            <div>
                <div className='text-center mt-2'>
                    <h3 className='font-serif font-bold text-2xl'>Fill out the form</h3>
                </div>
                <div>
                    <Form method="post" id='report'>
                        <div className='flex flex-col'>
                            <div className='grid grid-cols-2 border-4 m-5 p-5'>
                                <div className='flex flex-col p-1 font-serif'>
                                    <label className='text-center'>Номер акта</label>
                                    <div className='flex items-center justify-center'>
                                        <p>
                                            <select name='act_type'>
                                                <option>
                                                    ОР
                                                </option>
                                                <option>
                                                    ГР
                                                </option>
                                                <option>
                                                    ТО
                                                </option>
                                                <option>
                                                    НР
                                                </option>
                                            </select>
                                            -08-{year}/
                                        </p>
                                        <input type='text' className='form-input w-1/12' name='act_number'/>
                                    </div>
                                </div>
                                <div className='flex flex-col p-1 font-serif'>
                                    <label className='text-center'>Номер донесення</label>
                                    <div className='flex items-center justify-center'>
                                        <p>
                                            <select name='report_type'>
                                                <option>
                                                    ОР
                                                </option>
                                                <option>
                                                    ГР
                                                </option>
                                                <option>
                                                    ТО
                                                </option>
                                                <option>
                                                    НР
                                                </option>
                                            </select>
                                            -08-{year}/
                                        </p>
                                        <input type='text' className='form-input w-1/12' name='report_number'/>
                                    </div>
                                </div>
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
                                <div>
                                    <div className='flex flex-col p-1'>
                                        <label className='text-center'>Місце виконання</label>
                                        <input type='text' className='form-input' name='place_execution'/>
                                    </div>
                                </div>
                                <div className='flex flex-col p-1'>
                                    <p className='text-center'>Координати</p>
                                    <div className='flex justify-center ml-5'>
                                        <div className='flex items-center ml-5'>
                                            <label className='pr-4'>N</label>
                                            <input type='text' className='form-input' name='coordinates_north'/>
                                        </div>
                                        <div className='flex items-center ml-5'>
                                            <label className='pr-4'>E</label>
                                            <input type='text' className='form-input' name='coordinates_east'/>
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
                                <input type='text' className='form-input m-2' name='examined'/>
                            </div>
                            <div className='flex flex-col border-4 m-5 p-4'>
                                <p className='text-center'>Виявлені ВНП</p>
                                <div className='flex flex-col' id='ammunition'>

                                </div>
                                <div>
                                    <button type='button' onClick={() => addFields()}>
                                        Добавити поле
                                    </button>
                                </div>
                                <div className='flex flex-col'>
                                    <label className='text-center'>Всього ВНП</label>
                                    <input
                                        name='all_ammunition'
                                        type='text'
                                        className='form-input'
                                        id='all_ammunition'
                                    />
                                </div>
                            </div>
                        </div>
                        <div className='grid grid-cols-2 border-4 m-5 p-5 font-serif'>
                            <div className='flex flex-col m-2'>
                                <label className='text-center'>Використано тротилу</label>
                                <input type='text' className='form-input' name='tnt'/>
                            </div>
                            <div className='flex flex-col m-2'>
                                <label className='text-center'>Використано детонаторів</label>
                                <input type='text' className='form-input' name='detonator'/>
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
