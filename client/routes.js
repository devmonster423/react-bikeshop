import React, {Component} from 'react'
import {connect} from 'react-redux'
import {withRouter, Route, Switch} from 'react-router-dom'
import PropTypes from 'prop-types'
import {
  Login,
  Signup,
  UserHome,
  AllBikes,
  SingleBike,
  CartView,
  CheckoutForm,
  ReviewForm,
  AddBike,
  UpdateBike,
  SearchFilter,
  OrderHistory,
  AdminPanel,
  AddCategory
} from './components'

import {me} from './store'

/**
 * COMPONENT
 */
class Routes extends Component {
  componentDidMount() {
    this.props.loadInitialData()
  }

  render() {
    const {isLoggedIn} = this.props

    return (
      <Switch>
        {/* Routes placed here are available to all visitors */}
        <Route path="/login" component={Login} />
        <Route path="/signup" component={Signup} />
        <Route exact path="/bikes" component={AllBikes} />
        <Route exact path="/bikes/:id" component={SingleBike} />
        <Route path="/cart" component={CartView} />
        <Route path="/checkout/:id" component={CheckoutForm} />
        {isLoggedIn && (
          <Switch>
            {/* Routes placed here are only available after logging in */}
            <Route path="/bikes" component={UserHome} />
            {/* This is a temporary route to test the search filter */}
            <Route exact path="/searchfilter" component={SearchFilter} />
            <Route path="/bikes/:id/reviewform" component={ReviewForm} />
            <Route path="/admin/bikes/update/:id" component={UpdateBike} />
            <Route exact path="/admin/bikes/add" component={AddBike} />
            <Route path="/myorders/order-history" component={OrderHistory} />
            {/*just to make sure components are there need to make sure only admin can see*/}
            <Route exact path="/admin" component={AdminPanel} />
            <Route exact path="/admin/addcategory" component={AddCategory} />
          </Switch>
        )}
        {/* Displays our Login component as a fallback */}
        <Route component={Login} />
      </Switch>
    )
  }
}

/**
 * CONTAINER
 */
const mapState = state => {
  return {
    // Being 'logged in' for our purposes will be defined has having a state.user that has a truthy id.
    // Otherwise, state.user will be an empty object, and state.user.id will be falsey
    isLoggedIn: !!state.user.id
  }
}

const mapDispatch = dispatch => {
  return {
    loadInitialData() {
      dispatch(me())
    }
  }
}

// The `withRouter` wrapper makes sure that updates are not blocked
// when the url changes
export default withRouter(connect(mapState, mapDispatch)(Routes))

/**
 * PROP TYPES
 */
Routes.propTypes = {
  loadInitialData: PropTypes.func.isRequired,
  isLoggedIn: PropTypes.bool.isRequired
}
