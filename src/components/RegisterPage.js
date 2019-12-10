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

class RegisterPage extends Component {    
	constructor(props){
		super(props);

		this.onChange = this.onChange.bind(this);
        this.onSubmitRegister = this.onSubmitRegister.bind(this);
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
                    Register in Trollo
                </Grid>
                <form noValidate autoComplete="off">
                    <Grid item><TextField id="outlined-basic" label="Username" name="username" onChange={this.onChange} value = {this.state.username}/></Grid>
                    <Grid item><TextField id="outlined-basic" label="Password" name="password" type="password" onChange={this.onChange} value = {this.state.password}/></Grid>
                    <Grid item align="center">
                        <Button variant="contained" color="primary" onClick={this.onSubmitRegister}>Register</Button>
                    </Grid>
                </form>
            </Grid>
        )
    }

    onSubmitRegister(e)
	{
        let that = this
        axios.post('https://trollo195.herokuapp.com/user/register', {
            login: this.state.username, 
            password: this.state.password})
                .then(function(response){
                    NotificationManager.success('Hello ' + that.state.username, 'Registriation Successful!');
                })
                .catch(function(error){
                    NotificationManager.error('Faild, ' + error.response.data, 'Registriation Faild')
                })
	}

    onChange(e) {
		this.setState({[e.target.name]: e.target.value});
    }
}

RegisterPage.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(RegisterPage)