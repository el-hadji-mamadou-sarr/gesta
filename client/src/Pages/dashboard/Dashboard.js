import * as React from "react";
import MenuAppBar from "../../Component/navbar/dashboard/MenuAppBar";
import { DrawerNavBar } from "../../Component/navbar/drawer/DrawerNavBar";
import { CssBaseline, Divider, Drawer, List, ListItem, ListItemButton, ListItemIcon, ListItemText } from "@mui/material";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";


export default function Dashboard() {

  return (
    <React.Fragment>

      <Container>
        <MenuAppBar />
      </Container>

      {/*cette navbar masque la MenuAppBar a traiter*/}

      <Container sx={{ display: 'flex' }}>
        <CssBaseline />
        <AppBar

        >
          <Toolbar>
            <Typography>Permanent drawer</Typography>
          </Toolbar>
        </AppBar>

        <DrawerNavBar />
      </Container>






    </React.Fragment>

  )
}