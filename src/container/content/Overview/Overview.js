import React, {useEffect, useState} from "react";
import toast from 'react-hot-toast';
import removeData from "../../http/removeData";
import {getAllInvolvementData} from "../../http/getData";
import {useLoaderData, redirect} from "react-router-dom";
import {
    Box, Checkbox, Paper,
    TableBody, TableCell,
    TableContainer, TableRow, Typography
} from "@mui/material";
import EnhancedToolbar from "./EnhancedToolbar";
import EnhancedTableHead from "./EnhancedTableHead";
import Ammunition from "./Ammunition";
import {Spinner} from "../../Spinner/Spinner";

export async function loader() {
    const involvements = await getAllInvolvementData();
    return { involvements };
}

async function removeInvolvement(selectedId) {
    selectedId.forEach((id) => (
        removeData(id)
            .then(() => {
                toast.success('Report deleted');
            })
            .catch( () =>
                toast.error('The report was not deleted, please try again')
            )
    ))
}

export async function action({request}) {
    const formData = await request.formData();
    const id = formData.get('id');

    return redirect(`/involvement/${id}/edit`);
}

function sorting(orderBy, order) {
    return getAllInvolvementData(orderBy, order);
}

const Overview = () => {
    const { involvements } = useLoaderData();
    const [involvement, setInvolvement] = useState(involvements.data.data.attributes);
    const [selected, setSelected] = useState([]);
    const [orderBy, setOrderBy] = useState('date_notification');
    const [order, setOrder] = useState('asc');
    const [load, setLoad] = useState(true);

    const changeOrder = (order) => {
        setOrder(order);
    }

    const changeOrderBy = (orderBy) => {
        setOrderBy(orderBy);
    }

    const handleAllSelected = (event) => {
        if (event.target.checked) {
            const allSelected = involvement.map((n) => n.id);
            setSelected(allSelected);

            return;
        }

        setSelected([]);
    }

    const handleClick = (id) => {
        let selectedIndex = selected.indexOf(id),
            newSelected = [];

        if (selectedIndex === -1) {
            newSelected = newSelected.concat(selected, id)
        } else if (selectedIndex > -1) {
            newSelected = newSelected.concat(
                selected.slice(0, selectedIndex),
                selected.slice(selectedIndex + 1)
            );
        }

        setSelected(newSelected)
    }

    const isItemSelected = (id) => selected.indexOf(id) !== -1;

    const handleRemove = () => {
        setLoad(true);

        removeInvolvement(selected)
            .then(
                () => setInvolvement(involvement.filter((item) => !selected.includes(item.id)))
            );

        setLoad(false);
    }

    useEffect(() => {
        setLoad(true);

        sorting(orderBy, order).then(
            response => setInvolvement(response.data.data.attributes)
        );

        setLoad(false);
    }, [order, orderBy]);

    return (
        <>
            <Spinner loading={load}/>
            <Box sx={{
                display: 'flex',
                flexDirection: 'column',
                position: 'relative',
                height: '85vh'
            }}>

                {
                    involvement.length > 0 &&
                    <>
                        <EnhancedToolbar
                            handleRemove={handleRemove}
                            id={selected[0] ?? 0}
                            numSelected={selected.length}
                        />
                        <TableContainer component={Paper}>
                            <EnhancedTableHead
                                order={order}
                                orderBy={orderBy}
                                numSelected={selected.length}
                                rowCount={involvement.length}
                                changeOrder={changeOrder}
                                changeOrderBy={changeOrderBy}
                                handleAllSelected={handleAllSelected}
                            />
                            <TableBody>

                                {
                                involvement.map((involvement) => (
                                    <TableRow
                                        hover
                                        id={involvement.id}
                                        key={involvement.id}
                                        tabIndex={-1}
                                        role='checkbox'
                                        onClick={() => handleClick(involvement.id)}
                                        selected={isItemSelected(involvement.id)}
                                        aria-checked={isItemSelected(involvement.id)}
                                    >
                                        <TableCell padding="checkbox">
                                            <Checkbox
                                                color="primary"
                                                onClick={() => handleClick(involvement.id)}
                                                checked={isItemSelected(involvement.id)}
                                                inputProps={{
                                                    'aria-labelledby': involvement.id,
                                                }}
                                            />
                                        </TableCell>
                                        <TableCell>
                                            {involvement.act_code}
                                        </TableCell>
                                        <TableCell>
                                            {involvement.report_code}
                                        </TableCell>
                                        <TableCell>
                                            {involvement.date_notification}
                                        </TableCell>
                                        <TableCell>
                                            {involvement.task_type.split('_').join(' ')}
                                        </TableCell>
                                        <TableCell>
                                            {involvement.place_execution}
                                        </TableCell>
                                        <TableCell>
                                            {involvement.examined} га
                                        </TableCell>
                                        <TableCell>
                                            <Ammunition
                                                ammunition={involvement.ammunition}
                                            />
                                        </TableCell>
                                    </TableRow>
                                ))
                            }
                            </TableBody>
                        </TableContainer>
                    </>
                }

                {
                    involvement.length === 0 &&
                        <Typography textAlign='center' marginY='0.5rem' fontWeight='700'>
                            There are no reports
                        </Typography>
                }

            </Box>
        </>
    )
}

export default Overview;
