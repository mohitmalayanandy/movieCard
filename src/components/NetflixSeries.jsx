import seriesData from "../api/seriesData.json";
import SeriesCard from "./SeriesCard";

const NetflixSeries = () => {
  return (
    <ul>
      {seriesData.map((currElement) => {
        return (
          <>
            <SeriesCard props={currElement} currElement={currElement} />
          </>
        )
      })}
    </ul>

  )
}
export default NetflixSeries