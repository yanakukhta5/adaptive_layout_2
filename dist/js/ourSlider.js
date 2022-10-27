function ourSlider(){

const ourSlider = document.querySelector('#ourSlider').firstElementChild
const ourArrows = document.querySelector('#ourButtons')
const [ourPrev, ourNext] = Array.from(ourArrows.children)
let ourLeftPosition = 0
let ourSlideWidth = 100
let maxOurSliderLeft = -(document.querySelectorAll('.our-slide').length - 1) * 100
let swipeStart = 0
let swipe = 0
let swipeEnd = 0

function arrowsCheck(position, maxPrevPosition, maxNextPosition, prevArrow, nextArrow){
 if(position === maxPrevPosition) prevArrow.disabled = true
 else prevArrow.disabled = false
 if(position === maxNextPosition) nextArrow.disabled = true
 else nextArrow.disabled = false
}
arrowsCheck(ourLeftPosition, 0, maxOurSliderLeft, ourPrev, ourNext)

ourArrows.addEventListener('click', (event) => {
 if(event.target === ourNext) ourLeftPosition -= ourSlideWidth
 if(event.target === ourPrev) ourLeftPosition += ourSlideWidth
 ourSlider.style.left = `${ourLeftPosition}%`
 arrowsCheck(ourLeftPosition, 0, -200, ourPrev, ourNext)
})

ourSlider.addEventListener('touchstart', (event) => {
 swipeStart = parseInt(event.changedTouches[0].pageX)
}, false)

ourSlider.addEventListener('touchmove', (event) => {
 swipe = swipeStart - parseInt(event.changedTouches[0].pageX)
 ourSlider.style.left = `${ourLeftPosition - swipe}%`
}, false)

ourSlider.addEventListener('touchend', () => {
 ourSlider.style.left = `${ourLeftPosition}%`
 if(swipe > 100 && ourLeftPosition !== -200) ourLeftPosition -= ourSlideWidth
 if(swipe < 100  && ourLeftPosition !== 0) ourLeftPosition += ourSlideWidth
 ourSlider.style.left = `${ourLeftPosition}%`
 arrowsCheck(ourLeftPosition, 0, -200, ourPrev, ourNext)
 swipe = 0
 swipeStart = 0 
}, false)

}

module.exports = ourSlider