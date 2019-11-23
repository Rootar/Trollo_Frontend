import React from "react"
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import TableChartOutlinedIcon from '@material-ui/icons/TableChartOutlined';

const Stylesx = makeStyles(theme => ({
    menuButton: {
        marginRight: theme.spacing(2),
    },
    tableButton: {
        marginRight: theme.spacing(2),
        top: "-5px",
        width: "40px",
        height: "40px"
    },
    appBar: {
        width:  "100%",
        height: "50px",
    },
}));

const HeadBar = () => {
    const Styles = Stylesx();

    return (
        <AppBar 
            position="static"
            className = { Styles.appBar }
        >
            <Toolbar>
                <IconButton
                    edge = "start"
                    className = { Styles.tableButton }
                    color = "inherit"
                    aria-label = "open drawer"
                >
                    <TableChartOutlinedIcon />
                </IconButton>
            </Toolbar>
        </AppBar>
    )
}

export default HeadBar;