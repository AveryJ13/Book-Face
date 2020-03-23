import React, { useState, useEffect } from 'react'
import axios from 'axios'
import { Link } from 'react-router-dom'
import Card from '@material-ui/core/Card';
import Img from './Img.css'
import './Dashboard.css'
import Typography from '@material-ui/core/Typography';
import { sizing } from '@material-ui/system';
import Grid from '@material-ui/core/Grid'
import PostCard from './PostCard'


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
        <div className='center'>

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

                            {/* <Card style={{ width: '300px', background: "white", marginTop: '30px' }}>

                                <Typography variant="h5" component="h2" style={{ marginTop: '30px' }}>
                                    {el.post_title}
                                </Typography>

                                <img className='img' style={{ height: '250px', width: '200px', marginTop: '20px', boxShadow: '0px 10px 13px -7px #000000, 5px 5px 7px 4px rgba(0,0,0,0);' }} src={el.post_img} />

                                <div style={{ marginTop: '30px', marginBottom: '10px' }}>{el.post_text}</div>

                            </Card> */}

                        </Link>
                    </Grid>
                )}

            </Grid>
        </div>
    )
}

export default Dashboard