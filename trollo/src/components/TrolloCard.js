import React from "react";

import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';

const Styles = makeStyles(theme => ({
	card: {
		minWidth: 275,
	},
}));

const TrolloCard = ({ title, description }) => {
	const styles = Styles();

	return (
		<Card className={styles.card}>
			<CardActions>
				<Button size="small">{title}</Button>
			</CardActions>
			<Typography gutterBottom>{description}</Typography>
		</Card>
	);
}

export default TrolloCard;