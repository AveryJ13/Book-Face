import React, { useState, useEffect } from 'react'
import axios from 'axios'
import { Link } from 'react-router-dom'


function ProfilePage(props) {

    const [user, changeUser] = useState({})
    const [profile, profileChanger] = useState({})
    const [posts, postChanger] = useState([])
    const [toggle, editToggle] = useState(false)
    const [title, handleTitle] = useState('')
    const [img, handleImg] = useState('')
    const [text, handleText] = useState('')


    useEffect(() => {
        axios.get('/api/checkUser').then(res => {
            changeUser(res.data)
        }).catch(() => props.history.push('/'))
    }, [])

    useEffect(() => {
        axios.get('/api/user').then(res => {
            profileChanger(res.data)
        }).catch(err => console.log(err))
    }, [])


    useEffect(() => {
        refreshPosts()
    }, [])

    const refreshPosts = () => {
        axios.get('/api/userposts').then(res => {
            postChanger(res.data)
        }).catch(err => console.log(err))
    }

    const deletePosts = (id) => {
        axios.delete(`/api/delete/${id}`).then(res => {
            alert('This post has been deleted')
        })
        refreshPosts()
    }

    const editPost = (id) => {
        axios.put(`/api/edit/${id}`, {
            post_title: title,
            post_img: img,
            post_text: text
        }).then(res => {
            alert('This post has been edited')
        })
        refreshPosts()
    }

    return (
        <div>
            ProfilePage.js
    <div>{profile.first_name} {profile.last_name}</div>
            <ul>
                {posts.map(el => <div><Link to={`/post/${el.post_id}`} >
                    <li>{el.post_title}</li>
                    <li>{el.post_img}</li>
                    <li>{el.post_text}</li></Link>
                    <button onClick={() => { deletePosts(el.post_id) }}>Delete Post</button><div>
                        {toggle === false ? (
                            <>
                                <button onClick={() => { editToggle(!toggle) }}>Edit Post</button>
                            </>
                        ) : (
                                <>
                                    New Title: <input onChange={(e) => handleTitle(e.target.value)} />
                                    New Img: <input onChange={(e) => { handleImg(e.target.value) }} />
                                    New Text: <input onChange={(e) => { handleText(e.target.value) }} />
                                    <button onClick={() => editPost(el.post_id)}>Edit</button>
                                    <button onClick={(e) => { editToggle(!toggle) }}>CancelEdit</button>
                                </>
                            )}


                    </div>
                </div>)}
            </ul>
        </div>
    )
}

export default ProfilePage