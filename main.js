// html, css, select ce praviti problem za padding
// u css obavezno korisiti :not selector, perspective, transform(X)
// sve varijable, slozeni selektor za seats
// na klik seats pretvori ga u selected seat, a ne i occupied mesta
// dole treba da na osnovu selektovanog da pokazes broj selektovanih mesta i cenu
// na promenu opcije update cenu
// index svakog sedista za local storage, ...spread
// set to LocalStorage index of seats selected
// set to LocalStorage e.target.selectedIndex and price
// vrati sve nazad da radi

const container = document.querySelector('.container')
const seats = document.querySelectorAll('.row .seat:not(.occupied)')
const total = document.querySelector('#total')
let movieSelect = document.querySelector('#movie')

const count = document.querySelector('#count')


let ticketPrice = +movieSelect.value 

populateUI()

// sava selected movie and price 

function setMovieData(movieIndex, moviePrice){

  localStorage.setItem('selectedMovieIndex', movieIndex)
  localStorage.setItem('selectedMoviePrice', moviePrice)



}


function updateSelectedCount(){


  const selectedSeats = document.querySelectorAll('.row .seat.selected')

    //console.log(selectedSeats)




    const selectedSeatsCount = selectedSeats.length 

   // console.log(selectedSeatsCount)

   const seatsIndex = [...selectedSeats].map(seat=> [...seats].indexOf(seat))

   //console.log(seatsIndex)

   localStorage.setItem('selectedSeats', JSON.stringify(seatsIndex))


   count.innerHTML = selectedSeatsCount
   total.innerHTML = selectedSeatsCount * ticketPrice
}



container.addEventListener('click', (e)=>{



  if(e.target.classList.contains('seat') && !e.target.classList.contains('occupied')){

       //console.log(e.target)

       e.target.classList.toggle('selected')
  }


 updateSelectedCount()



})

movieSelect.addEventListener('change',(e)=>{


  ticketPrice = +e.target.value 

  setMovieData(e.target.selectedIndex, e.target.value)

  updateSelectedCount()



})


function populateUI(){

  const selectedSeats = JSON.parse(localStorage.getItem('selectedSeats'))


    //console.log(selectedSeats)

  if(selectedSeats !== null && selectedSeats.length > 0){

    seats.forEach((seat, index)=>{

        if(selectedSeats.indexOf(index) > -1){

            seat.classList.add('selected')

        }


    })
  }


  const selectedMovieIndex = localStorage.getItem('selectedMovieIndex')

   if(selectedMovieIndex !== null){

    movieSelect.selectedIndex = selectedMovieIndex
   }

}

updateSelectedCount()

