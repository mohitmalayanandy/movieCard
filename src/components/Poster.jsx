/* Props are documented with JSDoc; this project does not use runtime PropTypes. */
/* eslint-disable react/prop-types */
import { useState } from 'react'
import { posterSources } from '../lib/catalog'

/** @param {{ show: { id: string, name: string, type: string, year?: number, img_url: string | null, poster_source_url?: string } }} props */
export default function Poster({ show }) {
  const [sourceIndex, setSourceIndex] = useState(0)
  const [retry, setRetry] = useState(0)
  const sources = posterSources(show, import.meta.env.BASE_URL)
  const source = sources[sourceIndex]

  if (source) {
    const src = retry ? `${source}${source.includes('?') ? '&' : '?'}retry=${retry}` : source
    return <img
      key={src}
      src={src}
      alt={`${show.name} poster`}
      loading="lazy"
      onError={() => setSourceIndex(index => index + 1)}
    />
  }

  return <div className={`poster-fallback poster-tone-${show.id.length % 4}`}>
    <span>{show.type === 'movie' ? 'MOVIE' : 'SERIES'}{show.year ? ` / ${show.year}` : ''}</span>
    <strong>{show.name}</strong>
    {sources.length > 0 ? <button className="poster-retry" onClick={() => {
      setRetry(Date.now())
      setSourceIndex(0)
    }} aria-label={`Retry loading ${show.name} poster`}>Retry image ↻</button> : <small>Artwork unavailable</small>}
  </div>
}
