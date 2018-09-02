import PeopleService from '../PeopleService'

describe('PeopleService', () => {
  let instance
  beforeEach(() => {
    instance = new PeopleService()
  })

  it('returns a valid instance', () => {
    expect(instance).toBeInstanceOf(PeopleService)
  })

  it('characterAnalysis() returns a promise', () => {
    expect(instance.characterAnalysis()).toBeInstanceOf(Promise)
  })

  it('characterAnalysis() resolves expected character analysis', () => {
    instance.people = [
      {
        id: 101694867,
        displayName: 'Marisa Casper',
        emailAddress: 'isnaoj_nathz@ihooberbrunner.net',
        title: 'Direct Security Representative'
      },
      {
        id: 101694794,
        displayName: 'Griffin Hand',
        emailAddress: 'mamixe@lindgren.info',
        title: 'International Usability Agent'
      }
    ]

    expect(instance.characterAnalysis()).resolves.toEqual([
      ['n', 8],
      ['i', 5],
      ['e', 5],
      ['o', 4],
      ['r', 4],
      ['a', 3],
      ['.', 2],
      ['t', 2],
      ['h', 2],
      ['b', 2],
      ['@', 2],
      ['m', 2],
      ['s', 1],
      ['z', 1],
      ['u', 1],
      ['_', 1],
      ['j', 1],
      ['x', 1],
      ['l', 1],
      ['d', 1],
      ['g', 1],
      ['f', 1]
    ])
  })
})
