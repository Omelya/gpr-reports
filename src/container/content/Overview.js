import { getInvolvementData } from "../http/getData";
import { useLoaderData } from "react-router-dom";
import removeData from "../http/removeData";

export async function loader() {
    const involvements = await getInvolvementData();
    return { involvements };
}

function removeInvolvement(id) {
    let element = document.getElementById(id);

    removeData(id)
        .then(response =>
            element.remove()
            //TODO add toast
        )
        .catch(
            //TODO add toast
        )
}

function Overview () {
    const { involvements } = useLoaderData();

    let ammunition;

    return (
        <>
            <div className='text-center my-2 font-bold'>
                <h2>
                    Таблиця залучень
                </h2>
            </div>
            <table className='table-auto container border-2'>
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
                    involvements.data.data.attributes.map((involvement) => (
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
                                {involvement.task_type}
                            </td>
                            <td className='border-2'>
                                {involvement.place_execution}
                            </td>
                            <td className='border-2'>
                                {involvement.examined}
                            </td>
                            <td className='border-2'>
                                {
                                    involvement.ammunition
                                }
                            </td>
                            <td className=' grid grid-column-1'>
                                <button
                                    id={involvement.id}
                                    className='border-2 bg-gray-200 hover:bg-gray-300 rounded-lg m-2'
                                >
                                    Редагувати
                                </button>
                                <button
                                    id={involvement.id}
                                    className='border-2 bg-gray-200 hover:bg-gray-300 rounded-lg m-2'
                                    onClick={e => removeInvolvement(involvement.id)}
                                >
                                    Видалити
                                </button>
                            </td>
                        </tr>
                    ))
                }
                </tbody>
            </table>
        </>
    )
}

export default Overview;