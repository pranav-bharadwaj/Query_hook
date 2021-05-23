import React from 'react';
import {BrowserRouter as Router,Switch,Route} from 'react-router-dom'
import Home from './components/Home'
import Login from './components/Login'
import Forgot from './components/Forgot'
import './App.css';
import Signup from './components/Signup';
import ResetPass from './components/ResetPass';

function App() {
  return (

      <div className="App">
          <Router>
    <Switch>
      <Route path = '/' exact component= {Home}/>
      <Route path = '/login'  component={Login}/>
      <Route path = '/signup' component = {Signup}></Route>
      <Route path = '/forgot' component= {Forgot}></Route>
      <Route path = '/api/account/password/forgotPass/:id' component = {ResetPass}></Route>
    </Switch>
    </Router>
    </div>
   
    
  );
}

export default App;
