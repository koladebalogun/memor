import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom"
import { AppBar, Avatar, Button, Toolbar, Typography } from "@material-ui/core";
import { useDispatch } from 'react-redux'
import { useLocation, useNavigate } from "react-router";

import decode from 'jwt-decode'; //***************** */



import useStyles from "./styles";
import memories from "../../images/memories.png";

const Navbar = () => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();

  const [ user, setUser ] = useState(JSON.parse(localStorage.getItem('profile'))); //Here, we are retrieving the user data ('profile') set in the local storage

  console.log(user);

  const logout = () => {
    dispatch({ type: 'LOGOUT' });

    navigate('/');

    setUser(null);
  }

  useEffect(() => {
    const token = user?.token // we're checking if token exist and if it does, we are sending it to the token variable 

    //checking to see if the token has expired so we can log the user out
    if(token) {
      const decodedToken = decode(token);

      if(decodedToken.exp * 1000 < new Date().getTime()) logout();
    }

    setUser(JSON.parse(localStorage.getItem('profile')));

  }, [location]);  //The useLocation is like a usestate that returns a new location. Whenever the URL changes, a new location object will be returned. so in this block of code, we want the the user to be set when location changes.


  return (
    <AppBar className={classes.appBar} position="static" color="inherit">
      <div className={classes.brandContainer}>
        <Typography 
        component={Link} to="/" //This is a link pointing to the homepage
        className={classes.heading} 
        variant="h2" 
        align="center">
          Memories
        </Typography>
        <img
          className={classes.image}
          src={memories}
          alt="memories"
          height="60"
        />
      </div>
      <Toolbar className={classes.toolbar}>
        {user ? (
            <div className={classes.profile}>
                <Avatar className={classes.purple} alt={user.result.name} src={user.result.imageUrl}>{user.result.name.charAt(0)}</Avatar> {/* this is used to show the first character of the users name incase the user doesn't have an image*/}

                <Typography className={classes.userName} variant="h6">{user.result.name}</Typography>
                <Button variant="contained" className={classes.logout} color="secondary" onClick={logout}>Log Out</Button>
            </div>
        ) : (         //Writing a conditional to show something if the user is logged in and show something else if the user is not logged in
          // so if the user is logged in, we want to show the users info e.g the users avatar
          <Button variant="contained" component={Link} to="/auth" color="primary">Sign In</Button>

        )}
      </Toolbar>
    </AppBar>
  );
};

export default Navbar;
