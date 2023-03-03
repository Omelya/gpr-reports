import React from "react";
import {useState} from "react";
import toast from 'react-hot-toast';
import removeData from "../../http/removeData";
import {getAllInvolvementData} from "../../http/getData";
import {useLoaderData, Form, redirect} from "react-router-dom";

export async function loader() {
    const involvements = await getAllInvolvementData();
    return { involvements };
}

async function removeInvolvement(id) {
    let order = document.getElementsByName('order')[0].value,
        direction = document.getElementsByName('direction')[0].value;

    return await removeData(id)
        .then(() => {
                toast.success('Report deleted');

                return getAllInvolvementData(order, direction);
        })
        .catch( () =>
            toast.error('The report was not deleted, please try again')
        )
}

export async function action({request}) {
    const formData = await request.formData();
    const id = formData.get('id');

    return redirect(`/involvement/${id}/edit`);
}

const Ammunition = (props) => {
    let name = Object.keys(JSON.parse(props.ammunition)),
        value = Object.values(JSON.parse(props.ammunition)),
        list = [];

        for (let n = 0; n < name.length; n++) {
            list.push([name[n].split('_').join(' '), value[n]])
        }

    return(
        list.map((item, keys) =>
            <p key={keys}>{item[0]}: {item[1]}</p>
        )
    )
}

function sorting() {
    let order = document.getElementsByName('order')[0].value,
        direction = document.getElementsByName('direction')[0].value;

    return getAllInvolvementData(order, direction)
}

const Overview = () => {
    const { involvements } = useLoaderData();
    const [involvement, setInvolvement] = useState(involvements)

    return (
        <div className='flex flex-col place-items-center'>
            <div className='text-center my-2 font-bold'>
                <h2>
                    Таблиця залучень
                </h2>
            </div>
            <div className='mb-2'>
                <p className='p-1'>Сортування за</p>
                <select name='order'>
                    <option value='date_notification'>
                        датою донесення
                    </option>
                    <option value='examined'>
                        площею обстеження
                    </option>
                </select>
                <select name='direction'>
                    <option value='asc'>
                        за зростанням
                    </option>
                    <option value='desc'>
                        за зменшенням
                    </option>
                </select>
                <button
                    className='bg-green-400 p-2 ml-2 rounded-lg'
                    onClick={() => sorting().then(
                        response => setInvolvement(response)
                )}>
                    Сортувати
                </button>
            </div>
            {
                involvement.data.data.attributes.length > 0 &&
                <table className='table-auto  border-2'>
                    <thead>
                    <tr className='border-2'>
                        <th className='border-2'>
                            Номер акту
                        </th>
                        <th className='border-2'>
                            Номер донесення
                        </th>
                        <th className='border-2'>
                            Дата виконання
                        </th>
                        <th className='border-2'>
                            Тип завдання
                        </th>
                        <th className='border-2'>
                            Місце виконання
                        </th>
                        <th className='border-2'>
                            Обстежено
                        </th>
                        <th className='border-2'>
                            Знайдено ВНП
                        </th>
                    </tr>
                    </thead>
                    <tbody>
                    {
                        involvement.data.data.attributes.map((involvement) => (
                            <tr id={involvement.id} key={involvement.id} className='text-center border-2'>
                                <td className='border-2'>
                                    {involvement.act_code}
                                </td>
                                <td className='border-2'>
                                    {involvement.report_code}
                                </td>
                                <td className='border-2'>
                                    {involvement.date_notification}
                                </td>
                                <td className='border-2'>
                                    {involvement.task_type.split('_').join(' ')}
                                </td>
                                <td className='border-2'>
                                    {involvement.place_execution}
                                </td>
                                <td className='border-2'>
                                    {involvement.examined} га
                                </td>
                                <td className='border-2'>
                                    <Ammunition
                                        ammunition={involvement.ammunition}
                                    />
                                </td>
                                <td className=' grid grid-column-1'>
                                    <Form method="post">
                                        <button
                                            type='submit'
                                            name='id'
                                            value={involvement.id}
                                            className='border-2 bg-gray-200 hover:bg-gray-300 rounded-lg m-2'
                                        >
                                            Редагувати
                                        </button>
                                    </Form>
                                    <button
                                        id={involvement.id}
                                        className='border-2 bg-gray-200 hover:bg-gray-300 rounded-lg m-2'
                                        onClick={() =>{
                                            removeInvolvement(involvement.id).then(
                                                response => setInvolvement(response)
                                            )
                                        }}
                                    >
                                        Видалити
                                    </button>
                                </td>
                            </tr>
                        ))
                    }
                    </tbody>
                </table>
            }
            {
                involvement.data.data.attributes.length === 0 &&
                    <p className="text-center my-2 font-bold">Донесень немає</p>
            }
        </div>
    )
}

export default Overview;
