export default class PeopleService {
  constructor (people = []) {
    this.people = people
  }

  analysis () {
    // NOTE: this work happens async
    return new Promise((resolve, reject) => {
      // NOTE: build a dictionary object of char to count mappings
      const dictionary = this.people.reduce((dictionary, person) => {
        person.emailAddress
          .split('')
          .forEach(char => (dictionary[char] = (dictionary[char] || 0) + 1))
        return dictionary
      }, Object.create(null))

      // NOTE: sort chars by count in descending order
      const result = Object.entries(dictionary).sort(
        ([_, currCount], [__, nextCount]) => {
          if (currCount > nextCount) return -1
          if (currCount < nextCount) return 1
          return 0
        }
      )

      resolve(result)
    })
  }
}
