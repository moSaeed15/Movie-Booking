const container=document.querySelector(".container");
const seats=document.querySelectorAll("row .seat:not(.occupied");
const count=document.getElementById("count");
const movieSelect=document.getElementById("movie");

populateUI();

let ticketPrice=+movieSelect.value;


//save selcted movie index and price
function setMovieData(movieIndex,moviePrice){
localStorage.setItem("selctedMovieIndex",movieIndex);
localStorage.setItem("selectedMoviePrice",moviePrice);
}

//update total and count
function updateSelectedCount(){
const selectedSeats=document.querySelectorAll(".row .seat.selected");

const seatsIndex=[...selectedSeats].map((seat)=> [...seats].indexOf(seat)
);

localStorage.setItem("selectedSeats",JSON.stringify(seatsIndex))

const selectedSeatsCount=selectedSeats.length;

count.innerText=selectedSeatsCount;
total.innerText=selectedSeatsCount*ticketPrice;

}

// get data from local Storage and populate UI
function populateUI(){
     const selectedSeats=JSON.parse(localStorage.getItem("selctedSeats"));
     if(selectedSeats !==null && selectedSeats.length>0){
         seats.forEach((seat,index)=>{
             if(selectedSeats.indexOf(index)>-1){
        seat.classList.add("selected");  
             }
         });
     }

      const selctedMovieIndex=localStorage.getItem("selectedMovieIndex");
        
      if(selctedMovieIndex !==null){
          movieSelect.selectedIndex=selctedMovieIndex;
      }

}

//movie select event
movieSelect.addEventListener("change",e=>{
ticketPrice=e.target.value;

setMovieData(e.target.selectedIndex,e.target.value);
updateSelectedCount(); 
})

//seat click event
container.addEventListener("click",e=>{
    
if(
e.target.classList.contains("seat") && 
!e.target.classList.contains("occupied")
){
e.target.classList.toggle("selected"); 
updateSelectedCount();        
}


});

//intial count and total set
updateSelectedCount();