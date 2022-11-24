import DatePicker from "react-datepicker";
import {useState} from "react";
import {getReportData} from "../http/getData";

async function getReport() {
    let dateFrom = document.getElementsByName('date_from')[0].value,
        dateTo = document.getElementsByName('date_to')[0].value;

    return await getReportData({
        dateFrom: convertDate(dateFrom),
        dateTo: convertDate(dateTo)
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

function Report () {
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
    console.log(report)
    return (
        <>
            <div className='flex flex-row-reverse'>
                <div className='m-1'>
                    <button
                        onClick={(e) => getReport().then(
                            response => setReport([response.data])
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
            </div>
            <hr style={{'borderBottom': 'solid 2px black'}}/>
            {report.length > 0 &&
                <div className='text-center my-2 font-bold'>
                    <h2>
                        Звіт за період з {startDay} по {endDay}
                    </h2>
                    {/*{report.map((item, key) =>*/}
                    {/*    //TODO*/}
                    {/*)}*/}
                </div>
            }
        </>
    )
}

export default Report;