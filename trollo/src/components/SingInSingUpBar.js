import React from "react";
import { Button } from "@material-ui/core";
import { fade, makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Box from '@material-ui/core/Box';

const Stylesx = makeStyles(theme => ({
    button: {
		margin: theme.spacing(1),
	},
	boxSpace: {
		margin: 0,
		padding: 0,
	},
}));

const SingInSingUpBar = () => {
    const Styles = Stylesx();

    return (
        <AppBar position="static">
            <div style={{ width: '100%' }}>
				<Box 
					display="flex"
					flexDirection="row-reverse"
					p={1} m={1}
					className = { Styles.boxSpace }
				>
					<Box p={1} className = { Styles.boxSpace }>
						<Button
							variant = "contained"
							className = { Styles.button }
						>
							Sing up
						</Button>
					</Box>
					<Box p={1} className = { Styles.boxSpace }>
						<Button
							variant = "contained"
							className = { Styles.button }
							color = "primary"
						>
							Sing in
						</Button>
					</Box>
				</Box>
			</div>
		</AppBar>
	)
}

export default SingInSingUpBar;