import React, {useContext} from "react";
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import Paper from '@mui/material/Paper';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import { NavLink } from "react-router-dom";
import { Context } from '../index';
import {observer} from "mobx-react-lite";
import LoginButton from "../utils/LoginButton";
import LogoutButton from "../utils/LogoutButton";


const MainPage = observer(() => {
  const {user} = useContext(Context)
    return (
      <Grid container component="main" sx={{ height: '90vh' }}>
        <CssBaseline />
        <Grid
          item
          xs={false}
          sm={4}
          md={7}
          sx={{
            backgroundImage: 'url(https://cdn.abcotvs.com/dip/images/5698337_holiday-hallmark-movie-binge.jpg?w=800&r=16%3A9)',
            backgroundColor: (t) =>
              t.palette.mode === 'light' ? t.palette.grey[50] : t.palette.grey[900],
            backgroundSize: 'cover',
            backgroundPosition: 'center',
          }}
        />
        <Grid item xs={12} sm={8} md={5} component={Paper} elevation={6} square sx={{backgroundColor: '#E9E6E6'}}>
          <Box 
            sx={{
              my: 8,
              mx: 4,
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
            }}
          >
            <Typography component="h5" variant="h4" sx={{ mt: 5, mb: 3 }}> Каталог сериалов</Typography>
            <Typography variant="body1"sx={{ mb: 3 }}> Количество выпускаемых сериалов растет с каждым годом. Именно поэтому целью данного сервиса является помочь пользователям не запутаться в этом огромном разнообразии сериалов и платформ для просмотра, облегчить выбор и позволить вести список просмотренных сериалов. Также, пользователь может оставить комментарий о сериале и присоединиться к его обсуждению с другими пользователями. </Typography>
            <Typography variant="h6"> Начните прямо сейчас</Typography>
            <Box style={{ width: 300 }}>
            <Button
                type="submit"
                fullWidth
                variant="contained"
                sx={{ mt: 1, mb: 2 }}
              >
                <NavLink style={{ color: "white" }} to="/catalog">
                Перейти к каталогу сериалов
                </NavLink>
              </Button>
            </Box>
            {!user.isAuth && (<LoginButton/>)}
            {user.isAuth && (<LogoutButton/>)}
          </Box>
        </Grid>
      </Grid>
    )
})

export default MainPage;