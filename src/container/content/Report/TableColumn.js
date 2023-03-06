import React from "react";
import PropTypes from "prop-types";
import {TableCell, TableRow} from "@mui/material";

const TableColumn = (props) => {
    let name = Object.keys(props.item)[0];

    return (
        <>
            <TableRow sx={{display: 'flex', flexDirection: 'column'}}>
                <TableCell align='center' sx={{borderWidth: '2px', lineHeight: '1.5rem'}}>
                    {name}
                </TableCell>
                <TableCell align='center' sx={{borderWidth: '2px', padding: '0.1rem', lineHeight: '1.5rem'}}>
                    {props.item[name]['Виконано заявок'] ?? 0}
                </TableCell>
                <TableCell align='center' sx={{borderWidth: '2px', padding: '0.1rem', lineHeight: '1.5rem'}}>
                    {props.item[name]['Проведено залучень'] ?? 0}
                </TableCell>
                <TableCell align='center' sx={{borderWidth: '2px', padding: '0.1rem', lineHeight: '1.5rem'}}>
                    {props.item[name]['Обстежено території'].toFixed(2) ?? 0}
                </TableCell>
                <TableCell align='center' sx={{borderWidth: '2px', padding: '0.1rem', lineHeight: '1.5rem'}}>
                    {props.item[name]['Виявлені ВНП']['Саморобний вибуховий пристрій'] ?? 0}
                </TableCell>
                <TableCell align='center' sx={{borderWidth: '2px', padding: '0.1rem', lineHeight: '1.5rem'}}>
                    {props.item[name]['Виявлені ВНП']['Протипіхотна міна'] ?? 0}
                </TableCell>
                <TableCell align='center' sx={{borderWidth: '2px', padding: '0.1rem', lineHeight: '1.5rem'}}>
                    {props.item[name]['Виявлені ВНП']['Протитанкова міна'] ?? 0}
                </TableCell>
                <TableCell align='center' sx={{borderWidth: '2px', padding: '0.1rem', lineHeight: '1.5rem'}}>
                    {props.item[name]['Виявлені ВНП']['Міна пастка'] ?? 0}
                </TableCell>
                <TableCell align='center' sx={{borderWidth: '2px', padding: '0.1rem', lineHeight: '1.5rem'}}>
                    {props.item[name]['Виявлені ВНП']['Протикорабельна міна'] ?? 0}
                </TableCell>
                <TableCell align='center' sx={{borderWidth: '2px', padding: '0.1rem', lineHeight: '1.5rem'}}>
                    {props.item[name]['Виявлені ВНП']['Реактивний снаряд'] ?? 0}
                </TableCell>
                <TableCell align='center' sx={{borderWidth: '2px', padding: '0.1rem', lineHeight: '1.5rem'}}>
                    {props.item[name]['Виявлені ВНП']['Артилерійський снаряд'] ?? 0}
                </TableCell>
                <TableCell align='center' sx={{borderWidth: '2px', padding: '0.1rem', lineHeight: '1.5rem'}}>
                    {props.item[name]['Виявлені ВНП']['Мінометна міна'] ?? 0}
                </TableCell>
                <TableCell align='center' sx={{borderWidth: '2px', padding: '0.1rem', lineHeight: '1.5rem'}}>
                    {props.item[name]['Виявлені ВНП']['Граната'] ?? 0}
                </TableCell>
                <TableCell align='center' sx={{borderWidth: '2px', padding: '0.1rem', lineHeight: '1.5rem'}}>
                    {props.item[name]['Виявлені ВНП']['Авіаційна бомба'] ?? 0}
                </TableCell>
                <TableCell align='center' sx={{borderWidth: '2px', padding: '0.1rem', lineHeight: '1.5rem'}}>
                    {props.item[name]['Виявлені ВНП']['Касетний боєприпас'] ?? 0}
                </TableCell>
                <TableCell align='center' sx={{borderWidth: '2px', padding: '0.1rem', lineHeight: '1.5rem'}}>
                    {props.item[name]['Виявлені ВНП']['Касетний елемент'] ?? 0}
                </TableCell>
                <TableCell align='center' sx={{borderWidth: '2px', padding: '0.1rem', lineHeight: '1.5rem'}}>
                    {props.item[name]['Виявлені ВНП']['Торпеди'] ?? 0}
                </TableCell>
                <TableCell align='center' sx={{borderWidth: '2px', padding: '0.1rem', lineHeight: '1.5rem'}}>
                    {props.item[name]['Виявлені ВНП']['Підривник'] ?? 0}
                </TableCell>
                <TableCell align='center' sx={{borderWidth: '2px', padding: '0.1rem', lineHeight: '1.5rem'}}>
                    {props.item[name]['Виявлені ВНП']['Набої'] ?? 0}
                </TableCell>
                <TableCell align='center' sx={{borderWidth: '2px', padding: '0.1rem', lineHeight: '1.5rem'}}>
                    {props.item[name]['Виявлені ВНП']['Вибухова речовина'] ?? 0}
                </TableCell>
                <TableCell align='center' sx={{borderWidth: '2px', padding: '0.1rem', lineHeight: '1.5rem'}}>
                    {props.item[name]['Виявлені ВНП']['Інші ВНП'] ?? 0}
                </TableCell>
                <TableCell align='center' sx={{borderWidth: '2px', padding: '0.1rem', lineHeight: '1.5rem'}}>
                    {props.item[name]['Виявлені ВНП']['Всього ВНП'] ?? 0}
                </TableCell>
                <TableCell align='center' sx={{borderWidth: '2px', padding: '0.1rem', lineHeight: '1.5rem'}}>
                    {props.item[name]['Використано тротилу'] ?? 0}
                </TableCell>
                <TableCell align='center' sx={{borderWidth: '2px', padding: '0.1rem', lineHeight: '1.5rem'}}>
                    {props.item[name]['Використано детонаторів'] ?? 0}
                </TableCell>
                <TableCell align='center' sx={{borderWidth: '2px', padding: '0.1rem', lineHeight: '1.5rem'}}>
                    {props.item[name]['Кількість навчань'] ?? 0}
                </TableCell>
                <TableCell align='center' sx={{borderWidth: '2px', padding: '0.1rem', lineHeight: '1.5rem'}}>
                    {props.item[name]['Охоплено осіб'] ?? 0}
                </TableCell>
            </TableRow>
        </>
    )
}

TableColumn.propTypes = {
    item: PropTypes.object
}

export default TableColumn;
