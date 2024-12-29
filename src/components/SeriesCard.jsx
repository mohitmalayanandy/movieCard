import './SeriesCard.css';

const SeriesCard = ({props}) => {
  const {img_url, id, name, rating, description, cast, genre, watch_url} = props
    return(
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
                <h2><b>Ratting:</b> {rating} </h2>
                <p><b>Summary:</b> {description} </p>
                <p>Cast: {cast.join(", ")}</p>
                <p>Genre: {genre.join(", ")} </p>
                <a href={watch_url} target="_blank" ><button>Watch Now</button></a>
              </div>
            </div>
          </li>
    )
}

export default SeriesCard