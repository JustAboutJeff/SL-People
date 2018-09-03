import * as actions from './Actions'
import PeopleService from '../services/PeopleService'

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
      .then(people => {
        const service = new PeopleService(people)
        // NOTE: we only wrap with Promise.all here to maintain a working
        // promise chain for any future use cases. Each analysis is performed
        // in parallel and then dispatched asynchronously to keep things fast.
        return Promise.all([
          service
            .characterAnalysis()
            .then(result =>
              dispatch(actions.receivePeopleCharacterAnalysis(result))
            ),
          service
            .duplicateAnalysis()
            .then(result =>
              dispatch(actions.receivePeopleDuplicateAnalysis(result))
            )
        ])
      })
  }
}
