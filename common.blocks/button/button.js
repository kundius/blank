// require('b:uikit').then(module => {
//     console.log(module.default)
// })

let elements = document.querySelectorAll('.button')

elements && elements.forEach(el => {
    el.addEventListener('click', () => {
        require('b:input').then(module => {
            let input = document.createElement('input')
            input.classList.add('input')
            el.parentNode.appendChild(input)
        })
    })
})
