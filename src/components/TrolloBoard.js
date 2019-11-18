import React from "react";
import HeadBar from "./HeadBar";
import TrolloList from "./TrolloList";
import TrolloCard from "./TrolloCard";
import Grid from '@material-ui/core/Grid';

import { makeStyles } from '@material-ui/core/styles';
import { connect } from 'react-redux';

const Stylesx = makeStyles(theme => ({
	container: {
		marginLeft: "2px",
	},
}));

const TrolloBoard = ({lists}) => {
	const styles = Stylesx();
	
	return (
		<div>
			<HeadBar />
			<br/>
			<Grid className={styles.container} container justify="left" spacing="2">
			{lists.map(list =>
				<Grid item>
					<TrolloList title={list.title} cards={list.cards} />
				</Grid>
			)}
			</Grid>

		</div>
	);
}

export default TrolloBoard;