import React, { useState, useEffect } from "react";
import CardPost from "../components/CardPost";
import { Box, Container, Fab } from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import UpIcon from "@mui/icons-material/KeyboardArrowUp";
import axios from "axios";
import DialogComponent from "../components/DialogComponent";

import NavBar from "../components/Navbar";
import { parseCookies } from "nookies";

const fabStyle = {
  color: "common.white",
  bgcolor: "#112d4e",
  "&:hover": {
    bgcolor: "#40567a",
  },
};

export default function Home() {
  const [posts, setPosts] = useState([]);
  const [open, setOpen] = useState(false);
  const [posting, setCaption] = useState({ caption: "" });

  const cookies = parseCookies();
  const token = cookies.usr_token;
  const name = cookies.usr_name;
  const isLogin = token != null;

  useEffect(() => {
    fetchDataPosts();
  }, [posts]);

  const fetchDataPosts = async () => {
    await axios
      .get(`${process.env.REACT_APP_BACKEND_URL}/posts`)
      .then((response) => {
        const { data } = response.data;
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

  const handleCaption = (e) => {
    console.log(e);
    setCaption({ ...posting, caption: e.target.value });
  };

  const handlePost = (e) => {
    const form = new FormData();
    form.append("caption", posting.caption);

    axios
      .post(`${process.env.REACT_APP_BACKEND_URL}/myposts`, form, {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((res) => {})
      .catch((err) => {
        console.log(err.response.data);
      })
      .finally(() => {
        setOpen(false);
        setCaption("");
      });
  };

  return (
    <>
      <div id="up"></div>
      <NavBar />
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
              <CardPost key={data.id} data={data} name={name} />
            ))}
          </Box>
        </Box>
        {!isLogin ? null : (
          <Fab sx={{ position: "fixed", bottom: 16, right: 16, ...fabStyle }} aria-label="Add" onClick={handleClickOpen}>
            <AddIcon />
          </Fab>
        )}
        <Fab sx={{ position: "fixed", bottom: 16, left: 16, ...fabStyle }} aria-label="Up" color="primary" href="#up">
          <UpIcon />
        </Fab>
      </Container>
      <DialogComponent open={open} handleClose={handleClose} name={name} handleCaption={handleCaption} handlePost={handlePost} caption={posting.caption} title={"Create Post"} btnText={"Post"} />
    </>
  );
}
