import {Redirect, Route} from 'react-router-dom'
import Cooking from 'js-cookie'

const ProtectedRoute = props => {
  const jwtToken = Cooking.get('jwt_token')
  if (jwtToken === undefined) {
    return <Redirect to="/login" />
  }
  return <Route {...props} />
}

export default ProtectedRoute
