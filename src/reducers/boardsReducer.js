import { actions } from "../actions"

let lastId = 3;

const initialState = [
	{
		id: 0,
		name: "test board1",
		users: [
			{
				id: 0,
			},
			{
				id: 1,
			}
		]
	},
	{
		id: 1,
		name: "bo 2",
		users: [
			{
				id: 0,
			},
			{
				id: 2,
			}
		]
	},
	{
		id: 2,
		name: "jakieś coś",
		users: [
			{
				id: 0,
			},
			{
				id: 1,
			}
		]
	}
]

const boardsReducer = (state = initialState, action) => {
	switch(action.type)
	{
		case actions.addBoard:
			const newBoard = {
				id: lastId,
				name: action.payload,
				users: []
			};
			lastId += 1;
			return [...state, newBoard]
		case actions.nameBoard:
			for(var i = 0; i < state.length; ++i)
			{
				if(state[i].id == action.payload.boardId)
				{
					state[i].name = action.payload.name;
					break;
				}
			}
			return state;
		default:
			return state;
	}
}

export default boardsReducer;