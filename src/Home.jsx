import React from 'react'
import { ArrowDown, ArrowRight, ArrowUpRight, HeartHandshake } from 'lucide-react'
import { Link } from 'react-router-dom'
import UpperHeader from './Components/UpperHeader.jsx'
import Header from './Components/Header.jsx'
import News from './Components/News.jsx'
import About from './Components/About.jsx'
import Action from './Components/Action.jsx'
import Event from './Components/Event.jsx'
import Comments from './Components/Comments.jsx'
import Partners from './Components/Partners.jsx'
import Contact from './Components/Contact.jsx'
import Footer from './Components/Footer.jsx'
import Arc from './Components/Arc.jsx'

function Hero() {
  return (
    <section className="relative isolate overflow-hidden bg-[#fbf7f8] py-12 sm:py-16 lg:min-h-[620px] lg:py-16">
      <div className="pointer-events-none absolute -left-40 top-20 -z-10 h-80 w-80 rounded-full border border-[#f0dce6] sm:h-[480px] sm:w-[480px]" />
      <div className="pointer-events-none absolute right-0 top-0 -z-10 h-full w-[46%] bg-gradient-to-br from-[#f9edf2] to-[#f4eaf4] [clip-path:polygon(23%_0,100%_0,100%_100%,0_100%)] max-lg:hidden" />
      <div className="mx-auto grid w-[88%] max-w-[1240px] items-center gap-9 lg:grid-cols-[.94fr_1.06fr] lg:gap-[5.5%]">
        <div className="relative z-10 max-w-[550px]">
          <span className="inline-flex items-center gap-2.5 text-[10px] font-bold uppercase tracking-[.17em] text-[#D6336C]">
            <i className="h-px w-6 bg-[#D6336C]" /> L’humain au cœur de chaque action
          </span>
          <h1 className="mt-6 font-fraunces text-[clamp(2.9rem,6vw,5.1rem)] font-extrabold leading-[1.04] tracking-[-.055em] text-[#28232c]">
            Ensemble,<br />faisons grandir<br /><em className="not-italic text-[#D6336C]">la solidarité.</em>
          </h1>
          <p className="mt-5 max-w-[450px] font-jakarta text-sm leading-[1.95] text-[#77717c]">
            Chaque geste compte. Depuis 2022, nous rassemblons une jeunesse engagée pour soutenir les personnes vulnérables et faire vivre l’entraide au Burkina Faso.
          </p>
          <div className="mt-7 flex flex-wrap items-center gap-4 sm:gap-6">
            <a href="#action" className="inline-flex min-h-12 items-center gap-3 bg-[#D6336C] px-5 text-xs font-bold text-white shadow-lg shadow-[#D6336C]/15 transition hover:-translate-y-1 hover:bg-[#b9275c]">
              Découvrir nos actions <ArrowUpRight size={17} />
            </a>
            <Link to="/join" className="inline-flex items-center gap-3 font-jakarta text-xs font-bold text-[#39323d]">
              Nous rejoindre <span className="grid h-8 w-8 place-items-center rounded-full border border-[#d9cbd2]"><ArrowRight size={16}/></span>
            </Link>
          </div>
          <div className="mt-8 flex items-center gap-3.5 font-jakarta text-[10px] leading-relaxed text-[#8b818a] sm:mt-12">
            <div className="flex pl-1">
              <img src="/coms10.jpeg" alt="" className="-ml-1 h-8 w-8 rounded-full border-2 border-[#fbf7f8] object-cover" />
              <img src="/coms11.jpeg" alt="" className="-ml-2 h-8 w-8 rounded-full border-2 border-[#fbf7f8] object-cover" />
              <img src="/coms12.jpeg" alt="" className="-ml-2 h-8 w-8 rounded-full border-2 border-[#fbf7f8] object-cover" />
            </div>
            <span><b className="text-[#3b333c]">Une jeunesse qui agit.</b><br/>Une communauté qui rassemble.</span>
          </div>
        </div>
        <div className="relative mx-[2%] h-[330px] sm:h-[430px] lg:mx-0 lg:h-[500px]">
          <div className="absolute right-[4%] top-[3%] h-[82%] w-[67%] overflow-hidden rounded-t-[150px] rounded-b-sm shadow-2xl shadow-[#483040]/10">
            <img src="/don1.jpg" alt="Une action de solidarité de l’association" fetchPriority="high" className="h-full w-full object-cover" />
            <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/55 to-transparent p-5 pt-16 font-jakarta text-[10px] uppercase tracking-widest text-white">L’engagement en action</div>
          </div>
          <div className="absolute bottom-0 left-0 h-[43%] w-[43%] overflow-hidden border-[6px] border-[#fbf7f8] shadow-xl">
            <img src="/don2.jpg" alt="Des bénévoles engagés auprès des communautés" className="h-full w-full object-cover" />
          </div>
          <div className="absolute left-0 top-0 h-[28%] w-[28%] overflow-hidden border-[5px] border-[#fbf7f8] shadow-lg">
            <img src="/coms6.jpeg" alt="Un moment de partage et de solidarité" className="h-full w-full object-cover" />
          </div>
          <div className="absolute bottom-[13%] right-0 flex h-[88px] w-[88px] flex-col items-center justify-center gap-1.5 rounded-full bg-white text-center text-[9px] leading-tight text-[#D6336C] shadow-xl shadow-[#382333]/15 sm:h-[108px] sm:w-[108px] sm:text-[10px]">
            <HeartHandshake size={21}/>
            <span>La force du<br/><b className="text-[#302832]">collectif</b></span>
          </div>
          <span className="absolute -bottom-5 right-[4%] font-jakarta text-[8px] tracking-[.15em] text-[#9d8c97] sm:text-[9px]">01 <i className="mx-2 inline-block h-px w-9 bg-[#c5aebc] align-middle"/> SOLIDARITY IN ACTION</span>
        </div>
      </div>
      <a href="#about" className="absolute bottom-5 left-[6%] hidden items-center gap-3 font-jakarta text-[9px] uppercase tracking-widest text-[#968994] lg:flex">Faire défiler <ArrowDown size={15}/></a>
      <span className="absolute bottom-5 right-[6%] hidden font-jakarta text-xs font-bold tracking-widest text-[#cbbac4] lg:block">SG<span className="text-[#D6336C]">.</span>2022</span>
    </section>
  )
}

function Home() {
  return (
    <div>
      <UpperHeader />
      <Header/>
      <Hero />
      <News />
      <About />
      <Action />
      <Event />
      <Comments/>
      <Partners/>
      <Contact/>
      <Arc/>
      <Footer/>
    </div>
  )
}

export default Home
