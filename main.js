const vehicles = [
    {
        id: "1",
        model:"Motorhome Maui",
        engine_capacity: "3000cc",
        fuel: "Petrol",
        transmission: "Automatic",
        fit : "4",
        price_day : "280",
        img:"luxury.jpg"
        
    },
    {
        id: "2",
        model:"Mercedes Sprinter",
        engine_capacity: "2800cc",
        fuel: "Petrol",
        transmission: "Automatic",
        fit : "2",
        price_day : "180",
        img : "Mercedes+Sprinter+Campervan.jpg"
    },
    {
        id: "3",
        model:"Nissan Vanette",
        engine_capacity: "1800cc",
        fuel: "Petrol",
        transmission: "Manual",
        fit : "2",
        price_day : "110",
        img:"new-zealand-by-campervan-mountains.jpg"
    },
    {
        id: "4",
        model:"Toyota Hiace",
        engine_capacity: "2300cc",
        fuel: "Diesel",
        transmission: "Manual",
        fit : "2",
        price_day : "145",
        img:"new-zealand-campervan-campsites.jpg.webp"

    },
]


const hamburger = document.querySelector(".hamburger")

hamburger.addEventListener("click", function(){
    const right = document.querySelector(".right")
    right.classList.toggle("active")
})
// -----------------------------------------------------------------------

const navLink = document.querySelectorAll(".nav-link")

navLink.forEach(item=>{
    item.addEventListener("click", function(evt){
        const destination = evt.target.getAttribute("href").slice(1)
        console.log(destination)

        const element = document.querySelector(`.${destination}`)
        console.log(element)
        window.scrollTo({
            behavior:"smooth",
            top:element.offsetTop
        })
        const right = document.querySelector(".right")
        right.classList.remove("active")
    })
})

let bookNow = () =>{
    const pricing = document.querySelector(".pricing")
    window.scrollTo({
        behavior:"smooth",
        top: pricing.offsetTop
    })
}


// ---------------------------------------------------------------------------------

// import { vehicles } from "./utility.js"
// console.log(vehicles)
let basket = JSON.parse(localStorage.getItem("data")) || []
console.log(basket)

let display = () =>{

let displayVehicles = vehicles.map(item=>{
    let basket = JSON.parse(localStorage.getItem("data")) || []
    let search = basket.find((x)=>{
        return x.id === item.id
    })
    return `
    <div class="card card-dimension">
                <img src="${item.img}" class="card-img-top" alt="...">
                <div class="card-body">
                  <h5 class="card-title">${item.model}</h5>
                  <p class="card-text"><img src="engine.svg" width=30> ${item.engine_capacity}</p>
                  <p class="card-text"><img src="people.svg" width=30> Fit ${item.fit} Adults</p>
                  <p class="card-text"><img src="manual.svg" width=30> ${item.transmission}</p>
                  <p class="card-text"><img src="fuel.svg" width=30> ${item.fuel}</p>
                  <p class="card-text"><img src="dollar.svg" width=30> ${item.price_day} NZD</p>
                  <div id=product-id-${item.id} class="button-section">
                    <i onclick="decrement(${item.id})" class="fa-solid fa-minus fa-lg"></i>
                    <p id="${item.id}">No of Nights: ${search === undefined? 0:search.item} <p>
                    <i onclick="increment(${item.id})" class="fa-solid fa-plus fa-lg"></i>
                  </div>
                  <h3>$${search === undefined? 0:(search.item * item.price_day)} </h3>
                  

                </div>
            </div>
    `
})

displayVehicles = displayVehicles.join("")
const pricingContainer = document.querySelector(".pricing-container")
pricingContainer.innerHTML = displayVehicles
}

display()

let decrement = (e) =>{
    const selectedItem = document.getElementById(e)
    console.log(selectedItem)  
    let search = basket.find((x=>{
        return x.id === selectedItem.id
    }))

    if (search.item !== 0){
        search.item = search.item - 1
    } else {
        return
    }

    console.log(basket)
    localStorage.setItem("data", JSON.stringify(basket))
    updateCount(e) 
    display()

}

let increment = (e) =>{  
    const selectedItem = document.getElementById(e)
    console.log(selectedItem)  
    let search = basket.find((x=>{
        return x.id === selectedItem.id
    }))

    if (search === undefined){
        basket.push({
            id: selectedItem.id,
            item: 1
        }) 
    } else {
        search.item = search.item + 1
    }

    updateCount(e)
    localStorage.setItem("data", JSON.stringify(basket))
    console.log(basket)
    display()
}

