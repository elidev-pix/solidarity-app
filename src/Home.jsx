import React from 'react'
import UpperHeader from './Components/UpperHeader.jsx'
import Header from './Components/Header.jsx'
import LowerHeader from './Components/LowerHeader.jsx'
import Hero from './Components/Hero.jsx'
import About from './Components/About.jsx'
import Action from './Components/Action.jsx'
import Event from './Components/Event.jsx'
import Comments from './Components/Comments.jsx'
import Partners from './Components/Partners.jsx'
import Contact from './Components/Contact.jsx'

function Home() {
  return (
    <div>
      <UpperHeader />
      <Header/>
      <LowerHeader/>
      <Hero />
      <About />
      <Action />
      <Event />
      <Comments/> 
      <Partners/>
      <Contact/>
      <div className='pt-48'>Home</div>     
    </div>
  )
}

export default Home

