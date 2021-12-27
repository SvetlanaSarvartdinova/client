import React, { useState, useContext } from "react";
import Input from "../utils/Input";
import { Grid, Paper, Avatar, Button, Typography, Link, Alert } from "@mui/material";
import PersonIcon from "@mui/icons-material/Person";
import {observer} from "mobx-react-lite";
import { Context } from '../index';
import {useNavigate} from "react-router-dom";
import {login} from "../http/UserAPI";

const Login = observer(() => {
  const {user} = useContext(Context);
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const paperStyle = { padding: 40, width: 400, margin: "40px auto" };

  const click = async () => {
    try {
      let data = await login(email, password);
      user.setUser(data)
      user.setIsAuth(true)
      navigate('/catalog')
    } catch (e) {
      setError(e.response.data.message);
    }
  };

  return (
    <Grid>
      <Paper elevation={10} style={paperStyle}>
        <Grid align="center">
          <Typography variant="h5" sx={{ mb: "1rem" }}>
            Войти
          </Typography>
          <Avatar sx={{ bgcolor: "#566885" }}>
            <PersonIcon />
          </Avatar>
        </Grid>
        <Input value={email} setValue={setEmail} label="Почта" placeholder="Введите электронную почту" type='email'/>
        <Input value={password} setValue={setPassword} label="Пароль" placeholder="Введите пароль" type="password" />
        {error && (
          <Alert severity="error" sx={{ mb: "1rem" }}>
            {error}
          </Alert>
        )}
        <Button
          type="submit"
          color="primary"
          variant="contained"
          onClick={() => click()}
          fullWidth
          size="large"
          sx={{ mb: "1rem" }}
        >
          Войти
        </Button>
        <Grid align="center">
          <Typography> Нет аккаунта?</Typography>
          <Typography>
            <Link href="/registration">Зарегистрироваться</Link>
          </Typography>
        </Grid>
      </Paper>
    </Grid>
  );
});

export default Login;
