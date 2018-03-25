require('b:uikit').then(module => {
    console.log(module.default)
})

let elements = document.querySelectorAll('.button')

elements && console.log('buttons', elements.length)
