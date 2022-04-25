import { FC } from 'react'
import { Splide, SplideSlide } from '@splidejs/react-splide'
import { IFilm, ISeason } from '@/types/film'
import { Episode } from '../Episode/Episode'
import { Direction } from './Seasons'

import '@splidejs/splide/dist/css/splide.min.css'
import s from './seasons.module.scss'

interface SeasonsListProps {    
  season: ISeason
  film: IFilm
  direction?: Direction
}

export const SeasonsList: FC<SeasonsListProps> = ({ season, film, direction }) => {  
  return (
    <div className={s.list}>
      {direction === 'horizontal'
      ? <Splide 
          className={s.slider}
          options={{
            fixedWidth: '250px',
            gap: '10px',
            pagination: false,
            classes: {
              arrows: `splide__arrows ${s.sliderArrows}`,
              arrow : `splide__arrow ${s.sliderArrow}`,
              prev  : `splide__arrow--prev ${s.sliderArrowPrev}`,
              next  : `splide__arrow--next ${s.sliderArrowNext}`,
            }
          }}
        >
          {season.episodes.map((episode, i) => 
            <SplideSlide key={episode.id}>
              <Episode film={film} episode={episode} count={i+1} />
            </SplideSlide>
          )}
        </Splide>
      : season.episodes.map((episode, i) => 
          <Episode 
            key={episode.id}
            className={s.episodeVertical}
            film={film} 
            episode={episode} 
            count={i+1} 
          />
        )
      }
    </div>
  )
}