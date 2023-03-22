import {Box, Checkbox, TableCell, TableHead, TableRow, TableSortLabel} from "@mui/material";
import {visuallyHidden} from "@mui/utils";
import React from "react";
import PropTypes from "prop-types";

const headCells = [
    {
        id: 'act_number',
        disablePadding: true,
        label: 'Act number',
    },
    {
        id: 'report_number',
        disablePadding: false,
        label: 'Report number',
    },
    {
        id: 'date_notification',
        disablePadding: false,
        label: 'Execution date',
    },
    {
        id: 'task_type',
        disablePadding: false,
        label: 'Task type',
    },
    {
        id: 'place_execution',
        disablePadding: false,
        label: 'Place of execution',
    },
    {
        id: 'examined',
        disablePadding: false,
        label: 'Examined',
    },
    {
        id: 'gnp_found',
        disablePadding: false,
        label: 'GNP found',
    },
];

const EnhancedTableHead = (props) => {
    const createSortHandler = (orderBy, order, active) => {
        props.changeOrderBy(orderBy);

        if (active) {
            props.changeOrder(order === 'desc' ? 'asc' : 'desc');
        } else {
            props.changeOrder('asc');
        }
    }

    return (
        <TableHead>
            <TableRow>
                <TableCell padding="checkbox">
                    <Checkbox
                        color="primary"
                        indeterminate={props.numSelected > 0 && props.numSelected < props.rowCount}
                        checked={props.rowCount > 0 && props.numSelected === props.rowCount}
                        onChange={(e) => props.handleAllSelected(e)}
                        inputProps={{
                            'aria-label': 'select all involvements',
                        }}
                    />
                </TableCell>
                {
                    headCells.map((headCell) => (
                        <TableCell
                            key={headCell.id}
                            align='center'
                            padding='normal'
                            sortDirection={props.orderBy === headCell.id ? props.order : false}
                        >
                            <TableSortLabel
                                active={props.orderBy === headCell.id}
                                direction={props.orderBy === headCell.id ? props.order : 'asc'}
                                onClick={() =>
                                    createSortHandler(headCell.id, props.order, props.orderBy === headCell.id)
                                }
                            >
                                {headCell.label}

                                {
                                    props.orderBy === headCell.id
                                        ? (
                                        <Box component="span" sx={visuallyHidden}>
                                            {props.order === 'desc' ? 'sorted descending' : 'sorted ascending'}
                                        </Box>
                                        )
                                        : null
                                }

                            </TableSortLabel>
                        </TableCell>
                    ))
                }
            </TableRow>
        </TableHead>
    )
}

EnhancedTableHead.propTypes = {
    order: PropTypes.string,
    orderBy: PropTypes.string,
    numSelected: PropTypes.number,
    rowCount: PropTypes.number,
    changeOrder: PropTypes.func,
    changeOrderBy: PropTypes.func,
    handleAllSelected: PropTypes.func,
}

export default EnhancedTableHead;
