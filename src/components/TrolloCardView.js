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
		height: "400px",
		backgroundColor: "#c5cae9",
		borderRadius: "5px",
		position: "fixed",
		zIndex: "100"
	},
}));

const TrolloCardView = ({ lists, listId, cardId }) => {
	const styles = Styles();
	const name = lists[listId].cards[cardId].name;
	const description = lists[listId].cards[cardId].description;

	return (
		<div className = {styles.cardView}>
			<h3> { name } </h3>
			<p> { description } </p>
		</div>
	);
}

export default TrolloCardView;