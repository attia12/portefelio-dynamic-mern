import React from 'react'
import Header from '../../components/Header'
import Intro from './Intro'
import About from './About'
import Projects from './Projects'
import Experiences from './Experiences'

import Contact from './Contact'
import Footer from './Footer'
import LeftSider from './LeftSider'
import { useSelector } from 'react-redux'

function Home() {
    const {portfolioData}=useSelector((state)=>state.root);
  
    return (
        <div >
         <Header/>
               {
                portfolioData && (    <div className='bg bg-primary px-40 '>
                <Intro/>
                <About/>
                <Experiences/>
                <Projects/>
             
                <Contact/>
                <Footer/>
                <LeftSider/>
                </div>)
               }
         

        </div>
        
    )
}

export default Home
