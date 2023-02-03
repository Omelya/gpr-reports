import {useState} from "react";
import toast from 'react-hot-toast';
import Coordinates from "./Coordinates";
import {useSelector} from "react-redux";
import DatePicker from "react-datepicker";
import PersonalSelect from "./PersonalSelect";
import {Form, redirect} from "react-router-dom";
import Ammunition from "./Ammunition/Ammunition";
import "react-datepicker/dist/react-datepicker.css";
import {sendEngagementData} from "../../http/sendData";
import PlaceExecutionInput from "./PlaceExecutionInput";
import checkFormData from "../../validation/checkFormData";
import convertDate from "../../../helpers/date/convertDate";
import InvolvementNumberInput from "./InvolvementNumberInput";
import {checkNumberValue} from "../../validation/checkNumberValue";
import checkFloatNumberValue from "../../validation/checkFloatNumberValue";

export async function action({ request, params }) {
    const formData = await request.formData();
    const keys = [
        'act_type',
        'act_number',
        'report_type',
        'report_number',
        'person',
        'name_ammunition',
        'number_ammunition'
    ];
    let involvement = {};
    let person = [];
    let ammunition = {};
    const year = new Date().getFullYear();
    const allAmmunitionName = formData.getAll('name_ammunition');
    const allNumberAmmunition = formData.getAll('number_ammunition');

    const error = checkFormData(formData);

    for (const [key, value] of formData.entries()) {
        if (!keys.includes(key)) {
            involvement[key] = value;
        }
    }

    formData.getAll('person').forEach(name => person.push(name));

    allAmmunitionName.forEach((name, i) => {
        const cleanedName = name.replace(/\s/gi, '_');
        ammunition[cleanedName] = allNumberAmmunition[i];
    });

    involvement = {
        ...involvement,
        date_notification: convertDate(involvement['date_notification']),
        date_received: convertDate(involvement['date_received']),
        start_date: convertDate(involvement['start_date']),
        end_date: convertDate(involvement['end_date']),
        persons: person,
        ammunition: ammunition,
        act_code: `${formData.get('act_type')}-08-${year}/${formData.get('act_number')}`,
        report_code: `${formData.get('report_type')}-08-${year}/${formData.get('report_number')}`
    };

    if (!error) {
        document.getElementById('error').classList.add('hidden');

        await toast.promise(
            sendEngagementData(involvement, params.involvementId),
            {
                loading: 'Sending...',
                success: <b>Report sent!</b>,
                error: <b>Sending error, please try again</b>,
            }
        );

        localStorage.setItem(involvement.report_code, JSON.stringify(involvement));

        return redirect('/');
    } else {
        document.getElementById('error').classList.remove('hidden');
    }
}

export default (props) => {
    const involvement = useSelector(state => state.involvement)

    let item = involvement.length === 0 ? [] : involvement.data.attributes;

    const [dateReport, setDateReport] = useState(
        item.date_notification === undefined
            ? new Date()
            : new Date(item.date_notification)
    );

    const [dateReceipt, setDateReceipt] = useState(
        item.date_received === undefined
            ? new Date()
            : new Date(item.date_received)
    );

    const [startDate, setStartDate] = useState(
        item.start_date === undefined
            ? new Date()
            : new Date(item.start_date)
    );

    const [endDate, setEndDate] = useState(
        item.end_date === undefined
            ? new Date()
            : new Date(item.end_date)
    );

    return (
        <>
            <div className='flex flex-col place-items-center'>
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
                                    defaultValue={item.act_code}
                                />
                                <InvolvementNumberInput
                                    name='report_number'
                                    type='report_type'
                                    defaultValue={item.report_code}
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
                                    <select name='task_type' defaultValue={item.task_type}>
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
                                    <select name='work_status' defaultValue={item.work_status}>
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
                                <PlaceExecutionInput
                                    defaultValue={item.place_execution}
                                />
                                <div className='flex flex-col p-1'>
                                    <p className='text-center'>Координати</p>
                                    <div className='flex justify-center ml-5'>
                                        <Coordinates
                                            name='coordinates_north'
                                            coordinates={item.coordinates}
                                            type='N'
                                        />
                                        <Coordinates
                                            name='coordinates_east'
                                            coordinates={item.coordinates}
                                            type='E'
                                        />
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className='grid grid-cols-3 font-serif'>
                            <PersonalSelect
                                personal={item.persons}
                            />
                            <div className='flex flex-col border-4 m-5 p-4'>
                                <label className='text-center'>Обстежено території, га</label>
                                <input
                                    type='text'
                                    className='form-input m-2'
                                    name='examined'
                                    onChange={e => checkFloatNumberValue(e)}
                                    defaultValue={item.examined}
                                />
                            </div>
                            <Ammunition
                                ammunition={item.ammunition}
                                allAmmunition={item.all_ammunition ?? '0'}
                            />
                        </div>
                        <div className='grid grid-cols-2 border-4 m-5 p-5 font-serif'>
                            <div className='flex flex-col m-2'>
                                <label className='text-center'>Використано тротилу</label>
                                <input
                                    type='text'
                                    className='form-input'
                                    name='tnt'
                                    onChange={e => checkFloatNumberValue(e)}
                                    defaultValue={item.tnt}
                                />
                            </div>
                            <div className='flex flex-col m-2'>
                                <label className='text-center'>Використано детонаторів</label>
                                <input
                                    type='text'
                                    className='form-input'
                                    name='detonator'
                                    onChange={e => checkNumberValue(e)}
                                    defaultValue={item.detonator}
                                />
                            </div>
                        </div>
                        <div className='m-5 font-serif flex'>
                            <button className='bg-green-600 p-3 rounded' type='submit' >
                                Оформити
                            </button>
                            {
                                props.action === 'edit' &&
                                <button className='p-3 rounded' type='button' onClick={() => window.history.back()}>
                                    Відмінити
                                </button>
                            }
                        </div>
                    </Form>
                </div>
            </div>
        </>
    )
}