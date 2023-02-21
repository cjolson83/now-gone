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
import AddPhotos from "./AddPhotos";

const AddPlace = () => {
  const { token, userId } = useContext(AuthContext);
  const navigate = useNavigate();
  const [placeName, setPlaceName] = useState("");
  const [placeType, setPlaceType] = useState([]);
  const [selectedPlaceType, setSelectedPlaceType] = useState("");
  const [location, setLocation] = useState('');
  const [dateOpen, setDateOpen] = useState("");
  const [dateClose, setDateClose] = useState("");
  const [buildingStands, setBuildingStands] = useState(true);
  const [thereNow, setThereNow] = useState("");
  const [description, setDescription] = useState("");

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
    setLocation(address.description)
  }

  console.log(userId)

  return (
    <div className="addForm">
      <Box
        sx={{
          width: 500,
          maxWidth: "100%",
        }}
      >
        <Stack component="form" noValidate spacing={3}>
          <TextField
            id="placeName"
            label="Name"
            variant="outlined"
            value={placeName}
            onChange={(e) => setPlaceName(e.target.value)}
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
              onChange={(e) => setSelectedPlaceType(e.target.value)}
            >
              {placeType.map((type) => {
                return <MenuItem key={type.id} value={type.id}>{type.typeName}</MenuItem>;
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
            getAddress = {getAddress}
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
          <AddPhotos/>
          <div className="bottomformdiv">
            <FormLabel id="demo-radio-buttons-group-label">
              Building Still Stands?
            </FormLabel>
            <RadioGroup
              row
              aria-labelledby="demo-radio-buttons-group-label"
              name="radio-buttons-group"
              value={buildingStands}
              onChange={(e) => setBuildingStands(e.target.value)}
            >
              <FormControlLabel value="true" control={<Radio />} label="Yes" />
              <FormControlLabel value="false" control={<Radio />} label="No" />
            </RadioGroup>
            <Button
              size="large"
              variant="contained"
              style={{
                backgroundColor: "#424949",
              }}
              onClick={handleSubmit}
            >
              Submit
            </Button>
          </div>
        </Stack>
      </Box>
      </div>
  );
};

export default AddPlace;
