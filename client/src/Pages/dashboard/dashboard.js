import * as React from "react";
import MenuAppBar from "../../Component/navbar/dashboard/MenuAppBar";
import NavigationNavBar from "../../Component/navbar/NavigationNavBar";
import {DrawerNavBar} from "../../Component/navbar/drawer/DrawerNavBar";
import Box from "@mui/material/Box";
import {CssBaseline, Divider, Drawer, List, ListItem, ListItemButton, ListItemIcon, ListItemText} from "@mui/material";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import MailIcon from "@mui/icons-material/Mail";
import Container from "@mui/material/Container";


const drawerWidth = 240;
export const  Dashboard = () => {


  return (
    <React.Fragment>
        <MenuAppBar/>

        {/*cette navbar masque la MenuAppBar a traiter*/}

        <Box>
            <CssBaseline/>
            <AppBar

            >
                <Toolbar>
                    <Typography>Permanent drawer</Typography>
                </Toolbar>
            </AppBar>

            <DrawerNavBar/>
        </Box>




    </React.Fragment>

  )
}