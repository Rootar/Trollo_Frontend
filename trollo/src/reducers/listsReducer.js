const initialState = [
	{
		id: 0,
		title: "default title",
		cards: [
			{
				ids: 0,
				description: "deafault description",
			},
			{
				ids: 1,
				description: "deafault description 2",
			}
		]
	}
]

const listsReducer = (state = initialState, action) => {
	switch(action.type)
	{
		default:
			return state;
	}
}

export default listsReducer;