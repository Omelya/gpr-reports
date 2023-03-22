import React, {useEffect, useState} from "react";
import toast from "react-hot-toast";
import {useSelector} from "react-redux";
import PersonalSelect from "./PersonalSelect";
import {Form, redirect} from "react-router-dom";
import Ammunition from "./Ammunition/Ammunition";
import {sendEngagementData} from "../../http/sendData";
import PlaceExecutionInput from "./PlaceExecutionInput/PlaceExecutionInput";
import InvolvementNumberReportInput from "./InvolvementNumberReportInput/InvolvementNumberReportInput";
import StatusSelect from "./StatusSelect";
import Datetime from "./Datetime";
import {Alert, AlertTitle, Typography} from "@mui/material";
import PropTypes from "prop-types";
import CoordinatesBlock from "./Coordinates/CoordinatesBlock";
import Examined from "./Examined/Examined";
import ExplosivesInput from "./Explosives/ExplosivesInput";
import {Box, Button, Paper} from "@mui/material";
import {useFormik} from "formik";
import {Spinner} from "../../Spinner/Spinner";

let errorsMessage;

export async function action({ request, params }) {
    const formData = await request.formData();
    const keys = [
        'act_type',
        'act_number',
        'report_type',
        'report_number',
        'person',
        'name_ammunition',
        'number_ammunition'
    ];
    let involvement = {};
    let person = [];
    let ammunition = {};
    const year = new Date().getFullYear();
    const allAmmunitionName = formData.getAll('name_ammunition');
    const allNumberAmmunition = formData.getAll('number_ammunition');

    for (const [key, value] of formData.entries()) {
        if (!keys.includes(key)) {
            involvement[key] = value;
        }
    }

    formData.getAll('person').forEach(name => person.push(name));

    allAmmunitionName.forEach((name, i) => {
        const cleanedName = name.replace(/\s/gi, '_');
        ammunition[cleanedName] = allNumberAmmunition[i];
    });

    involvement = {
        ...involvement,
        persons: person,
        ammunition: ammunition,
        act_code: `${formData.get('act_type')}-08-${year}/${formData.get('act_number')}`,
        report_code: `${formData.get('report_type')}-08-${year}/${formData.get('report_number')}`
    };

    return sendEngagementData(involvement, params.involvementId)
        .then( () => {
            toast.success('Report sent!');
            localStorage.setItem(involvement.report_code, JSON.stringify(involvement));

            return redirect('/');
        })
        .catch(error => {
            toast.error('Sending error, please try again');

            if (error.response.status !== 422) {
                errorsMessage = error.message;
            } else {
                errorsMessage = [];

                for (let item in error.response.data.errors) {
                    errorsMessage.push(error.response.data.errors[item]);
                }
            }

            return false;
        });
}

const initialValues = {
    act_code: `ОР-08-${new Date().getFullYear()}/`,
    report_code: `ОР-08-${new Date().getFullYear()}/`,
    date_notification: new Date(),
    date_received: new Date(),
    start_date: new Date(),
    end_date: new Date(),
    task_type: 'Prompt response to detection of GNP',
    work_status: 'Done',
    place_execution: '',
    coordinates: undefined,
    examined: 0,
    tnt: 0,
    detonator: 0,
    persons: undefined,
    ammunition: undefined,
    all_ammunition: 0,
}

