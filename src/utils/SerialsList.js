import React, {useContext} from 'react';
import {observer} from "mobx-react-lite";
import {Context} from "../index";
import SerialCard from "./SerialCard";
import { Grid } from '@mui/material'

const SerialsList = observer(() => {
    const {serial} = useContext(Context)

    return (
        <Grid container spacing={2}>
            {serial.serials.map(serial =>
                <SerialCard key={serial.serial_id} serial={serial}/>
            )}
        </Grid>
    );
});

export default SerialsList;