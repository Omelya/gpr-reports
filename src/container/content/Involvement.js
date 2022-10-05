import {Form} from "react-router-dom";
import {sendEngagementData} from "../http/sendData";

export async function action () {
    await sendEngagementData();
}

function addPerson (event) {
    let element = document.getElementById('personnel'),
        select = document.createElement('select'),
        option = document.createElement('option');

    option.innerText = 'Владислав Омеляненко';
    select.append(option);
    element.append(select);
}

export default function Involvement () {
    return (
        <>
            <div>
                <div>Fill out the form</div>
                <div>
                    <Form method="post">
                        <div className='flex flex-col'>
                            <div className='grid grid-cols-2 border-4 m-5 p-5'>
                                <div className='flex flex-col p-1'>
                                    <label className='text-center'>Номер акта</label>
                                    <input type='text' className='form-input'/>
                                </div>
                                <div className='flex flex-col p-1'>
                                    <label className='text-center'>Номер донесення</label>
                                    <input type='text' className='form-input'/>
                                </div>
                                <div className='flex flex-col p-1'>
                                    <label className='text-center'>Дата донесення</label>
                                    <input type='text' className='form-input'/>
                                </div>
                                <div className='flex flex-col p-1'>
                                    <label className='text-center'>Тип завдання</label>
                                    <input type='text' className='form-input'/>
                                </div>
                            </div>
                            <div className='grid grid-cols-2 border-4 m-5 p-5'>
                                <div className='flex flex-col p-1'>
                                    <label className='text-center'>Дата та час отримання залучення</label>
                                    <input type='text' className='form-input'/>
                                </div>
                                <div className='flex flex-col p-1'>
                                    <label className='text-center'>Дата та час початку робіт</label>
                                    <input type='text' className='form-input'/>
                                </div>
                                <div className='flex flex-col p-1'>
                                    <label className='text-center'>Дата та час закінчення робіт</label>
                                    <input type='text' className='form-input'/>
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
                            <div className='grid grid-cols-1 border-4 m-5 p-5'>
                                <div id='personnel' className='flex flex-col'>
                                    <p>Залучений особовий склад</p>
                                    <select>
                                        <option>Сергій Бондарюк</option>
                                        <option>Михайло Ігнатко</option>
                                    </select>
                                </div>
                                <div>
                                    <button onClick={(e) => addPerson(e)}>
                                        Добавити сапера
                                    </button>
                                </div>
                            </div>
                        </div>
                        <div>
                            <label>Обстежено території, га</label>
                            <input type='text' className='form-input'/>
                        </div>
                        <div>
                            <p>Виявлені ВНП</p>
                            <div>
                                <label>
                                    Протитанкова міна ТМ-56
                                </label>
                                <input type='text' className='form-input'/>
                            </div>
                        </div>
                        <div>
                            <label>Всього ВНП</label>
                            <input type='text' className='form-input'/>
                        </div>
                        <div>
                            <div>
                                <label>Використано тротилу</label>
                                <input type='text' className='form-input'/>
                            </div>
                            <div>
                                <label>Використано детонаторів</label>
                                <input type='text' className='form-input'/>
                            </div>
                        </div>
                    </Form>
                </div>
            </div>
        </>
    )
}
