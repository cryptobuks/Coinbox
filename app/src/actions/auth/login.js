
import { LOGIN as constants } from '../../config/constants'
import { setAuthToken } from './token'
import API from '../../api'

const request = (credentials) => {
  return {
    type: constants.REQUEST,
    isLoading: true
  }
}

const receive = (user) => {
  return {
    type: constants.SUCCESS,
    isLoading: false,
    user
  }
}

const error = (message) => {
  return {
    type: constants.ERROR,
    isLoading: false,
    message
  }
}

const login = (credentials) => {

  return (dispatch) => {
    dispatch(request(credentials))

    return API.login(credentials)
      .then((response) => {
        if(response.status !== 200) {
          dispatch(error(response.data.message))
          return Promise.reject(response)
        } else {
          dispatch(setAuthToken(response.data.token))
          dispatch(receive(response.data.user))
        }
      })
  }
}

export default login
