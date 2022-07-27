import React, { useState, useEffect } from "react";
import CardPost from "../components/CardPost";
import { Box, Container, Fab, Button, TextField, Avatar, Typography } from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import UpIcon from "@mui/icons-material/KeyboardArrowUp";
import axios from "axios";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import FormControl from "@mui/material/FormControl";
import IconButton from "@mui/material/IconButton";
import PhotoCamera from "@mui/icons-material/PhotoCamera";
import { stringAvatar } from "../components/CardPost";
import CardHeader from "@mui/material/CardHeader";

const fabStyle = {
  color: "common.white",
  bgcolor: "#112d4e",
  "&:hover": {
    bgcolor: "#40567a",
  },
};

export default function Home() {
  const [posts, setPosts] = useState([]);
  const [open, setOpen] = React.useState(false);

  useEffect(() => {
    fetchDataPosts();
  }, []);

  const fetchDataPosts = async () => {
    await axios
      .get(`https://virtserver.swaggerhub.com/InstaCloneAlta/InstaClone/1.0.0-oas3/posts`)
      .then((response) => {
        const { data } = response.data;
        console.log(data);
        setPosts(data);
      })
      .catch((error) => console.log(error));
  };

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <>
      <Container sx={{ height: "100%" }} fixed>
        <Box
          sx={{
            display: "flex",
            justifyContent: "space-around",
            p: 1,
            m: 1,
            borderRadius: 1,
          }}
        >
          <Box sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
            {posts.map((data) => (
              <CardPost key={data.id} data={data} />
            ))}
          </Box>
        </Box>
        <Fab sx={{ position: "fixed", bottom: 16, right: 16, ...fabStyle }} aria-label="Add" onClick={handleClickOpen}>
          <AddIcon />
        </Fab>
        <Dialog open={open} onClose={handleClose} fullWidth="true" maxWidth="sm">
          <DialogTitle>Create Post</DialogTitle>
          <DialogContent>
            <DialogContentText>
              <CardHeader avatar={<Avatar {...stringAvatar("naufal")} />} title="naufal" />
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
                <TextField id="filled-multiline-static" label="Caption" multiline rows={4} variant="filled" fullWidth />
              </FormControl>
            </Box>
            <IconButton color="primary" aria-label="upload picture" component="label">
              <input hidden accept="image/*" type="file" />
              <PhotoCamera />
            </IconButton>
          </DialogContent>
          <DialogActions>
            <Button onClick={handleClose}>Post</Button>
            <Button onClick={handleClose}>Cancel</Button>
          </DialogActions>
        </Dialog>
        <Fab sx={{ position: "fixed", bottom: 16, left: 16, ...fabStyle }} aria-label="Up" color="primary">
          <UpIcon />
        </Fab>
      </Container>
    </>
  );
}
