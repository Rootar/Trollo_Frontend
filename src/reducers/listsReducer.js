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
				attachments: [
					{
						content: "załącznik1"
					}
				],
				comments: [
					{
						id: 0,
						author: 2,
						date: "05.12.2019",
						text: "jestem komentarzem",
						attachment: "",
					},
					{
						id: 1,
						author: 1,
						date: "04.12.2019",
						text: "czemu muszą tu być te lootboxy?",
						attachment: "zal",
					}
				],
			},
			{
				id: 1,
				name: "Przygotować GDD",
				description: "Przygotować game design document",
				attachments: [],
				comments: [],
			},
			{
				id: 2,
				name: "Zrobić testowe karty",
				description: "no takie tam karty",
				attachments: [],
				comments: [],
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
				attachments: [],
				comments: [],
			},
			{
				id: 1,
				name: "Zrobić system ekwipunku",
				description: "no bo jak to tak bez torby",
				attachments: [],
				comments: [],
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
				attachments: [],
				comments: [],
			},
			{
				id: 1,
				name: "Uruchomić testowe reklamy",
				description: "Uruchomić testowe reklamy na urządzeniu tylko bez takich +18",
				attachments: [],
				comments: [],
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
				description: "",
				attachments: [],
				comments: []
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
		case actions.nameList:
			for(var i = 0; i < state.length; ++i)
			{
				if(state[i].id == action.payload.listId)
				{
					state[i].title = action.payload.title;
					break;
				}
			}
			return state;
		case actions.nameCard:
			for(var i = 0; i < state.length; ++i)
			{
				if(state[i].id == action.payload.listId)
				{
					for(var j = 0; j < state[i].cards.length; ++j)
					{
						if(state[i].cards[j].id == action.payload.listId)
						{
							state[i].cards[j].name = action.payload.name;
							break;
						}
					}
					break;
				}
			}
			return state;
		default:
			return state;
	}
}

export default listsReducer;