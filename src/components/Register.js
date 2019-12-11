import React from "react";
import SignInSignUpBar from './SignInSignUpBar';
import SignUp from "./SignUp";

import { makeStyles } from '@material-ui/core/styles';

const Stylesx = makeStyles(theme => ({
	container: {
		
	},
}));

const Register = ( {signinCallback, signupCallback} ) => {
	const Styles = Stylesx();

	return (
		<div>
			<SignInSignUpBar signinCallback = { signinCallback } signupCallback = { signupCallback }/>
			<br/>
			<SignUp callbacks = {{ 
				signin: signinCallback,
			}}/>
		</div>
	);
}

export default Register;