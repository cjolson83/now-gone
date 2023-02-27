import React, { useState } from "react";
import PlacePreview from "./PlacePreview";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";

const PlaceContainer = ({ places }) => {
  const [search, setSearch] = useState("");
  const [searchLocation, setSearchLocation] = useState("");
  const [searchBy, setSearchBy] = useState(false);
  const placeDisplay = places
    .sort((a, b) => a.placeName.localeCompare(b.placeName))
    .filter((places, index) => {
      let query = places.location.toLowerCase();
      let searchParams = searchLocation.toLowerCase();
      return query.includes(searchParams);
    })
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
      <div className="searchby">
        {searchBy ? (
          <TextField
            className="search_places"
            id="search_by_name"
            label="Search by Location"
            variant="outlined"
            value={searchLocation}
            onChange={(e) => setSearchLocation(e.target.value)}
          />
        ) : (
          <TextField
            className="search_places"
            id="search_by_name"
            label="Search by Name"
            variant="outlined"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        )}
        <Button
          onClick={() => setSearchBy(!searchBy)}
          style={{
            color: "#424949",
          }}
        >
          Search by {searchBy ? "Name" : "Location"}?
        </Button>
      </div>
      <div className="placecontainer">{placeDisplay}</div>
    </div>
  );
};

export default PlaceContainer;
