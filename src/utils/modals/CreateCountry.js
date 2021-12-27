import React, {useState} from 'react';
import {Modal, Button, Paper, Typography, Container, TextField, Box} from "@mui/material";
import {createCountries} from "../../http/SerialAPI";

const CreateCountry = ({open, onClose}) => {
    const [country, setCountry] = useState("")

    const addCountry = () => {
        createCountries({name: country}).then(data => {
            setCountry('')
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
                <Typography variant='h6' sx={{mb: 2}}>Добавить страну</Typography>
                <Box style={{ width: 200, mb: 2 }}>
                <TextField label="Введите страну" variant="outlined" value={country}
                        onChange={(event) => {setCountry(event.target.value)}} sx={{mb: 2}}/>
                <Button onClick={addCountry} sx={{mb: 2}}>Добавить</Button>
                <Button onClick={onClose} sx={{mb: 2}}>Закрыть</Button>
                </Box>
                </Container>
                </Paper>
        </Modal>
    );
};

export default CreateCountry;