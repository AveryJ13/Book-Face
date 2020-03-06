import React, { useState, useEffect } from 'react'
import axios from 'axios'


function Post(props) {

    const [user, changeUser] = useState({})
    const [post, changePost] = useState({})
    const [userInfo, changeUserInfo] = useState({})


    useEffect(() => {
        axios.get('/api/checkUser').then(res => {
            changeUser(res.data)
        }).catch(() => props.history.push('/'))
    }, [])


    useEffect(() => {
        axios.get(`/api/indiv/${props.match.params.id}`).then(res => {
            changePost(res.data)
        }).catch(err => console.log(err))
    }, [])
    console.log(post)

    useEffect(() => {
        if (post.user_id) {
            axios.get(`/api/author/${post.user_id}`).then(res => {
                changeUserInfo(res.data)
                console.log(res.data)
            }).catch(err => { console.log(err) })
        }

    }, [post])
    console.log(userInfo)
    return (
        <div>
            Post.js
    <div>{userInfo.first_name}</div><div>{userInfo.last_name}</div>
            <div>{post.post_title}</div>
            <div>{post.post_img}</div>
            <div>{post.post_text}</div>
        </div>
    )
}

export default Post