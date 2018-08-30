import * as actions from './Constants'

export function receiveMe(me) {
  return {
    type: actions.RECEIVE_ME,
    me
  }
}

export function receivePeople(people) {
  return {
    type: actions.RECEIVE_PEOPLE,
    people
  }
}

export function receivePeopleAnalysis (analysis) {
  return {
    type: actions.RECEIVE_PEOPLE_ANALYSIS,
    analysis
  }
}
