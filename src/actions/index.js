export const clear = () => ({
    type: 'CLEAR'
})

export const addLane = (title, laneId) => ({
    type: 'ADD_LANE',
    id: laneId,  //tutaj zmienimy na id jaki dostajemy z bordu ziomie
    title
})

export const changeLaneName = (title, laneId) => ({
    type: 'CHANGE_LANE_NAME',
    id: laneId,  //tutaj zmienimy na id jaki dostajemy z bordu ziomie
    title
})