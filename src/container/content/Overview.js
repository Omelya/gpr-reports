function Overview () {
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
                    <tr className='text-center border-2'>
                        <td className='border-2'>
                            Номер акту
                        </td>
                        <td className='border-2'>
                            Номер донесення
                        </td>
                        <td className='border-2'>
                            Дата виконання
                        </td>
                        <td className='border-2'>
                            Тип завдання
                        </td>
                        <td className='border-2'>
                            Місце виконання
                        </td>
                        <td className='border-2'>
                            Обстежено
                        </td>
                        <td className='border-2'>
                            Знайдено ВНП
                        </td>
                    </tr>
                </tbody>
            </table>
        </>
    )
}

export default Overview;