let updateCount = (e) =>{
    const selectedItem = document.getElementById(e)
    console.log(selectedItem)  
    let search = basket.find((x=>{
        return x.id === selectedItem.id
    }))

    selectedItem.innerHTML = `No of Nights: ${search.item}`

}

// ---------------------------------------------------------------------------------//
// Autocomplete Search Bar

const placesArray = [
    "Auckland", "Christchurch", "Wellington",
    "Hamilton", "Tauranga", "Dunedin",
    "Palmerston North", "Whangarei", "Nelson", "New Plymouth",
    "Hastings", "Rotorua", "Napier", "Invercargill", "Whanganui","Gisborne"
]

const pickUpPoint = document.querySelector(".pickup-point")
const endPoint = document.querySelector(".end-point")

pickUpPoint.addEventListener("keyup", function(e){
    let emptyArray = []
    console.log(e.target.value)
    let location = e.target.value
    const suggestion2 = document.querySelector(".suggestion-2")
    suggestion2.classList.remove("active")

    if(location){
        emptyArray = placesArray.filter(item=>{
            //filtering the array value and return similar letters. 
            return item.toLocaleLowerCase().startsWith(location.toLocaleLowerCase())
        })

        emptyArray = emptyArray.map(item=>{
            console.log(item)
            return `<li id=${item}>${item}</li>`
        })

        showSuggestions(emptyArray)
        const suggestion = document.querySelector(".suggestion-1")
        const li = suggestion.querySelectorAll("li")
        console.log(li)

        for (let i of li){
            i.setAttribute("onclick", "select(this)")
        }

        //this is the correct one!!!
        // li.forEach(item=>{
        //     console.log(item)
        //     document.getElementById(item.id).addEventListener("click", function(){
        //         pickUpPoint.value = item.id
        //         suggestion.classList.remove("active")
        //     })

        // })

        // for (let i of li){
        //     console.log(i)
        //     i.setAttribute("onclick", "selectData(element)");
        //     console.log([i])
        // }



    } else {
        const suggestion = document.querySelector(".suggestion-1")
        console.log("no result")
        suggestion.classList.remove("active")
    }
})

endPoint.addEventListener("keyup", function(e){
    let emptyArray = []
    let destination = e.target.value
    const suggestion1 = document.querySelector(".suggestion-1")
    suggestion1.classList.remove("active")


    if (destination){
        emptyArray = placesArray.filter(item=>{
            return item.toLocaleLowerCase().startsWith(destination.toLocaleLowerCase())
        })

        emptyArray = emptyArray.map(item=>{
            return `<li>${item}</li>`
        })
        displaySuggestions(emptyArray)
        console.log(emptyArray)
        const suggestion = document.querySelector(".suggestion-2")
        const li = suggestion.querySelectorAll("li")
        
        for (let x  of li){
            x.setAttribute("onclick", "select2(this)")
            console.log(x)
        }


    } else {
        const suggestion = document.querySelector(".suggestion-2")
        suggestion.classList.remove("active")
    }

   


})

function userChoice(element){
    console.log(element.textContent)
}


let displaySuggestions = (list) =>{
    let listData

    listData = list
   
    if (listData.length !== 0){
        listData = list.join("")
        const suggestion = document.querySelector(".suggestion-2")
        suggestion.innerHTML = listData
        suggestion.classList.add("active")
    } else {
        const suggestion = document.querySelector(".suggestion-2")
        suggestion.classList.add("active")
        suggestion.innerHTML = "no results"
    }
}


function select(element){
    console.log(element.textContent)
    let selectData = element.textContent
    pickUpPoint.value = selectData
    const suggestion = document.querySelector(".suggestion-1")
    
    suggestion.classList.remove("active")
}

function select2(element){
    console.log(element.textContent)
    let selectData = element.textContent
    endPoint.value = selectData
    const suggestion = document.querySelector(".suggestion-2")
    
    suggestion.classList.remove("active")
}

let showSuggestions = (list) =>{
    let listData
    console.log(list)
    if(list.length !== 0){
        listData = list.join("")
        const suggestion = document.querySelector(".suggestion-1")
        suggestion.innerHTML = listData

        suggestion.classList.add("active") 

    } else {
        const suggestion = document.querySelector(".suggestion-1")
        suggestion.innerHTML = "no results"
        suggestion.classList.add("active") 
    }

}

// ---------------------------------------------------------------------------------------//
// FAQs

const questions = document.querySelectorAll(".question-container")

questions.forEach(question =>{
    const button = question.querySelector(".question-button")
    button.addEventListener("click", function(){
        question.classList.toggle("active")

        questions.forEach(item=>{
            // console.log(item)
            if (item !== question ){
                console.log("it is working")
                item.classList.remove("active")
            }
        })
    })
})