import { merge } from '../utils'
import { RECEIVE_PEOPLE, RECEIVE_PEOPLE_ANALYSIS } from '../actions/Constants'

export function people (state = initial(), action) {
  switch (action.type) {
    case RECEIVE_PEOPLE:
      return merge(state, { records: action.people })
    case RECEIVE_PEOPLE_ANALYSIS:
      return merge(state, { analysis: action.analysis })
    default:
      return state
  }
}

function initial () {
  return {
    records: [],
    analysis: []
  }
}
