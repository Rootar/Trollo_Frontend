import React from "react";

import { makeStyles } from '@material-ui/core/styles';
import TrolloCard from "./TrolloCard";
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import { Card, Grid } from "@material-ui/core";
import CardContent from '@material-ui/core/CardContent';
import ListSubheader from '@material-ui/core/ListSubheader';
import { Icon, Button } from "@material-ui/core";
import TrolloEditName from "./TrolloEditName";
import { positions } from '@material-ui/system';

const Styles = makeStyles(theme => ({
	cardView: {
		width: '600px',
		height: '400px',
		backgroundColor: '#c5cae9',
		borderRadius: '5px',
		position: 'fixed',
		top: '50%',
		left: '50%',
    	transform: 'translate(-50%, -50%)',
	},
	cardBG: {
		position: 'fixed',
		top: 0,
		left: 0,
		width: '100%',
		height: '100%',
		backgroundColor: "#00000080",
	},
}));

const TrolloCardView = ({ lists, listId, cardId, closeCallback}) => {
	const styles = Styles();
	const name = lists[listId].cards[cardId].name;
	const description = lists[listId].cards[cardId].description;
	const attachments = lists[listId].cards[cardId].attachments;
	const comments = lists[listId].cards[cardId].comments;
	const close = () => closeCallback();

	return (
		<div className = {styles.cardBG}>	
			<div className = {styles.cardView}>
				<Grid 
				container 
				direction="row"
				justify="space-between"
				>
					<Grid item xs = {9}>
						<TrolloEditName name = { name }/>
					</Grid>
					<Grid item xs>
						<Button onClick = { () => close()}>Close</Button>
					</Grid>
				</Grid>
				<TrolloEditName name = { description } description/>
				{ attachments.map(attachment => 
					<ListItem button>
						<p>{ attachment.content }</p>
					</ListItem>
				)}
				{ comments.map(comment => 
					<ListItem button>
						<p>autor: { comment.author }</p>
						<p>data: { comment.date }</p>
						<p>{ comment.text }</p>
						<p>{ comment.attachment }</p>
					</ListItem>
				)}
			</div>
		</div>
	);
}

export default TrolloCardView;