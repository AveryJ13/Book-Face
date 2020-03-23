import React, { useState, useContext, useEffect } from 'react'
import Paper from '@material-ui/core/Paper';
import { makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import Chip from '@material-ui/core/Chip'
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import { CTX } from './MessageStore'

const useStyles = makeStyles(theme => ({
    root: {
        margin: '50px',
        padding: theme.spacing(3, 2),
        background: '#666666',
        color: 'white'

    },
    flex: {
        display: 'flex',
        alignItems: 'center'
    },
    topicsWindow: {
        width: '30%',
        height: '300px',
        borderRight: '1px solid grey'
    },
    chatWindow: {
        width: "70%",
        height: '300px',
        padding: '20px',
        overflow: 'scroll'
    },
    chatBox: {
        width: '85%',

    },
    button: {
        width: '15%'
    }

}));

const Chat = props => {


    const classes = useStyles()

    const { allchats, sendChatAction, user } = useContext(CTX)
    const [newObj, changeNew] = useState({})

    useEffect(() => {
        if (!newObj) {
            changeNew({ ...user })
        }
    }, [])

    console.log(user)

    const topics = Object.keys(allchats)

    const [activeTopic, changeActiveTopic] = useState(topics[0])
    const [text, handleText] = useState('')

    return (
        <div>
            <Paper className={classes.root}>
                <Typography variant='h4' component='h4' >
                    Chat App
                    </Typography>
                <Typography variant='h5' component='h5'>
                    {activeTopic}
                </Typography>
                <div className={classes.flex}>
                    <div className={classes.topicsWindow}>
                        <List>
                            {
                                topics.map(topic => (
                                    <ListItem onClick={(e) => { changeActiveTopic(e.target.innerText) }} key={topic} button>

                                        <ListItemText primary={topic} />
                                    </ListItem>
                                ))
                            }

                        </List>
                    </div>
                    <div className={classes.chatWindow}>

                        {
                            allchats[activeTopic].map((chat, i) => (
                                <div className={classes.flex} key={i} style={{ marginTop: '5px' }}>
                                    <Chip label={chat.from} variant="outlined" className={classes.chip} style={{ background: 'white' }} />
                                    <Typography variant='p'>
                                        {chat.msg}
                                    </Typography>
                                </div>
                            ))
                        }
                    </div>
                </div>
                <div className={classes.flex}>
                    <TextField
                        className={classes.chatBox}
                        label="Send your chat"
                        multiline
                        rowsMax="4"
                        value={text}
                        onChange={(e) => handleText(e.target.value)}
                    />
                    <Button
                        onClick={() => {
                            sendChatAction({ from: user, msg: text, topic: activeTopic })
                            handleText('')
                        }}
                        variant="contained"
                        color="primary">
                        Send
                    </Button>

                </div>
            </Paper>
        </div >
    )
}
export default Chat