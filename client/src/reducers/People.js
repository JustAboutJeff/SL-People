import { merge } from '../utils'
import {
  RECEIVE_PEOPLE,
  RECEIVE_PEOPLE_CHARACTER_ANALYSIS,
  RECEIVE_PEOPLE_DUPLICATE_ANALYSIS
} from '../actions/Constants'

export function people (state = initial(), action) {
  switch (action.type) {
    case RECEIVE_PEOPLE:
      return merge(state, { records: action.people })
    case RECEIVE_PEOPLE_CHARACTER_ANALYSIS:
      return merge(state, { characterAnalysis: action.characterAnalysis })
    case RECEIVE_PEOPLE_DUPLICATE_ANALYSIS:
      return merge(state, { duplicateAnalysis: action.duplicateAnalysis })
    default:
      return state
  }
}

function initial () {
  return {
    records: [],
    characterAnalysis: [],
    duplicateAnalysis: []
  }
}
