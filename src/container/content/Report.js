import DatePicker from "react-datepicker";
import {useState} from "react";
import {getReportData} from "../http/getData";

async function getReport() {
    let dateFrom = document.getElementsByName('date_from')[0].value,
        dateTo = document.getElementsByName('date_to')[0].value,
        reportsType = document.getElementsByName('reports_type')[0].value;

    if (reportsType === 'Всі звіти') {
        reportsType = 'all';
    }

    return await getReportData({
        dateFrom: convertDate(dateFrom),
        dateTo: convertDate(dateTo),
        reportsType: reportsType
    });
}

function getStartDate() {
    let dateNow = Date.now(),
        date = new Date(dateNow),
        month = date.getMonth();

    date.setMonth(month - 1);

    return String(
        date.toLocaleString('en',{month: 'short' }) + '/' +
        date.getDate() + '/' +
        date.getFullYear()
    );
}

function convertDate(date) {
    let dateObject = new Date(date),
        day = '' + dateObject.getDate(),
        month = '' + (dateObject.getMonth() + 1),
        year = dateObject.getFullYear()

    if (month.length < 2) {
        month = '0' + month
    }

    if (day.length < 2) {
        day = '0' + day
    }

    return [year, month, day].join('-');
}

export default function Report () {
    const [startDate, setStartDate] = useState(
        new Date(getStartDate())
    );
    const [endDate, setEndDate] = useState(
        new Date()
    );
    const [report, setReport] = useState(
        []
    );
    let startDay = convertDate(startDate),
        endDay = convertDate(endDate);

    return (
        <>
            <div className='flex flex-row-reverse'>
                <div className='m-1'>
                    <button
                        onClick={(e) => getReport().then(
                            response => {
                                let reports = [],
                                    n = 0

                                for (let report in response.data) {
                                    reports[n] = {[report]: response.data[report]};

                                    n++;
                                }

                                setReport(reports)
                            }
                        )}
                        className='bg-green-400 p-2 mt-6 rounded-lg'
                    >
                        Створити звіт
                    </button>
                </div>
                <div className='m-1'>
                    <p className='text-xs font-medium p-1'>Дата закінчення звітного періоду</p>
                    <div className='text-center'>
                        <DatePicker
                            selected={endDate}
                            onChange={(date) => setEndDate(date)}
                            dateFormat="MMMM d, yyyy"
                            name='date_to'
                        />
                    </div>
                </div>
                <div className='m-1'>
                    <p className='text-xs font-medium p-1'>Дата початку звітного періоду</p>
                    <div className='text-center'>
                        <DatePicker
                            selected={startDate}
                            onChange={(date) => setStartDate(date)}
                            dateFormat="MMMM d, yyyy"
                            name='date_from'
                        />
                    </div>
                </div>
                <div className='m-1'>
                    <p className='text-xs font-medium p-1'>Тип звіту</p>
                    <select name='reports_type'>
                        <option>Всі звіти</option>
                        <option>ОР</option>
                        <option>ГР</option>
                        <option>ТО</option>
                    </select>
                </div>
            </div>
            <hr style={{'borderBottom': 'solid 2px black'}}/>
            {report.length > 0 &&
                <div className='text-center my-2 font-bold'>
                    <h2>
                        Звіт за період з {startDay} по {endDay}
                    </h2>
                        <div>
                            <table className='table-fixed flex'>
                                <thead className='flex flex-col'>
                                    <tr className='border-2'>
                                        <th className='p-3'>
                                            Тип завдання
                                        </th>
                                    </tr>
                                    <tr className='border-2'>
                                        <th>
                                            <p>Виконано заявок</p>
                                        </th>
                                    </tr>
                                    <tr className='border-2'>
                                        <th>
                                            <p>Проведено залучень</p>
                                        </th>
                                    </tr>
                                    <tr className='border-2'>
                                        <th>
                                            <p>Обстеження, га</p>
                                        </th>
                                    </tr>
                                    <tr className='flex'>
                                        <th className='border-2 w-32'>
                                            Знищено, од
                                        </th>
                                        <tr className='flex flex-col w-72'>
                                            <th className='border-2'>
                                                <p>Саморобний вибуховий пристрій</p>
                                            </th>
                                            <th className='border-2'>
                                                <p>Протипіхотна міна</p>
                                            </th>
                                            <th className='border-2'>
                                                <p>Протитанкова міна</p>
                                            </th>
                                            <th className='border-2'>
                                                <p>Міна пастка</p>
                                            </th>
                                            <th className='border-2'>
                                                <p>Протикорабельна міна</p>
                                            </th>
                                            <th className='border-2'>
                                                <p>Реактивний боєприпас</p>
                                            </th>
                                            <th className='border-2'>
                                                <p>Артилерійський снаряд</p>
                                            </th>
                                            <th className='border-2'>
                                                <p>Мінометна міна</p>
                                            </th>
                                            <th className='border-2'>
                                                <p>Граната</p>
                                            </th>
                                            <th className='border-2'>
                                                <p>Авіаційна бомба</p>
                                            </th>
                                            <th className='border-2'>
                                                <p>Касетний боєприпас</p>
                                            </th>
                                            <th className='border-2'>
                                                <p>Касетний елемент</p>
                                            </th>
                                            <th className='border-2'>
                                                <p>Торпеда</p>
                                            </th>
                                            <th className='border-2'>
                                                <p>Підривник</p>
                                            </th>
                                            <th className='border-2'>
                                                <p>Боєприпаси до стрілецької зброї</p>
                                            </th>
                                            <th className='border-2'>
                                                <p>Вибухові речовини, порох</p>
                                            </th>
                                            <th className='border-2'>
                                                <p>Інші ВНП</p>
                                            </th>
                                            <th className='border-2'>
                                                <p>Всього, од.</p>
                                            </th>
                                        </tr>
                                    </tr>
                                    <tr className='flex'>
                                        <th className='border-2 w-32'>
                                            Витрачено
                                        </th>
                                        <tr className='flex flex-col w-72'>
                                            <th className='border-2'>
                                                <p>Тротил, кг</p>
                                            </th>
                                            <th className='border-2'>
                                                <p>ЕД, од.</p>
                                            </th>
                                        </tr>
                                    </tr>
                                    <tr className='border-2'>
                                        <th>
                                            <p>Проведено навчань</p>
                                        </th>
                                    </tr>
                                    <tr className='border-2'>
                                        <th>
                                            <p>Охоплено осіб</p>
                                        </th>
                                    </tr>
                                </thead>
                                <tbody className='flex'>
                                {report.map((item, key) =>
                                    (
                                        <>
                                            <tr className='flex flex-col' key={key}>
                                                <th className='border-2 p-3'>
                                                    {Object.keys(item)[0]}
                                                </th>
                                                <th className='border-2'>
                                                    {item[Object.keys(item)[0]]['Виконано заявок']}
                                                </th>
                                                <th className='border-2'>
                                                    {item[Object.keys(item)[0]]['Проведено залучень']}
                                                </th>
                                                <th className='border-2'>
                                                    {item[Object.keys(item)[0]]['Обстежено території'].toFixed(2)}
                                                </th>
                                                <th className='border-2'>
                                                    {item[Object.keys(item)[0]]['Виявлені ВНП']['Саморобний вибуховий пристрій'] ?? 0}
                                                </th>
                                                <th className='border-2'>
                                                    {item[Object.keys(item)[0]]['Виявлені ВНП']['Протипіхотна міна'] ?? 0}
                                                </th>
                                                <th className='border-2'>
                                                    {item[Object.keys(item)[0]]['Виявлені ВНП']['Протитанкова міна'] ?? 0}
                                                </th>
                                                <th className='border-2'>
                                                    {item[Object.keys(item)[0]]['Виявлені ВНП']['Міна пастка'] ?? 0}
                                                </th>
                                                <th className='border-2'>
                                                    {item[Object.keys(item)[0]]['Виявлені ВНП']['Протикорабельна міна'] ?? 0}
                                                </th>
                                                <th className='border-2'>
                                                    {item[Object.keys(item)[0]]['Виявлені ВНП']['Реактивний снаряд'] ?? 0}
                                                </th>
                                                <th className='border-2'>
                                                    {item[Object.keys(item)[0]]['Виявлені ВНП']['Артилерійський снаряд'] ?? 0}
                                                </th>
                                                <th className='border-2'>
                                                    {item[Object.keys(item)[0]]['Виявлені ВНП']['Мінометна міна'] ?? 0}
                                                </th>
                                                <th className='border-2'>
                                                    {item[Object.keys(item)[0]]['Виявлені ВНП']['Граната'] ?? 0}
                                                </th>
                                                <th className='border-2'>
                                                    {item[Object.keys(item)[0]]['Виявлені ВНП']['Авіаційна бомба'] ?? 0}
                                                </th>
                                                <th className='border-2'>
                                                    {item[Object.keys(item)[0]]['Виявлені ВНП']['Касетний боєприпас'] ?? 0}
                                                </th>
                                                <th className='border-2'>
                                                    {item[Object.keys(item)[0]]['Виявлені ВНП']['Касетний елемент'] ?? 0}
                                                </th>
                                                <th className='border-2'>
                                                    {item[Object.keys(item)[0]]['Виявлені ВНП']['Торпеди'] ?? 0}
                                                </th>
                                                <th className='border-2'>
                                                    {item[Object.keys(item)[0]]['Виявлені ВНП']['Підривник'] ?? 0}
                                                </th>
                                                <th className='border-2'>
                                                    {item[Object.keys(item)[0]]['Виявлені ВНП']['Набої'] ?? 0}
                                                </th>
                                                <th className='border-2'>
                                                    {item[Object.keys(item)[0]]['Виявлені ВНП']['Вибухова речовина'] ?? 0}
                                                </th>
                                                <th className='border-2'>
                                                    {item[Object.keys(item)[0]]['Виявлені ВНП']['Інші ВНП'] ?? 0}
                                                </th>
                                                <th className='border-2'>
                                                    {item[Object.keys(item)[0]]['Виявлені ВНП']['Всього ВНП'] ?? 0}
                                                </th>
                                                <th className='border-2'>
                                                    {item[Object.keys(item)[0]]['Використано тротилу'] ?? 0}
                                                </th>
                                                <th className='border-2'>
                                                    {item[Object.keys(item)[0]]['Використано детонаторів'] ?? 0}
                                                </th>
                                                <th className='border-2'>
                                                    {item[Object.keys(item)[0]]['Кількість навчань'] ?? 0}
                                                </th>
                                                <th className='border-2'>
                                                    {item[Object.keys(item)[0]]['Охоплено осіб'] ?? 0}
                                                </th>
                                            </tr>
                                        </>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                </div>
            }
        </>
    )
}
