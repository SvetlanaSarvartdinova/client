import React, {useContext, useEffect, useState} from 'react';
import {observer} from "mobx-react-lite";
import {Context} from "../index";
import { fetchLists } from '../http/SerialAPI';
import { Grid, Typography, Container, Paper, Tabs, Tab} from "@mui/material";
import SerialCard from '../utils/SerialCard';


const Dashboard = observer(() => {
    const {user} = useContext(Context)
    const [viewedList, setViewedList] = useState([])
    const [willList, setWillList] = useState([])
    const [value, setValue] = React.useState("1");

    const handleChange = (event, newValue) => {
    setValue(newValue);
  };

    useEffect(() => {
        fetchLists(1).then(data => setViewedList(data))
        fetchLists(0).then(data => setWillList(data))

    }, [])

    return (
    <Container align='center'>
        <Paper style={{ padding: 20,  width: 760, margin: "20px auto"}}>
            <Typography variant="h5" sx={{ mb: "1rem" }}> Личный кабинет</Typography>
            <Tabs value={value} onChange={handleChange} sx={{ mb: "1rem" }}>
                <Tab value="1" label="Просмотренные" />
                <Tab value="0" label="Хочу посмотреть" />
            </Tabs>
            <Grid container spacing={2}>
            {value === "1" && viewedList.map(serial =>
                <SerialCard key={serial.serial_id} serial={serial}/>
            )}
            {value === "1" && viewedList.length === 0 && (
                <Typography sx={{ml:3, mt: 2}}> Вы не добавили ни одного сериала в этот список</Typography>
            )}
            {value === "0" && willList.map(serial =>
                <SerialCard key={serial.serial_id} serial={serial}/>
            )}
            {value === "0" && willList.length === 0 && (
                <Typography sx={{ml:3, mt: 2}}>Вы не добавили ни одного сериала в этот список</Typography>
            )}
        </Grid>
        </Paper>
    </Container>
    );
});

export default Dashboard;