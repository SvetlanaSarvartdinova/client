import React, {useState} from 'react';
import {Button, Paper, Typography, Container, TextField, Box} from "@mui/material";
import {useNavigate} from "react-router-dom";
import {useParams} from 'react-router-dom'
import { updateSerialInfo } from '../../http/SerialAPI';

const UpdateSerial = () => {
    const navigate = useNavigate();
    const {id} = useParams()
    const [status, setStatus] = useState("")
    const [number_of_seasons, setNumber_of_seasons] = useState("")
    const [number_of_episodes, setNumber_of_episodes] = useState("")
    const [rating_IMDB, setRating_IMDB] = useState("")
    const [main_actors, setMain_actors] = useState("")

    const update = () => {
        updateSerialInfo(id, number_of_seasons, number_of_episodes, status, rating_IMDB, main_actors).then(data => navigate('/catalog'))
    }
    return (
            <Paper style={{padding: 40, width: 700, margin: "40px auto"}}>
                <Container align='center'>
                <Box style={{ width: 500, mb: 2 }}>
                <Typography variant='h5' sx={{mb: 2}}>Обновить информацию о сериале</Typography>
                <TextField label="Введите статус" variant="outlined" value={status}
                        onChange={(event) => {setStatus(event.target.value)}} sx={{mb: 2}}/>
                <TextField type="number" label="Введите количество сезонов" variant="outlined" value={number_of_seasons}
                        onChange={(event) => {setNumber_of_seasons(event.target.value)}} sx={{mb: 2}}/>
                <TextField type="number" label="Введите количество эпизодов" variant="outlined" value={number_of_episodes}
                        onChange={(event) => {setNumber_of_episodes(event.target.value)}} sx={{mb: 2}}/>
                <TextField  type="number" label="Введите рейтинг IMDB" variant="outlined" value={rating_IMDB}
                        onChange={(event) => {setRating_IMDB(event.target.value)}} sx={{mb: 2}}/>
                <TextField label="Введите главных актеров" variant="outlined" value={main_actors}
                        onChange={(event) => {setMain_actors(event.target.value)}} sx={{ width: '60ch',  mb: 2 }}/>
                <Button onClick={update} sx={{mb: 2}}>Обновить</Button>
                </Box>
                </Container>
                </Paper>
    );
};

export default UpdateSerial;