import { connect } from 'react-redux'
import { changeFilter } from '../reducers/filterReducer'

const Filter = (props) => {
  const onFilterChange = (e) => {
    props.changeFilter(e.target.value)
  }

  return ( 
    <div>
      filter <input onChange={onFilterChange}/>
    </div>
  )
}

const mapDispatchToProps = {
  changeFilter,
}

const ConnectedFilter = connect(null, mapDispatchToProps)(Filter)
export default ConnectedFilter