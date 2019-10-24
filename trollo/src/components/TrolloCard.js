import React from "react";

import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';

const Stylesx = makeStyles(theme => ({
	card: {
		minWidth: 275,
	},
}));

const TrolloCard = () => {
	const Styles = Stylesx();

	return (
		<Card className={ Styles.card }>
			<CardActions>
				<Button size="small">Title of card</Button>
			</CardActions>
		</Card>
	);
}

export default TrolloCard;