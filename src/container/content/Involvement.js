import { Form } from "react-router-dom";
import { sendEngagementData } from "../http/sendData";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import {useState} from "react";

export async function action ({request, params}) {
    let data = document.getElementById('report');
    console.log(new FormData(data).get('date_of_notification'));
    await sendEngagementData();
}

function addPerson () {
    let element = document.getElementById('personnel'),
        select = document.createElement('select'),
        option = document.createElement('option');

    option.innerText = 'Владислав Омеляненко';
    select.className = 'm-2';
    select.append(option);
    element.append(select);
}

function addFields () {
    let element = document.getElementById('ammunition'),
        div = document.createElement('div'),
        select = document.createElement('select'),
        option = document.createElement('option'),
        input = document.createElement('input');

    div.className = 'grid grid-cols-2';
    select.className = 'm-2';
    option.innerText = 'Граната Ф-1';
    input.className = 'form-input m-2 number'
    input.type = 'text';
    input.addEventListener('change', numberAmmunition, false);

    select.append(option);
    div.append(select, input);
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
    const [startDate, setStartDate] = useState(
        new Date()
    );

    return (
        <>
            <div>
                <div>Fill out the form</div>
                <div>
                    <Form method="post" id='report'>
                        <div className='flex flex-col'>
                            <div className='grid grid-cols-2 border-4 m-5 p-5'>
                                <div className='flex flex-col p-1'>
                                    <label className='text-center'>Номер акта</label>
                                    <input type='text' className='form-input' name='act_number'/>
                                </div>
                                <div className='flex flex-col p-1'>
                                    <label className='text-center'>Номер донесення</label>
                                    <input type='text' className='form-input' name='report_number'/>
                                </div>
                                <div className='flex flex-col p-1'>
                                    <label className='text-center'>Дата донесення</label>
                                    <div className='text-center'>
                                        <DatePicker
                                            selected={startDate}
                                            onChange={(date) => setStartDate(date)}
                                            timeInputLabel="Time:"
                                            showTimeInput
                                            dateFormat="MMMM d, yyyy HH:MM"
                                            name='date_of_notification'
                                        />
                                    </div>
                                </div>
                                <div className='flex flex-col p-1'>
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
                            <div className='grid grid-cols-2 border-4 m-5 p-5'>
                                <div className='flex flex-col p-1'>
                                    <label className='text-center'>Дата та час отримання залучення</label>
                                    <div className='text-center'>
                                        <DatePicker
                                            selected={startDate}
                                            onChange={(date) => setStartDate(date)}
                                            timeInputLabel="Time:"
                                            showTimeInput
                                            dateFormat="MMMM d, yyyy HH:MM"
                                            name='date_of_notification'
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
                                            dateFormat="MMMM d, yyyy HH:MM"
                                            name='date_of_notification'
                                        />
                                    </div>
                                </div>
                                <div className='flex flex-col p-1'>
                                    <label className='text-center'>Дата та час закінчення робіт</label>
                                    <div className='text-center'>
                                        <DatePicker
                                            selected={startDate}
                                            onChange={(date) => setStartDate(date)}
                                            timeInputLabel="Time:"
                                            showTimeInput
                                            dateFormat="MMMM d, yyyy HH:MM"
                                            name='date_of_notification'
                                        />
                                    </div>
                                </div>
                                <div className='flex flex-col p-1'>
                                    <label className='text-center'>Статус виконання робіт</label>
                                    <select>
                                        <option className='' value='done'>
                                            Виконано
                                        </option>
                                        <option className='' value='is_performed'>
                                            Виконується
                                        </option>
                                        <option className='' value='execution_suspended'>
                                            Призупинено виконання
                                        </option>
                                    </select>
                                </div>
                                <div>
                                    <div className='flex flex-col p-1'>
                                        <label className='text-center'>Місце виконання</label>
                                        <input type='text' className='form-input'/>
                                    </div>
                                </div>
                                <div className='flex flex-col p-1'>
                                    <p className='text-center'>Координати</p>
                                    <div className='flex ml-5'>
                                        <div className='flex items-center ml-5'>
                                            <label className='pr-4'>N</label>
                                            <input type='text' className='form-input'/>
                                        </div>
                                        <div className='flex items-center ml-5'>
                                            <label className='pr-4'>E</label>
                                            <input type='text' className='form-input'/>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className='flex'>
                            <div className='grid grid-cols-3'>
                                <div className='flex flex-col border-4 m-5 p-5'>
                                    <div id='personnel' className='flex flex-col'>
                                        <p>Залучений особовий склад</p>
                                        <select className='m-2'>
                                            <option>Сергій Бондарюк</option>
                                            <option>Михайло Ігнатко</option>
                                        </select>
                                    </div>
                                    <div>
                                        <button onClick={() => addPerson()}>
                                            Добавити сапера
                                        </button>
                                    </div>
                                </div>
                                <div className='flex flex-col border-4 m-5 p-4'>
                                    <label className='text-center'>Обстежено території, га</label>
                                    <input type='text' className='form-input m-2'/>
                                </div>
                                <div className='flex flex-col border-4 m-5 p-4'>
                                    <p className='text-center'>Виявлені ВНП</p>
                                    <div className='flex flex-col' id='ammunition'>
                                        <div className='grid grid-cols-2'>
                                            <select className='m-2'>
                                                <option>Протитанкова міна ТМ-56</option>
                                                <option>Протитанкова міна ТМ-72</option>
                                            </select>
                                            <input
                                                type='text'
                                                className='form-input m-2 number'
                                                onChange={() => numberAmmunition()}
                                            />
                                        </div>
                                    </div>
                                    <div>
                                        <button onClick={() => addFields()}>
                                            Добавити поле
                                        </button>
                                    </div>
                                    <div className='flex flex-col'>
                                        <label className='text-center'>Всього ВНП</label>
                                        <input disabled type='text' className='form-input' id='all_ammunition'/>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className='grid grid-cols-2 border-4 m-5 p-5'>
                            <div className='flex flex-col m-2'>
                                <label className='text-center'>Використано тротилу</label>
                                <input type='text' className='form-input'/>
                            </div>
                            <div className='flex flex-col m-2'>
                                <label className='text-center'>Використано детонаторів</label>
                                <input type='text' className='form-input'/>
                            </div>
                        </div>
                        <div className='m-5'>
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
