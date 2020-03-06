import React, { useState, useEffect } from 'react'
import axios from 'axios'
import { get_user, logout } from '../redux/reducer'
import { Link } from 'react-router-dom'

function Register(props) {

    const [user_email, setEmail] = useState('')
    const [user_password, setPassword] = useState('')

    const [first_name, setName] = useState('')
    const [last_name, setLName] = useState('')

    const handleRegister = () => {
        axios.post('/api/auth/register', {
            user_email: user_email,
            user_password: user_password,
            first_name: first_name,
            last_name: last_name
        }).then(res => {
            get_user(res.data)
            props.history.push('./dashboard')
        }).catch(err => console.log(err))
    }
    return (
        <div>
            First Name: <input onChange={(e) => setName(e.target.value)} value={first_name} />
            Last Name: <input onChange={(e) => setLName(e.target.value)} value={last_name} />
            Email: <input onChange={(e) => setEmail(e.target.value)} value={user_email} />
            Password: <input onChange={(e) => setPassword(e.target.value)} value={user_password} />
            <div>
                <button onClick={() => handleRegister()}>Register</button>
            </div>
        </div>
    )
}

export default Register
