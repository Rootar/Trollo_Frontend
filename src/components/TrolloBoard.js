import React from "react";
import HeadBar from "./HeadBar";
import TrolloList from "./TrolloList";
import TrolloCard from "./TrolloCard";
import Grid from '@material-ui/core/Grid';
import TrolloAddButton from "./TrolloAddButton";
import TrolloEditName from "./TrolloEditName";
import TrolloCardView from "./TrolloCardView";

import { makeStyles } from '@material-ui/core/styles';
import { connect } from 'react-redux';
import { Icon, Button } from "@material-ui/core";
import IconButton from '@material-ui/core/IconButton';

const Stylesx = makeStyles(theme => ({
	trolloList: {
		display: "flex",
		flexDirection: "row",
		marginLeft: "6px",
		marginRight: "6px",
		maxwidth: "300px",
	},
	boardNameRow: {
		display: "flex",
		flexDirection: "row",
	},
	boardName: {
		marginRight: theme.spacing(2),
		marginLeft: theme.spacing(2),
	}
}));

const TrolloBoard = ({boards, boardId, lists}) => {
	const styles = Stylesx();
	const boardName = boards[boardId].name;
	
	return (
		<div>
			<HeadBar />
			<TrolloEditName name = { boardName } board/>
			<div className = { styles.trolloList }>
				{lists.map(list =>
					<TrolloList listId = { list.id } title = { list.title } cards={ list.cards } />
				)}
				<TrolloAddButton list/>
			</div>
		</div>
	);
}

export default TrolloBoard;