import * as React from 'react';
import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import { Box } from '@mui/material';
import CardContent from '@mui/material/CardContent';
import CardActions from '@mui/material/CardActions';
import Avatar from '@mui/material/Avatar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import Carousel from 'react-material-ui-carousel';
import { Paper, Button } from '@mui/material';
import moment from 'moment';
import { parseCookies } from 'nookies';

export function stringToColor(string) {
  if (!string) return '#F98A59';

  let hash = 0;
  let i;

  /* eslint-disable no-bitwise */
  for (i = 0; i < string.length; i += 1) {
    hash = string.charCodeAt(i) + ((hash << 5) - hash);
  }

  let color = '#';

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
    children: `${name?.split(' ')[0][0]}`,
  };
}

function formatDate(date) {
  const d = moment(date);
  return d.format('DD MM YYYY');
}

export default function CardPost({ data }) {
  const cookies = parseCookies();
  const token = cookies.usr_token;
  const isLogin = token != null;

  return (
    <Card sx={{ width: 400 }}>
      <CardHeader
        avatar={<Avatar {...stringAvatar(data.Username?.toUpperCase())} />}
        action={
          <IconButton aria-label='settings'>
            {!isLogin ? null : <MoreVertIcon />}
          </IconButton>
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

      <CardContent>
        <Typography variant='body2' color='text.secondary'>
          {data.Caption}
        </Typography>
      </CardContent>
      <CardActions disableSpacing>
        <Button>View Comment</Button>
      </CardActions>
    </Card>
  );
}

function Item(props) {
  return (
    <Paper>
      <Box
        component='img'
        sx={{
          height: 255,
          display: 'block',
          maxWidth: 400,
          width: '100%',
        }}
        src={props.item.imgPath}
        alt={props.item.label}
      />
    </Paper>
  );
}
