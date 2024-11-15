import React from 'react'
import HomeHeader from '../header/HomeHeader'
import image from '../header/bookshelf.png'

export const TrainerHome = () => {
  return (
    <>
    <HomeHeader/>

    <div style={{position : "absolute", top : "50%", left : "50%",  translate : "-50% -50%", textAlign : "center", border : "solid 2px orange", borderRadius : "2vh", padding : "2vh 2vw"}}>

    <img src= {image} alt="Bookshelf"></img>


      <p>Welcome to our online book catalogue, your one-stop shop for discovering and exploring a vast collection of books. Our user-friendly platform allows you to effortlessly search, browse, and discover books across various genres. Whether you're a seasoned reader or just starting your literary journey, you'll find something to pique your interest. Dive into captivating stories, gain knowledge from insightful non-fiction, or simply relax with a good book. Join our community of book lovers today and embark on a reading adventure!</p>
      </div>
   
</>
    
  )
}

export default TrainerHome