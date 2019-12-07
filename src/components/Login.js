import React from "react";
import SignInSignUpBar from './SignInSignUpBar';
import SignIn from "./SignIn";

import { makeStyles } from '@material-ui/core/styles';

const Stylesx = makeStyles(theme => ({
	container: {
		
	},
}));

const Login = ( { loginCallback, signinCallback, signupCallback } ) => {
	const Styles = Stylesx();

	return (
		<div>
			<SignInSignUpBar signinCallback = { signinCallback } signupCallback = { signupCallback }/>
			<br/>
			<SignIn loginCallback = { loginCallback }/>
		</div>
	);
}

export default Login;