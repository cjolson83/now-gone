import React, { useState, useEffect, useContext } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import AddPhotos from "./AddPhotos";
import CommentForm from "./CommentForm";
import AuthContext from "../store/AuthContext";
import CommentContainer from "./CommentContainer";
import HourglassDisabledOutlinedIcon from '@mui/icons-material/HourglassDisabledOutlined';

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
    <div className="placeDetail">
      <h1 className="placename">{place.placeName}</h1>
      {place.photos &&
        place.photos.map((photos, id) => {
          return <img alt="place" key={photos.id} src={photos.photoURL} />;
        })}
        {place.photos &&
        place.photos.map((photos, id) => {
          return <p className="photo_caption" key={photos.id}>{photos.photoCaption}, circa {photos.yearTaken}</p>;
        })}
      <div className="placeInfo">
      <h3>{place.location}</h3>
      <div className="daterange">
      <p>Opened: {place.dateOpen}</p>
      <HourglassDisabledOutlinedIcon/>
      <p>Closed: {place.dateClose}</p>
      </div>
      {place.buildingStands ? (
        <p>Building still stands today.</p>
      ) : (
        <p>Building is no longer there.</p>
      )}
      <p>Now in this location: {place.thereNow}</p>
      <p className="description">{place.description}</p>
      <CommentContainer place={place}/>
      {authCtx.token ? (<div className="addinfo"><CommentForm place={place}/><AddPhotos place={place}/></div>):(null)}
      </div>
    </div>
   
  );
};

export default PlaceDetail;
