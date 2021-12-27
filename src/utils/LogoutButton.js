import React, {useContext} from "react";
import { useAuth0 } from "@auth0/auth0-react";
import { Context } from '../index';
import {observer} from "mobx-react-lite";
import Button from '@mui/material/Button';

const LogoutButton = observer(() => {
  const {user} = useContext(Context)
  const { logout } = useAuth0();

  const logOut = () => {
    user.setUser({})
    user.setIsAuth(false)
    localStorage.removeItem('token')
    logout({ returnTo: window.location.origin })
  }

  return (
    <Button variant='contained' onClick={() => logOut()}>
      Выйти с auth0
    </Button>
  );
});

export default LogoutButton;