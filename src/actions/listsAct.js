import { actions } from "../actions"

export const AddBoard = (name) => {
	return {
		type: actions.addBoard,
		payload: name,
	};
};

export const AddList = (title) => {
	return {
		type: actions.addList,
		payload: title,
	};
};

export const AddCard = (listId, name) => {
	return {
		type: actions.addCard,
		payload: {listId, name},
	};
};

export const SetBoardName = (boardId, name) => {
	return {
		type: actions.nameBoard,
		payload: {boardId, name},
	};
};

export const SetListName = (listId, title) => {
	return {
		type: actions.nameList,
		payload: {listId, title},
	};
};

export const SetCardName = (boardId, listId, name) => {
	return {
		type: actions.nameCard,
		payload: {boardId, listId, name},
	};
};

export const SetCardDescription = (boardId, listId, description) => {
	return {
		type: actions.descriptionCard,
		payload: {boardId, listId, description},
	};
};