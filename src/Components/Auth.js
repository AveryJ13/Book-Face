import React, { useState } from 'react'
import axios from 'axios'
import { connect } from 'react-redux'
import { get_user, logout } from '../redux/reducer'
import { Link } from 'react-router-dom'
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';



const useStyles = makeStyles({
    root: {
        minWidth: 275,
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

function Auth(props) {
    const [user_email, setEmail] = useState('')
    const [user_password, setPassword] = useState('')

    const classes = useStyles();
    const bull = <span className={classes.bullet}>•</span>;

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

        <div style={{ padding: '30px', display: 'flex', justifyContent: 'center' }}>

            <Card className={classes.root} variant="outlined" style={{ marginTop: '15px', width: 'auto', padding: '30px' }}>
                <CardContent>
                    <Typography variant="h2b" component="h2" style={{ marginBottom: '10px' }} >
                        Book-Face
        </Typography>

                    <Typography variant="h5" component="h2" style={{ marginBottom: '10px', }} >
                        Login or Register
        </Typography>
                    <Typography className={classes.pos} color="textSecondary">

                        <div><TextField id="outlined-search" label="Email" type="search" variant="outlined" value={user_email} onChange={(e) => { setEmail(e.target.value) }} style={{ marginBottom: '10px' }} /></div>
                        <div><TextField
                            onChange={(e) => { setPassword(e.target.value) }}
                            value={user_password}
                            id="outlined-password-input"
                            label="Password"
                            type="password"
                            autoComplete="current-password"
                            variant="outlined"
                            style={{ marginBottom: '10px' }}
                        /></div>
                        <div>
                            <Button variant="contained" color="primary" onClick={() => handleLogin()}>
                                Login
                            </Button>
                            <Button variant="contained" color="primary" style={{ marginLeft: '10px' }}>
                                <Link style={{ textDecoration: 'none', color: 'white' }} to={'/register'}>Register</Link></Button>
                            <div>
                                <img style={{ marginTop: '15px', height: '50px', width: '50px' }} src='data:image/png;base64,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' />
                            </div>
                        </div>
                    </Typography>

                </CardContent>

            </Card>

        </div >
    )
}

const mapStateToProps = reduxState => {
    const { user } = reduxState
    return { user }
}

export default connect(mapStateToProps, { logout, get_user })(Auth)