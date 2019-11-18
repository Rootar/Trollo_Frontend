import React from "react";
import SignInSignUpBar from './SignInSignUpBar';
import SignUp from "./SignUp";

import { makeStyles } from '@material-ui/core/styles';

const Stylesx = makeStyles(theme => ({
	container: {
		
	},
}));

const Register = () => {
	const Styles = Stylesx();

	return (
		<div>
			<SignInSignUpBar/>
			<br/>
			<SignUp/>
		</div>
	);
}

export default Register;