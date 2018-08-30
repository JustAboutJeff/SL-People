import React, { isValidElement } from 'react'
import ShallowRenderer from 'react-test-renderer/shallow'
import { PeoplePage } from '../PeoplePage'

describe('PeoplePage', () => {
  let element,
    entry,
    renderer,
    props = {}
  beforeEach(() => {
    element = <PeoplePage {...props} />
    renderer = new ShallowRenderer()
  })

  it('returns a valid element', () => {
    expect(isValidElement(element)).toBe(true)
  })

  it('renders', () => {
    expect(renderer.render(element)).toMatchSnapshot()
  })

  describe('with people data', () => {
    props = {
      people: [
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
    }

    it('renders', () => {
      expect(renderer.render(element)).toMatchSnapshot()
    })
  })
})
