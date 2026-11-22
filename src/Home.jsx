import { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import { ArrowDown, ArrowRight, ArrowUpRight, CalendarDays, Check, Heart, HeartHandshake, Menu, MapPin, Users, HandHeart, Sparkles, Instagram, Facebook, Mail, Phone, X } from "lucide-react";
import { eventApi, newsApi } from "./services/api.js";
import "./Home.css";

const dateLabel = (value) => { if (!value) return ""; const d = new Date(value); return Number.isNaN(d.getTime()) ? "" : d.toLocaleDateString("fr-FR", { day:"numeric", month:"long", year:"numeric" }); };
const imageOf = (item) => item?.imageUrl || item?.image || "";
const statValue = (data, keys) => { for (const key of keys) if (typeof data?.[key] === "number" && Number.isFinite(data[key])) return data[key]; return null; };
const statLabel = (value) => value === null ? "—" : value.toLocaleString("fr-FR");

function Reveal({ children, className = "", delay = 0 }) {
  const ref = useRef(null);
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    const node = ref.current;
    if (!node) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) { setVisible(true); return; }
    const observer = new IntersectionObserver(([entry]) => { if (entry.isIntersecting) { setVisible(true); observer.disconnect(); } }, { threshold: .12 });
    observer.observe(node);
    return () => observer.disconnect();
  }, []);
  return <div ref={ref} className={`sg-reveal ${visible ? "is-visible" : ""} ${className}`} style={{ transitionDelay:`${delay}ms` }}>{children}</div>;
}

function Header() {
  const [open, setOpen] = useState(false);
  const close = () => setOpen(false);
  return <header className="sg-header"><div className="sg-nav-wrap">
    <Link to="/" className="sg-brand" aria-label="Solidarity Group, accueil" onClick={close}><img src="/logo_solidarity-removebg-preview.png" alt=""/><span>SOLIDARITY <b>GROUP</b></span></Link>
    <button className="sg-menu-toggle" type="button" aria-label={open ? "Fermer le menu" : "Ouvrir le menu"} aria-expanded={open} onClick={() => setOpen(!open)}>{open ? <X size={23}/> : <Menu size={23}/>}</button>
    <nav className={`sg-nav ${open ? "is-open" : ""}`} aria-label="Navigation principale"><a href="#accueil" onClick={close}>Accueil</a><a href="#actions" onClick={close}>Nos actions</a><Link to="/actualites" onClick={close}>Actualités</Link><a href="#apropos" onClick={close}>À propos</a><Link to="/join" className="sg-nav-join" onClick={close}>Nous rejoindre <ArrowUpRight size={15}/></Link></nav>
    <a href="mailto:solidaritygroupbf@yahoo.com?subject=Soutenir%20Solidarity%20Group" className="sg-nav-donate">Faire un don <Heart size={15}/></a>
  </div></header>;
}
function Heading({ eyebrow, title, copy }) { return <div className="sg-section-heading"><span className="sg-eyebrow"><i/>{eyebrow}</span><h2>{title}</h2>{copy && <p>{copy}</p>}</div>; }

