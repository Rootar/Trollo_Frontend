const lanes = (state = [], action) => {
    switch(action.type){
        case 'CLEAR':
            return []
        case 'ADD_LANE':
            return [
                ...state,
                {
                    id: action.id,
                    title: action.title,
                    cards: []
                }
            ]
        // case 'DELETE_LANE':
        //     const index = state.findIndex(v => v.id === action.id)
        //     if(index !== -1)
        //         state.splice(index, 1);
        //     return state
        case 'CHANGE_LANE_NAME':
            const index = state.findIndex(v => v.id === action.id)
            if(index !== -1)
                state[index].title = action.title
            return state
        case '':
        default:
            return state
    }
}

export default lanes