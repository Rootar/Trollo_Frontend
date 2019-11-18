import React from "react";

import { makeStyles } from '@material-ui/core/styles';
import TrolloCard from "./TrolloCard";
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import { Card } from "@material-ui/core";
import ListSubheader from '@material-ui/core/ListSubheader';

const Styles = makeStyles(theme => ({
	list: {
		width: '100%',
		maxWidth: 300,
		backgroundColor: '#c5cae9',
		borderRadius: '5px'
	},
}));

const TrolloList = ({ title, cards }) => {
	const styles = Styles();

	return (
		<List className={styles.list} component="nav" aria-label="main mailbox folders">
			<ListSubheader align='center'>
				{title}
			</ListSubheader>

			{cards.map(card => (
				<ListItem button>
					<TrolloCard description={card.description}></TrolloCard>
				</ListItem>
			))}
		</List>
	);
}

export default TrolloList;