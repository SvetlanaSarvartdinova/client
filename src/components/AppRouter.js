import React, { useContext } from 'react';
import {Route, Routes} from "react-router-dom";
import Registration from "./Registration";
import Login from "./Login";
import SerialPage from './SerialPage';
import Dashboard from './Dashboard';
import Catalog from './Catalog';
import Admin from './Admin';
import MainPage from './MainPage';
import UpdateReview from '../utils/modals/UpdateReview'
import { Context } from '../index';
import {observer} from "mobx-react-lite";
import CreateSerial from '../utils/modals/CreateSerial';
import UpdateSerial from '../utils/modals/UpdateSerial';

const AppRouter = observer(() => {
    const {user} = useContext(Context)
    return (
        <div>
                {!user.isAuth && 
                    <Routes>
                        <Route path="/registration" element={<Registration/>} exact/>
                        <Route path="/login" element={<Login/>} exact/>
                        <Route path="/catalog" element={<Catalog/>} exact/>
                        <Route path="/serial/:id" element={<SerialPage exact/>}/> 
                        <Route path="/" element={<MainPage/>} exact/> 
                    </Routes>
                }
                {user.isAuth && 
                    <Routes>
                        {user.user.is_superuser && <Route path="/admin" element={<Admin/>} exact/>}
                        {user.user.is_superuser && <Route path="/admin/serial" element={<CreateSerial/>} exact/>}
                        {user.user.is_superuser && <Route path="/admin/review/:id" element={<UpdateReview/>} exact/>}
                        {user.user.is_superuser && <Route path="/admin/serial/:id" element={<UpdateSerial/>} exact/>}
                        <Route path="/mylists" element={<Dashboard/>} exact/>
                        <Route path="/catalog" element={<Catalog/>} exact/>
                        <Route path="/serial/:id" element={<SerialPage/>} exact/>
                        <Route path="/" element={<MainPage/>} exact/> 
                    </Routes>
                }
        </div>
    );
})

export default AppRouter;
