let nextLaneId = 0;

export const addLane = (title) => ({
    type: 'ADD_LANE',
    id: (nextLaneId++).toString(),
    title
})

export const deleteLane = (id) => ({
    type: 'DELETE_LANE',
    id
})