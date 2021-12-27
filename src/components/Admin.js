import React, {useContext, useState} from 'react';
import {observer} from "mobx-react-lite";
import {useNavigate} from "react-router-dom";
import { Typography, Button, Container, Paper} from "@mui/material";
import CreateCountry from "../utils/modals/CreateCountry";
import CreateGenre from '../utils/modals/CreateGenre';
import ChangeUserRole from '../utils/modals/ChangeUserRole';

const Admin = observer(() => {
    const navigate = useNavigate();
    const [countryVisible, setCountryVisible] = useState(false)
    const [genreVisible, setGenreVisible] = useState(false)
    const [userVisible, setUserVisible] = useState(false)

    return (
        <Container align='center'>
        <Paper style={{ padding: 20,  width: 760, margin: "20px auto"}}>
            <Typography variant="h5" sx={{ mb: "1rem" }}> Админ Панель</Typography>
            <Button
                variant="outlined"
                onClick={() => setCountryVisible(true)}
            > Добавить страну</Button>
            <Button
                variant="outlined"
                onClick={() => setGenreVisible(true)}
            > Добавить жанр</Button>
            <Button
                variant="outlined"
                onClick={() => navigate('/admin/serial')}
            > Добавить сериал</Button>
             <Button
                variant="outlined"
                onClick={() => setUserVisible(true)}
            > Назначить администратора</Button>
            <CreateCountry open={countryVisible} onClose={() => setCountryVisible(false)}/>
            <CreateGenre open={genreVisible} onClose={() => setGenreVisible(false)}/>
            <ChangeUserRole open={userVisible} onClose={() => setUserVisible(false)}/>
        </Paper>
    </Container>
    );
});

export default Admin;