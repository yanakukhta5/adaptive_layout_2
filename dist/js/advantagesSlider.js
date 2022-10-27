const advantagesSliders = Array.from(document.querySelectorAll('.advantagesSlider'))
const activeSlides = {
 product: 0,
 package: 0
}
const slidesCountObj = {}

const buttonActivatorArr = Array.from(document.querySelectorAll('.advantagesButtons'))

function advantagesSliderFill(slider, slidesCount, distSrc){
 for(let i = 1; i <= slidesCount; i++){
  const slide = document.createElement('div')
  slide.classList.toggle('advantages-slide')
  const img = document.createElement('img')
  img.classList.toggle('advantages-slide__img')
  img.alt = "Slider content: image"
  img.src = `img/advantages/${distSrc}/_${i}.png`
  slide.append(img)
  slider.append(slide)
 }
 const sliderData = slider.dataset.slider
 toggleClasses(Array.from(slider.children), activeSlides[sliderData]-1, true)
}

function toggleClasses(arr, startPos, isNext){
 if(isNext) startPos +=1
 else startPos -=1
 while(startPos > arr.length-1) startPos -= arr.length
 while(startPos < 0) startPos += arr.length
 arr.forEach(elem => elem.classList.remove('advantages-slide__first', 'advantages-slide__second', 'advantages-slide__third'))
 if(startPos == arr.length - 2){
  arr[0].classList.toggle('advantages-slide__third')
  arr[startPos].classList.toggle('advantages-slide__first')
  arr[startPos+1].classList.toggle('advantages-slide__second')
 }
 else {
 if(startPos == arr.length - 1){
  arr[0].classList.toggle('advantages-slide__second')
  arr[1].classList.toggle('advantages-slide__third')
  arr[startPos].classList.toggle('advantages-slide__first')
 }
 if(startPos < arr.length-1){
 arr[startPos].classList.toggle('advantages-slide__first')
 arr[startPos+1].classList.toggle('advantages-slide__second')
 arr[startPos+2].classList.toggle('advantages-slide__third')
 }
}
return startPos
}

function textFill(p){
 const [spanCurr, spanAll] = Array.from(p.children)
 const slider = p.dataset.slider
 spanCurr.innerHTML = activeSlides[slider] + 1
 spanAll.innerHTML = slidesCountObj[slider]
}

function addMoveEvent(buttonsWrapper){
 const slider  = document.querySelector(`.advantages-slider[data-slider=${buttonsWrapper.dataset.slider}]`)
 const sliderData = slider.dataset.slider
 
 buttonsWrapper.addEventListener('click', (event) => {
 const [prevButton, text, nextButton] = Array.from(buttonsWrapper.children)
 const arr = Array.from(slider.children)
 if(event.target === nextButton){
  activeSlides[sliderData] = toggleClasses(arr, activeSlides[sliderData], true)
  textFill(document.querySelector(`p[data-slider=${sliderData}]`))
 }
 if(event.target === prevButton){
  activeSlides[sliderData] = toggleClasses(arr, activeSlides[sliderData], false)
  textFill(document.querySelector(`p[data-slider=${sliderData}]`))
 }
})
 let swipe = 0
 slider.addEventListener('touchstart', (event) => {
  swipeStart = parseInt(event.changedTouches[0].pageX)
 }, false)
 
 slider.addEventListener('touchmove', (event) => {
  swipe = swipeStart - parseInt(event.changedTouches[0].pageX)
 }, false)
 
 slider.addEventListener('touchend', () => {
  const arr = Array.from(slider.children)
  if(swipe > 100) activeSlides[sliderData] = toggleClasses(arr, activeSlides[sliderData], true)
  if(swipe < 100 && Math.abs(swipe) > 100) activeSlides[sliderData] = toggleClasses(arr, activeSlides[sliderData], false)
  textFill(document.querySelector(`p[data-slider=${sliderData}]`))
  swipe = 0
  swipeStart = 0 
 }, false)
}

buttonActivatorArr.forEach(elem => addMoveEvent(elem))
advantagesSliders.forEach(elem =>{
  const slidesCount = +elem.dataset.sliders
  const slider = elem.dataset.slider
  slidesCountObj[slider] = slidesCount
  advantagesSliderFill(elem, slidesCount, slider)
  textFill(document.querySelector(`p[data-slider=${slider}]`))
} )