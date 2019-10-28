import React from "react";
import { Button } from "@material-ui/core";
import { fade, makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Box from '@material-ui/core/Box';

const Styles = makeStyles(theme => ({
    button: {
		margin: theme.spacing(1),
	},
	boxSpace: {
		margin: 0,
		padding: 0,
	},
}));

const SignInSignUpBar = () => {
    const styles = Styles();

    return (
        <AppBar position="static">
            <div style={{ width: '100%' }}>
				<Box 
					display="flex"
					flexDirection="row-reverse"
					p={1} m={1}
					className = { styles.boxSpace }
				>
					<Box p={1} className = { styles.boxSpace }>
						<Button
							variant = "contained"
							className = { styles.button }
						>
							Sing up
						</Button>
					</Box>
					<Box p={1} className = { styles.boxSpace }>
						<Button
							variant = "contained"
							className = { styles.button }
							color = "primary"
						>
							Sign in
						</Button>
					</Box>
				</Box>
			</div>
		</AppBar>
	)
}

export default SignInSignUpBar;