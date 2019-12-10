import React, {Component} from 'react';
import { makeStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import Grid from '@material-ui/core/Grid';
import { Button } from "@material-ui/core";
import axios from 'axios'

var useStyles = makeStyles(theme => ({
    text:{
        marginTop: "20px"
    }
}));

class LoginPage extends Component {    
	constructor(props){
		super(props);

		this.onChange = this.onChange.bind(this);
        this.onSubmitLogin = this.onSubmitLogin.bind(this);
	}

	state = {
		username:'',
		password:'',
    }
    
    render(){
        return (
            <Grid container direction="column" justify="center" alignItems="center">
                <Grid item className={useStyles.text}>
                    Login to Trollo
                </Grid>
                <form noValidate autoComplete="off">
                    <Grid item><TextField id="outlined-basic" label="Username" name="username" onChange={this.onChange} value = {this.state.username}/></Grid>
                    <Grid item><TextField id="outlined-basic" label="Password" name="password" type="password" onChange={this.onChange} value = {this.state.password}/></Grid>
                    <Grid item align="center">
                        <Button variant="contained" color="primary" onClick={this.onSubmitLogin}>Login</Button>
                    </Grid>
                </form>
            </Grid>
        )
    }

    onSubmitLogin(e)
	{
		let that = this;

        axios.post('https://trollo195.herokuapp.com/login', {
            login: this.state.username, 
            password: this.state.password})
                .then(function(response){
                    sessionStorage.setItem('Token', response.headers['authorization']);
                    sessionStorage.setItem('Username', that.state.username)				
					that.props.loginCallback(); 
                })
                .catch(function(error){
                    console.log("LOGIN ERROR: " + error) // dodać później info, że błąd
                })
	}

    onChange(e) {
		this.setState({[e.target.name]: e.target.value});
    }
}

export default LoginPage