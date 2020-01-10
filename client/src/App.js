import React from 'react'
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'
import PrivateRoute from './components/routing/PrivateRoute'

// Layouts
import Navbar from './components/layout/Navbar'

// Pages
import Home from './components/page/Home'
import Profile from './components/page/Profile'
import Signup from './components/auth/Signup'
import Login from './components/auth/Login'
import Items from './components/items/Items'

// States
import AuthState from './context/auth/AuthState'
import ItemState from './context/item/ItemState'

// Utilities
import setAuthToken from './utils/setAuthToken'

if (localStorage.token) {
  setAuthToken(localStorage.token)
}

const App = () => {
  return (
    <AuthState>
      <ItemState>
        <Router>
          <Navbar />
          <hr />
          <Switch>
            <Route exact path='/' component={Home} />
            <Route exact path='/login' component={Login} />
            <Route exact path='/signup' component={Signup} />
            <PrivateRoute exact path='/profile' component={Profile} />
            <PrivateRoute exact path='/items' component={Items} />
            <Route>
              404
            </Route>
          </Switch>
        </Router>
      </ItemState>
    </AuthState>
  )
}

export default App
