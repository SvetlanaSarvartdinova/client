import React, {useState, useContext, useEffect} from 'react';
import {Button, Paper, Typography, Container, TextField, Box, MenuItem,Select, FormControl,InputLabel} from "@mui/material";
import {Context} from "../../index";
import {useNavigate} from "react-router-dom";
import {createSerials, fetchCountries, fetchGenres} from "../../http/SerialAPI";
import {observer} from "mobx-react-lite";

const CreateSerial = observer(() => {
    const {serial} = useContext(Context)
    const navigate = useNavigate();
    const [name, setName] = useState("")
    const [description, setDescription] = useState("")
    const [content, setContent] = useState(null)
    const [status, setStatus] = useState("")
    const [number_of_seasons, setNumber_of_seasons] = useState("")
    const [number_of_episodes, setNumber_of_episodes] = useState("")
    const [duration_of_episode, setDuration_of_episode] = useState("")
    const [rating_IMDB, setRating_IMDB] = useState("")
    const [release_year, setRelease_year] = useState("")
    const [main_actors, setMain_actors] = useState("")
    const [resourse_url, setResourse_url] = useState("")
    const [genreSel, setGenreSel] = useState("")
    const [countrySel, setCountrySel] = useState("")
    

    useEffect(() => {
        fetchGenres().then(data => serial.setGenres(data))
        fetchCountries().then(data => serial.setCountries(data))
    }, [])

    const selectFile = e => {
        setContent(e.target.files[0])
    }

    const addSerial = () => {
        const formData = new FormData()
        formData.append('name', name)
        formData.append('description', description)
        formData.append('content', content)
        formData.append('genre_id', serial.selectedGenre.genre_id)
        formData.append('status', status)
        formData.append('number_of_seasons', number_of_seasons)
        formData.append('number_of_episodes', number_of_episodes)
        formData.append('duration_of_episode', duration_of_episode)
        formData.append('country_id', serial.selectedCountry.country_id)
        formData.append('rating_IMDB', rating_IMDB)
        formData.append('release_year', release_year)
        formData.append('main_actors', main_actors)
        formData.append('resourse_url', resourse_url)
        createSerials(formData).then(data => navigate('/admin'))
    }
    return (
            <Paper style={{padding: 40, width: 800, margin: "40px auto"}}>
                <Container align='center'>
                <Typography variant='h5' sx={{mb: 2}}>Добавить сериал</Typography>
                <Box style={{ width: 500, mb: 2 }}>
                <TextField label="Введите название" variant="outlined" value={name}
                        onChange={(event) => {setName(event.target.value)}} sx={{mb: 2}}/>
                <TextField label="Введите описание" variant="outlined" value={description}
                        onChange={(event) => {setDescription(event.target.value)}} sx={{ width: '60ch',  mb: 2 }}/>
                <FormControl fullWidth sx={{mb: 2}}> 
                <InputLabel>Жанр</InputLabel>
                <Select
                    value={genreSel}
                    onChange={(e) => { setGenreSel(e.target.value); 
                        serial.setSelectedGenre(e.target.value);}}
                >
                    {serial.genres.map(genre =>
                                <MenuItem key={genre.genre_id} value={genre}>
                                    {genre.genre_name}
                                </MenuItem>
                    )}
                </Select>
                </FormControl>
                <FormControl fullWidth sx={{mb: 2}}>
                <InputLabel>Страна</InputLabel>
                <Select
                    value={countrySel}
                    onChange={(e) => {setCountrySel(e.target.value); serial.setSelectedCountry(e.target.value);}}
                >
                    {serial.countries.map(country =>
                                <MenuItem key={country.country_id} value={country}>
                                    {country.country_name}
                                </MenuItem>
                            )}
                </Select>
                </FormControl>
                <TextField label="Введите статус" variant="outlined" value={status}
                        onChange={(event) => {setStatus(event.target.value)}} sx={{mb: 2}}/>
                <TextField type="number" label="Введите количество сезонов" variant="outlined" value={number_of_seasons}
                        onChange={(event) => {setNumber_of_seasons(event.target.value)}} sx={{mb: 2}}/>
                <TextField type="number" label="Введите количество эпизодов" variant="outlined" value={number_of_episodes}
                        onChange={(event) => {setNumber_of_episodes(event.target.value)}} sx={{mb: 2}}/>
                <TextField type="number" label="Введите длительность эпизода" variant="outlined" value={duration_of_episode}
                        onChange={(event) => {setDuration_of_episode(event.target.value)}} sx={{mb: 2}}/>
                <TextField  type="number" label="Введите рейтинг IMDB" variant="outlined" value={rating_IMDB}
                        onChange={(event) => {setRating_IMDB(event.target.value)}} sx={{mb: 2}}/>
                <TextField type="number" label="Введите год выпуска" variant="outlined" value={release_year}
                        onChange={(event) => {setRelease_year(event.target.value)}} sx={{mb: 2}}/>
                <TextField label="Введите ресурс" variant="outlined" value={resourse_url}
                        onChange={(event) => {setResourse_url(event.target.value)}} sx={{mb: 2}}/>
                <TextField label="Введите главных актеров" variant="outlined" value={main_actors}
                        onChange={(event) => {setMain_actors(event.target.value)}} sx={{ width: '60ch',  mb: 2 }}/>
                <TextField type="file" variant="standard"
                        onChange={selectFile} sx={{ width: '60ch',  mb: 2 }}/>
                <Button onClick={addSerial} sx={{mb: 2}}>Добавить</Button>
                
                </Box>
                </Container>
                </Paper>
    );
});

export default CreateSerial;