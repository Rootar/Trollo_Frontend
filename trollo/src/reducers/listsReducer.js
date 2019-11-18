const initialState = [
	{
		id: 0,
		title: "TODO",
		cards: [
			{
				id: 0,
				name: "Stworzyć lootboxy",
				description: "System lootboxów ma być bajerancki",
			},
			{
				id: 1,
				name: "Przygotować game design document",
				description: "System lootboxów ma być bajerancki",
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
				description: "Trzeba posegregować nazwy, żeby numeracja zgadzała się z poziomem",
			},
			{
				id: 1,
				name: "Zrobić system ekwipunku",
				description: "No bo wiadomo jest gra trzeba jakoś ułożyć przedmioty",
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
				description: "modele jak modele",
			},
			{
				id: 1,
				name: "Uruchomić testowe reklamy na urządzeniu",
				description: "Pamiętać o usunięciu reklam +18",
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