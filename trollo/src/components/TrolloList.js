import React from "react";

import { makeStyles } from '@material-ui/core/styles';
import TrolloCard from "./TrolloCard";
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';

const Stylesx = makeStyles(theme => ({
	root: {
		width: '100%',
		maxWidth: 300,
		backgroundColor: theme.palette.background.paper,
	},
}));

const TrolloList = ({ title }) => {
	const Styles = Stylesx();

	return (
		<div className={ Styles.root }>
			<List component="nav" aria-label="main mailbox folders">
				<ListItemText>
					{ title }
				</ListItemText>
				<ListItem button>
					<TrolloCard></TrolloCard>
				</ListItem>
				<ListItem button>
					<TrolloCard></TrolloCard>
				</ListItem>
				<ListItem button>
					<TrolloCard></TrolloCard>
				</ListItem>
				<ListItem button>
					<TrolloCard></TrolloCard>
				</ListItem>
				<ListItem button>
					<TrolloCard></TrolloCard>
				</ListItem>
			</List>
		</div>
	);
}

export default TrolloList;