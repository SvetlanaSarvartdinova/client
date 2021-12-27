import React, { useContext } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { Typography, AppBar, Toolbar, Button} from "@mui/material";
import { Context } from '../index';
import MovieIcon from '@mui/icons-material/Movie';
import {observer} from "mobx-react-lite";
import { useAuth0 } from "@auth0/auth0-react"; 

const Navbar = observer(() => {
  const {user} = useContext(Context)
  const navigate = useNavigate()
  const { logout } = useAuth0();

    const logOut = () => {
      user.setUser({})
      user.setIsAuth(false)
      localStorage.removeItem('token')
      logout({ returnTo: window.location.origin })
    }

  return (
    <AppBar position="static" color="transparent" elevation={0}>
      <Toolbar>
        <NavLink to="/">
          <MovieIcon sx={{ mr: 1 }}/>
        </NavLink>
        <Typography variant="h5" component="div" sx={{ flexGrow: 1, color: "#566885" }}>
          Каталог сериалов
        </Typography>
        <Button onClick={() => navigate('/catalog')}>
              Каталог
        </Button>
        {!user.isAuth && (
          <Button onClick={() => navigate('/login')}>
              Войти
          </Button>
        )}
        {!user.isAuth && (
          <Button onClick={() => navigate('/registration')}>
              Регистрация
          </Button>
        )}
        {user.isAuth && user.user.is_superuser && (
          <Button onClick={() => navigate('/admin')}>
              Админ-Панель
          </Button>
        )}
        {user.isAuth && (
          <Button onClick={() => navigate('/mylists')}>
              Личный кабинет
          </Button>
        )}
        {user.isAuth && (
          <Button onClick={() => logOut() }>
              Выйти
          </Button>
        )}
      </Toolbar>
    </AppBar>
  );
});

export default Navbar;
