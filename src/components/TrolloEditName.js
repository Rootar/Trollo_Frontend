import React from "react";

import Card from '@material-ui/core/Card';
import Textarea from '@material-ui/core/TextareaAutosize';
import { Icon, Button } from "@material-ui/core";
import IconButton from '@material-ui/core/IconButton';

import { connect } from "react-redux";
import { SetBoardName, SetListName, SetCardName } from "../actions";

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

class TrolloEditName extends React.Component {
	state = {
		addMode: false,
		name: this.props.name,
	};


	RenderEditMode = () => {
		const { list } = this.props;
		const { board } = this.props;
		const addbuttonText = "SAVE";
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
						onMouseDown = { list ? this.EditListName : board ? this.EditBoardName : this.EditCardName }
					> { addbuttonText } </Button>
					<Icon style = { styles.xButton }> close </Icon>
				</div>
			</div>
		);
	};

	RenderName = () => {
		return (
			<div style = { styles.addButton } onClick = { this.SetAddMode }>
				<p style = {styles.boardName}> {this.state.name}</p>
				<IconButton
					edge = "start"
					color = "inherit"
					aria-label = "open drawer"
				>
						<Icon className = { styles.editIcon }> edit </Icon>
				</IconButton>
			</div>
		);
	};

	render()
	{
		return this.state.addMode ? this.RenderEditMode() : this.RenderName();
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

	EditBoardName = () => {
		const { dispatch } = this.props;
		const { name } = this.state;

		if(name)
		{
			//this.setState({name: ""});
			dispatch(SetBoardName(name))
		}
		return;
	}

	EditListName = () => {
		const { dispatch } = this.props;
		const { name } = this.state;

		if(name)
		{
			//this.setState({name: ""});
			dispatch(SetListName(name))
		}
		return;
	}

	EditCardName = () => {
		const { dispatch, listId } = this.props;
		const { name } = this.state;

		if(name)
		{
			//this.setState({name: ""});
			dispatch(SetCardName(listId, name))
		}
		return;
	}
}


export default connect()(TrolloEditName);