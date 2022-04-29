import { FC } from 'react'
import { CSSTransition } from 'react-transition-group'
import { Rating, Episode } from '@/components'
import { IFilm } from '@/types/film'
import s from './single-film.module.scss'

interface AboutBlockProps {
  title: string
  content: string[]
}

export const AboutBlock: FC<AboutBlockProps> = ({ title, content }) => {
  return (
    <div className={s.aboutBlock}>
      <h4>{title}</h4>
      <ul>
        {content.map(i => <li key={i}>{i}</li>)}
      </ul>
    </div>
  )
}

interface DetailsProps {
  film: IFilm
  isShow: boolean
}

export const Details: FC<DetailsProps> = ({ film, isShow }) => {

  const { createdBy, starring, musicBy, awards } = (film.details ?? {})

  return <CSSTransition in={isShow} timeout={200} classNames="fadeDown" mountOnEnter unmountOnExit>
    <div className={s.details}>

      <div className={s.options}>
        {film.ageLimit && <span className={s.ageLimit}>{film.ageLimit}</span>}
        <Rating rating={film.rating} />
      </div>

      {film.desc && <p className={s.desc}>{film.desc}</p>}

      <div className={s.about}>
        <div>
          <div className={s.line}>

            <div className={s.col}>
              {createdBy && <AboutBlock title='Created by' content={createdBy} />}
              {musicBy && <AboutBlock title='Music by' content={musicBy} />}
            </div>

            <div className={s.col}>
              {starring && <AboutBlock title='Starring' content={starring} />}
            </div>

          </div>

          {awards && <AboutBlock title='Awards' content={awards} />}
        </div>

        {film.trailers && <div className={s.trailers}>
          <h4>Trailers</h4>
          {film.trailers.map((trailer, i) => 
            <Episode 
              key={trailer.id} 
              film={film} 
              episode={trailer} 
              count={i+1} 
            />
          )}
        </div>}
      </div>

    </div>
  </CSSTransition>
}