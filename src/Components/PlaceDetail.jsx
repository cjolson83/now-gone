import React, {useState, useEffect} from 'react'
import { useParams } from 'react-router-dom';
import axios from "axios"

const PlaceDetail = () => {
  const {id} = useParams();
  const [place, setPlace] = useState({})

  useEffect(() => {
    axios
      .get(`/api/places/${id}`)
      .then((res) => {
      console.log(res.data);
    });
  }, []);


  return (
    <div>PlaceDetail</div>
  )
}

export default PlaceDetail