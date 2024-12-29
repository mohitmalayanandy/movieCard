import './SeriesCard.css';

const SeriesCard = ({ props }) => {
  const { img_url, id, name, rating, description, cast, genre, watch_url } = props
  const btn_style = {
    padding: "1.2rem 2.4rem",
    border: "none",
    fontSize: "1.6rem",
    backgroundColor: `${rating >= 8.5 ? "rgb(0, 255, 0)" : "rgb(255, 196, 45)"}`,
    color: "var(--bg-color)"
  }
  const ratingClass = rating >= 8.5 ? "superhit" : "average";
  return (
    <li className='card'>
      <div>
        <div>
          <img src={img_url}
            alt={id}
            height="250px"
            weight="250px" />
        </div>
        <div className='card-content'>
          <h1><b>Name:</b> {name} </h1>
          <h2><b>Ratting:</b> <span className={`rating ${ratingClass}`}>{rating}</span> </h2>
          <p><b>Summary:</b> {description} </p>
          <p><b>Cast:</b> {cast.join(", ")}</p>
          <p><b>Genre:</b> {genre.join(", ")} </p>
          <a href={watch_url} target="_blank" >
            <button style={btn_style}>Watch Now</button>
          </a>
        </div>
      </div>
    </li>
  )
}

export default SeriesCard