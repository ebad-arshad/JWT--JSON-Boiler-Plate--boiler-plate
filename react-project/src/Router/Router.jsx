import React, { useEffect, useState } from 'react'
import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom'
import SignUp from '../container/SignUp'
import Login from '../container/Login'
import Dashboard from '../container/Dashboard'
import ErrorPage from '../container/ErrorPage'

const Router = () => {
    const [user, setUser] = useState("");

    const parseJwt = (token) => {
        var base64Url = token.split('.')[1];
        var base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
        var jsonPayload = decodeURIComponent(window.atob(base64).split('').map(function (c) {
            return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
        }).join(''));

        return JSON.parse(jsonPayload);
    }

    useEffect(() => {
        const token = localStorage.getItem("token")
        if (token) {
            setUser(token)
        } else {
            setUser("")
        }
    }, [])
    return (
        <BrowserRouter>
            <Routes>
                <Route path='/' element={user ? <Navigate to={`/dashboard`} /> : <Navigate to={`/login`} />} />
                <Route path='/signup' element={user ? <Navigate to={`/dashboard`} /> : <SignUp />} />
                <Route path='/login' element={user ? <Navigate to={`/dashboard`} /> : <Login />} />
                <Route path='/dashboard' element={!user ? <Navigate to={`/login`} /> : <Dashboard />} />
                <Route path='/*' element={<ErrorPage />} />
            </Routes>
        </BrowserRouter>
    )
}

export default Router