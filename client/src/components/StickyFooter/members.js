import * as React from 'react';
import {Typography, Avatar, ListItemAvatar, ListItemText, ListItem, Divider, List, Link} from '@material-ui/core';


const flexContainer = {
    display: 'flex',
    flexDirection: 'row',
    padding: 0,
  };

export default function Members() {
  return (
    <List style={flexContainer} sx={{ width: '100%', maxWidth: 360, bgcolor: 'background.paper' }}>
      <ListItem alignItems="flex-start">
        <ListItemAvatar>
          <Avatar alt="Joanna" src="client/src/assets/WechatIMG887.jpeg" />
        </ListItemAvatar>
        <ListItemText
          primary="Joanna"
          secondary={
            <React.Fragment>
              <Typography
                sx={{ display: 'inline' }}
                component="span"
                variant="body2"
                color="#FFF"
              >
                
                <Link color="inherit" href="https://github.com/paterlisia">
                https://github.com/paterlisia
                </Link>
              </Typography>
            </React.Fragment>
          }
        />
      </ListItem>
      <Divider variant="inset" component="li" />
      <ListItem alignItems="flex-start">
        <ListItemAvatar>
          <Avatar alt="Travis Howard" src="/static/images/avatar/2.jpg" />
        </ListItemAvatar>
        <ListItemText
          primary="yaannnik"
          secondary={
            <React.Fragment>
              <Typography
                sx={{ display: 'inline' }}
                component="span"
                variant="body2"
                color="#FFF"
              >
                <Link color="inherit" href="https://github.com/yaannnik">
                https://github.com/yaannnik
                </Link>
              </Typography>
            </React.Fragment>
          }
        />
      </ListItem>
      <Divider variant="inset" component="li" />
      <ListItem alignItems="flex-start">
        <ListItemAvatar>
          <Avatar alt="Cindy Baker" src="/static/images/avatar/3.jpg" />
        </ListItemAvatar>
        <ListItemText
          primary="Jiashu Chen"
          secondary={
            <React.Fragment>
              <Typography
                sx={{ display: 'inline' }}
                component="span"
                variant="body2"
                color="#FFF"
              >
                
                <Link color="inherit" href="https://github.com/Jiashu0326">
                https://github.com/Jiashu0326
                </Link>
              </Typography>
            </React.Fragment>
          }
        />
      </ListItem>
    </List>
  );
}
