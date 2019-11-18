import React from "react";

import { makeStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import { Button } from "@material-ui/core";
import Grid from '@material-ui/core/Grid';

const Styles = makeStyles(theme => ({
	container: {
		margin: theme.spacing(2),
		display: 'flex',
		flexWrap: 'wrap',
	},
	textField: {
		marginLeft: theme.spacing(1),
		marginRight: theme.spacing(1),
		width: 200,
	},
	button: {
		margin: theme.spacing(1),
	},
	loginLabel: {
		textAlign: "left",
		fontSize: 30,
	},
	registerLabel: {
		textAlign: "left",
		fontSize: 20,
	},
}));

const SignUp = () => {
	const styles = Styles();

	return (
		<form className = { styles.container }>
			<Grid
				container
				direction="column"
				justify="center"
				alignItems="center"
			>	
				<div
					className = { styles.loginLabel }
				>
					Sign up to Trollo
				</div>
				<Button
					className = { styles.button}
					color="primary"
				>
					or login
				</Button>
		
				<TextField
					id = "mail"
					className = { styles.textField }
					label = "E-mail"
				></TextField>

				<TextField
					id = "pass"
					className = { styles.textField }
					label = "Password"
					type="password"
				></TextField>

				<TextField
					id = "reppass"
					className = { styles.textField }
					label = "Repeat Password"
					type="password"
				></TextField>

				<Button
					className = { styles.button}
					variant="contained"
					color="primary"
				>
				Register</Button>
			</Grid>
		</form>
	);
}

export default SignUp;