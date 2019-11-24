import React from "react";

import Card from '@material-ui/core/Card';
import Textarea from '@material-ui/core/TextareaAutosize';
import { Icon, Button } from "@material-ui/core";

import { connect } from "react-redux";
import { AddList, AddCard, AddBoard } from "../actions";

const styles =
{
	addButton: {
		cursor: "pointer",
		display: "flex",
		paddingLeft: "15px",
		alignItems: "center",
		minWidth: 275,
		minHeight: 40,
	},
	setNameArea: {
		minWidth: 275,
		minHeight: 80,
		border: "none",
		resize: "none",
		outline: "none",
		overflow: "hidden",
		marginLeft: "15px",
	},
	xButton: {
		marginLeft: "6px",
		cursor: "pointer",
	},
	addAceptCancel: {
		display: "flex",
		marginTop: "6px",
		alignItems: "center",
	}
}

class TrolloAddButton extends React.Component {
	state = {
		addMode: false,
		name: "",
	};

	RenderButton = () => {
		const { list } = this.props;
		const { board } = this.props;
		const addbuttonText = list ? "Add list" : board ? "Add board" : "Add card";

		return (
			<div style = { styles.addButton } onClick = { this.SetAddMode }>
				<Icon>add</Icon>
				{ addbuttonText }
			</div>
		);
	};

	RenderAddMode = () => {
		const { list } = this.props;
		const { board } = this.props;
		const addbuttonText = list ? "Add list" : board ? "Add board" : "Add card";
		const addModePlaceholder = list ? "Enter list name..." : board ? "Enter board name..." : "Enter card name...";

		return (
			<div>
				<Card>
					<Textarea
						pleaceholder = { addModePlaceholder }
						onBlur = { this.SetNormalMode }
						onChange = { this.ChangeName }
						value = { this.state.name }
						style = { styles.setNameArea }
						autoFocus
					>
					</Textarea>
				</Card>
				<div style = { styles.addAceptCancel }>
					<Button
						variant = "contained"
						color = "primary"
						onMouseDown = { list ? this.AddTrolloList : board ? this.AddTrolloBoard : this.AddTrolloCard }
					> { addbuttonText } </Button>
					<Icon style = { styles.xButton }> close </Icon>
				</div>
			</div>
		);
	};

	render()
	{
		return this.state.addMode ? this.RenderAddMode() : this.RenderButton();
	};

	SetAddMode = () => {
		this.setState({addMode: true});
	};

	SetNormalMode = evt => {
		this.setState({addMode: false});
	};

	ChangeName = evt => {
		this.setState({name: evt.target.value});
	};

	AddTrolloList = () => {
		const { dispatch } = this.props;
		const { name } = this.state;

		if(name)
		{
			this.setState({name: ""});
			dispatch(AddList(name))
		}
		return;
	}

	AddTrolloCard = () => {
		const { dispatch, listId } = this.props;
		const { name } = this.state;

		if(name)
		{
			this.setState({name: ""});
			dispatch(AddCard(listId, name))
		}
		return;
	}

	AddTrolloBoard = () => {
		const { dispatch } = this.props;
		const { name } = this.state;

		if(name)
		{
			this.setState({name: ""});
			dispatch(AddBoard(name))
		}
		return;
	}
}

export default connect()(TrolloAddButton);