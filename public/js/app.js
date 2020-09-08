//console.log('CLient side js file is loaded! (nigga)')




const weatherForm = document.querySelector('form')
const search = document.querySelector('input')
var messageSuccess = document.getElementById('success')
var messageError = document.getElementById('error')




weatherForm.addEventListener('submit', (e)=> {
    e.preventDefault()
    messageSuccess.textContent = 'loading...'
    messageError.textContent = ''

    const location = search.value
    
    fetch('http://localhost:3000/weather?address=' + location).then((response) => {
    response.json().then(({data, location, error})=> {
        messageSuccess.textContent = ''
        if(error) {  console.log(error);messageError.textContent = error }
        else{console.log(data, location);messageSuccess.textContent = location +': ' + data}

    })

})
}) 