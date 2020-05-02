import React from 'react';


import {Avatar, Button, CssBaseline, 
        TextField, Link, Grid, Box, Typography,
        Container, Slide, Dialog, DialogTitle, 
        DialogContent, DialogActions, DialogContentText} from '@material-ui/core';

import { makeStyles } from '@material-ui/core/styles';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';

import {MainActions, Backbone, AuthActions} from '../controllers';

function Copyright() {
  return (
    <Typography variant="body2" color="textSecondary" align="center">
      {'Copyright © '}
      <Link color="inherit" >
        Bluezinc
      </Link>{' '}
      {new Date().getFullYear()}
      {'.'}
    </Typography>
  );
}


const useStyles = makeStyles((theme) => ({
  paper: {
    marginTop: theme.spacing(8),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main,
  },
  form: {
    width: '100%', // Fix IE 11 issue.
    marginTop: theme.spacing(1),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
}));

export default function SignIn() {
  const classes = useStyles();
  let {goToRegister} = MainActions;
  let {goToRecoverPass ,userValueLink, authenticate, copyClipboard} = AuthActions;
  let {currLocation, user, config, access_token} = Backbone.getInstance().state;


  return (
    <Slide direction="down" in={/\/login/ig.test(currLocation)} mountOnEnter unmountOnExit>
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      <div className={classes.paper}>
        <Avatar className={classes.avatar}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography variant="h4" gutterBottom>
           {config && (config.systemLoginDisplayName || "")}
        </Typography>
        <Typography variant="h6" gutterBottom>
            Sign in
        </Typography>

        <form className={classes.form} noValidate>
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            id="email"
            label={user.userid || user.email || "User Id or Email Address"}
            name="email"
            autoComplete="email"
            autoFocus 
            onChange={(eve)=>{userValueLink({key:['email','userid'], ...eve})}}
          />
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            name="password"
            label="Password"
            type="password"
            id="password"
            autoComplete="current-password" 
            onChange={(eve)=>{userValueLink({key:'password', ...eve})}}
          />          
          <Button
            type="button"
            fullWidth
            variant="contained"
            color="primary" 
            onClick={authenticate}
            className={classes.submit}
          >
            Sign In
          </Button>
          <Grid container>
            <Grid item xs>
              <Link href="#" variant="body2" onClick={goToRecoverPass}>
                Forgot password?
              </Link>
            </Grid>
            <Grid item>
              <Link href="#" variant="body2" onClick={goToRegister} >
                {"Don't have an account? Sign Up"}
              </Link>
            </Grid>
          </Grid>
        </form>
      </div>
      <Box mt={8}>
        <Copyright />
      </Box>
      <Dialog
        open={access_token !== undefined}
        aria-labelledby="alert-dialog-slide-title"
        aria-describedby="alert-dialog-slide-description" 
        fullWidth={"sm"}
        maxWidth={"lg"}
      >
        <DialogTitle id="alert-dialog-slide-title">{"Access Token: "}</DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-slide-description">
            <TextField
                id="outlined-multiline-static"
                style={{width:'98%'}}
                label=""
                multiline
                rows={6}
                defaultValue={access_token || ""}
                variant="outlined"
              />
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={copyClipboard} color="primary">
            Copy To Clipboard
          </Button>
        </DialogActions>
      </Dialog>
    </Container>
    </Slide>
  );
}