import { FC } from 'react'
import { Splide, SplideSlide } from '@splidejs/react-splide'
import { IEpisode, IFilm, ISeason } from '@/types/film'
import { Episode } from '@/components'
import { Direction } from './Seasons'
import cn from 'classnames'

import '@splidejs/splide/dist/css/splide.min.css'

interface SeasonsListProps {    
  season: ISeason
  film: IFilm
  direction?: Direction
  activeEpisode?: IEpisode | null
  styles: any
}

export const SeasonsList: FC<SeasonsListProps> = ({ 
  season, film, direction, activeEpisode, styles: s 
}) => {  
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
            className={cn({
              [s.episodeActive]: episode.id === activeEpisode?.id
            })}
            classes={s}
            film={film} 
            episode={episode} 
            count={i+1} 
          />
        )
      }
    </div>
  )
}