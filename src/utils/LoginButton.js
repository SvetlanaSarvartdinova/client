import React, { useContext }  from "react";
import { useAuth0 } from "@auth0/auth0-react";
import Button from '@mui/material/Button';
import { loginauth0 } from "../http/UserAPI";
import {useNavigate} from "react-router-dom";
import {observer} from "mobx-react-lite";
import { Context } from '../index';

const LoginButton = observer(() => {
  const {user, loginWithPopup } = useAuth0();
  const {user: User} = useContext(Context);
  const navigate = useNavigate();

  const login = async () => {
      await loginWithPopup();
      let data = loginauth0(user.name, user.email)
      User.setUser(data)
      User.setIsAuth(true)
      navigate('/catalog')
  };

  return <Button variant='contained' onClick={() => login()}>Войти с auth0</Button>;
});

export default LoginButton;