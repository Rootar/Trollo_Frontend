const cards = (state = [], action) => {
    switch(action.type){
        // case 'ADD_LANE':
        //     return [
        //         ...state,
        //         {
        //             id: action.id,
        //             title: action.title,
        //             cards: []
        //         }
        //     ]
        // case 'DELETE_LANE':
        //     const index = state.findIndex(v => v.id === action.id)
        //     if(index !== -1)
        //         state.splice(index, 1);
        //     return state
        default:
            return state
    }
}

export default cards