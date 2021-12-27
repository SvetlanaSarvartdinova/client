import React, {useContext, useEffect} from 'react';
import GenrePanel from "../utils/GenrePanel";
import CountryPanel from "../utils/CountryPanel";
import SerialsList from "../utils/SerialsList";
import {observer} from "mobx-react-lite";
import {Context} from "../index";
import {fetchGenres, fetchCountries, fetchSerials} from "../http/SerialAPI";
import Pages from "../utils/Pages";
import { Container, Grid, Divider, Box} from '@mui/material'

const Catalog = observer(() => {
    const {serial} = useContext(Context)

    useEffect(() => {
        fetchGenres().then(data => serial.setGenres(data))
        fetchCountries().then(data => serial.setCountries(data))
        fetchSerials(null, null, 1, 6).then(data => {
            serial.setSerials(data)
            serial.setTotalCount(data.rowCount)
        })
    }, [])

    useEffect(() => {
        fetchSerials(serial.selectedGenre.genre_id, serial.selectedCountry.country_id, serial.page, 6).then(data => {
            serial.setSerials(data)
            serial.setTotalCount(data.rowCount)
        })
    }, [serial.page, serial.selectedGenre, serial.selectedCountry,])

    return (
    <Container maxWidth="lg" sx={{ mt: 3, mb: 3 }}>
        <Grid container spacing={4}>
        <Grid item xs={3}>
        <Box sx={{ width: '90%', maxWidth: 300, bgcolor: 'background.paper' }}>
        <GenrePanel/>
        <Divider />
        <CountryPanel/>
        </Box>
        </Grid>
        <Grid item xs={9}>
        <Box sx={{ width: '90%', maxWidth: 1400}}>
        <SerialsList/> <Pages/>
        </Box>
        </Grid>
        </Grid>
    </Container>
    );
});

export default Catalog;