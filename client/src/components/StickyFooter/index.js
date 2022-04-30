import * as React from 'react';
import {Typography, Grid, Container, Link, Box} from '@material-ui/core';

// internal components
import Members from "./members";

// css
import { useStyles } from "./styles.js";

function Copyright() {
  return (
    <Typography variant="body2" color="text.secondary">
      {'Copyright © '}
      <Link color="inherit" href="https://github.com/yaannnik/CoinRoof">
        CoinRoof
      </Link>{' '}
      {new Date().getFullYear()}
      {'.'}
    </Typography>
  );
}

export default function StickyFooter() {
    const classes = useStyles();
  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        minHeight: '100vh',
      }}
    >
      <Box
      className={classes.footer}
        component="footer"
        sx={{
          py: 3,
          px: 2,
          mt: 'auto',
          backgroundColor: (theme) =>
            theme.palette.mode === 'light'
              ? theme.palette.grey[200]
              : theme.palette.grey[800],
        }}
      >
        <Grid container spacing={2}>
        <Grid item xs={4}>
                <h1>CoinRoof</h1>
                <h3>The world’s first and largest digital marketplace for crypto collectibles 
                    and non-fungible tokens (NFTs). Buy, sell, and discover exclusive digital items.</h3>
        </Grid>
        <Grid item xs={8}>
                <h1>Contact us:</h1>
                <Members />
        </Grid>
        </Grid>
        <Container  maxWidth="sm">
          <Copyright />
        </Container>
      </Box>
    </Box>
  );
}