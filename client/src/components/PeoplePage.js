import React, { Component } from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'
import { Link } from 'react-router-dom'

const Page = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  height: 100%;
  width: 100%;
`
const TableWrap = styled.div`
  height: 37.5rem;
  overflow-y: auto;
  box-shadow: 0 0 6px 0 rgba(58, 58, 58, 0.24);
`

const Table = styled.table`
  width: 52rem;
  text-align: center;
`

const TableRow = styled.tr`
  padding: 1rem;
  transition: box-shadow 0.25s;

  &:nth-child(even) {
    background-color: #f0f8ff;
  }

  &:hover {
    box-shadow: inset 5px 0 0 0 rgba(0, 105, 224, 1),
      inset -5px 0 0 0 rgba(0, 105, 224, 1);
  }
`
const TableHeadRow = styled(TableRow)`
  font-size: 1.5rem;
  height: 3rem;
  color: white;
  font-weight: bold;
  text-align: center;
`

const TableHeader = styled.th`
  background-color: #4a90e2;
  box-shadow: 0 3px 0 0 rgba(0, 0, 0, 0.1);
  position: sticky;
  top: 0;
`

const StateButton = styled.button`
  align-items: center;
  background-color: #4a90e2;
  border-radius: 0.5rem;
  color: white;
  cursor: pointer;
  display: flex;
  font-size: 1.5rem;
  font-weight: bold;
  justify-content: center;
  min-width: 4rem;
  padding: 0.75rem;
  text-align: center;
`

const HomeButton = styled(Link)`
  align-items: center;
  background: #4a90e2;
  border-radius: 0.5rem;
  color: white;
  display: flex;
  font-size: 1.5rem;
  font-weight: bold;
  justify-content: center;
  min-width: 4rem;
  padding: 0.75rem;
  text-align: center;
`

const ButtonBar = styled.div`
  width: 52rem;
  margin-top: 15px;
  display: flex;
  align-items: center;
  justify-content: space-between;
`

export class PeoplePage extends Component {
  constructor (props) {
    super(props)
    this.state = { showAnalysis: false }
    this.handleClick = this.handleClick.bind(this)
  }

  componentWillMount () {
    this.props.fetchPeople()
  }

  handleClick (e) {
    this.setState(prev => ({ showAnalysis: !prev.showAnalysis }))
  }

  renderLoading () {
    return <img src='/loading.gif' alt='Please wait your people are loading!' />
  }

  renderAnalysisRows (analysis) {
    return analysis.map(([character, count], idx) => (
      <TableRow key={idx}>
        <td>{character}</td>
        <td>{count}</td>
      </TableRow>
    ))
  }

  renderAnalysis (analysis) {
    return [
      <TableWrap key='1'>
        <Table>
          <thead>
            <TableHeadRow>
              <TableHeader>Character</TableHeader>
              <TableHeader>Count</TableHeader>
            </TableHeadRow>
          </thead>
          <tbody>{this.renderAnalysisRows(analysis)}</tbody>
        </Table>
      </TableWrap>,
      <ButtonBar key='2'>
        <HomeButton to={'/'}>Home</HomeButton>
        <StateButton onClick={this.handleClick}>People</StateButton>
      </ButtonBar>
    ]
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

  renderPeople (people) {
    return [
      <TableWrap key='1'>
        <Table>
          <thead>
            <TableHeadRow>
              <TableHeader>Name</TableHeader>
              <TableHeader>Email</TableHeader>
              <TableHeader>Title</TableHeader>
            </TableHeadRow>
          </thead>
          <tbody>{this.renderPeopleRows(people)}</tbody>
        </Table>
      </TableWrap>,
      <ButtonBar key='2'>
        <HomeButton to={'/'}>Home</HomeButton>
        <StateButton onClick={this.handleClick}>Analyze</StateButton>
      </ButtonBar>
    ]
  }

  render () {
    const { props: { analysis, people }, state: { showAnalysis } } = this

    let content = this.renderLoading()

    if (analysis.length && showAnalysis) {
      content = this.renderAnalysis(analysis)
    } else if (people.length) {
      content = this.renderPeople(people)
    }

    return <Page>{content}</Page>
  }
}

PeoplePage.propTypes = {
  analysis: PropTypes.array,
  people: PropTypes.array,
  fetchPeople: PropTypes.func
}

PeoplePage.defaultProps = {
  analysis: [],
  people: [],
  fetchPeople: Function.prototype
}

export default PeoplePage
