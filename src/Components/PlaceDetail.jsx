import React, { useState, useEffect, useContext } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import AddPhotos from "./AddPhotos";
import CommentForm from "./CommentForm";
import AuthContext from "../store/AuthContext";
import CommentContainer from "./CommentContainer";

const PlaceDetail = () => {
  const { id } = useParams();
  const [place, setPlace] = useState({});
  const authCtx = useContext(AuthContext);

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
          return <img alt="place" key={photos.id} src={photos.photoURL} />;
        })}
        {place.photos &&
        place.photos.map((photos, id) => {
          return <p key={photos.id}>{photos.photoCaption}, circa {photos.yearTaken}</p>;
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
      {authCtx.token ? (<div><AddPhotos place={place}/>
      <CommentForm place={place}/></div>):(null)}
      <CommentContainer place={place}/>
    </div>
   
  );
};

export default PlaceDetail;
