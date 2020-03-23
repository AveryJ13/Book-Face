import React, { useState, useEffect } from 'react'
import axios from 'axios'
import Card from '@material-ui/core/Card';
import Img from './Img.css'
import './Dashboard.css'
import { makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';



function Post(props) {
    const useStyles = makeStyles({
        root: {
            '& .Mui-focused': {
                color: 'white',
            },
            '& .MuiOutlinedInput-root': {
                '& fieldset': {
                    borderColor: 'white',
                },
                '&:hover fieldset': {
                    borderColor: 'white',
                },
                '&.Mui-focused fieldset': {
                    borderColor: 'white',
                }
            },
            maxWidth: 345,
            background: '#666666'
        },
        media: {
            height: 240,
        },
        input: {
            color: 'white'
        }
    });

    const classes = useStyles();

    const [user, changeUser] = useState({})
    const [post, changePost] = useState({})
    const [userInfo, changeUserInfo] = useState({})
    const [comments, changeComments] = useState([])
    const [commentText, changeCommentText] = useState('')


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


    useEffect(() => {
        if (post.user_id) {
            axios.get(`/api/author/${post.user_id}`).then(res => {
                changeUserInfo(res.data)
                console.log(res.data)
            }).catch(err => { console.log(err) })
        }

    }, [post])

    useEffect(() => {
        refreshComments()
    }, [])


    const addComments = () => {
        axios.post('/api/addcomment', {
            comment_id: post.post_id,
            comment_text: commentText
        }).then(res => {
            console.log(res.data)
        }).catch(err => console.log(err))
    }

    const refreshComments = () => {
        axios.get(`/api/comments/${props.match.params.id}`).then(res => {
            changeComments(res.data)
        }).catch(err => console.log(err))
    }


    return (
        <div className='center'>
            <Typography variant="h5" component="h2" style={{ marginTop: '30px', color: 'white', marginBottom: '15px' }}>
                Author: {userInfo.first_name} {userInfo.last_name}
            </Typography>

            <Card className={classes.root} style={{ background: '#666666' }}>
                <CardActionArea>
                    <CardMedia
                        className={classes.media}
                        image={post.post_img}
                        title={post.post_title}
                    />
                    <CardContent >
                        <Typography gutterBottom variant="h5" component="h2" style={{ color: 'white' }}>
                            {post.post_title}
                        </Typography>
                        <Typography variant="body2" color="textSecondary" component="p" style={{ color: 'white' }}>
                            {post.post_text}
                        </Typography>
                    </CardContent>
                </CardActionArea>
                <CardActions>
                </CardActions>
            </Card>

            <div style={{ marginTop: '15px' }}>

                <TextField
                    id="outlined-search"
                    label="New Comment"
                    type="search"
                    variant="outlined"
                    onChange={(e) => { changeCommentText(e.target.value) }}
                    style={{ marginBottom: '10px', background: '#666666' }}
                    className={classes.root} />

                <Button variant="contained" onClick={async () => {
                    await addComments()
                    refreshComments()
                }} style={{
                    background: '#666666',
                    color: 'white',
                    height: '55px',
                    marginLeft: '10px'
                }}>
                    Add
                            </Button>

            </div>
            <Card style={{ width: '300px', background: "white", marginTop: '30px', background: "#666666", color: 'white' }}>
                <Typography variant="h5" component="h2" style={{ marginTop: '15px' }}>
                    Comments
                </Typography>
                <div style={{ display: 'flex', flexDirection: 'column', margin: '10px', alignItems: 'flex-start' }}>
                    {comments.map(el => <div>
                        {el.author_firstname}: {el.comment_text}
                    </div>)}
                </div>
            </Card>
        </div>
    )
}

export default Post