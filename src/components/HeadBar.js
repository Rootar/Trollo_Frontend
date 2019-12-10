import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Button from '@material-ui/core/Button';
import {NotificationContainer} from 'react-notifications';
import 'react-notifications/lib/notifications.css';
const useStyles = makeStyles(theme => ({
    root: {
        flexGrow: 1
    },
    menuButton: {
        marginRight: theme.spacing(1)
    },
    spacer: {
        flexGrow: 1
    },
}));

const HeadBar = ({isLoggedIn, logoutCallBack, mainPageCallBack}) => {
    const classes = useStyles();

    return (
        <div className={classes.root}>
            <AppBar position="static">
                <Toolbar>
                <Button edge="start" className={classes.menuButton} color="inherit" aria-label="menu" onClick={mainPageCallBack}>
                    Main Page
                </Button>
                <div className={classes.spacer}></div>
                {isLoggedIn ? <Button color="inherit" onClick={logoutCallBack}>Logout</Button> : <div></div>}  
                </Toolbar>
            </AppBar>

            <NotificationContainer/>
        </div>
    );
}

export default HeadBar