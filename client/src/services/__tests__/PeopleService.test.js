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

  it('duplicateAnalysis() returns a promise', () => {
    expect(instance.duplicateAnalysis()).toBeInstanceOf(Promise)
  })

  it('duplicateAnalysis() resolves expected duplicate analysis', () => {
    instance.people = [
      {
        id: 101694867,
        displayName: 'Jones Boyle',
        emailAddress: 'jonesboy@bist.co',
        title: 'Network Liason'
      },
      {
        id: 131644724,
        displayName: 'Marge Bonness',
        emailAddress: 'monness@best.co',
        title: 'Director of Data'
      },
      {
        id: 10594595,
        displayName: 'Jose Valueza',
        emailAddress: 'jooes@best.co',
        title: 'Outside Counsel'
      },
      {
        id: 10594595,
        displayName: 'Xaviar Parker',
        emailAddress: 'xa@bist.co',
        title: 'Janitor'
      }
    ]

    expect(instance.duplicateAnalysis()).resolves.toEqual([
      'jonesboy@bist.co jooes@best.co',
      'monness@best.co jooes@best.co'
    ])
  })
})
