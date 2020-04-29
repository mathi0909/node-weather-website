console.log("loaded in the js file ")

// fetch("http://localhost:3000/weather?address=bangalore").then(res=>{

//     res.json().then(x=>{
//         if(x.error){
//             console.log(x.error)
//         }else{
//            console.log(x.forecast) 
//            console.log(x.location) 
//         }
//     })

// })

const weatherForm = document.querySelector('form')
const add = document.querySelector('input')
var msg1 = document.querySelector('#msg1')
var msg2 = document.querySelector('#msg2')

weatherForm.addEventListener('submit',(e)=>{
    e.preventDefault()
    const address = add.value

    msg2.textContent = ""
    msg1.textContent ="Loading .....,"
     
    fetch("/weather?address="+ encodeURIComponent(address)).then(res=>{

    res.json().then(x=>{
        if(x.error){
            console.log(x.error)
            msg2.textContent = x.error
        }else{
           console.log(x.forecast) 
           console.log(x.location) 
           msg1.textContent =x.location
           msg2.textContent =x.forecast  
        }
    })

})


})