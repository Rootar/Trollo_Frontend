import React, {Component} from 'react';
import { withStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import Grid from '@material-ui/core/Grid';
import { Button } from "@material-ui/core";
import axios from 'axios'
import PropTypes from 'prop-types'
import {NotificationManager} from 'react-notifications';

const styles = theme => ({
    text:{
        marginTop: "20px"
    }
});

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
        const {classes} = this.props
        return (
            <Grid container direction="column" justify="center" alignItems="center">
                <Grid item className={classes.text}>
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
                    axios.defaults.headers.common = {
                        'Authorization': sessionStorage.getItem('Token'),
                        'Content-Type': 'application/json'
                    }

                    sessionStorage.setItem('Username', that.state.username)
                    NotificationManager.success('Hello ' + that.state.username, 'Sign In Successful!');
                    
					that.props.loginCallback(); 
                })
                .catch(function(error){
                    NotificationManager.error(error.response.data, 'Login Faild!')
                })
	}

    onChange(e) {
		this.setState({[e.target.name]: e.target.value});
    }
}

LoginPage.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(LoginPage)