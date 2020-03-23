import React, { useState, useEffect } from 'react'
import axios from 'axios'
import { Link } from 'react-router-dom'
import PersonalEdit from './PersonalEditDisplay'
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import AccountCircleIcon from '@material-ui/icons/AccountCircle';
import './Dashboard.css'
import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid'
import PostCard from './PostCard'

function ProfilePage(props) {

    const useStyles = makeStyles(theme => ({
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
    }));

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

    const classes = useStyles();


    return (
        <div className='center'>
            <Card style={{ width: '250px', height: "100px", background: '#666666', marginTop: '30px' }}>
                <Typography className='align' variant="h5" component="h2" style={{ marginTop: '30px' }}>   <AccountCircleIcon style={{ color: 'white' }} /><div style={{ color: 'white' }}>{profile.first_name} {profile.last_name}</div>
                </Typography>
            </Card>


            <Grid
                container
                spacing={10}
                style={{ padding: '24px', maxWidth: '100%', margin: '0' }}
            >

                {posts.map(el =>
                    <Grid
                        item
                        xs={12} sm={6} md={4} lg={4} xl={3}
                    >

                        <Link to={`/post/${el.post_id}`} style={{ textDecoration: 'none', color: 'white' }}>

                            <PostCard el={el} />
                        </Link>
                        <div className='align' style={{ marginTop: '10px', marginBottom: '10px' }}>
                            <Button variant="contained" color="primary" onClick={() => deletePosts(el.post_id)}>
                                Delete
                            </Button>

                            <div style={{ marginLeft: '5px' }}><PersonalEdit el={el} /></div> </div>
                    </Grid>
                )}

            </Grid>

            {/* <ul>
                {posts.map(el => <div>
                    <Card style={{ width: '300px', background: "white", marginTop: '30px' }}>
                        <Link to={`/post/${el.post_id}`} style={{ textDecoration: 'none' }}>

                            <Typography variant="h5" component="h2" style={{ marginTop: '30px', color: 'black' }}>
                                {el.post_title}
                            </Typography>

                            <img className='img' style={{ height: '250px', width: '200px', marginTop: '20px', boxShadow: '0px 10px 13px -7px #000000, 5px 5px 7px 4px rgba(0,0,0,0);' }} src={el.post_img} />

                            <div style={{ marginTop: '30px', color: 'black' }}>{el.post_text}</div>
                        </Link>
                        <div className='align' style={{ marginTop: '10px', marginBottom: '10px' }}>
                            <Button variant="contained" color="primary" onClick={() => deletePosts(el.post_id)}>
                                Delete
                            </Button>

                            <div style={{ marginLeft: '5px' }}><PersonalEdit /></div> </div>
                    </Card>

                </div>)}
            </ul> */}
        </div >
    )
}

export default ProfilePage