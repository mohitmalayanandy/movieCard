import seriesData from "../api/seriesData.json";

const NetflixSeries = () => {
  return (
    <ul>
      {seriesData.map((currElement) => {
        return (
          <li>
            <div>
              <div>
                <img src={currElement.img_url}
                  alt={currElement.id}
                  height="250px"
                  weight="250px" />
              </div>
              <div>
                <h1><b>Name:</b> {currElement.name} </h1>
                <h2><b>Ratting:</b> {currElement.rating} </h2>
                <p><b>Summary:</b> {currElement.description} </p>
                <p>Cast: {currElement.cast}</p>
                <p>Genre: {currElement.genre} </p>
                <a href={currElement.watch_url} target="_blank" ><button>Watch Now</button></a>
              </div>
            </div>
          </li>
        )
      })}
    </ul>

  )
}
export default NetflixSeries