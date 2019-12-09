import React, {Component} from "react"

import { makeStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import { Button } from "@material-ui/core";
import Grid from '@material-ui/core/Grid';
import axios from "axios";

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

class SignIn extends Component {
	constructor(props){
		super(props);

		this.onChange = this.onChange.bind(this);
		this.onSubmitLogin = this.onSubmitLogin.bind(this);
	}

	state = {
		username:'',
		password:'',
		login: sessionStorage.getItem('Token') ? true : false,
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
						Log in to Trollo
					</div>
					<Button
						className = { styles.button }
						onClick =  { () => { this.props.signupCallback() }}
						color="primary"
					>
						or create an account
					</Button>
			
					<TextField
						name = 'username'
						id = "login"
						className = { styles.textField }
						label = "login"
						value = { this.state.username }
						onChange = { this.onChange }
					></TextField>

					<TextField
						name = 'password'
						id = "pass"
						className = { styles.textField }
						label = "Password"
						type = "password"
						value = { this.state.password }
						onChange = { this.onChange }
					></TextField>

					<Button
						className = { styles.button}
						variant="contained"
						color="primary"
						onClick = { this.onSubmitLogin }
					>
					Login</Button>
				</Grid>
			</form>
		);
	}

	onSubmitLogin(e)
	{
        e.preventDefault();

        console.log("LOGIN STATE: " + this.state);

        axios.post('https://trollo195.herokuapp.com/login', {
            login: this.state.username, 
            password: this.state.password})
                .then(function(response){
                    sessionStorage.setItem('Token', response.headers['authorization']);                    
                })
                .catch(function(error){
                    console.log("LOGIN ERROR: " + error) // dodać później info, że błąd
                })
		

		this.props.loginCallback(this.state.username.value, this.state.password.value);

        this.state.login = true
        this.forceUpdate();
	}
	
	onChange(e) {
		this.setState({[e.target.name]: e.target.value});
	}
	
}

export default SignIn;