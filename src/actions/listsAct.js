import { actions } from "../actions"

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