import React, { useState, useEffect, useContext } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import AddPhotos from "./AddPhotos";
import CommentForm from "./CommentForm";
import AuthContext from "../store/AuthContext";
import CommentContainer from "./CommentContainer";
import HourglassDisabledOutlinedIcon from "@mui/icons-material/HourglassDisabledOutlined";
import Button from "@mui/material/Button";
import DeleteForeverIcon from "@mui/icons-material/DeleteForever";
import { useNavigate } from "react-router-dom";

const PlaceDetail = () => {
  const { id } = useParams();
  const [place, setPlace] = useState({});
  const authCtx = useContext(AuthContext);
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();

    axios
      .delete(`/api/places/${id}`)
      .then(() => {
        navigate("/");
      })
      .catch((err) => console.log(err));
  };

  useEffect(() => {
    axios.get(`/api/places/${id}`).then((res) => {
      setPlace(res.data);
    });
  }, [id]);

  console.log(authCtx.userId);

  return (
    <div className="placeDetail">
      <h1 className="placename">{place.placeName}</h1>
      {place.photos && (
        <img
          className="placemainimage"
          alt="place"
          src={place.photos[0].photoURL}
        />
      )}
      <div className="placeInfo">
        <h3>{place.location}</h3>
        <div className="daterange">
          <h4>Opened: {place.dateOpen}</h4>
          <HourglassDisabledOutlinedIcon />
          <h4>Closed: {place.dateClose}</h4>
        </div>
        {place.buildingStands ? (
          <h4>Building still stands today.</h4>
        ) : (
          <h4>Building is no longer there.</h4>
        )}
        <h4>Now in this location: {place.thereNow}</h4>
        <p className="description">{place.description}</p>
        <CommentContainer place={place} />
        {authCtx.token ? (
          <div className="addinfo">
            <CommentForm place={place} />
            <AddPhotos place={place} />
          </div>
        ) : null}
      </div>
      <h3>Photo Gallery</h3>
      <div className="photogallery">
        {place.photos &&
          place.photos.map((photos, id) => {
            return (
              <div className="photocard">
                <img
                  className="placephoto"
                  alt="place"
                  key={photos.id}
                  src={photos.photoURL}
                />
                <p className="photo_caption" key={photos.id}>
                  {photos.photoCaption}, circa {photos.yearTaken}
                </p>
              </div>
            );
          })}
      </div>
      {authCtx.userId === place.userId ? (
        <div className="deletebutton">
          <Button
            size="large"
            variant="contained"
            style={{
              backgroundColor: "#424949",
              color: "antiquewhite",
            }}
            // onClick={`if(confirm('Are you sure you want to delete this album?')) ${handleSubmit})`}
            onClick={handleSubmit}
          >
            Delete Place &nbsp; <DeleteForeverIcon />
          </Button>
        </div>
      ) : null}
    </div>
  );
};

export default PlaceDetail;
