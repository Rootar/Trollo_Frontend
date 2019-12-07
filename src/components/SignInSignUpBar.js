import React, {Component} from "react"
import { Button } from "@material-ui/core";
import { fade, makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Box from '@material-ui/core/Box';
import SignUp from "./SignUp";

const styles = makeStyles(theme => ({
    button: {
		margin: theme.spacing(1),
	},
	boxSpace: {
		margin: 0,
		padding: 0,
	},
}));

class SignInSignUpBar extends Component {
	constructor(props){
		super(props);

		this.Signin = this.Signin.bind(this);
		this.Signup = this.Signup.bind(this);
	}

	render()
	{
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
								onClick = { this.Signup }
							>
								Sing up
							</Button>
						</Box>
						<Box p={1} className = { styles.boxSpace }>
							<Button
								variant = "contained"
								className = { styles.button }
								color = "primary"
								onClick = { this.Signin }
							>
								Sign in
							</Button>
						</Box>
					</Box>
				</div>
			</AppBar>
		);
	}

	Signup(e)
	{
		this.props.signupCallback();
	}

	Signin(e)
	{
		this.props.signinCallback();
	}
}

export default SignInSignUpBar;