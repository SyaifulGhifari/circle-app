import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import React from "react";
import DialogTitle from "@mui/material/DialogTitle";
import FormControl from "@mui/material/FormControl";
import IconButton from "@mui/material/IconButton";
import PhotoCamera from "@mui/icons-material/PhotoCamera";
import { stringAvatar } from "./CardPost";
import CardHeader from "@mui/material/CardHeader";
import { Button, TextField, Avatar, Box } from "@mui/material";

const DialogComponent = (props) => {
  return (
    <Dialog open={props.open} onClose={props.handleClose} fullWidth={true} maxWidth="sm">
      <DialogTitle>{props.title}</DialogTitle>
      <DialogContent>
        <DialogContentText>
          <CardHeader avatar={<Avatar {...stringAvatar(props.name?.toUpperCase())} />} title={props.name} />
        </DialogContentText>
        <Box
          noValidate
          component="form"
          sx={{
            display: "flex",
            flexDirection: "column",
            m: "auto",
            width: "100%",
          }}
        >
          <FormControl sx={{ mt: 2, minWidth: 120 }}>
            <TextField id="filled-multiline-static" label="Caption" multiline rows={4} variant="filled" fullWidth={true} value={props.caption} onChange={props.handleCaption} />
          </FormControl>
        </Box>
        <IconButton color="primary" aria-label="upload picture" component="label">
          <input hidden accept="image/*" type="file" />
          <PhotoCamera />
        </IconButton>
      </DialogContent>
      <DialogActions>
        <Button onClick={props.handlePost}>{props.btnText}</Button>
        <Button onClick={props.handleClose}>Cancel</Button>
      </DialogActions>
    </Dialog>
  );
};

export default DialogComponent;
