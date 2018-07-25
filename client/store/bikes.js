import axios from 'axios'
import history from '../history'

/**
 * ACTION TYPES
 */
const GET_BIKES = 'GET_BIKES'
// const GET_SINGLE_BIKE = 'GET_SINGLE_BIKE'
// const REMOVE_USER = 'REMOVE_USER'

/**
 * INITIAL STATE
 */
const initialState = {
    bikes: []
}

/**
 * ACTION CREATORS
 */
const getBikes = bikes => ({type: GET_BIKES, bikes})


/**
 * THUNK CREATORS
 */

 export const fetchBikes = () => async dispatch => {
     let res
     try {
         res = await axios.get('/api/bikes')
     } catch (err) {
         //pending error handling
         return dispatch(getBikes({error: err.message}))
     }

     try {
         dispatch(getBikes(res.data))
         history.push('/bikes')
     } catch (err) {
         console.error(err)
     }
 }

// export const auth = (email, password, method) => async dispatch => {
//   let res
//   try {
//     res = await axios.post(`/auth/${method}`, {email, password})
//   } catch (authError) {
//     return dispatch(getUser({error: authError}))
//   }

//   try {
//     dispatch(getUser(res.data))
//     history.push('/home')
//   } catch (dispatchOrHistoryErr) {
//     console.error(dispatchOrHistoryErr)
//   }
// }



/**
 * REDUCER
 */
export default function(state = initialState, action) {
  switch (action.type) {
    case GET_BIKES:
        return {...state, bikes: action.bikes}
    //   return action.bikes
    // case REMOVE_USER:
    //   return defaultUser
    default:
      return state
  }
}