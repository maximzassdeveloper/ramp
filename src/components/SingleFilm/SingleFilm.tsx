import { FC, useEffect, useState } from 'react'
import { CSSTransition } from 'react-transition-group'
import { Seasons } from '..'
import { SingleFilmInfo, SingleFilmNav, SingleFilmDetails } from '.'
import { IFilm } from '../../types/film'
import {classnames} from '../../utils/classnames'
import './single-film.scss'

interface SignleFilmProps {
  film: IFilm
}

export const SingleFilm: FC<SignleFilmProps> = ({ film }) => {

  const [activeTab, setActiveTab] = useState(0)

  useEffect(() => {
    document.body.style.background = `url(${film.preview})`
  }, [film])
 
  const classes = classnames(
    'single-film',
    { 'single-film--overview': activeTab === 0 },
    { 'single-film--episodes': activeTab === 1 },
    { 'single-film--details': activeTab === 2 },
  )

  return (
    <div className={classes} style={{background: `url(${film.preview})`}}>

      <div className="single-film-title__wrapper">
        <h1 className="single-film-title">{film.name}</h1>
      </div>


      <div className="single-film-faded">
        <CSSTransition in={activeTab === 0} timeout={200} classNames="fadeDown" mountOnEnter unmountOnExit>
          <SingleFilmInfo film={film} />  
        </CSSTransition>

        <CSSTransition in={activeTab === 2} timeout={200} classNames="fadeDown" mountOnEnter unmountOnExit>
          <SingleFilmDetails film={film} />
        </CSSTransition>
      </div>

      <SingleFilmNav activeTab={activeTab} onChange={setActiveTab} />
      
      {film.seasons && <div className="single-film__seasons">
        <Seasons film={film} seasons={film.seasons} />
      </div>}

    </div>
  )
}