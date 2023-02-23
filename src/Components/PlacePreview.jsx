import React from "react";
import { useNavigate } from "react-router-dom";

const PlacePreview = ({ places }) => {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate(`/api/places/${places.id}`);
  };

  console.log(places);

  return (
    <div
      className="placepreview"
      style={{
        background: `linear-gradient(
          190deg,
          rgba(0, 0, 0, 0.5),
          rgba(0, 0, 0, 0.5)),
          url(${places.photos[0].photoURL})`,
        backgroundRepeat: "no-repeat",
        backgroundSize: "cover"
      }}
      onClick={handleClick}
    >
      <div className="placepreviewinfo">
        <h3>{places.placeName}</h3>
        <p>{places.location}</p>
      </div>
    </div>
  );
};

export default PlacePreview;
