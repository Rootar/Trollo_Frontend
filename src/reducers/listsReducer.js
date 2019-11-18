const initialState = [
	{
		id: 0,
		title: "TODO",
		cards: [
			{
				id: 0,
				name: "Stworzyć lootboxy",
				description: "Stworzyć lootboxy",
			},
			{
				id: 1,
				name: "Przygotować GDD",
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
				name: "Posegregować nazwy",
				description: "Posegregować nazwy, żeby numeracja zgadzała się z poziomem",
			},
			{
				id: 1,
				name: "Zrobić system ekwipunku",
				description: "no bo jak to tak bez torby",
			}
		]
	},
	{
		id: 2,
		title: "DONE",
		cards: [
			{
				id: 0,
				name: "Przygotować 81 modeli broni",
				description: "Przygotować 81 modeli broni żeby był jakiś content",
			},
			{
				id: 1,
				name: "Uruchomić testowe reklamy",
				description: "Uruchomić testowe reklamy na urządzeniu tylko bez takich +18",
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