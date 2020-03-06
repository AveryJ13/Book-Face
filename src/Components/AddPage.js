import React, { useState, useEffect } from 'react'
import { connect } from 'react-redux'
import { get_user } from '../redux/reducer'
import { logout } from '../redux/reducer'
import axios from 'axios'

function AddPage(props) {
    const [post_title, changeTitle] = useState('')
    const [post_img, changeImg] = useState('')
    const [post_text, changeText] = useState('')
    const [user, changeUser] = useState({})

    useEffect(() => {
        axios.get('/api/checkUser').then(res => {
            changeUser(res.data)
        }).catch(() => props.history.push('/'))
    }, [])

    const handleAdd = () => {
        axios.post('/api/addPost', {
            post_title: post_title,
            post_img: post_img,
            post_text: post_text
        }).then(() => props.history.push('/dashboard')).catch((err) => console.log(err))
    }

    return (
        <div>
            AddPage.js
            <div>Title: <input onChange={(e) => changeTitle(e.target.value)} /></div>
            <div>Img URL: <input onChange={(e) => changeImg(e.target.value)} /></div>
            <div>Post: <input onChange={(e) => changeText(e.target.value)} /></div>
            <div>
                <button onClick={() => { handleAdd() }}>Add</button>
            </div>
        </div>
    )
}

const mapStateToProps = reduxState => {
    const { user } = reduxState
    return { user }
}

export default connect(mapStateToProps, { get_user, logout })(AddPage)