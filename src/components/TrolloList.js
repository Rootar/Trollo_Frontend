import React from "react";

import { makeStyles } from '@material-ui/core/styles';
import TrolloCard from "./TrolloCard";
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import { Card } from "@material-ui/core";
import ListSubheader from '@material-ui/core/ListSubheader';
import TrolloAddButton from "./TrolloAddButton";

const Styles = makeStyles(theme => ({
	list: {
		height: '100%',
		width: '300px',
		borderRadius: '3px',
		marginRight: "8px",
		backgroundColor: "#dcdcdc",
	},
}));

const TrolloList = ({ listId, title, cards }) => {
	const styles = Styles();

	return (
		<List className={styles.list} component="nav" aria-label="main mailbox folders">
			<ListSubheader align='center'>
				{title}
			</ListSubheader>

			{cards.map(card => (
				<ListItem button>
					<TrolloCard name = { card.name }></TrolloCard>
				</ListItem>
			))}

			<TrolloAddButton listId = { listId }/>
		</List>
	);
}

export default TrolloList;