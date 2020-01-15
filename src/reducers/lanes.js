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
                    laneId: action.laneId,
                    attachments: [],
                    comments: []
                })
            return state
        case 'CHANGE_CARD_NAME':
            return state
        case 'ADD_COMMENT':
                const commentindex2 = state.findIndex(v => v.id === action.laneId)
                if(commentindex2 !== -1)
                {
                    const commentindex3 = state[commentindex2].cards.findIndex(v => v.id === action.cardId)
                    if(commentindex3 !== -1)
                    {
                        state[commentindex2].cards[commentindex3].comments.push({
                            id: action.id,
                            content: action.content
                        })
                    }
                }
            return state
        case 'ADD_ATTACHEMENT':
                const attachmentindex2 = state.findIndex(v => v.id === action.laneId)
                if(attachmentindex2 !== -1)
                {
                    const attachmentindex3 = state[attachmentindex2].cards.findIndex(v => v.id === action.cardId)
                    if(attachmentindex3 !== -1)
                    {
                        state[attachmentindex2].cards[attachmentindex3].attachments.push({
                            id: action.id,
                            name: action.name,
                            content: action.content
                        })
                    }
                }
            return state
        case 'CHANGE_COMMENT':
            return state
        default:
            return state
    }
}

export default lanes