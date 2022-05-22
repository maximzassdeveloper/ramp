export interface IThumb {
  id: number
  canvas?: HTMLCanvasElement
  sec: {
    index: number
    bgPosX: number
    bgPosY: number
  }[]
  url?: string
}

export const loadThumbs = (video: HTMLVideoElement, duration: number) => {
  const thumbnails: IThumb[] = []
  const thumbWidth = 200
  const thumbHeight = 120
  const horizontalCount = 5
  const verticalCount = 5

  document.body.appendChild(video)

  video.addEventListener('loadeddata', async () => {
    let count = 1
    let id = 1
    let x = 0, y = 0
    let canvas

    for (let i = 0; i <= duration; i += horizontalCount) {
      for (let startIndex = i; startIndex < i + horizontalCount; startIndex++) {

        const bgPosX = x * thumbWidth
        const bgPosY = y * thumbHeight
        const foundedThumb = thumbnails.find(t => t.id === id)

        if (!foundedThumb) {
          canvas = document.createElement('canvas')
          canvas.width = thumbWidth * horizontalCount
          canvas.height = thumbHeight * verticalCount

          thumbnails.push({
            id: id,
            canvas: canvas,
            sec: [{
              index: startIndex,
              bgPosX: -bgPosX,
              bgPosY: -bgPosY
            }]
          })
        } else {
          canvas = foundedThumb.canvas
          foundedThumb.sec.push({
            index: startIndex,
            bgPosX: -bgPosX,
            bgPosY: -bgPosY
          });
        }

        const context = canvas?.getContext('2d')
        video.currentTime = startIndex

        await new Promise(res => {
          const event = () => {
            context?.drawImage(video, bgPosX, bgPosY, thumbWidth, thumbHeight)
            x++
            video.removeEventListener('canplay', event)
            res(null)
          }
          video.addEventListener('canplay', event)
        })

        // 1 thumbnail is generated completely
        count++
      }

      x = 0
      y++

      if (count > horizontalCount * verticalCount) {
        count = 1
        x = 0
        y = 0
        id++
      }
    }

    // looping through thumbnails to update thumbnail
    thumbnails.forEach(thumb => {
      // converting canvas to blob to get short url
      thumb.canvas?.toBlob(blob => {
        if (blob) thumb.url = URL.createObjectURL(blob), 'image/jpeg'
      })

      // deleting unused property
      delete thumb.canvas
    })
  })

  setTimeout(() => document.body.removeChild(video))

  return thumbnails
}


// Unused
// export function loadVideoThumbs(
//   duration: number,
//   video: HTMLVideoElement,
//   // interval: number = 1,
// ): string[] {

//   const thumbs: string[] = []
//   const canvasWidth = 200
//   const canvasHeight = 120
//   document.body.appendChild(video)

//   let testTime = new Date()

//   // const interval = Math.ceil(duration / 50)

//   video.addEventListener(
//     'loadeddata',
//     async function () {
//       const canvas = document.createElement('canvas')
//       canvas.width = canvasWidth
//       canvas.height = canvasHeight
//       const context = canvas.getContext('2d')

//       for (let i = 0; i <= duration; i += 1) {

//         video.currentTime = i

//         await new Promise(function (rsv) {
//           const ev = () => {
//             context?.drawImage(video, 0, 0, canvasWidth, canvasHeight)
//             const url = canvas.toDataURL('image/jpeg')
//             thumbs[i] = url
//             console.log(duration)
//             rsv(null)
//             video.removeEventListener('canplay', ev)
//           }
//           video.addEventListener('canplay', ev)
//         })
//       }

//       setTimeout(() => document.body.removeChild(video))
//       console.log(((new Date).getSeconds() - testTime.getSeconds()))
//     }
//   )

//   // for (let i = 0; i < thumbs.length; i++) {
//   //   if (!thumbs[i]) {
//   //     thumbs[i] = thumbs[i + i % interval]
//   //   }
//   // }

//   return thumbs
// }

// export const loadThumb = async (video: HTMLVideoElement, sec: number) => {
//   let thumb = ''
//   const canvas = document.createElement('canvas')
//   const canvasWidth = 200
//   const canvasHeight = 120
//   canvas.width = canvasWidth
//   canvas.height = canvasHeight
//   const context = canvas.getContext('2d')

//   video.currentTime = sec

//   await new Promise(res => {
//     const event = function () {
//       context?.drawImage(video, 0, 0, canvasWidth, canvasHeight)
//       const url = canvas.toDataURL('image/jpeg')
//       thumb = url
//       video.removeEventListener('canplay', event)
//       res(url)
//     }
//     video.addEventListener('canplay', event)
//   })

//   return thumb
// }