const Involvement = (props) => {
    const involvement = useSelector(state => state.involvement);
    const [load, setLoad] = useState(true);

    const {
        values,
        setValues
    } = useFormik({
        initialValues,
    });

    useEffect(() => {
        setLoad(true);

        if (involvement.data) {
            setValues({
                act_code: involvement.data.attributes.act_code,
                report_code: involvement.data.attributes.report_code,
                date_notification: involvement.data.attributes.date_notification,
                date_received: involvement.data.attributes.date_received,
                start_date: involvement.data.attributes.start_date,
                end_date: involvement.data.attributes.end_date,
                task_type: involvement.data.attributes.task_type,
                work_status: involvement.data.attributes.work_status,
                place_execution: involvement.data.attributes.place_execution,
                coordinates: involvement.data.attributes.coordinates,
                examined: involvement.data.attributes.examined,
                tnt: involvement.data.attributes.tnt,
                detonator: involvement.data.attributes.detonator,
                persons: involvement.data.attributes.persons,
                ammunition: involvement.data.attributes.ammunition,
                all_ammunition: involvement.data.attributes.all_ammunition,
            });
        }
        
        setLoad(false);
    }, [involvement]);

    useEffect(() => {
        if (props.action === 'create') {
            setValues(initialValues);
        }
    }, [props.action])

    return (
        <>
            <Spinner loading={load}/>
            <Box sx={{
                display: 'flex',
                flexDirection: 'column',
                placeItems: 'center',
                backgroundColor: 'rgba(243, 244, 246)'
            }}>
                <Box sx={{textAlign: 'center', marginTop: '0.5rem'}}>
                    <h3 className='font-serif font-bold text-2xl'>Report form</h3>
                </Box>
                <Form method="post" id='report'>

                    {
                        errorsMessage &&
                        <Alert severity="error">
                            <AlertTitle>Error</AlertTitle>

                            {
                                typeof errorsMessage === 'object' &&
                                errorsMessage.map((item) =>
                                    item.map((message, key) =>
                                        <Typography key={key}>{message}</Typography>
                                    )
                                )
                            }

                            {
                                typeof errorsMessage === 'string' &&
                                <Typography>{errorsMessage}</Typography>
                            }

                        </Alert>
                    }

                    <Box sx={{
                        display: 'grid',
                        gridTemplateColumns: 'repeat(2, minmax(0, 1fr))',
                        margin: '1.25rem'
                    }}>
                        <Paper elevation={3} sx={{
                            display: 'grid',
                            gridTemplateRows: 'repeat(2, minmax(0, 1fr))',
                            marginRight: '0.6rem',
                            padding: '1.25rem'
                        }}>
                            <InvolvementNumberReportInput
                                name='report_number'
                                type='report_type'
                                defaultValue={values.report_code}
                            />
                            <InvolvementNumberReportInput
                                name='act_number'
                                type='act_type'
                                defaultValue={values.act_code}
                            />
                        </Paper>
                        <Paper elevation={3} sx={{
                            display: 'grid',
                            gridTemplateRows: 'repeat(2, minmax(0, 1fr))',
                            marginLeft: '0.6rem',
                            padding: '1.25rem',
                            justifyItems: 'flex-end',
                        }}>
                            <Datetime
                                label="Report date"
                                name="date_notification"
                                value={values.date_notification}
                            />
                            <StatusSelect
                                label="Task type"
                                name="task_type"
                                value={values.task_type}
                                style={{maxWidth: 350}}
                                item={[
                                    'prompt response to detection of GNP',
                                    'technical survey of the territory',
                                    'cleaning (demining) of the territory',
                                    'work on a contractual basis',
                                    'educating the population about the risks associated with GNP',
                                    'etc.'
                                ]}
                            />
                        </Paper>
                    </Box>
                    <Paper elevation={3} sx={{
                        display: 'grid',
                        gridTemplateRows: 'repeat(3, minmax(0, 1fr))',
                        gridAutoFlow: 'column',
                        margin: '1.25rem',
                        padding: '1.25rem'
                    }}>
                        <Datetime
                            label="Date receipt of engagement"
                            name="date_received"
                            dateFormat="YYYY-MM-DD HH:mm"
                            value={values.date_received}
                        />
                        <Datetime
                            label="Date start of work"
                            name="start_date"
                            dateFormat="YYYY-MM-DD HH:mm"
                            value={values.start_date}
                        />
                        <Datetime
                            label="End date of work"
                            name="end_date"
                            dateFormat="YYYY-MM-DD HH:mm"
                            value={values.end_date}
                        />
                        <StatusSelect
                            label="Work progress status"
                            value={values.work_status}
                            name="work_status"
                            style={{width: 220}}
                            item={[
                                'done',
                                'is performed',
                                'execution suspended',
                            ]}
                        />
                        <PlaceExecutionInput
                            value={values.place_execution}
                        />
                        <CoordinatesBlock
                            coordinates={values.coordinates}
                        />
                    </Paper>
                    <Paper elevation={3} sx={{
                        display: 'grid',
                        gridTemplateColumns: 'repeat(3, minmax(0, 1fr))',
                        margin: '1.25rem',
                        padding: '1.25rem'
                    }}>
                        <Examined
                            value={values.examined}
                        />
                        <ExplosivesInput
                            label="TNT was used"
                            name="tnt"
                            measurement="kg"
                            value={values.input}
                        />
                        <ExplosivesInput
                            label="Detonators used"
                            name="detonator"
                            measurement="pcs"
                            value={values.detonator}
                        />
                    </Paper>
                    <Box sx={{
                        display: 'grid',
                        gridTemplateColumns: 'repeat(9, minmax(0, 1fr))',
                        margin: '1.25rem'
                    }}>
                        <PersonalSelect
                            personal={values.persons}
                        />
                        <Ammunition
                            ammunition={values.ammunition}
                            allAmmunition={values.all_ammunition}
                        />
                    </Box>
                    <Box sx={{
                        margin: '1.25rem',
                        display: 'flex',
                        justifyContent: 'center'
                    }}>
                        <Button type="submit" variant="contained" sx={{margin: '10px'}}>
                            Send
                        </Button>
                        {
                            props.action === 'edit' &&
                            <Button variant="contained" onClick={() => window.history.back()} sx={{margin: '10px'}}>
                                Cancel
                            </Button>
                        }
                    </Box>
                </Form>
            </Box>
        </>
    )
}

Involvement.propTypes = {
    action: PropTypes.string.isRequired
}
export default Involvement;
