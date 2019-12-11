import React, {Component} from "react"
import axios from "axios";

import { makeStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import { Button } from "@material-ui/core";
import Grid from '@material-ui/core/Grid';

const styles = makeStyles(theme => ({
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

class SignUp extends Component {
	constructor(props){
		super(props);

		this.onChange = this.onChange.bind(this);
		this.onSubmitRegister = this.onSubmitRegister.bind(this);
	}

	state = {
		username:'',
		pass:'',
		reppass:'',
	}

	render()
	{
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
						onClick = { () => { this.props.callbacks.signin(); }}
					>
						or login
					</Button>
			
					<TextField
						name = "username"
						id = "login"
						className = { styles.textField }
						label = "login"
						onChange = { this.onChange }
					></TextField>

					<TextField
						name = "pass"
						id = "pass"
						className = { styles.textField }
						label = "Password"
						type="password"
						onChange = { this.onChange }
					></TextField>

					<TextField
						name = "reppass"
						id = "reppass"
						className = { styles.textField }
						label = "Repeat Password"
						type="password"
						onChange = { this.onChange }
					></TextField>

					<Button
						className = { styles.button}
						variant="contained"
						color="primary"
						onClick = { this.onSubmitRegister }
					>
					Register</Button>
				</Grid>
			</form>
		);
	}

	async onSubmitRegister(e){
		e.preventDefault();
		
		if(this.state.pass !== this.state.reppass)
		{
			console.log("invalid repeat password");
			return;
		}

		console.log("REGISTER STATE: ");
		console.log(this.state)

		let requestBody = {
			login: this.state.username,
			password: this.state.pass
		}

		try{

			const response = await axios.post('https://trollo195.herokuapp.com/user/register', requestBody)
			console.log("REGISTER RESPONSE: ");
			console.log(response);
			if(response.status === 200) {
				console.log(this.props.callbacks.login);
				this.props.callbacks.signin();
			}
			else{
				console.log("dupa")
			}
		}
		catch (error) {
			console.log("REGISTER ERROR: ") // dodać później info, że błąd
			console.log(error)
		}
        this.forceUpdate();
	}
	
	onChange(e) {
		this.setState({[e.target.name]: e.target.value});
    }
}

export default SignUp;