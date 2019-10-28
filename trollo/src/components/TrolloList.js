import React from "react";

import { makeStyles } from '@material-ui/core/styles';
import TrolloCard from "./TrolloCard";
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import { Card } from "@material-ui/core";

const Styles = makeStyles(theme => ({
	list: {
		width: '100%',
		maxWidth: 300,
		backgroundColor: theme.palette.background.paper,
	},
}));

const TrolloList = ({ title, cards }) => {
	const styles = Styles();

	return (
		<div className={styles.list}>
			<List component="nav" aria-label="main mailbox folders">
				<ListItemText>
					{title}
				</ListItemText>

				{cards.map(card => (
					<ListItem button>
						<TrolloCard title={card.title} description={card.description}></TrolloCard>
					</ListItem>
				))}
			</List>
		</div>
	);
}

export default TrolloList;