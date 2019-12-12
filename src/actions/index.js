export const clear = () => ({
    type: 'CLEAR'
})

export const addLane = (title, laneId) => ({
    type: 'ADD_LANE',
    id: laneId.toString(),
    title
})

export const changeLaneName = (title, laneId) => ({
    type: 'CHANGE_LANE_NAME',
    id: laneId,
    title
})

export const addCard = (description, laneId, cardId) => ({
    type: 'ADD_CARD',
    id: cardId.toString(),
    laneId: laneId.toString(),
    description
})

export const changeCardName = (title, laneId) => ({
    type: 'CHANGE_CARD_NAME',
    id: laneId,
    title
})