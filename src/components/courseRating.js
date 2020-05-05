import  React,{useState} from "react";
import {FaStar} from 'react-icons/fa';

const StarRating =()=>{
  const[ rating, setRating] = useState('');
  const[ hover, setHover] = useState('');
  return (
    <div>
      {[...Array(6)].map((star, i) => { 
        const ratingValue = i++ ;
      return(
        <label key={Array.index} >
          <input type="radio" style ={{display:"none"}} name="rating" value ="ratingValue" 
          onClick = {()=>setRating(ratingValue)} 
          
           />
          <FaStar 
          className = "pointer" 
          onMouseEnter = {()=>setHover(ratingValue)}
          onMouseLeave = {()=>setHover(null)}
          color={ratingValue <= (hover ||rating ) ? "#ffc107" : "#e4e5e9 "}
          size = {20} 
           />
        </label>
       
        );
       })} 
       {/* <div>{`${rating}? rated ${rating}: ""`}</div> */}
     </div>
  )
};

export default StarRating;