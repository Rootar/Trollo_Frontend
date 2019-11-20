import React from "react";

import Card from '@material-ui/core/Card';
import Textarea from '@material-ui/core/TextareaAutosize';
import { Icon, Button } from "@material-ui/core";

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
		const addbuttonText = list ? "Add list" : "Add card";

		return (
			<div style = { styles.addButton } onClick = { this.SetAddMode }>
				<Icon>add</Icon>
				{ addbuttonText }
			</div>
		);
	};

	RenderAddMode = () => {
		const { list } = this.props;
		const addbuttonText = list ? "Add list" : "Add card";
		const addModePlaceholder = list ? "Enter list name..." : "Enter card name...";

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
					<Button variant = "contained" color = "primary"> { addbuttonText } </Button>
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
}

export default TrolloAddButton;