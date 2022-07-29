import * as React from "react";
import Card from "@mui/material/Card";
import CardHeader from "@mui/material/CardHeader";
import { Box } from "@mui/material";
import CardContent from "@mui/material/CardContent";
import CardActions from "@mui/material/CardActions";
import Avatar from "@mui/material/Avatar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import Carousel from "react-material-ui-carousel";
import { Paper, Button, Tooltip, Menu, MenuItem } from "@mui/material";
import moment from "moment";
import DialogComponent from "./DialogComponent";
import axios from "axios";
import { parseCookies } from "nookies";
import { useNavigate } from "react-router-dom";

export function stringToColor(string) {
  if (!string) return "#F98A59";

  let hash = 0;
  let i;

  /* eslint-disable no-bitwise */
  for (i = 0; i < string.length; i += 1) {
    hash = string.charCodeAt(i) + ((hash << 5) - hash);
  }

  let color = "#";

  for (i = 0; i < 3; i += 1) {
    const value = (hash >> (i * 8)) & 0xff;
    color += `00${value.toString(16)}`.slice(-2);
  }
  /* eslint-enable no-bitwise */

  return color;
}

export function stringAvatar(name) {
  return {
    sx: {
      bgcolor: stringToColor(name),
    },
    children: `${name?.split(" ")[0][0]}`,
  };
}

function formatDate(date) {
  const d = moment(date);
  return d.format("DD MM YYYY");
}

export default function CardPost({ data }) {
  const [anchorElUser, setAnchorElUser] = React.useState(null);
  const [open, setOpen] = React.useState(false);
  const [posting, setCaption] = React.useState({ caption: data.Caption });

  const cookies = parseCookies();
  const token = cookies.usr_token;
  const name = cookies.usr_name;
  const isLogin = token != null;
  let navigate = useNavigate();

  const handleOpenUserMenu = (event) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
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

  const updatePost = (post_id) => {
    const form = new FormData();
    form.append("caption", posting.caption);

    axios
      .put(`${process.env.REACT_APP_BACKEND_URL}/myposts/${post_id}`, form, {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((res) => {})
      .catch((err) => {
        console.log(err.response.data);
      })
      .finally(setOpen(false));
  };

  const deletePost = (post_id) => {
    axios
      .delete(`${process.env.REACT_APP_BACKEND_URL}/myposts/${post_id}`, {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((res) => {})
      .catch((err) => {
        console.log(err.response.data);
      })
      .finally();
  };

  return (
    <Card sx={{ width: 400 }}>
      <CardHeader
        avatar={<Avatar {...stringAvatar(data.Username?.toUpperCase())} />}
        action={
          <Tooltip title="Open Actions">
            <IconButton onClick={handleOpenUserMenu} aria-label="actions">
              <MoreVertIcon />
            </IconButton>
          </Tooltip>
        }
        title={data.Username}
        subheader={formatDate(data.Created_At)}
      />
      {data.Post_Images && (
        <Carousel>
          {data.Post_Images.map((item, i) => (
            <Item key={i} item={item} />
          ))}
        </Carousel>
      )}
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
        <MenuItem onClick={handleClickOpen}>
          <Typography textAlign="center">Update</Typography>
        </MenuItem>
        <MenuItem onClick={() => deletePost(data.ID)}>
          <Typography textAlign="center">Delete</Typography>
        </MenuItem>
      </Menu>
      <DialogComponent open={open} handleClose={handleClose} name={name} handleCaption={handleCaption} handlePost={() => updatePost(data.ID)} caption={posting.caption} title={"Update Post"} btnText={"Update"} />
      <CardContent>
        <Typography variant="body2" color="text.secondary">
          {data.Caption}
        </Typography>
      </CardContent>
      <CardActions disableSpacing>
        <Button onClick={() => navigate(`/detail/${data.ID}`)}>View Comment</Button>
      </CardActions>
    </Card>
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
