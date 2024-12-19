import './App.css'
import NetflixSeries from './components/NetflixSeries'  //Default Import
import { Header, Footer } from './components/LayoutComponents' // Example of Named Import

function App() {

  return (
    <>
      <Header />
      <NetflixSeries />
      <Footer />
    </>
  )
}

export default App
