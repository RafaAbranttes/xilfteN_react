import React, { useEffect, useState } from 'react'
import Tmdb from './TmDb'
import './App.css'
import MovieRow from './components/MovieRow'
import FeaturedMovie from './components/FeaturedMovie'

// eslint-disable-next-line import/no-anonymous-default-export
export default () => {

  const [movieList, setMovieList] = useState([])
  const [featureData, serFeatureData] = useState(null)

  useEffect(() => {
    const loadAll = async () => {
      let list = await Tmdb.getHomeList();
      setMovieList(list)

      let originals = list.filter(i => i.slug === 'originals')
      let randomChosen = Math.floor(Math.random() * (originals[0].items.results.length - 1))
      let chosen = originals[0].items.results[randomChosen]

      console.log(chosen)
    }

    loadAll()
  }, []);

  return (
    <div className="page">

      {featureData && 
        <FeaturedMovie item = {featureData}></FeaturedMovie>
      }

      <section className="lists">
        {movieList.map((item, key) => (
          <MovieRow key={key} title={item.title} items={item.items}>

          </MovieRow>
        ))}
      </section>
    </div>
  )
}