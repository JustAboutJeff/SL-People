import React, { isValidElement } from 'react'
import ShallowRenderer from 'react-test-renderer/shallow'
import { LandingPage } from '../LandingPage'

describe('LandingPage', () => {
  let element, entry, renderer
  beforeEach(() => {
    element = <LandingPage />
    renderer = new ShallowRenderer()
  })

  it('returns a valid element', () => {
    expect(isValidElement(element)).toBe(true)
  })

  it('renders', () => {
    expect(renderer.render(element)).toMatchSnapshot()
  })
})
