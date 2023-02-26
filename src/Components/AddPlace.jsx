import React, { useState, useContext, useEffect } from "react";
import TextField from "@mui/material/TextField";
import Stack from "@mui/material/Stack";
import FormControlLabel from "@mui/material/FormControlLabel";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Radio from "@mui/material/Radio";
import RadioGroup from "@mui/material/RadioGroup";
import FormLabel from "@mui/material/FormLabel";
import MenuItem from "@mui/material/MenuItem";
import InputLabel from "@mui/material/InputLabel";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import AuthContext from "../store/AuthContext";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import Autocomplete from "../Components/Location";
import DomainAddIcon from "@mui/icons-material/DomainAdd";

const AddPlace = () => {
  const { token, userId } = useContext(AuthContext);
  const navigate = useNavigate();
  const [placeName, setPlaceName] = useState("");
  const [placeType, setPlaceType] = useState([]);
  const [selectedPlaceType, setSelectedPlaceType] = useState("");
  const [location, setLocation] = useState("");
  const [dateOpen, setDateOpen] = useState("");
  const [dateClose, setDateClose] = useState("");
  const [buildingStands, setBuildingStands] = useState(true);
  const [thereNow, setThereNow] = useState("");
  const [description, setDescription] = useState("");
  const [photoURL, setPhotoURL] = useState("");
  const [yearTaken, setYearTaken] = useState("");
  const [photoCaption, setPhotoCaption] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();

    axios
      .post(
        "/api/places",
        {
          userId,
          placeName,
          selectedPlaceType,
          location,
          dateOpen,
          dateClose,
          thereNow,
          description,
          buildingStands,
          photoURL,
          yearTaken,
          photoCaption,
        },
        {
          headers: {
            authorization: token,
          },
        }
      )
      .then(() => {
        navigate("/");
      })
      .catch((err) => console.log(err));
  };

  useEffect(() => {
    axios
      .get("/api/types")
      .then((res) => {
        setPlaceType(res.data);
      })
      .catch((err) => console.log(err));
  }, []);

  function getAddress(address) {
    setLocation(address.description);
  }

  return (
    <div className="addForm">
      <Box
        sx={{
          width: 600,
          maxWidth: "100%",
        }}
      >
        <Stack noValidate spacing={3}>
          <TextField
            id="placeName"
            label="Name"
            variant="outlined"
            value={placeName}
            onChange={(e) => setPlaceName(e.target.value.toUpperCase())}
          />
          <FormControl fullWidth>
            <InputLabel id="place-type">Place Type</InputLabel>
            <Select
              labelId="place-type"
              id="demo-simple-select"
              label="Place Type"
              style={{
                textAlign: "left",
              }}
              value={selectedPlaceType}
              onChange={(e) => setSelectedPlaceType(e.target.value)}
            >
              {placeType.map((type) => {
                return (
                  <MenuItem key={type.id} value={type.id}>
                    {type.typeName}
                  </MenuItem>
                );
              })}
            </Select>
          </FormControl>
          <TextField
            id="description"
            multiline
            maxRows={4}
            label="Description"
            variant="outlined"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />
          <Autocomplete
            id="address1"
            label="Address 1"
            value={location}
            getAddress={getAddress}
            onChange={(e) => setLocation(e.target.value.description)}
          />
          <div className="datescontainer">
            <TextField
              id="dateopened"
              label="Date Opened"
              type="date"
              sx={{ width: 220 }}
              InputLabelProps={{
                shrink: true,
              }}
              value={dateOpen}
              onChange={(e) => setDateOpen(e.target.value)}
            />
            <TextField
              id="dateclosed"
              label="Date Closed"
              type="date"
              sx={{ width: 220 }}
              InputLabelProps={{
                shrink: true,
              }}
              value={dateClose}
              onChange={(e) => setDateClose(e.target.value)}
            />
            <FormControl>
              <FormLabel
                id="demo-row-radio-buttons-group-label"
                sx={{
                  fontSize: 16,
                  textAlign: "left",
                }}
              >
                Building Stands?
              </FormLabel>
              <RadioGroup
                row
                aria-labelledby="demo-row-radio-buttons-group-label"
                name="row-radio-buttons-group"
                value={buildingStands}
                onChange={(e) => setBuildingStands(e.target.value)}
              >
                <FormControlLabel
                  value="true"
                  control={<Radio size="small" />}
                  label="Yes"
                  size="small"
                />
                <FormControlLabel
                  value="false"
                  control={<Radio size="small" />}
                  label="No"
                  size="small"
                />
              </RadioGroup>
            </FormControl>
          </div>
          <TextField
            id="thereNow"
            label="What's There Now?"
            variant="outlined"
            multiline
            maxRows={2}
            value={thereNow}
            onChange={(e) => setThereNow(e.target.value)}
          />
          <Stack component="form" noValidate spacing={3}>
            <FormControl sx={{ width: "100%" }}>
              <TextField
                id="photo_url"
                label="Photo URL"
                variant="outlined"
                value={photoURL}
                onChange={(e) => setPhotoURL(e.target.value)}
              />
            </FormControl>
            <div className="photoinput">
              <FormControl sx={{ width: "70%" }}>
                <TextField
                  id="photo_caption"
                  label="Photo Caption / Credit"
                  variant="outlined"
                  value={photoCaption}
                  onChange={(e) => setPhotoCaption(e.target.value)}
                />
              </FormControl>
              <FormControl sx={{ width: "25%" }}>
                <TextField
                  id="year_taken"
                  label="Photo Year"
                  variant="outlined"
                  value={yearTaken}
                  onChange={(e) => setYearTaken(e.target.value)}
                />
              </FormControl>
            </div>
          </Stack>
          <div className="bottomformdiv">
            <Button
              size="large"
              variant="contained"
              style={{
                backgroundColor: "#424949",
                color: "antiquewhite",
              }}
              onClick={handleSubmit}
            >
              Submit &nbsp; <DomainAddIcon />
            </Button>
          </div>
        </Stack>
      </Box>
    </div>
  );
};

export default AddPlace;
