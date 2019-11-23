import { combineReducers } from "redux"
import listsReducer from "./listsReducer"
import boardsReducer from "./boardsReducer"

export default combineReducers({
	lists: listsReducer,
	boards: boardsReducer
});