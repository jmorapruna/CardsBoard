import { ADD_CARD, CardsActionTypes, CardsState, DELETE_CARD_BY_ID, EDIT_CARD, LOAD_CARDS_SUCCESS } from './types'

const initialState: CardsState = []

function reducer(
  state = initialState,
  action: CardsActionTypes
): CardsState {
  switch (action.type) {
    case LOAD_CARDS_SUCCESS:
      return [...action.payload]
    case ADD_CARD:
      return [...state, { ...action.payload, id: state.length }]
    case EDIT_CARD: {
      const newState = state.map(card =>
        card.id === action.payload.id
          ? { ...action.payload }
          : card
      )

      return newState
    }
    case DELETE_CARD_BY_ID:
      return state.filter(c => c.id !== action.payload)
    default:
      return state
  }
}

export default reducer