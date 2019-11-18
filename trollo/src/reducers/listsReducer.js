const initialState = [
	{
		id: 0,
		title: "TODO",
		cards: [
			{
				id: 0,
				description: "Stworzyć lootboxy",
			},
			{
				id: 1,
				description: "Przygotować game design document",
			}
		]
	},
	{
		id: 1,
		title: "IN PROGRESS",
		cards: [
			{
				id: 0,
				description: "Posegregować nazwy, żeby numeracja zgadzała się z poziomem",
			},
			{
				id: 1,
				description: "Zrobić system ekwipunku",
			}
		]
	},
	{
		id: 2,
		title: "DONE",
		cards: [
			{
				id: 0,
				description: "Przygotować 81 modeli broni",
			},
			{
				id: 1,
				description: "Uruchomić testowe reklamy na urządzeniu",
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