import React, {Component} from 'react'
import PropTypes from 'prop-types'
import {withStyles} from '@material-ui/core/styles'
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  TableFooter,
  Paper,
  Typography,
  Button,
  IconButton
} from '@material-ui/core'
import {connect} from 'react-redux'
import {fetchBikes,incrementCart} from '../store'
import {Link} from 'react-router-dom'
import {Add, Remove} from '@material-ui/icons/'

const styles = theme => ({
  root: {
    width: '100%',
    marginTop: theme.spacing.unit * 3,
    overflowX: 'auto'
  },
  table: {
    minWidth: 700
  },
  picCell: {
    width:100,
  },
  flexContainer: {
    flexDirection: 'row'
  },
  subtotal: {
    display: 'flex'
  },

})

class CartView extends Component {
  constructor() {
    super()
    this.handleClickIncrementCart = this.handleClickIncrementCart.bind(this)
    this.handleClickDecrementCart = this.handleClickDecrementCart.bind(this)

    this.mounted=false
  }

  componentDidMount() {

  }

  handleClickIncrementCart(bikeId) {
    cartId=this.props.cart.cartId
    this.props.incrementCart(cartId,bikeId)
  }

  handleClickDecrementCart(bikeId) {
    cartId=this.props.cart.cartId
    this.props.decrementCart(cartId,bikeId)
  }

  render() {
    if (! this.props.cart.cartId) { return (<div>no cart available</div>)}

    if (this.props.cart.cartId ===0) {return (<div>cart id is 0 -- error</div>)}

    const {classes,cart} = this.props

    return (
      <Paper className={classes.root}>
        <Table className={classes.table}>
          <TableHead>
            <TableRow>
              <TableCell>Product</TableCell>
              <TableCell/>
              <TableCell>Quantity</TableCell>
              <TableCell>Price</TableCell>


            </TableRow>
          </TableHead>
          <TableBody>
            {cart.cartEntries.map(cartEntry => {
              return (
                <TableRow key={cartEntry.bikeId}>
                  <TableCell component="th" scope="row" className={classes.picCell}>
                    {/* <img src="/bicycle-1296859_1280.png" /> */}
                    <img src={cartEntry.image} />
                  </TableCell>
                  <TableCell >
                 <Link to={`/bikes/${cartEntry.bikeId}`} >{cartEntry.name}</Link>
                 <Button>Delete</Button>
                  </TableCell>
                  <TableCell>{cartEntry.quantity}
                  <IconButton
                  color="inherit"
                  className={classes.button}

                >
                  <Add/>
                </IconButton>
                <IconButton
                  color="inherit"
                  className={classes.button}

                >
                  <Remove />
                </IconButton>
                  </TableCell>
                  <TableCell>${cartEntry.price}</TableCell>
                </TableRow>
              )
            })}
          </TableBody>
          <TableFooter>
          <TableCell/>
          <TableCell/>
          <TableCell/>
          <TableCell>
            <Typography>Subtotal ${cart.subtotal}</Typography>
            <Button>Checkout</Button>
          </TableCell>
        </TableFooter>
        </Table>
        {!this.state && (
          <Typography variant="display1" align="center">
            {cart.quantity} items in your cart
          </Typography>
        )}
      </Paper>
    )
  }
}

CartView.propTypes = {
  classes: PropTypes.object.isRequired
}

const mapDispatchToProps = dispatch => {
  return {
    incrementCart: (cartId,bikeId) => {
      dispatch(incrementCart(cartId,bikeId))},
    decrementCart: (cartId,bikeId) => {
      diapatch(derementCart(cartId,bikeId))}
    }
  }

const mapStateToProps = state => {
  return {
    cart: state.cart
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(withStyles(styles)(CartView))
