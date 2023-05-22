import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import MenuItem from '@mui/material/MenuItem';
import Menu from '@mui/material/Menu';
import { useState } from 'react';
import logo from "../../../Assets/images/gesta.png";
import * as React from "react";
import {Button, FormControlLabel, FormGroup, Switch} from "@mui/material";
import Avatar from "@mui/material/Avatar";
import {Link} from "react-router-dom";
import AddIcon from '@mui/icons-material/Add';


export default function MenuAppBar() {
  const [auth, setAuth] = useState(true);
  const [anchorEl, setAnchorEl] = useState(null);

 

  const handleChange = (event) => {
    setAuth(event.target.checked);
  };

  const handleMenu = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };


  return (
      <Box >
        <AppBar  position="fixed" >
          <Toolbar>
            <Link to=""><img src={logo} alt="Logo" /></Link>
            <Typography variant="h6" component="div">
              Gesta
            </Typography>
            <Box sx={{ ml: 2 }}>
            <Button variant="contained">
              <IconButton>
                <AddIcon />
              </IconButton>
              Créer un tableau
            </Button>
          </Box>

            <Box sx={{ flexGrow: 1, ml:2 }}>
              <Button variant="contained" ml={2}>
                <IconButton>
                  <AddIcon/>
                </IconButton>
                Créer une liste
              </Button>
            </Box>



            {auth && (
                <div>
                  <IconButton
                      size="large"
                      aria-label="account of current user"
                      aria-controls="menu-appbar"
                      aria-haspopup="true"
                      onClick={handleMenu}
                      color="inherit"
                  >
                    <Avatar alt="" src="" />
                  </IconButton>
                  <Menu
                      id="menu-appbar"
                      anchorEl={anchorEl}
                      anchorOrigin={{
                        vertical: 'top',
                        horizontal: 'right',
                      }}
                      keepMounted
                      transformOrigin={{
                        vertical: 'top',
                        horizontal: 'right',
                      }}
                      open={Boolean(anchorEl)}
                      onClose={handleClose}
                  >
                    <MenuItem onClick={handleClose}>Profile</MenuItem>
                    <MenuItem onClick={handleClose}>My account</MenuItem>
                  </Menu>
                </div>
            )}
          </Toolbar>
        </AppBar>

      </Box>
  );
}