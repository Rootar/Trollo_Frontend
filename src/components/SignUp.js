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

	onSubmitRegister(e){
		e.preventDefault();
		
		if(this.state.pass != this.state.reppass)
		{
			console.log("invalid repeat password");
			return;
		}

        console.log("REGISTER STATE: " + this.state);

        axios.post('https://trollo195.herokuapp.com/user/register', {
            login: this.state.username, 
            password: this.state.password})
                .then(function(response){
                    console.log("RESPONSE: " + response) // dodać później info, że się zarejestrowaliśmy                    
                })
                .catch(function(error){
                    console.log("REGISTER ERROR: " + error) // dodać później info, że błąd
                })
                
        this.forceUpdate();
	}
	
	onChange(e) {
		this.setState({[e.target.name]: e.target.value});
    }
}

export default SignUp;