import React from "react";

import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import CardActionArea from '@material-ui/core/CardActionArea';

const Styles = makeStyles(theme => ({
	card: {
		minWidth: 275,
	},
	typo:{		
		marginTop: 15,
		marginBottom: 15,
		marginLeft: 10,
		marginRight: 10
	}
}));

const TrolloCard = ({ title, description }) => {
	const styles = Styles();

	return (
		<Card className={styles.card}>
			<CardActionArea>
				<Typography className={styles.typo} gutterBottom>{description}</Typography>
			</CardActionArea>
		</Card>
	);
}

export default TrolloCard;