import React from 'react';
import Button from '@material-ui/core/Button';
import ClickAwayListener from '@material-ui/core/ClickAwayListener';
import Grow from '@material-ui/core/Grow';
import Paper from '@material-ui/core/Paper';
import Popper from '@material-ui/core/Popper';
import MenuItem from '@material-ui/core/MenuItem';
import MenuList from '@material-ui/core/MenuList';
import { makeStyles } from '@material-ui/core/styles';
import SvgIcon from '@material-ui/core/SvgIcon';
import Icon from '@material-ui/core/Icon';
import ChatIcon from '@material-ui/icons/Chat';
import AddCircleIcon from '@material-ui/icons/AddCircle';
import ExitToAppIcon from '@material-ui/icons/ExitToApp';
import AccountCircleIcon from '@material-ui/icons/AccountCircle';
import { withRouter } from 'react-router-dom'
import { Link } from 'react-router-dom'
import axios from 'axios'
import MenuIcon from '@material-ui/icons/Menu';


const useStyles = makeStyles(theme => ({
    root: {
        display: 'flex',
    },
    paper: {
        marginRight: theme.spacing(2),
    },
}));

function HomeIcon(props) {
    return (
        <SvgIcon {...props}>
            <path d="M10 20v-6h4v6h5v-8h3L12 3 2 12h3v8z" />
        </SvgIcon>
    );
}

function NavDropdown() {
    const classes = useStyles();
    const [open, setOpen] = React.useState(false);
    const anchorRef = React.useRef(null);

    const handleToggle = () => {
        setOpen(prevOpen => !prevOpen);
    };

    const handleClose = event => {
        if (anchorRef.current && anchorRef.current.contains(event.target)) {
            return;
        }

        setOpen(false);
    };

    function handleListKeyDown(event) {
        if (event.key === 'Tab') {
            event.preventDefault();
            setOpen(false);
        }
    }

    // return focus to the button when we transitioned from !open -> open
    const prevOpen = React.useRef(open);
    React.useEffect(() => {
        if (prevOpen.current === true && open === false) {
            anchorRef.current.focus();
        }

        prevOpen.current = open;
    }, [open]);

    const handleLogout = () => {
        axios.post('/api/logout').then(res => {
            console.log('hit')
        })
    }

    return (
        <div className={classes.root}>
            {/* <Paper className={classes.paper}>
                <MenuList>
                    <MenuItem><AccountCircleIcon />Profile</MenuItem>
                    <MenuItem><HomeIcon />Home</MenuItem>
                    <MenuItem><AddCircleIcon />Create Post</MenuItem>
                    <MenuItem><ChatIcon />Chat</MenuItem>
                    <MenuItem><ExitToAppIcon />Logout</MenuItem>

                </MenuList>
            </Paper> */}
            <div>
                <Button
                    ref={anchorRef}
                    aria-controls={open ? 'menu-list-grow' : undefined}
                    aria-haspopup="true"
                    onClick={handleToggle}
                    style={{ color: 'white' }}
                >
                    <MenuIcon style={{ color: 'white' }} /> MENU
                </Button>
                <Popper open={open} anchorEl={anchorRef.current} role={undefined} transition disablePortal style={{ zIndex: '2' }}>
                    {({ TransitionProps, placement }) => (
                        <Grow
                            {...TransitionProps}
                            style={{ transformOrigin: placement === 'bottom' ? 'center top' : 'center bottom' }}
                        >
                            <Paper>
                                <ClickAwayListener onClickAway={handleClose}>
                                    <MenuList autoFocusItem={open} id="menu-list-grow" onKeyDown={handleListKeyDown}>
                                        <MenuItem onClick={handleClose}><Link to='/profile' style={{
                                            textDecoration: 'none', color: 'black'
                                        }}><div style={{ display: 'flex' }}><div><AccountCircleIcon /></div><div>Profile</div></div></Link></MenuItem>
                                        <MenuItem onClick={handleClose}><Link to='/dashboard' style={{
                                            textDecoration: 'none', color: 'black'
                                        }}><div style={{ display: 'flex' }}><div><HomeIcon /></div><div>Home</div></div></Link></MenuItem>
                                        <MenuItem onClick={handleClose}><Link to='/add' style={{
                                            textDecoration: 'none', color: 'black'
                                        }}><div style={{ display: 'flex' }}><div><AddCircleIcon /></div><div>Create Post</div></div></Link></MenuItem>
                                        <MenuItem onClick={handleClose}><Link to='/chat' style={{
                                            textDecoration: 'none', color: 'black'
                                        }}><div style={{ display: 'flex' }}><div><ChatIcon /></div><div>Chat</div></div></Link></MenuItem>
                                        <MenuItem onClick={handleClose}><Link to='/' style={{
                                            textDecoration: 'none', color: 'black'
                                        }}><div style={{ display: 'flex' }} onClick={() => { handleLogout() }}><div><ExitToAppIcon /></div><div>Logout</div></div></Link></MenuItem>
                                    </MenuList>
                                </ClickAwayListener>
                            </Paper>
                        </Grow>
                    )}
                </Popper>
            </div>
        </div>
    );
}

export default withRouter(NavDropdown)