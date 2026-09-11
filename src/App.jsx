import { useEffect, useRef, useState } from 'react'
import seriesData from './api/seriesData.json'
import { PAGE_SIZE, filterCatalog, imageUrl, watchLabel } from './lib/catalog'
import Poster from './components/Poster'
import './App.css'

const genres = ['All genres', ...new Set(seriesData.flatMap(show => show.genre))]
const posterUrl = show => imageUrl(show, import.meta.env.BASE_URL)

function App() {
  const searchRef = useRef(null)
  const [query, setQuery] = useState('')
  const [type, setType] = useState('all')
  const [visibleCount, setVisibleCount] = useState(PAGE_SIZE)
  const [genre, setGenre] = useState('All genres')
  const [sort, setSort] = useState('featured')
  const [tab, setTab] = useState('discover')
  const [saved, setSaved] = useState(() => {
    try { const value = JSON.parse(localStorage.getItem('moviecard-watchlist') || '[]'); return Array.isArray(value) ? value.filter(id => seriesData.some(show => show.id === id)) : [] } catch { return [] }
  })
  const [notice, setNotice] = useState('')
  useEffect(() => { try { localStorage.setItem('moviecard-watchlist', JSON.stringify(saved)) } catch { setNotice('Your watchlist is available for this visit. Browser storage is unavailable.') } }, [saved])
  const toggleSaved = (show) => {
    const exists = saved.includes(show.id)
    setSaved(previous => exists ? previous.filter(id => id !== show.id) : [...previous, show.id])
    setNotice(`${show.name} ${exists ? 'removed from' : 'added to'} your watchlist.`)
  }
  const reset = () => { setQuery(''); setGenre('All genres'); setType('all'); setSort('featured'); setVisibleCount(PAGE_SIZE) }
  const changeTab = (value, format = 'all', category = 'All genres') => {
    setTab(value)
    reset()
    setType(format)
    setGenre(category)
    requestAnimationFrame(() => {
      if (value === 'discover' && format === 'all' && category === 'All genres') window.scrollTo({ top: 0 })
      else document.getElementById('collection')?.scrollIntoView({ block: 'start' })
    })
  }
  const navigation = [
    { label: 'Discover', tab: 'discover', type: 'all', icon: 'M12 3 3 7.5V16.5L12 21l9-4.5V7.5L12 3ZM3 7.5l9 4.5 9-4.5M12 12v9' },
    { label: 'Movies', tab: 'discover', type: 'movie', icon: 'M4 4h16v16H4zM4 8h16M8 4v4m8-4v4M10 12l5 3-5 3v-6Z' },
    { label: 'Series', tab: 'discover', type: 'series', icon: 'M4 7h16v13H4zM8 3l4 4 4-4' },
    { label: 'Watchlist', tab: 'watchlist', type: 'all', icon: 'M6 3h12v18l-6-4-6 4V3Z' },
  ]
  const shows = filterCatalog(seriesData, { query, genre, type, sort, tab, saved })
  const visibleShows = shows.slice(0, visibleCount)
  const featured = seriesData[0]

  return <>
    <a className="skip-link" href="#collection">Skip to collection</a>
    <header className="navbar">
      <div className="navbar-inner">
        <button className="brand navbar-brand" onClick={() => changeTab('discover')} aria-label="Movie Card home">
          <span className="logo-mark" aria-hidden="true"><svg viewBox="0 0 24 24" fill="none"><path d="M8 5v14l11-7L8 5Z" fill="currentColor" /></svg></span>
          <span>moviecard<span className="brand-dot">.</span></span>
        </button>
        <nav className="navbar-links" aria-label="Main navigation">
          {navigation.map(item => {
            const active = tab === item.tab && (tab === 'watchlist' || type === item.type)
            return <button key={item.label} className={`navbar-link${active ? ' is-active' : ''}`} onClick={() => changeTab(item.tab, item.type)} aria-current={active ? 'page' : undefined}>
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d={item.icon} /></svg>
              <span>{item.label}</span>
              {item.tab === 'watchlist' && <span className="watchlist-count" aria-label={`${saved.length} saved titles`}>{saved.length}</span>}
            </button>
          })}
        </nav>
        <button className="navbar-search" onClick={() => {
          searchRef.current?.focus({ preventScroll: true })
          searchRef.current?.scrollIntoView({ block: 'center' })
        }} aria-label="Search titles or cast">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" aria-hidden="true"><circle cx="10.5" cy="10.5" r="6.5" /><path d="m16 16 4.5 4.5" /></svg>
          <span>Search</span>
        </button>
      </div>
    </header>
    <main>
      {tab === 'discover' && <section className="hero" aria-labelledby="hero-title">
        <img className="hero-image" src={posterUrl(featured)} alt="" />
        <div className="hero-shade" />
        <div className="hero-content">
          <p className="eyebrow"><span /> THE SPOTLIGHT</p>
          <h1 id="hero-title">Small town.<br />Stranger things.</h1>
          <div className="hero-meta"><span className="score">★ {featured.rating}</span><span>Series</span><span>Drama · Fantasy · Horror</span></div>
          <p className="hero-description">A missing boy. A secret lab. A world turned upside down. Your next obsession starts in Hawkins.</p>
          <div className="hero-actions"><a className="button primary" href={featured.watch_url} target="_blank" rel="noopener noreferrer">▶ Watch on Netflix <span aria-hidden="true">↗</span><span className="sr-only"> (opens in a new tab)</span></a><button className="button secondary" onClick={() => toggleSaved(featured)} aria-pressed={saved.includes(featured.id)}>{saved.includes(featured.id) ? '✓ In my watchlist' : '+ Add to watchlist'}</button></div>
        </div>
        <div className="hero-caption"><span>THIS WEEK’S PICK</span><strong>Stranger Things</strong></div>
      </section>}
      <section className="collection" id="collection" aria-labelledby="collection-title">
        <div className="collection-heading"><div><p className="eyebrow">{tab === 'discover' ? 'LESS SCROLLING, MORE WATCHING' : 'YOUR NEXT GREAT WATCH'}</p><h1 id="collection-title">{tab === 'discover' ? 'Find your next favorite' : 'My watchlist'}<span>.</span></h1><p className="section-description">{tab === 'discover' ? 'Big adventures, slow burns, and everything in between.' : 'All the stories you’ve saved, in one place.'}</p></div>
          <label className="search"><span aria-hidden="true">⌕</span><span className="sr-only">Search titles or cast</span><input ref={searchRef} type="search" placeholder="Search titles or cast…" value={query} onChange={event => { setQuery(event.target.value); setVisibleCount(PAGE_SIZE) }} /></label>
        </div>
        <div className="filter-row"><div className="genres" aria-label="Filter by genre">{genres.map(item => <button key={item} className={`genre ${genre === item ? 'selected' : ''}`} aria-pressed={genre === item} onClick={() => { setGenre(item); setVisibleCount(PAGE_SIZE) }}>{item}</button>)}</div></div>
        <div className="results-row">
          <p aria-live="polite">{shows.length} {shows.length === 1 ? 'title' : 'titles'}{genre !== 'All genres' ? ` in ${genre}` : ' to explore'}</p>
          <div className="result-controls">
            <label className="sort">Format <select value={type} onChange={event => { setType(event.target.value); setVisibleCount(PAGE_SIZE) }}><option value="all">Movies & series</option><option value="movie">Movies</option><option value="series">Series</option></select></label>
            <label className="sort">Sort by <select value={sort} onChange={event => { setSort(event.target.value); setVisibleCount(PAGE_SIZE) }}><option value="featured">Featured</option><option value="rating">Highest rated</option><option value="title">Title A–Z</option><option value="year">Newest releases</option></select></label>
          </div>
        </div>
        {shows.length ? <ul className="series-grid">{visibleShows.map(show => <li className="series-card" key={show.id}>
          <div className="poster">
            <Poster key={`${posterUrl(show)}|${show.poster_source_url || ''}`} show={show} />
            {show.rating != null && <span className="rating"><span>★</span> {show.rating}</span>}
            <button className={`save-button ${saved.includes(show.id) ? 'is-saved' : ''}`} aria-label={`${saved.includes(show.id) ? 'Remove' : 'Save'} ${show.name}${saved.includes(show.id) ? ' from' : ' to'} watchlist`} aria-pressed={saved.includes(show.id)} onClick={() => toggleSaved(show)}>{saved.includes(show.id) ? '✓' : '+'}</button>
          </div>
          <div className="card-body"><p className="card-format">{show.type === 'movie' ? 'Movie' : 'Series'}{show.year ? ` · ${show.year}` : ''}</p><p className="card-genres">{show.genre.slice(0, 2).join(' · ')}</p><h2>{show.name}</h2><p className="description">{show.description}</p><details><summary>Cast & details</summary><p>{show.cast.join(', ')}</p><p>{show.genre.join(' · ')}</p></details><a className="watch-link" href={show.watch_url} target="_blank" rel="noopener noreferrer">{watchLabel(show)}<span aria-hidden="true">↗</span><span className="sr-only"> (opens in a new tab)</span></a></div>
        </li>)}</ul> : <div className="empty-state"><span aria-hidden="true">{tab === 'watchlist' && !saved.length ? '＋' : '⌕'}</span><h2>{tab === 'watchlist' && !saved.length ? 'Your next great watch belongs here' : 'No titles found'}</h2><p>{tab === 'watchlist' && !saved.length ? 'Tap + on any title to save it for later.' : 'Try a different title, cast member, or genre.'}</p><button className="button primary" onClick={() => tab === 'watchlist' && !saved.length ? changeTab('discover') : reset()}>{tab === 'watchlist' && !saved.length ? 'Explore titles' : 'Clear filters'}</button></div>}
        {shows.length > 0 && <div className="load-more"><p aria-live="polite">Showing {Math.min(visibleCount, shows.length)} of {shows.length} titles</p>{visibleCount < shows.length && <button className="button secondary" onClick={() => setVisibleCount(count => count + PAGE_SIZE)}>Show more titles <span aria-hidden="true">↓</span></button>}</div>}
      </section>
    </main>
    <footer className="site-footer">
      <div className="footer-main">
        <div className="footer-intro">
          <button className="brand footer-brand" onClick={() => changeTab('discover')} aria-label="Movie Card home">moviecard<span className="brand-dot">.</span></button>
          <h2>Good stories.<br /><span>Great nights.</span></h2>
          <p>A little less searching. A lot more watching.<br />Find something worth staying in for.</p>
          <span className="footer-catalog"><span aria-hidden="true" />{seriesData.length} movies & series to explore</span>
        </div>
        <nav className="footer-group" aria-labelledby="footer-explore">
          <h3 id="footer-explore">Explore</h3>
          <button onClick={() => changeTab('discover')}>Discover</button>
          <button onClick={() => changeTab('discover', 'movie')}>Movies <span>{seriesData.filter(show => show.type === 'movie').length}</span></button>
          <button onClick={() => changeTab('discover', 'series')}>Series <span>{seriesData.filter(show => show.type === 'series').length}</span></button>
          <button onClick={() => changeTab('watchlist')}>My watchlist <span>{saved.length}</span></button>
        </nav>
        <nav className="footer-group" aria-labelledby="footer-genres">
          <h3 id="footer-genres">Find your mood</h3>
          {['Action', 'Crime', 'Thriller', 'Romance'].map(category => <button key={category} onClick={() => changeTab('discover', 'all', category)}>{category}<span aria-hidden="true">↗</span></button>)}
        </nav>
        <div className="footer-watchlist">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round" aria-hidden="true"><path d="M6 3h12v18l-6-4-6 4V3Z" /></svg>
          <h3>Your next watch, saved.</h3>
          <p>Keep a list for the nights when you just want to press play.</p>
          <button onClick={() => changeTab('watchlist')}>Open my watchlist <span aria-hidden="true">↗</span></button>
        </div>
      </div>
      <div className="footer-bottom">
        <p>© {new Date().getFullYear()} Movie Card</p>
        <p>Discover here. Watch on your favorite platform.</p>
        <button className="back-to-top" onClick={() => {
          window.scrollTo({ top: 0 })
          document.querySelector('.navbar-brand')?.focus({ preventScroll: true })
        }}>Back to top <span aria-hidden="true">↑</span></button>
      </div>
    </footer>
    <div className="sr-only" role="status">{notice}</div>
  </>
}

export default App
