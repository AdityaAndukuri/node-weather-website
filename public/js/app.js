//console.log('Client side javascript file is loaded')
//the above statement will be seen on browser's console


weatherForm = document.querySelector('form')
searchElement = document.querySelector('input')
messageOne = document.querySelector('#message-1') //'.className'
messageTwo = document.querySelector('#message-2')
//console.log(document)

//submit is the event name
weatherForm.addEventListener('submit', (event)=>{
    event.preventDefault() //the default action of form submission is to refresh the page so logs in console are clared off after 0.1 sec, to prevent it, this is used
    console.log('test')
    messageOne.textContent = 'Loading....'
    messageTwo.textContent = ''

    const address = searchElement.value

    //for client side validation
    // if(!address)
    // {
    //     return console.log('Provide address')
    // }
    fetch('http://localhost:3000/weather?address='+address).then((response)=>{
    response.json().then((data)=>{
        //console.log(data)
        if(data.error){
            console.log(data.error)
            messageOne.textContent = data.error
        }
        else{
            console.log(data.location)
            console.log(data.address)
            console.log(data.forecast)
            messageOne.textContent = data.location
            messageTwo.textContent = data.forecast
        }
    })
})

})