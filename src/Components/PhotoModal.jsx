import * as React from "react";
import { useState } from "react";
import PropTypes from "prop-types";
import clsx from "clsx";
import { styled, Box } from "@mui/system";
import ModalUnstyled from "@mui/base/ModalUnstyled";

const BackdropUnstyled = React.forwardRef((props, ref) => {
  const { open, className, ...other } = props;
  return (
    <div
      className={clsx({ "MuiBackdrop-open": open }, className)}
      ref={ref}
      {...other}
    />
  );
});

BackdropUnstyled.propTypes = {
  className: PropTypes.string.isRequired,
  open: PropTypes.bool,
};

const Modal = styled(ModalUnstyled)`
  position: fixed;
  z-index: 1300;
  right: 0;
  bottom: 0;
  top: 0;
  left: 0;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const Backdrop = styled(BackdropUnstyled)`
  z-index: -1;
  position: fixed;
  right: 0;
  bottom: 0;
  top: 0;
  left: 0;
  background-color: rgba(0, 0, 0, 0.5);
  -webkit-tap-highlight-color: transparent;
`;

const style = (theme) => ({
  width: "35%",
});

export default function ModalUnstyledDemo({ place }) {
  const [showImageModal, setShowImageModal] = useState(false);
  const handleShowImageModal = (id) => setShowImageModal(id);
  const handleCloseImageModal = () => setShowImageModal(undefined);

  return (
    <div className="photogallery">
      {place.photos &&
        place.photos.map((photos, id) => {
          return (
            <div className="photocard" key={photos.id}>
              <img
                className="placepreviewphoto"
                alt="place"
                src={photos.photoURL}
                onClick={() => handleShowImageModal(id)}
              />
              <p className="photo_caption">
                {photos.photoCaption}, circa {photos.yearTaken}
              </p>
              <Modal
                aria-labelledby="unstyled-modal-title"
                aria-describedby="unstyled-modal-description"
                open={showImageModal === id}
                onClose={handleCloseImageModal}
                slots={{ backdrop: Backdrop }}
              >
                <Box sx={style}>
                  <img
                    className="placephoto"
                    alt="place"
                    src={photos.photoURL}
                  />
                </Box>
              </Modal>
            </div>
          );
        })}
    </div>
  );
}
