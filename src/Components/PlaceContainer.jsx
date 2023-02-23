import React from "react";
import PlacePreview from "./PlacePreview";

const PlaceContainer = ({ places }) => {
  const placeDisplay = places.map((places, id) => {
    return <PlacePreview key = {places.id} places={places} />;
  });
  return <div className="placecontainer">{placeDisplay}</div>;
};

export default PlaceContainer;
