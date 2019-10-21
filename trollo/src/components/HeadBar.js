import React from "react"

import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import Paper from '@material-ui/core/Paper';
import { fade, makeStyles } from '@material-ui/core/styles';
import { Button } from "@material-ui/core";
import AppBar from '@material-ui/core/AppBar';
import SearchIcon from '@material-ui/icons/Search';
import InputBase from '@material-ui/core/InputBase';
import Toolbar from '@material-ui/core/Toolbar';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';

const Stylesx = makeStyles(theme => ({
    root: {
        flexGrow: 1,
    },
    paper: {
        padding: theme.spacing(2),
        textAlign: 'center',
        color: theme.palette.text.secondary,
    },
    menuButton: {
        marginRight: theme.spacing(2),
    },
    search: {
        position: 'relative',
        borderRadius: theme.shape.borderRadius,
        backgroundColor: fade(theme.palette.common.white, 0.15),
        '&:hover': {
            backgroundColor: fade(theme.palette.common.white, 0.25),
        },
        marginRight: theme.spacing(2),
        marginLeft: 0,
        width: '100%',
        [theme.breakpoints.up('sm')]: {
            marginLeft: theme.spacing(3),
            width: 'auto',
        },
    },
    searchIcon: {
        width: theme.spacing(7),
        height: '100%',
        position: 'absolute',
        pointerEvents: 'none',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
    },
    inputRoot: {
        color: 'inherit',
    },
    inputInput: {
        padding: theme.spacing(1, 1, 1, 7),
        transition: theme.transitions.create('width'),
        width: '100%',
        [theme.breakpoints.up('md')]: {
            width: 200,
        },
    },
}));

const HeadBar = () => {
    const Styles = Stylesx();

    return (
        <AppBar position="static">
            <Toolbar>
                <IconButton
                    edge = "start"
                    className = { Styles.menuButton }
                    color = "inherit"
                    aria-label = "open drawer"
                >
                    <MenuIcon />
                </IconButton>
                <div className = { Styles.search }>
                    <div className = { Styles.searchIcon }>
                        <SearchIcon />
                    </div>
                    <InputBase
                        placeholder="Search…"
                        Styles = {{
                            root: Styles.inputRoot,
                            input: Styles.inputInput,
                        }}
                        inputProps = {{ 'aria-label': 'search' }}
                    />
                </div>
            </Toolbar>
        </AppBar>
    )
}

export default HeadBar;