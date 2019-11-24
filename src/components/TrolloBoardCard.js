import React from "react";

import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
import CardActionArea from '@material-ui/core/CardActionArea';
import { Icon, Button } from "@material-ui/core";

const Styles = makeStyles(theme => ({
	trollocard: {
		marginBottom: "1px",
		minWidth: 260,
	},
	trollocontentcard: {
		display: "flex",
		position: "row"
	},
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