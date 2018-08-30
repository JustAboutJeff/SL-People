import React from 'react'
import styled from 'styled-components'
import { Link } from 'react-router-dom'

import { ConnectedNavBar } from '../containers/ConnectedNavBar'
import { Intro } from './Intro'

const Page = styled.div`
  display: grid;
  grid-template 46px 1fr / 1fr;
  height: 100%;
  width: 100%;
`

const FlexBox = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`

const PeopleLink = styled(Link)`
  align-items: center;
  background: #4a90e2;
  border-radius: 7px;
  width: 827px;
  color: white;
  display: flex;
  font-size: 25px;
  font-weight: bold;
  justify-content: center;
  margin-top: 15px;
  padding: 5px;
  min-width: 152px;
  overflow: hidden;
`

export const LandingPage = () => (
  <Page>
    <ConnectedNavBar />
    <FlexBox>
      <Intro />
      <PeopleLink to='/people'>People Page</PeopleLink>
    </FlexBox>
  </Page>
)
