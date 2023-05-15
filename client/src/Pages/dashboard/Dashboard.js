import * as React from "react";
import MenuAppBar from "../../Component/navbar/dashboard/MenuAppBar";
import { DrawerNavBar } from "../../Component/navbar/drawer/DrawerNavBar";
import { CssBaseline, Divider, Drawer, List, ListItem, ListItemButton, ListItemIcon, ListItemText } from "@mui/material";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Box from '@mui/material/Box';
import {useState} from "react";
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import IconButton from "@mui/material/IconButton";

export default function Dashboard() {


  return (
    <React.Fragment>
        <Box sx={{ display: 'flex' }}>
            <CssBaseline />
            <MenuAppBar/>
            <DrawerNavBar/>

        </Box>



    </React.Fragment>
  );
}


