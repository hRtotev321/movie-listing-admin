import * as React from "react";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import { useLoading } from "../../app/hooks";
import { deleteMovie } from "../../firebase/firebase";
import { Typography } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { ROUTES } from "../../app/enums";

type ConfirmDeleteDialogType = {
  displayName?: string;
  movieId?: string;
};

const ConfirmDeleteDialog: React.FC<ConfirmDeleteDialogType> = ({
  displayName,
  movieId,
}) => {
  const { loading, setLoadingState } = useLoading();
  const [open, setOpen] = React.useState(false);
  const navigate = useNavigate();

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleConfirmDelete = async () => {
    try {
      setLoadingState(true);
      await deleteMovie(movieId as string);
      navigate(ROUTES.HOME);
      handleClose();
    } catch (error) {
    } finally {
      setLoadingState(false);
    }
  };

  return (
    <>
      <Button onClick={handleClickOpen} color="error" variant="contained">
        delete
      </Button>
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle id="alert-dialog-title">
          {"Delete Movie Forever?"}
        </DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            <Typography align="center" fontWeight={700}>
              Are you sure you want to delete "{displayName}"?
            </Typography>
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button
            variant="outlined"
            color="primary"
            disabled={loading}
            onClick={handleClose}
          >
            Cancel
          </Button>
          <Button
            variant="contained"
            color="error"
            disabled={loading}
            onClick={handleConfirmDelete}
            autoFocus
          >
            Confirm
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
};

export default ConfirmDeleteDialog;
