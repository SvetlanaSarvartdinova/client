import React, {useContext, useEffect, useState} from 'react';
import { observer } from "mobx-react-lite";
import { BrowserRouter } from "react-router-dom";
import AppRouter from "./components/AppRouter";
import Navbar from './components/Navbar';
import {check} from "./http/UserAPI";
import {Context} from "./index";
import CachedIcon from '@mui/icons-material/Cached';

const App = observer(() => {
  const {user} = useContext(Context)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    check().then(data => {
        user.setUser(data)
        user.setIsAuth(true)
    }).finally(() => setLoading(false))
}, [])

if (loading) {
    return <CachedIcon/>
}

  return (
    <BrowserRouter>
      <Navbar/>
      <AppRouter />
    </BrowserRouter>
  );
});

export default App;
