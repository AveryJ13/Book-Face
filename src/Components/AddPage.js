import React, { useState, useEffect } from 'react'
import { connect } from 'react-redux'
import { get_user } from '../redux/reducer'
import { logout } from '../redux/reducer'
import axios from 'axios'
import Card from '@material-ui/core/Card';
import { makeStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';

function AddPage(props) {

    const useStyles = makeStyles({
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
    });

    const classes = useStyles();

    const [post_title, changeTitle] = useState('')
    const [post_img, changeImg] = useState('')
    const [post_text, changeText] = useState('')
    const [user, changeUser] = useState({})

    useEffect(() => {
        axios.get('/api/checkUser').then(res => {
            changeUser(res.data)
            console.log(res.data)
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
        <div style={{ padding: '30px', display: 'flex', justifyContent: 'center' }}>
            <Card className={classes.root} varaint='outlined' style={{}}>
                <Typography variant="h5" component="h2" style={{ marginBottom: '10px', marginTop: '10px' }} >
                    Add Your New Post
        </Typography>
                <div><TextField id="outlined-search" label="Title" type="search" variant="outlined" onChange={(e) => changeTitle(e.target.value)} style={{ marginBottom: '10px' }} /></div>
                <div><TextField id="outlined-search" label="Img Url" type="search" variant="outlined" onChange={(e) => changeImg(e.target.value)} style={{ marginBottom: '10px' }} /></div>
                <TextField
                    label="post text"
                    multiline
                    rowsMax="4"
                    value={post_text}
                    onChange={(e) => changeText(e.target.value)}
                    style={{
                        marginBottom: '10px',
                        width: '85%'
                    }}
                />
                <div>
                    <Button variant="contained" color="primary" onClick={() => { handleAdd() }}
                        style={{
                            marginBottom: '10px'
                        }}>
                        Create Post
                            </Button>

                </div>
            </Card>
        </div>
    )
}

const mapStateToProps = reduxState => {
    const { user } = reduxState
    return { user }
}

export default connect(mapStateToProps, { get_user, logout })(AddPage)