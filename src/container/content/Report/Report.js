import React, {useEffect, useState} from "react";
import TableColumn from "./TableColumn";
import {getReportData} from "../../http/getData";
import getStartDate from "../../../helpers/date/startDate";
import convertDate from "../../../helpers/date/convertDate";
import {
    Box,
    Button,
    FormControl,
    InputLabel,
    MenuItem,
    Paper,
    Select, TableBody, TableCell,
    TableContainer,
    TableHead, TableRow,
    TextField, Typography
} from "@mui/material";
import {AdapterMoment} from "@mui/x-date-pickers/AdapterMoment";
import {DateTimePicker, LocalizationProvider} from "@mui/x-date-pickers";
import {Spinner} from "../../Spinner/Spinner";

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

const menuItem = [
    {name: 'All reports', value: 'all'},
    {name: 'ОР', value: 'ОР'},
    {name: 'ГР', value: 'ГР'},
    {name: 'ТО', value: 'ТО'},
]

const Report = () => {
    const [startDate, setStartDate] = useState(
        new Date(getStartDate())
    );
    const [endDate, setEndDate] = useState(
        new Date()
    );
    const [report, setReport] = useState(
        []
    );
    const [typeReport, setTypeReport] = useState('all');
    const [position, setPosition] = useState('');
    const [load, setLoad] = useState(true);

    let startDay = convertDate(startDate),
        endDay = convertDate(endDate);

    useEffect(() => {
        if (report.length > 0) {
            setPosition('');
        } else {
            setPosition('relative');
        }

        setLoad(false);
    }, [report]);

    return (
        <>
            <Spinner loading={load}/>
            <Box sx={{
                position: position,
                bottom: '381px',
            }}>
                <Paper sx={{
                    display: 'flex',
                    flexDirection: 'row-reverse',
                    alignItems: 'center',
                }}>
                    <Box sx={{margin: '1rem'}} onClick={() => setLoad(true)}>
                        <Button
                            size="large"
                            variant="contained"
                            type='button'
                            onClick={() => getReport().then(
                                response => {
                                    let reports = [],
                                        n = 0

                                    for (let report in response.data) {
                                        reports[n] = {[report]: response.data[report]};

                                        n++;
                                    }

                                    setReport(reports);
                                }
                            )}
                        >
                            Create a report
                        </Button>
                    </Box>
                    <Box sx={{margin: '1rem'}}>
                        <LocalizationProvider dateAdapter={AdapterMoment}>
                            <DateTimePicker
                                disableMaskedInput
                                label='End date of the reporting period'
                                inputFormat='MMMM d, yyyy'
                                value={endDate}
                                onChange={(date) => setEndDate(date)}
                                renderInput={(params) =>
                                    <TextField
                                        {...params}
                                        name='date_to'
                                    />
                                }
                            />
                        </LocalizationProvider>
                    </Box>
                    <Box sx={{margin: '1rem'}}>
                        <LocalizationProvider dateAdapter={AdapterMoment}>
                            <DateTimePicker
                                disableMaskedInput
                                label='Start date of the reporting period'
                                inputFormat='MMMM d, yyyy'
                                value={startDate}
                                onChange={(date) => setStartDate(date)}
                                renderInput={(params) =>
                                    <TextField
                                        {...params}
                                        name='date_from'
                                    />
                                }
                            />
                        </LocalizationProvider>
                    </Box>
                    <Box sx={{margin: '1rem'}}>
                        <FormControl>
                            <InputLabel id='reports_type'>Report type</InputLabel>
                            <Select
                                labelId='reports_type'
                                label='Report type'
                                name='reports_type'
                                onChange={(e) => setTypeReport(e.target.value)}
                                value={typeReport}
                            >
                                {
                                    menuItem.map((item, key) =>
                                        <MenuItem key={key} value={item.value}>
                                            {item.name}
                                        </MenuItem>
                                    )
                                }
                            </Select>
                        </FormControl>
                    </Box>
                </Paper>
                <Typography component='hr' sx={{'borderBottom': 'solid 2px black'}}/>
            </Box>


            {
                report.length > 0 &&
                <>

                    <Box sx={{
                        display: 'flex',
                        flexDirection: 'column',
                        placeItems: 'center',
                        marginTop: '0.5rem',
                        marginBottom: '0.5rem',
                    }}>
                        <Typography
                            component='h2'
                            sx={{
                                fontWeight: 700,
                                marginTop: '1rem',
                                marginBottom: '1rem',
                            }}>
                            Звіт за період з {startDay} по {endDay}
                        </Typography>
                        <Box>
                            <TableContainer component={Paper} sx={{
                                display: 'flex',
                                overflow: 'hidden'
                            }}>
                                <TableHead>
                                    <TableRow sx={{display: 'flex', flexDirection: 'column'}}>
                                        <TableCell align="center" sx={{borderWidth: '2px'}}>
                                            Task type
                                        </TableCell>
                                        <TableCell align="center" sx={{borderWidth: '2px', padding: '0.1rem'}}>
                                            Application completed
                                        </TableCell>
                                        <TableCell align="center" sx={{borderWidth: '2px', padding: '0.1rem'}}>
                                            Recruitment has been carried out
                                        </TableCell>
                                        <TableCell align="center" sx={{borderWidth: '2px', padding: '0.1rem'}}>
                                            Survey, ga
                                        </TableCell>
                                    </TableRow>
                                    <TableRow sx={{display: 'flex'}}>
                                        <TableCell align='center' sx={{borderWidth: '2px', width: '8rem'}}>
                                            Destroyed, pcs
                                        </TableCell>
                                        <TableRow sx={{
                                            display: 'flex',
                                            flexDirection: 'column',
                                            width: '18rem'
                                        }}>
                                            <TableCell align='center' sx={{borderWidth: '2px', padding: '0.1rem'}}>
                                                Саморобний вибуховий пристрій
                                            </TableCell>
                                            <TableCell align='center' sx={{borderWidth: '2px', padding: '0.1rem'}}>
                                                Протипіхотна міна
                                            </TableCell>
                                            <TableCell align='center' sx={{borderWidth: '2px', padding: '0.1rem'}}>
                                                Протитанкова міна
                                            </TableCell>
                                            <TableCell align='center' sx={{borderWidth: '2px', padding: '0.1rem'}}>
                                                Міна пастка
                                            </TableCell>
                                            <TableCell align='center' sx={{borderWidth: '2px', padding: '0.1rem'}}>
                                                Протикорабельна міна
                                            </TableCell>
                                            <TableCell align='center' sx={{borderWidth: '2px', padding: '0.1rem'}}>
                                                Реактивний боєприпас
                                            </TableCell>
                                            <TableCell align='center' sx={{borderWidth: '2px', padding: '0.1rem'}}>
                                                Артилерійський снаряд
                                            </TableCell>
                                            <TableCell align='center' sx={{borderWidth: '2px', padding: '0.1rem'}}>
                                                Мінометна міна
                                            </TableCell>
                                            <TableCell align='center' sx={{borderWidth: '2px', padding: '0.1rem'}}>
                                                Граната
                                            </TableCell>
                                            <TableCell align='center' sx={{borderWidth: '2px', padding: '0.1rem'}}>
                                                Авіаційна бомба
                                            </TableCell>
                                            <TableCell align='center' sx={{borderWidth: '2px', padding: '0.1rem'}}>
                                                Касетний боєприпас
                                            </TableCell>
                                            <TableCell align='center' sx={{borderWidth: '2px', padding: '0.1rem'}}>
                                                Касетний елемент
                                            </TableCell>
                                            <TableCell align='center' sx={{borderWidth: '2px', padding: '0.1rem'}}>
                                                Торпеда
                                            </TableCell>
                                            <TableCell align='center' sx={{borderWidth: '2px', padding: '0.1rem'}}>
                                                Підривник
                                            </TableCell>
                                            <TableCell align='center' sx={{borderWidth: '2px', padding: '0.1rem'}}>
                                                Боєприпаси до стрілецької зброї
                                            </TableCell>
                                            <TableCell align='center' sx={{borderWidth: '2px', padding: '0.1rem'}}>
                                                Вибухові речовини, порох
                                            </TableCell>
                                            <TableCell align='center' sx={{borderWidth: '2px', padding: '0.1rem'}}>
                                                Інші ВНП
                                            </TableCell>
                                            <TableCell align='center' sx={{borderWidth: '2px', padding: '0.1rem'}}>
                                                Всього, од.
                                            </TableCell>
                                        </TableRow>
                                    </TableRow>
                                    <TableRow sx={{display: 'flex'}}>
                                        <TableCell align='center' sx={{borderWidth: '2px', width: '8rem'}}>
                                            Витрачено
                                        </TableCell>
                                        <TableRow sx={{
                                            display: 'flex',
                                            flexDirection: 'column',
                                            width: '18rem'
                                        }}>
                                            <TableCell align='center' sx={{borderWidth: '2px', padding: '0.1rem'}}>
                                                Тротил, кг
                                            </TableCell>
                                            <TableCell align='center' sx={{borderWidth: '2px', padding: '0.1rem'}}>
                                                ЕД, од.
                                            </TableCell>
                                        </TableRow>
                                    </TableRow>
                                    <TableRow sx={{display: 'flex', flexDirection: 'column'}}>
                                        <TableCell sx={{borderWidth: '2px', padding: '0.1rem'}}>
                                            Проведено навчань
                                        </TableCell>
                                        <TableCell sx={{borderWidth: '2px', padding: '0.1rem'}}>
                                            Охоплено осіб
                                        </TableCell>
                                    </TableRow>
                                    <TableRow sx={{borderWidth: '2px', padding: '0.1rem'}}>

                                    </TableRow>
                                </TableHead>
                                <TableBody sx={{display: 'flex'}}>
                                {report.map((item, key) =>
                                    (
                                        <TableColumn
                                            item={item}
                                            key={key}
                                        />
                                    ))}
                                </TableBody>
                            </TableContainer>
                        </Box>
                    </Box>
                </>
            }
        </>
    )
}

export default Report;
