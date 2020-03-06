import React from 'react'
import { Link } from 'react-router-dom'
import axios from 'axios'
import { withRouter } from 'react-router-dom'

function Nav(props) {

    const handleLogout = () => {
        axios.post('/api/logout').then(res => {
            console.log('hit')
        })
    }

    return (
        <div>
            {props.location.pathname === '/dashboard' ? (
                <>
                    <div><Link to='/profile' >Profile Page </Link></div>
                    <div><Link to='/add' >Add Post</Link></div>
                    <div><Link to='/chat'>Chat</Link></div>
                    <div onClick={() => handleLogout()}><Link to='/' >Logout</Link></div>
                </>
            ) : (
                    <>
                        <div><Link to='/profile' >Profile Page </Link></div>
                        <div><Link to='/add' >Add Post</Link></div>
                        <div><Link to='/dashboard'>Home</Link></div>
                        <div><Link to='/chat'>Chat</Link></div>
                        <div onClick={() => handleLogout()}><Link to='/' >Logout</Link></div>
                    </>
                )
            }
        </div>
    )
}

export default withRouter(Nav)