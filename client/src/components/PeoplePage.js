import React, { Component } from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'

const Page = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  height: 100%;
  width: 100%;
`
const TableWrap = styled.div`
  height: 37.5rem;
  overflow-y: auto;
`

const TableRow = styled.tr`
  padding: 1rem;

  &:nth-child(even) {
    background-color: #f0f8ff;
  }
`
const TableHeadRow = styled(TableRow)`
  background-color: #4a90e2;
  font-size: 1.5rem;
  height: 3rem;
  color: white;
  font-weight: bold;
  text-align: center;
`

export class PeoplePage extends Component {
  componentWillMount () {
    this.props.fetchPeople()
  }

  renderLoading () {
    return (
      <Page>
        <img src='/loading.gif' alt='please wait data is loading' />
      </Page>
    )
  }

  renderPeopleRows (people) {
    return people.map((person, idx) => (
      <TableRow key={idx}>
        <td>{person.displayName}</td>
        <td>{person.emailAddress}</td>
        <td>{person.title}</td>
      </TableRow>
    ))
  }

  render () {
    const { people } = this.props

    if (!people.length) return this.renderLoading()

    return (
      <Page>
        <TableWrap>
          <table>
            <thead>
              <TableHeadRow>
                <td>Name</td>
                <td>Email</td>
                <td>Title</td>
              </TableHeadRow>
            </thead>
            <tbody>{this.renderPeopleRows(people)}</tbody>
          </table>
        </TableWrap>
      </Page>
    )
  }
}

PeoplePage.propTypes = {
  people: PropTypes.array,
  fetchPeople: PropTypes.func
}

PeoplePage.defaultProps = {
  people: [],
  fetchPeople: Function.prototype
}

export default PeoplePage
