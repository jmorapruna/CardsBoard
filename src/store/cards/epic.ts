import { Epic, ofType } from 'redux-observable';
import { map, tap, ignoreElements } from 'rxjs/operators'
import { RootState } from '..'
import { ICard } from '../../models/card.model';
import { loadCardsSuccess } from './actions'
import { ADD_CARD, CardsActionTypes, DELETE_CARD_BY_ID, EDIT_CARD, LOAD_CARDS } from './types'

const loadCardsEpic: Epic<
  CardsActionTypes,
  CardsActionTypes,
  RootState
> = (action$) =>
    action$.pipe(
      ofType(LOAD_CARDS),
      map(() => {

        let cards: ICard[] = []

        try {
          const json = localStorage.getItem('cards') || '[]'
          cards = JSON.parse(json)
        }
        catch {
          localStorage.removeItem('cards')
        }

        return loadCardsSuccess(cards)
      }),
    )

const saveCardsOnModification: Epic<
  CardsActionTypes,
  CardsActionTypes,
  RootState
> = (action$, state$) =>
    action$.pipe(
      ofType(ADD_CARD, EDIT_CARD, DELETE_CARD_BY_ID),
      tap(() => {

        try {
          const json = JSON.stringify(state$.value.cards)
          localStorage.setItem('cards', json)
        }
        catch {
        }

      }),
      ignoreElements()
    )

const epics = [
  loadCardsEpic,
  saveCardsOnModification
]

export default epics