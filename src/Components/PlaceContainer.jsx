import React, { useState } from "react";
import PlacePreview from "./PlacePreview";
import TextField from "@mui/material/TextField";

const PlaceContainer = ({ places }) => {
  const [search, setSearch] = useState("");
  const placeDisplay = places
    .filter((places, index) => {
      let query = places.placeName.toLowerCase();
      let searchParams = search.toLowerCase();
      return query.includes(searchParams);
    })
    .map((places, index) => {
      return <PlacePreview key={places.id} places={places} />;
    });
  return (
    <div className="homepage">
      <TextField
        className="search_places"
        id="search_places"
        label="Search Places"
        variant="outlined"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />
      <div className="placecontainer">{placeDisplay}</div>
    </div>
  );
};

export default PlaceContainer;
