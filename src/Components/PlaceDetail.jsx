import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";

const PlaceDetail = () => {
  const { id } = useParams();
  const [place, setPlace] = useState({});

  useEffect(() => {
    axios.get(`/api/places/${id}`).then((res) => {
      setPlace(res.data);
    });
  }, []);

  console.log(place);
  return (
    <div>
      <h1>{place.placeName}</h1>
      {place.photos &&
        place.photos.map((photos, id) => {
          return <img src={photos.photoURL} />;
        })}
      <h3>{place.location}</h3>
      <p>Opened: {place.dateOpen}</p>
      <p>Closed: {place.dateClose}</p>
      {place.buildingStands ? (
        <p>Building still stands today.</p>
      ) : (
        <p>Building is no longer there.</p>
      )}
      <p>Now in this location: {place.thereNow}</p>
      <p>{place.description}</p>
    </div>
  );
};

export default PlaceDetail;
