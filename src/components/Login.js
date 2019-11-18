import React from "react";
import SignInSignUpBar from './SignInSignUpBar';
import SignIn from "./SignIn";

import { makeStyles } from '@material-ui/core/styles';

const Stylesx = makeStyles(theme => ({
	container: {
		
	},
}));

const Login = () => {
	const Styles = Stylesx();

	return (
		<div>
			<SignInSignUpBar/>
			<br/>
			<SignIn/>
		</div>
	);
}

export default Login;