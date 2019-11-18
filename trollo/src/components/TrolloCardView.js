import React from "react";

import { makeStyles } from '@material-ui/core/styles';
import TrolloCard from "./TrolloCard";
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import { Card } from "@material-ui/core";
import CardContent from '@material-ui/core/CardContent';
import ListSubheader from '@material-ui/core/ListSubheader';

const Styles = makeStyles(theme => ({
	list: {
		width: '100%',
		maxWidth: 300,
		backgroundColor: '#c5cae9',
		borderRadius: '5px'
	},
}));

const TrolloCardView = ({ cardIndex, cards }) => {
	const styles = Styles();

	return (
		<Card className={styles.card}>
			<CardContent>
				<Typography className={classes.title} color="textSecondary" gutterBottom>

					{cards.map(card => (
						<ListItem button>
							<TrolloCard name={card.name}></TrolloCard>
						</ListItem>
					))}
				</Typography>
			</CardContent>
		</Card>

		<List className={styles.list} component="nav" aria-label="main mailbox folders">
			{cards.map(card => (
				<ListItem button>
					<TrolloCard name={card.name}></TrolloCard>
				</ListItem>
			))}
		</List>
	);
}

export default TrolloCardView;