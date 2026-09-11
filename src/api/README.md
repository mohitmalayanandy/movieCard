# Movie Card catalog

`seriesData.json` contains 120 titles: the original 11 series, nine requested titles, and 100 additional movies and series. IDs include the release year for new titles to distinguish adaptations such as the 2019 movie and 2024 series *The Gentlemen*. Series years indicate their first release.

New entries include `type` (`movie` or `series`), `year`, a short original synopsis, selected principal cast, and genre tags. Cast lists are highlights, not exhaustive season-by-season credits.

## Sources and artwork

New title identities, release years, formats, and poster matches were checked against IMDb's public title suggestions on September 12, 2026. Every new entry retains its title page in `source_url` and original artwork URL in `poster_source_url`. Poster files are stored locally in `public/images` at a requested width of 600px. Artwork remains the property of its respective owners.

The two recent requested titles were also checked against these sources:

- [Babita Singh Reporting — Prime Video](https://www.primevideo.com/detail/0L0C4OX0141EW5XEMTSRX9164L): film, synopsis and principal cast.
- [Off Campus — About Amazon](https://www.aboutamazon.com/news/entertainment/off-campus-hockey-series-prime-video): series and premise.

The summaries are editorial descriptions; these sources are not presented as a complete fact-check of every synopsis or cast credit.

## Ratings and streaming

New ratings are `null` because no rating snapshot was verified. The UI omits the badge and sorts unrated titles after rated titles. Existing ratings are retained legacy data, not freshly verified scores.

New `watch_url` values lead to a title search on JustWatch India and use the explicit label `Find streaming`. These are discovery links, not claims of current platform availability. Users can adjust the country on JustWatch. Original streaming links are retained.

## Adding a title

Use a unique ID, a movie/series format, an integer release year, genre and cast arrays, and a local `images/...` path. Use `null` for unavailable artwork or ratings; the UI handles missing and failed artwork with a labeled title card. Preserve source URLs when adding artwork. Run `npm test`, `npm run lint`, and `npm run build` after catalog updates.
