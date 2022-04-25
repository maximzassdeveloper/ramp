import { FC } from 'react'
import { IFilm } from '../../types/film'
import { Rating } from '..'
import { Episode } from '..' 

interface SingleFilmDetailsProps {
  film: IFilm
}

interface AboutBlockProps {
  title: string
  content: string[]
}

export const AboutBlock: FC<AboutBlockProps> = ({ title, content }) => {
  return (
    <div className="single-film-about__block">
      <h4>{title}</h4>
      <ul>
        {content.map(i => <li>{i}</li>)}
      </ul>
    </div>
  )
}

export const SingleFilmDetails: FC<SingleFilmDetailsProps> = ({ film }) => {

  const { createdBy, starring, musicBy, awards } = (film.details ?? {})

  return <>
    <div className='single-film-details'>

      <div className="single-film__options">
        {film.ageLimit && <span className="age-rating">{film.ageLimit}</span>}
        <Rating rating={film.rating} />
      </div>
      {film.desc && <p className="single-film__desc">{film.desc}</p>}

      <div className="single-film-about">
        <div>
          <div className="line">
            <div className="col">
              {createdBy && <AboutBlock title='Created by' content={createdBy} />}
              {musicBy && <AboutBlock title='Music by' content={musicBy} />}
            </div>
            <div className="col">
              {starring && <AboutBlock title='Starring' content={starring} />}
            </div>
          </div>
          {awards && <AboutBlock title='Awards' content={awards} />}
        </div>

        {film.trailers && <div className="single-film-trailers">
          {film.trailers.map((trailer, i) => 
            <Episode key={i} film={film} episode={trailer} count={i+1} />
          )}
        </div>}
      </div>

    </div>
  </>
}