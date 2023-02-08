import React from 'react'
import axios from 'axios'
import { useState } from 'react'

const SignUp = () => {

    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const parseJwt = (token) => {
        var base64Url = token.split('.')[1];
        var base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
        var jsonPayload = decodeURIComponent(window.atob(base64).split('').map(function (c) {
            return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
        }).join(''));

        return JSON.parse(jsonPayload);
    }

    const signUpBtn = (values) => {
        console.log({
            name: name, email: email, password: password
        });
        axios.post('http://localhost:5002/signup', {
            name: name, email: email, password: password
        })
            .then((res) => {
                console.log(parseJwt(res.data.token))
                localStorage.setItem("token", res.data.token)
                window.location.reload();
            })
            .catch((error) => {
                console.log(error);
            });
        setName('')
        setEmail('')
        setPassword('')
    }

    return (
        <div>
            <input placeholder='Name' value={name} onChange={e => setName(e.target.value)} type="text" />
            <input placeholder='Email' value={email} onChange={e => setEmail(e.target.value)} type="text" />
            <input placeholder='Password' value={password} onChange={e => setPassword(e.target.value)} type="password" />
            <button onClick={signUpBtn}>Sign up</button>
        </div>
    )
}

export default SignUp