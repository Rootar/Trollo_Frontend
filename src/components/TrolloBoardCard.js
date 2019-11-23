import React from "react";

import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import CardActionArea from '@material-ui/core/CardActionArea';

const Styles = makeStyles(theme => ({
	trollocard: {
		marginBottom: "1px",
		minWidth: 260,
	}
}));

const TrolloBoardCard = ({ name }) => {
	const stylesx = Styles();

	return (
		<Card className = {stylesx.trollocard}>
			<CardContent>
				<Typography gutterBottom> { name } </Typography>
			</CardContent>
		</Card>
	);
}

export default TrolloBoardCard;