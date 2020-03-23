import React, { useState, useEffect } from 'react'
import axios from 'axios'
import { get_user, logout } from '../redux/reducer'
import { Link } from 'react-router-dom'
import Card from '@material-ui/core/Card';
import { makeStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';

function Register(props) {

    const useStyles = makeStyles({
        root: {
            minWidth: 205,
            margin: '0px',

        },
        bullet: {
            display: 'inline-block',
            margin: '0 2px',
            transform: 'scale(0.8)',
        },
        title: {
            fontSize: 14,
        },
        pos: {
            marginBottom: 12,
        },
    });

    const classes = useStyles();

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

    const sendEmail = () => {
        axios.post('/mail', {
            email: user_email,
            firstName: first_name,
            lastName: last_name,
        }).then(res => {
            console.log('success')
        }).catch(err => console.log(err))

    }

    return (
        <div style={{ padding: '30px', display: 'flex', justifyContent: 'center' }}>
            <Card className={classes.root} varaint='outlined' style={{ width: '200px', padding: '30px' }}>
                <Typography variant="h5" component="h2" style={{ marginBottom: '10px', marginTop: '10px' }} >
                    Register User
        </Typography>
                <div><TextField id="outlined-search" label="First Name" type="search" variant="outlined" onChange={(e) => setName(e.target.value)} style={{ marginBottom: '10px' }} /></div>


                <div><TextField id="outlined-search" label="Last Name" type="search" variant="outlined" onChange={(e) => setLName(e.target.value)} style={{ marginBottom: '10px' }} /></div>

                <div><TextField id="outlined-search" label="Email" type="search" variant="outlined" onChange={(e) => setEmail(e.target.value)} style={{ marginBottom: '10px' }} /></div>

                <div><TextField id="outlined-search" label="Password" type="search" variant="outlined" onChange={(e) => setPassword(e.target.value)} style={{ marginBottom: '10px' }} /></div>

                <div>
                    <Button variant="contained" color="primary" onClick={() => {
                        handleRegister()
                        sendEmail()
                    }}
                        style={{
                            marginBottom: '10px'
                        }}>
                        Register
                            </Button>

                </div>
            </Card>
        </div>
    )
}

export default Register
