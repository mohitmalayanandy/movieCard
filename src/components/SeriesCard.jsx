const SeriesCard = ({props}) => {
    return(
        <li>
            <div>
              <div>
                <img src={props.img_url}
                  alt={props.id}
                  height="250px"
                  weight="250px" />
              </div>
              <div>
                <h1><b>Name:</b> {props.name} </h1>
                <h2><b>Ratting:</b> {props.rating} </h2>
                <p><b>Summary:</b> {props.description} </p>
                <p>Cast: {props.cast.join(", ")}</p>
                <p>Genre: {props.genre.join(", ")} </p>
                <a href={props.watch_url} target="_blank" ><button>Watch Now</button></a>
              </div>
            </div>
          </li>
    )
}

export default SeriesCard