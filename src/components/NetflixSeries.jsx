import seriesData from '../api/seriesData.json';
import SeriesCard from './SeriesCard';

const NetflixSeries = () => {
  return (
    <ul className='grid grid-three--cols'>
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