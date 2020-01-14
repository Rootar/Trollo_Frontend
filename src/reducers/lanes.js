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
        case 'CHANGE_LANE_NAME':
                const index = state.findIndex(v => v.id === action.id)
            if(index !== -1)
                state[index].title = action.title
            return state
        case 'ADD_CARD':
            const index2 = state.findIndex(v => v.id === action.laneId)
            if(index2 !== -1)
                state[index2].cards.push({
                    id: action.id,
                    title: '',
                    description: action.description,
                    laneId: action.laneId
                })
            return state
        case 'CHANGE_CARD_NAME':
        default:
            return state
    }
}

export default lanes