export default function Home() {
  const [events,setEvents] = useState([]), [news,setNews] = useState([]);\n  const stats = null;
  const [loadingEvents,setLoadingEvents] = useState(true), [loadingNews,setLoadingNews] = useState(true);
  useEffect(() => {
    let active = true;
    eventApi.getAll().then(({data}) => { if(active) setEvents((Array.isArray(data)?data:[]).filter(e => !["cancelled","completed"].includes(String(e.status||"").toLowerCase())).slice(0,3)); }).catch(e => console.error("Chargement des actions impossible :",e)).finally(() => {if(active)setLoadingEvents(false);});
    newsApi.getAll().then(({data}) => {if(active)setNews((Array.isArray(data)?data:[]).filter(n=>n.isPublished!==false).slice(0,3));}).catch(e=>console.error("Chargement des actualités impossible :",e)).finally(()=>{if(active)setLoadingNews(false);});
    return ()=>{active=false;};
  },[]);
  const impact = [
    {label:"Membres engagés",value:statValue(stats,["memberCount","totalMembers"]),icon:Users},
    {label:"Actions réalisées",value:statValue(stats,["totalEvents","eventCount","totalActions"]),icon:HandHeart},
    {label:"Participations validées",value:statValue(stats,["totalParticipations"]),icon:HeartHandshake},
    {label:"Cotisations collectées",value:statValue(stats,["totalCollected"]),icon:Heart,suffix:" FCFA"}
  ];
  return <div className="sg-site" id="accueil">
    <div className="sg-topline"><span>Association apolitique et à but non lucratif</span><span>Depuis 2022 · Burkina Faso</span></div>
    <Header/>
    <main>
      <section className="sg-hero"><div className="sg-hero-inner">
        <div className="sg-hero-copy"><span className="sg-eyebrow"><i/>L’humain au cœur de chaque action</span>
          <h1>Ensemble,<br/>faisons grandir<br/><em>la solidarité.</em></h1>
          <p className="sg-hero-lead">Chaque geste compte. Depuis 2022, nous rassemblons une jeunesse engagée pour soutenir les personnes vulnérables et faire vivre l’entraide au Burkina Faso.</p>
          <div className="sg-hero-actions"><a className="sg-button sg-button-primary" href="#actions">Découvrir nos actions <ArrowUpRight size={17}/></a><Link className="sg-button sg-button-quiet" to="/join">Nous rejoindre <span><ArrowRight size={16}/></span></Link></div>
          <div className="sg-hero-note"><div className="sg-avatar-stack"><img src="/coms10.jpeg" alt=""/><img src="/coms11.jpeg" alt=""/><img src="/coms12.jpeg" alt=""/></div><span><b>Une jeunesse qui agit.</b><br/>Une communauté qui rassemble.</span></div>
        </div>
        <div className="sg-hero-visual" aria-label="Photographies des actions solidaires">
          <div className="sg-photo sg-photo-main"><img src="/don1.jpg" alt="Une action de solidarité de l’association" fetchPriority="high"/><span className="sg-photo-caption">L’engagement en action</span></div>
          <div className="sg-photo sg-photo-small"><img src="/don2.jpg" alt="Des bénévoles engagés auprès des communautés"/></div>
          <div className="sg-photo sg-photo-detail"><img src="/coms6.jpeg" alt="Un moment de partage et de solidarité"/></div>
          <div className="sg-hero-sticker"><HeartHandshake size={22}/><span>Unis par<br/><b>l’entraide</b></span></div><span className="sg-visual-index">01 <i/> SOLIDARITY IN ACTION</span>
        </div>
      </div><a href="#impact" className="sg-scroll-cue"><span>Faire défiler</span><ArrowDown size={15}/></a><div className="sg-hero-number">SG<span>.</span>2022</div></section>

      <section className="sg-intro-strip" id="apropos"><div className="sg-intro-mark"><Sparkles size={18}/></div><p>La solidarité n’est pas seulement une valeur.<br/><b>C’est une action que nous choisissons chaque jour.</b></p><span className="sg-intro-location">OUAGADOUGOU, BURKINA FASO</span></section>

      <section className="sg-impact section-pad" id="impact"><div className="sg-impact-head"><Heading eyebrow="Notre impact" title={<>Des gestes concrets.<br/><em>Un engagement durable.</em></>} copy="Notre engagement se mesure aux liens que nous créons et aux actions que nous menons ensemble."/><span className="sg-live-note"><i/>Données issues de nos activités</span></div>
        <div className="sg-stats-grid">{impact.map(({label,value,icon:Icon,suffix=""})=><div className="sg-stat" key={label}><span className="sg-stat-icon"><Icon size={19}/></span><strong>{statLabel(value)}{value!==null?suffix:""}</strong><span>{label}</span><small>{value===null?"Donnée non disponible":"Donnée actualisée depuis la plateforme"}</small></div>)}</div>
      </section>

      <section className="sg-actions section-pad" id="actions"><div className="sg-actions-top"><Heading eyebrow="Agir ensemble" title={<>Là où il y a un besoin,<br/><em>nous voulons être présents.</em></>} copy="Des initiatives humaines, pensées avec les communautés et portées par l’énergie de nos membres."/><Link to="/join" className="sg-text-link">Prendre part à l’aventure <ArrowUpRight size={17}/></Link></div>
        {loadingEvents?<div className="sg-empty-state">Chargement des actions…</div>:events.length?<div className="sg-action-grid">{events.map((event,index)=><Reveal key={event._id} delay={index*90}><article className="sg-action-card"><Link to="/join" className="sg-action-image">{imageOf(event)?<img src={imageOf(event)} alt={event.title||"Action solidaire"} loading="lazy"/>:<div className="sg-image-placeholder"><HandHeart size={34}/></div>}<span className="sg-image-arrow"><ArrowUpRight size={19}/></span></Link><div className="sg-action-meta"><span>Action solidaire</span>{event.startDate&&<span><CalendarDays size={13}/>{dateLabel(event.startDate)}</span>}</div><h3>{event.title}</h3><p>{event.description||"Une initiative portée par nos membres pour faire vivre les valeurs de solidarité et d’entraide."}</p><Link to="/join" className="sg-card-link">Découvrir <ArrowRight size={15}/></Link></article></Reveal>)}</div>:<div className="sg-empty-state"><HandHeart size={25}/><p>Aucune action à afficher pour le moment.</p><span>Nos prochaines initiatives seront publiées ici.</span></div>}
      </section>

      <section className="sg-commitment"><div className="sg-commitment-image"><img src="/don2.jpg" alt="Une action de terrain de Solidarity Group" loading="lazy"/><span className="sg-image-label">Ensemble, sur le terrain</span></div><div className="sg-commitment-copy"><span className="sg-eyebrow"><i/>Notre raison d’être</span><h2>Parce que personne ne devrait traverser les épreuves <em>seul.</em></h2><p>Orphelins, personnes malades, personnes déplacées internes : nous croyons que chaque personne mérite attention, dignité et soutien. Notre association rassemble des jeunes qui transforment cette conviction en gestes concrets.</p><div className="sg-values"><span><Check size={15}/>Humanité</span><span><Check size={15}/>Confiance</span><span><Check size={15}/>Engagement</span></div><Link to="/join" className="sg-button sg-button-dark">Découvrir notre engagement <ArrowUpRight size={17}/></Link></div></section>

      <section className="sg-news section-pad" id="actualites"><div className="sg-news-heading"><Heading eyebrow="Le journal" title={<>Les nouvelles de<br/><em>notre communauté.</em></>} copy="Retrouvez les temps forts, les initiatives et les histoires qui racontent notre engagement."/><Link to="/actualites" className="sg-text-link">Toutes les actualités <ArrowUpRight size={17}/></Link></div>
        {loadingNews?<div className="sg-empty-state">Chargement des actualités…</div>:news.length?<div className="sg-news-grid">{news.map((item,index)=><Reveal key={item._id} delay={index*90}><article className="sg-news-card"><Link to={`/actualites/${item.slug||item._id}`} className="sg-news-image">{imageOf(item)?<img src={imageOf(item)} alt="" loading="lazy"/>:<div className="sg-image-placeholder"><HeartHandshake size={32}/></div>}<span><ArrowUpRight size={18}/></span></Link><div className="sg-news-meta"><span>{item.category||"Actualité"}</span><time>{dateLabel(item.publishedAt||item.createdAt)}</time></div><h3><Link to={`/actualites/${item.slug||item._id}`}>{item.title}</Link></h3>{item.summary&&<p>{item.summary}</p>}<Link to={`/actualites/${item.slug||item._id}`} className="sg-card-link">Lire l’article <ArrowRight size={15}/></Link></article></Reveal>)}</div>:<div className="sg-empty-state"><p>Aucune actualité publiée pour le moment.</p><span>Les prochaines nouvelles de l’association apparaîtront ici.</span></div>}
      </section>

      <section className="sg-join"><div className="sg-join-orbit sg-orbit-one"/><div className="sg-join-orbit sg-orbit-two"/><div className="sg-join-inner"><div><span className="sg-eyebrow sg-eyebrow-light"><i/>Chaque personne compte</span><h2>Votre engagement peut<br/><em>changer une histoire.</em></h2><p>Rejoignez une communauté de jeunes qui choisissent d’agir, de donner de leur temps et de faire grandir la solidarité.</p></div><div className="sg-join-action"><div className="sg-contribution"><span>Une cotisation accessible</span><strong>1 000 <small>FCFA / mois</small></strong><p>Un engagement régulier, un élan collectif.</p></div><Link to="/join" className="sg-button sg-button-white">Rejoindre notre communauté <ArrowUpRight size={17}/></Link></div></div></section>
    </main>
    <footer className="sg-footer"><div className="sg-footer-main"><div className="sg-footer-brand"><Link to="/" className="sg-brand"><img src="/logo_solidarity-removebg-preview.png" alt=""/><span>SOLIDARITY <b>GROUP</b></span></Link><p>Une jeunesse engagée pour un monde plus humain, plus juste et plus solidaire. Depuis 2022, au Burkina Faso.</p><div className="sg-socials"><a href="https://www.facebook.com/profile.php?id=100086252212915" target="_blank" rel="noreferrer" aria-label="Facebook"><Facebook size={17}/></a><a href="https://www.instagram.com/solidarity_group" target="_blank" rel="noreferrer" aria-label="Instagram"><Instagram size={17}/></a><a href="mailto:solidaritygroupbf@yahoo.com" aria-label="E-mail"><Mail size={17}/></a></div></div><div className="sg-footer-col"><h3>Explorer</h3><a href="#accueil">Accueil</a><a href="#actions">Nos actions</a><Link to="/actualites">Actualités</Link><a href="#apropos">À propos</a><Link to="/join">Nous rejoindre</Link></div><div className="sg-footer-col"><h3>Nous contacter</h3><a href="mailto:solidaritygroupbf@yahoo.com"><Mail size={15}/>solidaritygroupbf@yahoo.com</a><a href="tel:+22658474975"><Phone size={15}/>+226 58 47 49 75</a><span><MapPin size={15}/>Ouagadougou, Burkina Faso</span></div></div><div className="sg-footer-bottom"><span>© {new Date().getFullYear()} Solidarity Group. Tous droits réservés.</span><div><Link to="/actualites">Actualités</Link><Link to="/join">Adhésion</Link></div><span>Fait avec <Heart size={12} fill="currentColor"/> au Burkina Faso</span></div></footer>
  </div>;
}
