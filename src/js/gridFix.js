let pictures = Array.from(document.getElementsByTagName('picture'))

function addClass(p){
 let classes = p.children[1].className
 p.classList.toggle(classes)
}

pictures.forEach(p => p.querySelector('.our-work') ? addClass(p) : null)