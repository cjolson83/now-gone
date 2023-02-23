import React, { useState, useEffect } from "react";
import axios from "axios";
import PlaceContainer from "./PlaceContainer";


const Home = () => {
  const [places, setPlaces] = useState([]);

  const getAllPlaces = () => {
    axios.get("/api/places").then((res) => {
      setPlaces(res.data);
      console.log(res.data);
    });
  };

  useEffect(() => {
    getAllPlaces()
  }, [])

  return (
      <PlaceContainer places={places}/>
  );
};

export default Home;
