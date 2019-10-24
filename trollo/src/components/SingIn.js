import React from "react";

import { makeStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import { Button } from "@material-ui/core";
import Grid from '@material-ui/core/Grid';

const Stylesx = makeStyles(theme => ({
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

const SingIn = () => {
	const Styles = Stylesx();

	return (
		<form className = { Styles.container }>
			<Grid
				container
				direction="column"
				justify="center"
				alignItems="center"
			>	
				<div
					className = { Styles.loginLabel }
				>
					Log in to Trollo
				</div>
				<Button
					className = { Styles.button}
					color="primary"
				>
					or create an account
				</Button>
		
				<TextField
					id = "mail"
					className = { Styles.textField }
					label = "E-mail"
				></TextField>

				<TextField
					id = "pass"
					className = { Styles.textField }
					label = "Password"
					type="password"
				></TextField>

				<Button
					className = { Styles.button}
					variant="contained"
					color="primary"
				>
				Login</Button>
			</Grid>
		</form>
	);
}

export default SingIn;