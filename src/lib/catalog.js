export const PAGE_SIZE = 24

export function filterCatalog(catalog, { query = '', genre = 'All genres', type = 'all', sort = 'featured', tab = 'discover', saved = [] } = {}) {
  const search = query.trim().toLocaleLowerCase()
  return catalog.filter(show =>
    (tab !== 'watchlist' || saved.includes(show.id)) &&
    (type === 'all' || show.type === type) &&
    (genre === 'All genres' || show.genre.includes(genre)) &&
    `${show.name} ${show.cast.join(' ')}`.toLocaleLowerCase().includes(search)
  ).sort((a, b) => {
    if (sort === 'rating') return (b.rating == null ? -1 : Number(b.rating)) - (a.rating == null ? -1 : Number(a.rating))
    if (sort === 'title') return a.name.localeCompare(b.name) || (a.year ?? 0) - (b.year ?? 0)
    if (sort === 'year') return (b.year ?? 0) - (a.year ?? 0)
    return 0
  })
}

export function imageUrl(show, baseUrl) {
  if (!show.img_url) return null
  if (show.img_url.startsWith('images/')) return `${baseUrl}${show.img_url}`
  if (show.img_url.startsWith('https://github.com/mohitmalayanandy/movieCard/')) {
    return `${baseUrl}images/${show.img_url.split('/').pop().split('?')[0]}`
  }
  return show.img_url
}

export function posterSources(show, baseUrl) {
  return [...new Set([imageUrl(show, baseUrl), show.poster_source_url].filter(Boolean))]
}

export function watchLabel(show) {
  if (show.watch_label) return show.watch_label
  const hostname = new URL(show.watch_url).hostname
  if (hostname.endsWith('netflix.com')) return 'Watch on Netflix'
  if (hostname.endsWith('disneyplus.com')) return 'Watch on Disney+'
  if (hostname.endsWith('viki.com')) return 'Watch on Viki'
  return 'Find streaming'
}
