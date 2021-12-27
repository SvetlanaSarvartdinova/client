import React, {useState} from 'react';
import {Modal, Button, Paper, Typography, Container, TextField, Box} from "@mui/material";
import {createGenres} from "../../http/SerialAPI";

const CreateGenre = ({open, onClose}) => {
    const [genre, setGenre] = useState("")

    const addGenre = () => {
        createGenres({name: genre}).then(data => {
            setGenre('')
            onClose()
        })
    }
    return (
        <Modal
            open={open}
            onClose={onClose}
            sx={{padding: 30, width: 600, margin: "40px auto"}}
        >
            <Paper>
                <Container align='center'>
                <Typography variant='h6' sx={{mb: 2}}>Добавить жанр</Typography>
                <Box style={{ width: 200, mb: 2 }}>
                <TextField label="Введите жанр" variant="outlined" value={genre}
                        onChange={(event) => {setGenre(event.target.value)}} sx={{mb: 2}}/>
                <Button onClick={addGenre} sx={{mb: 2}}>Добавить</Button>
                <Button onClick={onClose} sx={{mb: 2}}>Закрыть</Button>
                </Box>
                </Container>
                </Paper>
        </Modal>
    );
};

export default CreateGenre;