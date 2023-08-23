import React from 'react';
import {Route, Routes} from "react-router-dom";
import Home from "./pages/Home";
import RequireAuth from "./components/RequireAuth";
import Login from "./pages/authorization/login/Login";
import Register from "./pages/authorization/register/Register";
import AddOffer from "./pages/addingoffer/AddOffer";

export default function App() {

    return (
        <Routes>
            <Route path="/" element={<Home/>}/>
            <Route path="/login" element={<Login/>}/>
            <Route path="/register" element={<Register/>}/>
            <Route element={<RequireAuth/>}>
                <Route path="/offers/new" element={<AddOffer/>}></Route>
            </Route>
        </Routes>
    );
}
