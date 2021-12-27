import React, {useState} from 'react';
import {Button, Paper, Typography, Container, TextField} from "@mui/material";
import {useNavigate} from "react-router-dom";
import {useParams} from 'react-router-dom'
import { addChangedReview } from '../../http/SerialAPI';

const UpdateReview = () => {
    const navigate = useNavigate();
    const {id} = useParams()
    const [text, setText] = useState("")

    const update = () => {
        addChangedReview(id, text).then(data => navigate('/catalog'))
    }
    return (
            <Paper style={{padding: 40, width: 700, margin: "40px auto"}}>
                <Container align='center'>
                <Typography variant='h5' sx={{mb: 2}}>Редактировать текст отзыва</Typography>
                <TextField
                    id="outlined-multiline-static"
                    label="Введите исправленный комментарий"
                    multiline
                    sx={{ width: '75ch',  mb: "1rem" }}
                    rows={4}
                    value={text}
                    onChange={(event) => {setText(event.target.value)}}
                />
                <Button onClick={update} sx={{mb: 2}}>Обновить</Button>
                </Container>
                </Paper>
    );
};

export default UpdateReview;