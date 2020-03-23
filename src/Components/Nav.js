import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import axios from 'axios'
import { withRouter } from 'react-router-dom'
import Card from '@material-ui/core/Card';
import './Nav.css'
import { makeStyles } from '@material-ui/core/styles';
import SvgIcon from '@material-ui/core/SvgIcon';
import Icon from '@material-ui/core/Icon';
import ChatIcon from '@material-ui/icons/Chat';
import AddCircleIcon from '@material-ui/icons/AddCircle';
import ExitToAppIcon from '@material-ui/icons/ExitToApp';
import AccountCircleIcon from '@material-ui/icons/AccountCircle';
import NavDropdown from './NavDropdown'
import { findByLabelText } from '@testing-library/react';


const useStyles = makeStyles(theme => ({
    root: {
        minWidth: 275,
        margin: '0px'

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
}));

function HomeIcon(props) {
    return (
        <SvgIcon {...props}>
            <path d="M10 20v-6h4v6h5v-8h3L12 3 2 12h3v8z" />
        </SvgIcon>
    );
}

function Nav(props) {

    const [profile, profileChanger] = useState({})

    useEffect(() => {
        axios.get('/api/user').then(res => {
            profileChanger(res.data)
        }).catch(err => console.log(err))
    }, [])


    const classes = useStyles();

    const handleLogout = () => {
        axios.post('/api/logout').then(res => {
            console.log('hit')
        })
    }

    return (

        <Card className={classes.root} varaint='outlined' style={{ height: "70px", background: "#333333", display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>


            <div style={{ display: 'flex' }}>
                <div >
                    <NavDropdown />
                </div>

            </div>
            <Link to='/profile' style={{
                textDecoration: 'none', color: 'black'
            }}>
                <div style={{ marginRight: '5px', display: 'flex', color: 'white' }}>
                    <div>
                        {profile.first_name} {profile.last_name}
                    </div>
                    <AccountCircleIcon />
                </div>
            </Link>


        </Card >

    )
}

export default withRouter(Nav)