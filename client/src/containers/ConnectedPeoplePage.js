import { PeoplePage } from '../components/PeoplePage'
import { connect } from 'react-redux'
import { fetchPeople } from '../actions/AsyncActions'

const mapStateToProps = ({ people }) => ({ people: people.records, characterAnalysis: people.characterAnalysis })
const mapDispatchToProps = { fetchPeople }

export const ConnectedPeoplePage = connect(mapStateToProps, mapDispatchToProps)(
  PeoplePage
)

export default ConnectedPeoplePage
