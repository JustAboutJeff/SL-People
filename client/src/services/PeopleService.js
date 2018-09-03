export default class PeopleService {
  constructor (people = []) {
    this.people = people
  }

  characterAnalysis () {
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
        ([_, currCount], [__, nextCount]) => nextCount - currCount
      )

      resolve(result)
    })
  }

  duplicateAnalysis (tolerance = 5) {
    // NOTE: this work happens async
    return new Promise((resolve, reject) => {
      const result = []
      const visited = {}

      for (let i = 0; i < this.people.length; i++) {
        const emailI = this.people[i].emailAddress
        for (let j = 0; j < this.people.length; j++) {
          const emailJ = this.people[j].emailAddress
          // NOTE: if we're comparing the same value, or a previously
          // visited pair skip it!
          if (i === j || visited[emailI + emailJ]) {
            continue
          }

          // NOTE: compute distance and add to result if within tolerance
          const distance = levenshtein(emailI, emailJ)
          if (distance <= tolerance) result.push(`${emailI} ${emailJ}`)

          // NOTE: mark our pair as visited
          visited[emailJ + emailI] = true
        }
      }

      resolve(result)
    })
  }
}

function levenshtein (str1, str2) {
  // NOTE: the strings match, return 0!
  if (str1 === str2) return 0

  // NOTE: if either string is empty, return the length of the other!
  if (!str1.length) return str2.length
  if (!str2.length) return str1.length

  const matrix = []

  // NOTE: increment along the first column of each row
  for (let i = 0; i <= str2.length; i++) {
    matrix[i] = [i]
  }

  // NOTE: increment each column in the first row
  for (let j = 0; j <= str1.length; j++) {
    matrix[0][j] = j
  }

  // NOTE: fill in the rest of the matrix
  for (let i = 1; i <= str2.length; i++) {
    for (let j = 1; j <= str1.length; j++) {
      if (str2.charAt(i - 1) === str1.charAt(j - 1)) {
        matrix[i][j] = matrix[i - 1][j - 1]
      } else {
        matrix[i][j] = Math.min(
          matrix[i - 1][j - 1] + 1, // substitution
          matrix[i][j - 1] + 1, // insertion
          matrix[i - 1][j] + 1 // deletion
        )
      }
    }
  }

  return matrix[str2.length][str1.length]
}
