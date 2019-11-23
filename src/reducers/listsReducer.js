import { actions } from "../actions"

let lastId = 3;
let lastCardId = 3;

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
			},
			{
				id: 2,
				name: "Zrobić testowe karty",
				description: "no takie tam karty",
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
		case actions.addList:
			const newList = {
				id: lastId,
				title: action.payload,
				cards: []
			};
			lastId += 1;
			return [...state, newList]
		case actions.addCard:
				const newCard = {
					id: lastCardId,
					name: action.payload.name,
					description: ""
				};
				lastCardId += 1;

				const newLists = state.map(list => {
					if(list.id === action.payload.listId)
					{
						return {
							...list, cards: [...list.cards, newCard]
						};
					}
					else return list;
				});

				return newLists
		default:
			return state;
	}
}

export default listsReducer;