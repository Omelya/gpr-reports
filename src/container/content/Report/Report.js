import {useState} from "react";
import TableColumn from "./TableColumn";
import DatePicker from "react-datepicker";
import {getReportData} from "../../http/getData";
import getStartDate from "../../../helpers/date/startDate";
import convertDate from "../../../helpers/date/convertDate";

const getReport = async () => {
    let dateFrom = document.getElementsByName('date_from')[0].value,
        dateTo = document.getElementsByName('date_to')[0].value,
        reportsType = document.getElementsByName('reports_type')[0].value;

    return await getReportData({
        dateFrom: convertDate(dateFrom),
        dateTo: convertDate(dateTo),
        reportsType: reportsType
    });
}

export default () => {
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
                        <option value='all'>Всі звіти</option>
                        <option value='ОР'>ОР</option>
                        <option value='ГР'>ГР</option>
                        <option value='ТО'>ТО</option>
                    </select>
                </div>
            </div>
            <hr style={{'borderBottom': 'solid 2px black'}}/>
            {report.length > 0 &&
                <div className='flex flex-col place-items-center my-2 font-bold'>
                    <h2 className='my-4'>
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
                                        <TableColumn
                                            item={item}
                                            key={key}
                                        />
                                    ))}
                                </tbody>
                            </table>
                        </div>
                </div>
            }
        </>
    )
}
