import React, { useState } from 'react'
import axios from 'axios'
import { connect } from 'react-redux'
import { get_user, logout } from '../redux/reducer'
import { Link } from 'react-router-dom'




function Auth(props) {
    const [user_email, setEmail] = useState('')
    const [user_password, setPassword] = useState('')



    const handleLogin = () => {
        axios.post('/api/auth/login', {
            user_email: user_email,
            user_password: user_password
        }).then(res => {
            props.get_user(res.data)
            props.history.push('./dashboard')
        }).catch(err => {
            console.log(err)
            alert('invalid username or password')
        })
    }

    return (

        <div>
            <div>Login/Register</div>
            Email: <input value={user_email} onChange={(e) => { setEmail(e.target.value) }} />
            Password: <input value={user_password} onChange={(e) => { setPassword(e.target.value) }} />
            <button onClick={() => handleLogin()}>Login</button>
            <button><Link to={'/register'}>Register</Link></button>

        </div >
    )
}

const mapStateToProps = reduxState => {
    const { user } = reduxState
    return { user }
}

export default connect(mapStateToProps, { logout, get_user })(Auth)