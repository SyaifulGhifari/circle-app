import React, { useState, useEffect } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import {
  Container,
  Box,
  Fab,
  Fade,
  useScrollTrigger,
  Card,
  CardContent,
  CardActions,
  Button,
  Avatar,
  Typography,
  Paper,
  TextField,
  List,
  ListItem,
  ListItemAvatar,
  ListItemText,
  CardHeader,
  IconButton,
  Tooltip,
  Menu,
  MenuItem,
} from "@mui/material";
import UpIcon from "@mui/icons-material/KeyboardArrowUp";
import Carousel from "react-material-ui-carousel";
import { stringAvatar } from "../components/CardPost";
import moment from "moment";
import { parseCookies } from "nookies";
import NavBar from "../components/Navbar";
import MoreVertIcon from "@mui/icons-material/MoreVert";

const fabStyle = {
  color: "common.white",
  bgcolor: "#112d4e",
  "&:hover": {
    bgcolor: "#40567a",
  },
};

function formatDate(date) {
  const d = moment(date);
  return d.format("DD MM YYYY");
}

export default function Detail(props) {
  const [posts, setPosts] = useState({});
  const [comment, setComment] = useState({ caption: "" });
  const params = useParams();
  const [anchorElUser, setAnchorElUser] = useState(null);

  const cookies = parseCookies();
  const token = cookies.usr_token;
  const name = cookies.usr_name;
  const isLogin = token != null;

  useEffect(() => {
    fetchDataPosts();
  }, [posts]);

  const fetchDataPosts = async () => {
    const { post_id } = params;
    await axios
      .get(`${process.env.REACT_APP_BACKEND_URL}/posts/${post_id}`)
      .then((response) => {
        const { data } = response.data;
        console.log(data);
        setPosts(data);
      })
      .catch((error) => console.log(error));
  };

  const handleComment = (e) => {
    console.log(e);
    setComment({ ...comment, caption: e.target.value });
  };

  const addComment = (post_id) => {
    const form = new FormData();
    form.append("caption", comment.caption);

    axios
      .post(`${process.env.REACT_APP_BACKEND_URL}/comments/${post_id}`, form, {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((res) => {})
      .catch((err) => {
        console.log(err.response.data);
      })
      .finally(() => {
        setComment({ caption: "" });
      });
  };

  const handleOpenUserMenu = (event) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };

  const deleteComment = (commentID) => {
    axios
      .delete(`${process.env.REACT_APP_BACKEND_URL}/comments/${commentID}`, {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((res) => {})
      .catch((err) => {
        console.log(err.response.data);
      })
      .finally();
  };

  return (
    <>
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
          <Box sx={{ flexDirection: "column" }}>
            <Card sx={{ width: 400 }}>
              <CardHeader avatar={<Avatar {...stringAvatar(posts.Username?.toUpperCase())} />} title={posts.Username} subheader={formatDate(posts.Created_At)} />
              {posts.Post_Images && (
                <Carousel>
                  {posts.Post_Images.map((item, i) => (
                    <Item key={i} item={item} />
                  ))}
                </Carousel>
              )}
              <CardContent>
                <Typography variant="body2" color="text.secondary">
                  {posts.Caption}
                </Typography>
              </CardContent>
              <CardActions disableSpacing></CardActions>
            </Card>
            <Box sx={{ display: "flex", marginTop: "10px", alignItems: "center", gap: 1, justifyContent: "space-around" }}>
              <Avatar {...stringAvatar(name?.toUpperCase())} sizes="small" />
              <TextField id="standard-basic" label="Add Comment..." variant="standard" size="small" fullWidth={true} onChange={handleComment} />
              <Button variant="outlined" onClick={() => addComment(posts.ID)}>
                Comment
              </Button>
            </Box>
            <List sx={{ justifyContent: "space-between" }}>
              {posts.Comments?.map((value) => (
                <ListItem key={value.id} alignItems="flex-start">
                  <ListItemAvatar>
                    <Avatar {...stringAvatar(value.Username.toUpperCase())} />
                  </ListItemAvatar>
                  <ListItemText primary={value.Username} secondary={<React.Fragment>{value.Caption}</React.Fragment>} />
                  <Tooltip title="Open Actions">
                    <IconButton onClick={handleOpenUserMenu} aria-label="actions">
                      <MoreVertIcon />
                    </IconButton>
                  </Tooltip>
                  <Menu
                    sx={{ mt: "45px" }}
                    id="menu-appbar"
                    anchorEl={anchorElUser}
                    anchorOrigin={{
                      vertical: "top",
                      horizontal: "right",
                    }}
                    keepMounted
                    transformOrigin={{
                      vertical: "top",
                      horizontal: "right",
                    }}
                    open={Boolean(anchorElUser)}
                    onClose={handleCloseUserMenu}
                  >
                    <MenuItem onClick={() => deleteComment(value.ID)}>
                      <Typography textAlign="center">Delete</Typography>
                    </MenuItem>
                  </Menu>
                </ListItem>
              ))}
            </List>
          </Box>
        </Box>
        <ScrollTop {...props}>
          <Fab sx={{ position: "fixed", bottom: 16, left: 16, ...fabStyle }} aria-label="Up" color="primary">
            <UpIcon />
          </Fab>
        </ScrollTop>
      </Container>
    </>
  );
}

function ScrollTop(props) {
  const { children, window } = props;
  const trigger = useScrollTrigger({
    target: window ? window() : undefined,
    disableHysteresis: true,
    threshold: 100,
  });

  const handleClick = (event) => {
    const anchor = (event.target.ownerDocument || document).querySelector("#back-to-top-anchor");

    if (anchor) {
      anchor.scrollIntoView({
        block: "center",
      });
    }
  };

  return (
    <Fade in={trigger}>
      <Box onClick={handleClick} role="presentation" sx={{ position: "fixed", bottom: 16, left: 16 }}>
        {children}
      </Box>
    </Fade>
  );
}

function Item(props) {
  return (
    <Paper>
      <Box
        component="img"
        sx={{
          height: 255,
          display: "block",
          maxWidth: 400,
          width: "100%",
        }}
        src={props.item.imgPath}
        alt={props.item.label}
      />
    </Paper>
  );
}
