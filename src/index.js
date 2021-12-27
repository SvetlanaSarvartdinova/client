import React, { createContext } from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import UserStore from './store/UserStore';
import SerialStore from './store/SerialStore';
import {ThemeProvider, createTheme} from "@mui/material"
import { Auth0Provider } from "@auth0/auth0-react";


export const Context = createContext(null)
const theme = createTheme({
  palette : {
    primary: {
        main: '#566885'
  }},
  secondary: {
    main: '#566885'
}
});

ReactDOM.render(
  <ThemeProvider theme={theme}>
  <Context.Provider value={{
        user: new UserStore(),
        serial: new SerialStore(),
    }}>
  <Auth0Provider
    domain="dev-d8sjtg2u.us.auth0.com"
    clientId="hPvfiS21JHLoMUoxsLgNOkVqvNPl9LkV"
    redirectUri={window.location.origin}
  >
    <App />
    </Auth0Provider>
  </Context.Provider>
  </ThemeProvider>,
  document.getElementById('root')
);

