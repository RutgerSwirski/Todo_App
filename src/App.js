import { BrowserRouter, Route } from 'react-router-dom'
import React from 'react'
import Landing from './pages/Landing'
import Todo from './pages/Todo'
import { AuthProvider } from './Auth'
import PrivateRoute from './PrivateRoute'

function App() {
  return  (
    <AuthProvider>
      <BrowserRouter>
      <div>
        <Route exact path="/" component={Landing} />
        <PrivateRoute exact path="/todo" component={Todo} />
      </div>
      </BrowserRouter>
    </AuthProvider>
  ) 
}

export default App
