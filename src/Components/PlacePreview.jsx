import React from 'react'
import {useNavigate} from "react-router-dom"

const PlacePreview = ({places}) => {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate(`/api/places/${places.id}`);
  };


  return (
    <div>
      <h1>{places.placeName}</h1>
      <p>{places.location}</p>
      <button onClick={handleClick}>See More</button>
    </div>
  )
}

export default PlacePreview