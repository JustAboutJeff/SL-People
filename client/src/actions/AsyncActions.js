import * as actions from './Actions'
import PeopleService from '../services/People'

export const creds = { credentials: 'same-origin' }

export function fetchMe () {
  return dispatch => {
    return fetch('/api/me.json', creds)
      .then(response => response.json())
      .then(me => dispatch(actions.receiveMe(me)))
  }
}

export function fetchPeople () {
  return dispatch => {
    return fetch('/api/people.json', creds)
      .then(response => response.json())
      .then(json => {
        dispatch(actions.receivePeople(json.people))
        return json.people
      })
      .then(people => new PeopleService(people).analysis())
      .then(analysis => dispatch(actions.receivePeopleAnalysis(analysis)))
  }
}
