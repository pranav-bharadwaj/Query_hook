import React,{useState,useEffect} from 'react';
import {BrowserRouter as Router,Switch,Route} from 'react-router-dom'
import Home from './components/Home'
import Login from './components/Login'
import Forgot from './components/Forgot'
import './App.css';
import Signup from './components/Signup';
import ResetPass from './components/ResetPass';
import Authapi from './components/ContextApi';
import Cookies from 'js-cookie'
import ViewPost from './components/ViewPost'
import 'fontsource-roboto';
import Admin from './components/Admin'
import Questions from './components/Questions';
import AdminLogin from './components/AdminLogin'
function App() {
  const [Auth,setAuth] = useState(false)
  const readCookie = ()=>{
    const id = Cookies.get('id')
    if(id){
      setAuth(true)
    }
    
  }
  useEffect(()=>{
    readCookie()
    
  },[])
  return (

      <div className="App">
          <Router>
    <Switch>
    <Authapi.Provider value = {{Auth,setAuth}} >
      <Route path = '/' exact component= {Home} />
      <Route path = '/login'  component={Login} />
      <Route path = '/signup' component = {Signup}></Route>
      <Route path = '/forgot' component= {Forgot}></Route>
      <Route path = '/api/account/password/forgotPass/:id' component = {ResetPass}></Route>
      <Route path = '/viewPost' component = {ViewPost} ></Route>
      <Route path = '/questions' component = {Questions} ></Route>
      <Route path = "/admin" component= {Admin}></Route>
      <Route path = "/adminLogin" component= {AdminLogin}></Route>
      </Authapi.Provider>
    </Switch>
    </Router>
    </div>
   
    
  );
}

export default App;
