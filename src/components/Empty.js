import React from "react";

import { makeStyles } from '@material-ui/core/styles';

const Stylesx = makeStyles(theme => ({
	container: {
		
	},
}));

const Empty = () => {
	const Styles = Stylesx();

	return (
		<div></div>
	);
}

export default Empty;