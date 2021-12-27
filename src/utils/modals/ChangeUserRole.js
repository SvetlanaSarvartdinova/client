import React, {useState, useEffect} from 'react';
import {Modal, Button, Paper, Typography, Container, Select, Box, MenuItem, FormControl,InputLabel} from "@mui/material";
import { fetchNoSuperusers, makeAdmin } from '../../http/UserAPI';

const ChangeUserRole = ({open, onClose}) => {
    const [user, setUser] = useState('')
    const [usersEmails, setUsersEmails] = useState([])

    useEffect(() => {
        fetchNoSuperusers().then(data => setUsersEmails(data))
    }, [])

    const update = () => {
        makeAdmin(user).then(data => {
            setUser('')
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
                <Typography variant='h6' sx={{mb: 2}}>Назначить администратора</Typography>
                <Box style={{ width: 200, mb: 2 }}>
                <FormControl fullWidth sx={{mb: 2}}>
                <InputLabel>Пользователь</InputLabel>
                <Select
                    value={user}
                    onChange={(e) => { setUser(e.target.value)}}
                >
                    {usersEmails.map(email =>
                                <MenuItem key={email.email} value={email.email}>
                                    {email.email}
                                </MenuItem>
                    )}
                </Select>
                </FormControl>
                <Button onClick={update} sx={{mb: 2}}>Добавить</Button>
                <Button onClick={onClose} sx={{mb: 2}}>Закрыть</Button>
                </Box>
                </Container>
                </Paper>
        </Modal>
    );
};

export default ChangeUserRole;