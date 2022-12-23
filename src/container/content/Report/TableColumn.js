export default (props) => {
    let name = Object.keys(props.item)[0];

    return (
        <>
            <tr className='flex flex-col'>
                <th className='border-2 p-3' >
                    {name}
                </th>
                <th className='border-2'>
                    {props.item[name]['Виконано заявок'] ?? 0}
                </th>
                <th className='border-2'>
                    {props.item[name]['Проведено залучень'] ?? 0}
                </th>
                <th className='border-2'>
                    {props.item[name]['Обстежено території'].toFixed(2) ?? 0}
                </th>
                <th className='border-2'>
                    {props.item[name]['Виявлені ВНП']['Саморобний вибуховий пристрій'] ?? 0}
                </th>
                <th className='border-2'>
                    {props.item[name]['Виявлені ВНП']['Протипіхотна міна'] ?? 0}
                </th>
                <th className='border-2'>
                    {props.item[name]['Виявлені ВНП']['Протитанкова міна'] ?? 0}
                </th>
                <th className='border-2'>
                    {props.item[name]['Виявлені ВНП']['Міна пастка'] ?? 0}
                </th>
                <th className='border-2'>
                    {props.item[name]['Виявлені ВНП']['Протикорабельна міна'] ?? 0}
                </th>
                <th className='border-2'>
                    {props.item[name]['Виявлені ВНП']['Реактивний снаряд'] ?? 0}
                </th>
                <th className='border-2'>
                    {props.item[name]['Виявлені ВНП']['Артилерійський снаряд'] ?? 0}
                </th>
                <th className='border-2'>
                    {props.item[name]['Виявлені ВНП']['Мінометна міна'] ?? 0}
                </th>
                <th className='border-2'>
                    {props.item[name]['Виявлені ВНП']['Граната'] ?? 0}
                </th>
                <th className='border-2'>
                    {props.item[name]['Виявлені ВНП']['Авіаційна бомба'] ?? 0}
                </th>
                <th className='border-2'>
                    {props.item[name]['Виявлені ВНП']['Касетний боєприпас'] ?? 0}
                </th>
                <th className='border-2'>
                    {props.item[name]['Виявлені ВНП']['Касетний елемент'] ?? 0}
                </th>
                <th className='border-2'>
                    {props.item[name]['Виявлені ВНП']['Торпеди'] ?? 0}
                </th>
                <th className='border-2'>
                    {props.item[name]['Виявлені ВНП']['Підривник'] ?? 0}
                </th>
                <th className='border-2'>
                    {props.item[name]['Виявлені ВНП']['Набої'] ?? 0}
                </th>
                <th className='border-2'>
                    {props.item[name]['Виявлені ВНП']['Вибухова речовина'] ?? 0}
                </th>
                <th className='border-2'>
                    {props.item[name]['Виявлені ВНП']['Інші ВНП'] ?? 0}
                </th>
                <th className='border-2'>
                    {props.item[name]['Виявлені ВНП']['Всього ВНП'] ?? 0}
                </th>
                <th className='border-2'>
                    {props.item[name]['Використано тротилу'] ?? 0}
                </th>
                <th className='border-2'>
                    {props.item[name]['Використано детонаторів'] ?? 0}
                </th>
                <th className='border-2'>
                    {props.item[name]['Кількість навчань'] ?? 0}
                </th>
                <th className='border-2'>
                    {props.item[name]['Охоплено осіб'] ?? 0}
                </th>
            </tr>
        </>
    )
}
