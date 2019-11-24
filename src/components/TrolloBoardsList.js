import React from "react";
import HeadBar from "./HeadBar";
import TrolloList from "./TrolloList";
import TrolloCard from "./TrolloCard";
import TrolloBoardCard from "./TrolloBoardCard";
import Grid from '@material-ui/core/Grid';
import TrolloAddButton from "./TrolloAddButton";
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListSubheader from '@material-ui/core/ListSubheader';
import IconButton from '@material-ui/core/IconButton';
import { Icon, Button } from "@material-ui/core";

import { makeStyles } from '@material-ui/core/styles';
import { connect } from 'react-redux';

const Styles = makeStyles(theme => ({
	list: {
		height:				'100%',
		width:				'300px',
		backgroundColor:	"#007FFF",
		position: 			"fixed",
		left:				"0px",
		top:				"50px",
		zIndex:				"1",
	},
	editIcon: {
		width:				'30px',
		height:				'30px',
	},
	itemsList: {
		display:			'flex',
		postion:			'row',
	}
}));

const TrolloBoardsList = ({ boards }) => {
	const styles = Styles();

	return (
		<div>
			<List className ={ styles.list } component="nav" aria-label="main mailbox folders">
			<ListSubheader align='center'>
				Board
			</ListSubheader>
				{boards.map(board => 
					<ListItem  button>
						<TrolloBoardCard name = { board.name } button></TrolloBoardCard>
					</ListItem>
				)}
				<TrolloAddButton board/>
			</List>
		</div>
		
	);
}

export default TrolloBoardsList;