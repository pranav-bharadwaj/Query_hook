import React,{useContext} from 'react'
import '../componentcss/Home.css'
import Navbar from '../components/Navbar'
import CoverImg from '../components/Cover'
import HomeDataContainer from '../components/HomeDataContainer'
import Sidenav from './Sidenav'
import Authapi from './ContextApi'
function Home() {

    return (
        <div>
        <Navbar /> 
         <CoverImg />
        <HomeDataContainer /> 
        </div>
    )
}

export default Home
