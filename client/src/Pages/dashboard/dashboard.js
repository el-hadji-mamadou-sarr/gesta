import React from 'react';
import MenuAppBar from "../../Component/navbar/dashboard/MenuAppBar";
import { DrawerNavBar } from "../../Component/navbar/drawer/DrawerNavBar";
import { CssBaseline, Divider, Drawer, List, ListItem, ListItemButton, ListItemIcon, ListItemText } from "@mui/material";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import Box from '@mui/material/Box';

export default function Dashboard() {

  return (
    <React.Fragment>
      <Box sx={{ flexGrow: 1 }}>
        <MenuAppBar />
      </Box>
      <CssBaseline />

      <Box sx={{ display: 'flex', flexDirection: 'column'}}>

          <AppBar position="relative">
            <Toolbar>
              <Typography variant="h7">Permanent drawer</Typography>
            </Toolbar>
          </AppBar>
        <DrawerNavBar />
      </Box>
    </React.Fragment>
  );
}


