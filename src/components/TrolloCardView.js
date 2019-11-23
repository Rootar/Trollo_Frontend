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
	cardView: {
		width: '300px',
		maxWidth: 300,
		height: "400px",
		backgroundColor: "#c5cae9",
		borderRadius: "5px",
		position: "fixed",
		margin: "auto"
	},
}));

const TrolloCardView = ({ lists, listId, cardId }) => {
	const styles = Styles();

	return (
		<div>
			{lists.map(list => {
				if(list.id == listId) {
					list.cards.map(card => {
						if(card.id == cardId)
						{
							return (
							<div className = {styles.cardView}>
								<h3> { card.name } </h3>
								<p> { card.description } </p>
							</div> )
						}
						else return;

						}
					)}
				}
			)}
			
		</div>
	);
}

export default TrolloCardView;