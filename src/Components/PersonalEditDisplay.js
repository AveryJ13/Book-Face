import React, { useState, useEffect } from 'react'
import axios from 'axios'
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import { makeStyles } from '@material-ui/core/styles';


const PersonalEditDisplay = (props) => {
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
        }
    })

    const classes = useStyles();

    const [toggle, editToggle] = useState(false)
    const [title, handleTitle] = useState('')
    const [img, handleImg] = useState('')
    const [text, handleText] = useState('')
    const [posts, postChanger] = useState([])

    useEffect(() => {
        refreshPosts()
    }, [])

    const refreshPosts = () => {
        axios.get('/api/userposts').then(res => {
            postChanger(res.data)
        }).catch(err => console.log(err))
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
            {toggle === false ? (
                <>
                    <Button variant="contained" color="primary" onClick={() => { editToggle(!toggle) }}>Edit Post</Button>

                </>
            ) : (
                    <><div>
                        <TextField id="outlined-search" label="New Title" type="search" variant="outlined" onChange={(e) => handleTitle(e.target.value)} style={{ marginBottom: '10px', background: '#666666' }}
                            className={classes.root} />

                        <TextField id="outlined-search" label="New Img" type="search" variant="outlined" onChange={(e) => handleImg(e.target.value)} style={{ marginBottom: '10px', background: '#666666' }}
                            className={classes.root} />

                        <TextField id="outlined-search" label="New Text" type="search" variant="outlined" onChange={(e) => handleText(e.target.value)} style={{ marginBottom: '10px', background: '#666666' }}
                            className={classes.root} />

                        <Button variant="contained" color="primary" onClick={() => { editPost(props.el.post_id) }}
                            style={{ marginBottom: '10px', background: '#666666' }}
                            className={classes.root}>
                            Edit
                            </Button>

                        <Button
                            variant="contained" color="primary" onClick={() => { editToggle(!toggle) }}
                            style={{
                                marginBottom: '10px',
                                marginLeft: '5px'
                            }}>

                            Cancel Edit
                            </Button>


                    </div>
                    </>
                )
            }
        </div >
    )
}

export default PersonalEditDisplay