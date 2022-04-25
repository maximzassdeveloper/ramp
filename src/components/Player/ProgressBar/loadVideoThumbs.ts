export function loadVideoThumbs(
  duration: number,
  video: HTMLVideoElement,
  // interval: number = 1,
): string[] {

  const thumbs: string[] = []
  const canvasWidth = 200
  const canvasHeight = 120
  document.body.appendChild(video)

  let testTime = new Date()

  // const interval = Math.ceil(duration / 50)

  video.addEventListener(
    'loadeddata',
    async function () {
      const canvas = document.createElement('canvas')
      canvas.width = canvasWidth
      canvas.height = canvasHeight
      const context = canvas.getContext('2d')

      for (let i = 0; i <= duration; i += 1) {

        video.currentTime = i

        await new Promise(function (rsv) {
          const ev = () => {
            context?.drawImage(video, 0, 0, canvasWidth, canvasHeight)
            const url = canvas.toDataURL('image/jpeg')
            thumbs[i] = url
            console.log(duration)
            rsv(null)
            video.removeEventListener('canplay', ev)
          }
          video.addEventListener('canplay', ev)
        })
      }

      setTimeout(() => document.body.removeChild(video))
      console.log(((new Date).getSeconds() - testTime.getSeconds()))
    }
  )

  // for (let i = 0; i < thumbs.length; i++) {
  //   if (!thumbs[i]) {
  //     thumbs[i] = thumbs[i + i % interval]
  //   }
  // }

  return thumbs
}

export const loadThumb = async (video: HTMLVideoElement, sec: number) => {
  let thumb = ''
  const canvas = document.createElement('canvas')
  const canvasWidth = 200
  const canvasHeight = 120
  canvas.width = canvasWidth
  canvas.height = canvasHeight
  const context = canvas.getContext('2d')

  video.currentTime = sec

  await new Promise(res => {
    const event = function () {
      context?.drawImage(video, 0, 0, canvasWidth, canvasHeight)
      const url = canvas.toDataURL('image/jpeg')
      thumb = url
      video.removeEventListener('canplay', event)
      res(url)
    }
    video.addEventListener('canplay', event)
  })

  return thumb
}


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

  let testTime = new Date()

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
    console.log(((new Date).getSeconds() - testTime.getSeconds()))

  })

  setTimeout(() => document.body.removeChild(video))

  return thumbnails
}

// const onMouseMove = () => {
//   const previewDiv = { current: document.createElement('div') }
//   const thumbnails: IThumb[] = []
//   const time = 0

//   for (const thumb of thumbnails) {
//     const curSec = thumb.sec.find(i => i.index === time)

//     if (curSec) {
//       previewDiv.current.style.backgroundImage = `url(${thumb.data})`
//       previewDiv.current.style.backgroundPositionX = curSec.bgPosX.toString()
//       previewDiv.current.style.backgroundPositionY = curSec.bgPosY.toString()
//       break
//     }
//   }
// }


// var thumbnailWidth = 158;
// var thumbnailHeight = 90;
// var horizontalItemCount = 5;
// var verticalItemCount = 5;

// var init = function () {
//   videojs('video').ready(function () {
//     var that = this;
//     var videoSource = this.player_.children_[0];
//     var video = $(videoSource).clone().css('display', 'none').appendTo('body')[0];
//     // videojs element
//     var root = $(videoSource).closest('.video-js');
//     // control bar element
//     var controlBar = root.find('.vjs-control-bar');
//     // thumbnail element
//     controlBar.append('<div class="vjs-thumbnail"></div>');

//     //
//     controlBar.on('mousemove', '.vjs-progress-control', function () {
//       // getting time
//       var time = $(this).find('.vjs-mouse-display .vjs-time-tooltip').text();

//       //
//       var temp = null;

//       // format: 09
//       if (/^\d+$/.test(time)) {
//         // re-format to: 0:0:09
//         time = '0:0:' + time;
//       }
//       // format: 1:09
//       else if (/^\d+:\d+$/.test(time)) {
//         // re-format to: 0:1:09
//         time = '0:' + time;
//       }

//       //
//       temp = time.split(':');

//       // calculating to get seconds
//       time = (+temp[0]) * 60 * 60 + (+temp[1]) * 60 + (+temp[2]);

//       //
//       for (var item of thumbnails) {
//         //
//         var data = item.sec.find(x => x.index === time);

//         // thumbnail found
//         if (data) {
//           // getting mouse position based on "vjs-mouse-display" element
//           var position = controlBar.find('.vjs-mouse-display').position();

//           // updating thumbnail css
//           controlBar.find('.vjs-thumbnail').css({
//             'background-image': 'url(' + item.data + ')',
//             'background-position-x': data.backgroundPositionX,
//             'background-position-y': data.backgroundPositionY,
//             'left': position.left + 10,
//             'display': 'block'
//           });

//           // exit
//           return;
//         }
//       }
//     });

//     // mouse leaving the control bar
//     controlBar.on('mouseout', '.vjs-progress-control', function () {
//       // hidding thumbnail
//       controlBar.find('.vjs-thumbnail').css('display', 'none');
//     });

//     video.addEventListener('loadeddata', async function () {
//       video.pause();
//       var count = 1;
//       var id = 1;
//       var x = 0, y = 0;
//       var array = [];
//       var duration = parseInt(that.duration());

//       for (var i = 1; i <= duration; i++) {
//         array.push(i);
//       }

//       var canvas;
//       var i, j;

//       for (i = 0, j = array.length; i < j; i += horizontalItemCount) {
//         //
//         for (var startIndex of array.slice(i, i + horizontalItemCount)) {

//           var backgroundPositionX = x * thumbnailWidth;
//           var backgroundPositionY = y * thumbnailHeight;
//           var item = thumbnails.find(x => x.id === id);

//           if (!item) {
//             canvas = document.createElement('canvas');
//             canvas.width = thumbnailWidth * horizontalItemCount;
//             canvas.height = thumbnailHeight * verticalItemCount;

//             thumbnails.push({
//               id: id,
//               canvas: canvas,
//               sec: [{
//                 index: startIndex,
//                 backgroundPositionX: -backgroundPositionX,
//                 backgroundPositionY: -backgroundPositionY
//               }]
//             });
//           } else {
//             canvas = item.canvas;
//             item.sec.push({
//               index: startIndex,
//               backgroundPositionX: -backgroundPositionX,
//               backgroundPositionY: -backgroundPositionY
//             });
//           }

//           var context = canvas.getContext('2d');
//           video.currentTime = startIndex;

//           await new Promise(function (resolve) {
//             var event = function () {
//               //
//               context.drawImage(video, backgroundPositionX, backgroundPositionY,
//                 thumbnailWidth, thumbnailHeight);

//               x++;
//               video.removeEventListener('canplay', event);
//               //
//               resolve();
//             };

//             //
//             video.addEventListener('canplay', event);
//           });

//           // 1 thumbnail is generated completely
//           count++;
//         }

//         // reset x coordinate
//         x = 0;
//         // increase y coordinate
//         y++;

//         // checking for overflow
//         if (count > horizontalItemCount * verticalItemCount) {
//           count = 1;
//           x = 0;
//           y = 0;
//           id++;
//         }

//       }

//       // looping through thumbnail list to update thumbnail
//       thumbnails.forEach(function (item) {
//         // converting canvas to blob to get short url
//         item.canvas.toBlob(blob => item.data = URL.createObjectURL(blob), 'image/jpeg');

//         // deleting unused property
//         delete item.canvas;
//       });



//       console.log('done...');
//     });

//     // playing video to hit "loadeddata" event
//     video.play();
//   });
// };