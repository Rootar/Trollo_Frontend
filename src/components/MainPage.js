// jeżeli zalogowany to widok tablic, jeżeli wylogowany, to przyciski przenoszące do stron do logowania i rejestracji
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

class RegisterPage extends Component {    
	constructor(props){
		super(props);
    }
        
    render(){
        if(this.props.isLoggedIn){
            return this.whenLoggedIn()
        }else{
            return this.whenLoggedOut()
        }
    }

    whenLoggedOut(){
        return (
            <Grid container direction="column" justify="center" alignItems="center">                
                <Grid item><Button variant="contained" color="primary" onClick={this.props.loginPageCallback}>Go to login page</Button></Grid>
                <Grid item><Button variant="contained" color="primary" onClick={this.props.registerPageCallback}>Go to register page</Button></Grid>
            </Grid>
        )
    }

    whenLoggedIn(){
        return (
            <div></div>
        )
    }

    // onSubmitRegister(e)
	// {
	// 	let that = this;

    //     axios.post('https://trollo195.herokuapp.com/user/register', {
    //         login: this.state.username, 
    //         password: this.state.password})
    //             .then(function(response){			
	// 				// that.props.Callback(); 
    //             })
    //             .catch(function(error){
    //                 console.log("REGISTER ERROR: " + error) // dodać później info, że błąd
    //             })
	// }

    // onChange(e) {
	// 	this.setState({[e.target.name]: e.target.value});
    // }
}

export default RegisterPage