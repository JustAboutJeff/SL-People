import * as actions from './Constants'

export function receiveMe (me) {
  return {
    type: actions.RECEIVE_ME,
    me
  }
}

export function receivePeople (people) {
  return {
    type: actions.RECEIVE_PEOPLE,
    people
  }
}

export function receivePeopleCharacterAnalysis (characterAnalysis) {
  return {
    type: actions.RECEIVE_PEOPLE_CHARACTER_ANALYSIS,
    characterAnalysis
  }
}

export function receivePeopleDuplicateAnalysis (duplicateAnalysis) {
  return {
    type: actions.RECEIVE_PEOPLE_DUPLICATE_ANALYSIS,
    duplicateAnalysis
  }
}
