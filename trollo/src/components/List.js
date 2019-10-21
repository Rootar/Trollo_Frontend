import React from "react"

import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import Paper from '@material-ui/core/Paper';
import { makeStyles } from '@material-ui/core/styles';
import { Button } from "@material-ui/core";

const Stylesx = makeStyles(theme => ({
    root: {
        flexGrow: 1,
    },
    paper: {
        padding: theme.spacing(2),
        textAlign: 'center',
        color: theme.palette.text.secondary,
    },
}));

const List = () => {
    const Styles = Stylesx();

    return (
        <Grid container direction="column" className={Styles.root} xs={4}>
            <Grid item>
                <Paper className={Styles.paper}>"Treaksdjasusahudsahuashuasd"</Paper>
            </Grid>
            <Grid item>
                <Paper className={Styles.paper}>"asgaiuuia"</Paper>                
            </Grid>
            <Grid item>
                <Paper className={Styles.paper}>"sdasdagassshuasd"</Paper>                
            </Grid>
            <Button variant="contained" color="primary">
                Primary
            </Button>
        </Grid>
    )
}

export default List;