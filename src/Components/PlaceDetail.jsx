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
import ModalUnstyledDemo from "../Components/PhotoModal";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import Dialog from "@mui/material/Dialog";
import Accordion from "@mui/material/Accordion";
import AccordionSummary from "@mui/material/AccordionSummary";
import AccordionDetails from "@mui/material/AccordionDetails";
import Typography from "@mui/material/Typography";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";

const PlaceDetail = () => {
  const { id } = useParams();
  const [place, setPlace] = useState({});
  const authCtx = useContext(AuthContext);
  const navigate = useNavigate();
  const [open, setOpen] = useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

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
      </div>
      <div className="accordiandiv">
        <Accordion className="accordian">
          <AccordionSummary
            sx={{
              bgcolor: "antiquewhite",
            }}
            expandIcon={<ExpandMoreIcon />}
            aria-controls="panel1a-content"
            id="panel1a-header"
          >
            <Typography component={"span"} className="accordiantype">
              <h4>Stories</h4>
            </Typography>
          </AccordionSummary>
          <AccordionDetails className="accordian">
            <CommentContainer place={place} />
          </AccordionDetails>
        </Accordion>
        <Accordion className="accordian">
          <AccordionSummary
            sx={{
              bgcolor: "antiquewhite",
            }}
            expandIcon={<ExpandMoreIcon />}
            aria-controls="panel2a-content"
            id="panel2a-header"
          >
            <Typography component={"span"} className="accordiantype">
              <h4>Photo Gallery</h4>
            </Typography>
          </AccordionSummary>
          <AccordionDetails className="accordian">
            <div>
              <ModalUnstyledDemo place={place} />
            </div>
          </AccordionDetails>
        </Accordion>
        <Accordion className="accordian">
          <AccordionSummary
            expandIcon={<ExpandMoreIcon />}
            aria-controls="panel2a-content"
            id="panel2a-header"
            sx={{
              bgcolor: "antiquewhite",
            }}
          >
            <Typography component={"span"} className="accordiantype">
              <h4>Add to the Story</h4>
            </Typography>
          </AccordionSummary>
          <AccordionDetails className="accordian">
            {authCtx.token ? (
              <div className="addinfo">
                <CommentForm place={place} />
                <AddPhotos place={place} />
              </div>
            ) : (
              <p>Log into your account to be able to add stories and photos.</p>
            )}
          </AccordionDetails>
        </Accordion>
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
            onClick={handleClickOpen}
          >
            Delete Place &nbsp; <DeleteForeverIcon />
          </Button>
          <Dialog
            open={open}
            onClose={handleClose}
            aria-labelledby="alert-dialog-title"
            aria-describedby="alert-dialog-description"
            className="dialogbox"
          >
            <DialogTitle id="alert-dialog-title">
              {`Delete ${place.placeName}?`}
            </DialogTitle>
            <DialogContent>
              <DialogContentText id="alert-dialog-description">
                Clicking AGREE will permanently delete this place along with all
                associated photos and stories.
              </DialogContentText>
            </DialogContent>
            <DialogActions>
              <Button onClick={handleClose}>Disagree</Button>
              <Button onClick={handleSubmit} autoFocus>
                Agree
              </Button>
            </DialogActions>
          </Dialog>
        </div>
      ) : null}
    </div>
  );
};

export default PlaceDetail;
