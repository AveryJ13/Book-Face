import React, { useState, useEffect } from 'react'
import axios from 'axios'
import { Link } from 'react-router-dom'

function Dashboard(props) {
    const [posts, changepost] = useState([])
    const [user, changeUser] = useState({})

    useEffect(() => {
        axios.get('/api/checkUser').then(res => {
            changeUser(res.data)
            console.log(res.data)
        }).catch(() => props.history.push('/'))
    }, [])

    useEffect(() => {
        axios.get('/api/dashboard').then(res => {
            changepost(res.data)
        }).catch(err => console.log(err))
    }, [])


    return (
        <div>
            Dashboard.js
            <ul>
                {posts.map(el => <div><Link to={`/post/${el.post_id}`} >
                    <li>{el.post_title}</li>
                    <li>{el.post_img}</li>
                    <li>{el.post_text}</li></Link>
                </div>)}
            </ul>
        </div>
    )
}

export default Dashboard