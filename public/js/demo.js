console.log("This is a JS Static File")

const weatherForm = document.querySelector('form')
const searchLocation = document.querySelector('input')
const message1 = document.querySelector('#message-1')
const message2 = document.querySelector('#message-2')
weatherForm.addEventListener('submit', (e) => {
    e.preventDefault()
    message1.textContent = 'Loading...'
    message2.textContent=''
    const location = searchLocation.value
    fetch('/weather?address=' + location).then((response) => {
        response.json().then((data) => {
            if (data.error) {
                message1.textContent = data.error
            }
            else {
                message1.textContent = data.Place
                message2.textContent = data.weather + ". Temperature : "+ data.temperature
            }
        })
    })
})
