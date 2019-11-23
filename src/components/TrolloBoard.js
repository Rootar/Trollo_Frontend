import React from "react";
import HeadBar from "./HeadBar";
import TrolloList from "./TrolloList";
import TrolloCard from "./TrolloCard";
import Grid from '@material-ui/core/Grid';
import TrolloAddButton from "./TrolloAddButton";
import TrolloCardView from "./TrolloCardView";

import { makeStyles } from '@material-ui/core/styles';
import { connect } from 'react-redux';

const Stylesx = makeStyles(theme => ({
	trolloList: {
		display: "flex",
		flexDirection: "row",
		marginLeft: "6px",
		marginRight: "6px",
		maxwidth: "300px",
	},
}));

const TrolloBoard = ({lists}) => {
	const styles = Stylesx();
	
	return (
		<div>
			<HeadBar />
			<p>nazawa tablicy</p>
			<div className = { styles.trolloList }>
				{lists.map(list =>
					<TrolloList listId = { list.id } title = { list.title } cards={ list.cards } />
				)}
				<TrolloAddButton list/>
			</div>
			<TrolloCardView lists = {lists} listId = { 1 } cardId = { 0 } />

		</div>
	);
}

export default TrolloBoard;