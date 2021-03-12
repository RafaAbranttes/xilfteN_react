import React, { useEffect, useState } from 'react'
import Tmdb from './TmDb'
import './App.css'
import MovieRow from './components/MovieRow/index'
import FeaturedMovie from './components/FeaturedMovie/index'
import Header from './components/Header/index'

// eslint-disable-next-line import/no-anonymous-default-export
export default () => {

  const [movieList, setMovieList] = useState([])
  const [featureData, serFeatureData] = useState(null)
  const [blackHeader, setBlackHeader] = useState(false)

  useEffect(() => {
    const loadAll = async () => {
      let list = await Tmdb.getHomeList();
      setMovieList(list)

      let originals = list.filter(i => i.slug === 'originals')
      let randomChosen = Math.floor(Math.random() * (originals[0].items.results.length - 1))
      let chosen = originals[0].items.results[randomChosen]
      let chosenInfo = await Tmdb.getMovieInfo(chosen.id, 'tv');

      serFeatureData(chosenInfo)
    }

    loadAll()
  }, []);

  useEffect(() => {
    const scrollListener = () => {
      if(window.scrollY > 10){
        setBlackHeader(true)
      } else {
        setBlackHeader(false)
      }
    }

    window.addEventListener('scroll', scrollListener)
    return () => {
      window.removeEventListener('scroll', scrollListener)
    }
  } , []);

  return (
    <div className="page">

      <Header black = {blackHeader}></Header>

      {featureData && 
        <FeaturedMovie item = {featureData}></FeaturedMovie>
      }

      <section className="lists">
        {movieList.map((item, key) => (
          <MovieRow key={key} title={item.title} items={item.items}>

          </MovieRow>
        ))}
      </section>

      <footer>
        Direitos de imagem para Netflix <br></br>
        Dados coletados do site Themoviedb.org
      </footer>
    </div>
  )
}