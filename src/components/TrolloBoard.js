import React from "react";
import HeadBar from "./HeadBar";
import TrolloList from "./TrolloList";
import TrolloCard from "./TrolloCard";
import Grid from '@material-ui/core/Grid';
import TrolloAddButton from "./TrolloAddButton";

import { makeStyles } from '@material-ui/core/styles';
import { connect } from 'react-redux';

const Stylesx = makeStyles(theme => ({
	container: {
		display: "flex",
		flexDirection: "row",
		marginLeft: "6px",
		marginRight: "8px",
	},
}));

const TrolloBoard = ({lists}) => {
	const styles = Stylesx();
	
	return (
		<div>
			<HeadBar />
			<p>nazawa tablicy</p>
			<div className = { styles.container }  justify="left" spacing="2">
				{lists.map(list =>
					<TrolloList title={list.title} cards={list.cards} />
				)}
				<TrolloAddButton list/>
			</div>

		</div>
	);
}

export default TrolloBoard;