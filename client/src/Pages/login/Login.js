import * as React from "react";
import {
    Avatar,
    Button,
    Paper,
    TextField,
    Typography,
    Box,
    ThemeProvider,
    Divider, Grid, CssBaseline, Container
} from "@mui/material";

import {fontTheme, theme} from "../../Assets/theme/theme";
import { Link } from "react-router-dom"
import ResponsiveAppBar from "../layout/ResponsiveAppBar";
import Logo from "../../Assets/images/logo.png";
import downicone from "../../Assets/images/login-removebg-preview.png";




export const Login = () => {
    // variable pour styliser le paper
    const paperStyle = { padding: '30px 20px', width: "387px", margin: "20px auto" }
    const handleSubmit = (event) => {
        event.preventDefault();
        const data = new FormData(event.currentTarget);
        console.log({
            email: data.get('email'),
            password: data.get('password'),
        });
    };

    return (

        <React.Fragment>
        <ResponsiveAppBar />
            <CssBaseline />
            <Container maxWidth="sm">
                 <Box sx={{}}>
                     <Paper elevation={20} style={paperStyle}>
                         <Box align="center">
                             <Avatar>
                             <img src={Logo} alt="logo" width="50px" height="50px"/>
                             </Avatar>
                             <Typography variant='caption'>Connectez-vous pour continuer</Typography>
                         </Box>
                         <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 4 }}>
                             <TextField
                                 margin="normal"
                                 size="small"
                                 required
                                 fullWidth
                                 id="email"
                                 label="Email Address"
                                 name="email"
                                 autoComplete="email"
                                 autoFocus
                             />
                             <TextField
                                 margin="normal"
                                 size="small"
                                 required
                                 fullWidth
                                 name="password"
                                label="Password"
                                type="password"
                                 id="password"
                                 autoComplete="current-password"
                             />
                             <ThemeProvider theme={theme}>
                                 <Button
                                     type="submit"
                                     color="registeBtnTheme"
                                     fullWidth
                                     variant="contained"
                                     sx={{ mt: 3, mb: 2 }}
                                 >
                                    <Box
                                    color="white">
                                        Sign In
                                    </Box> 
                                 </Button>
                             </ThemeProvider>

                             <Divider variant="middle" sx={{ mt: 7}} />
                             <ThemeProvider theme={fontTheme}>
                                 <Grid align="center" >
                                     <Typography variant='caption' sx={{fontFamily: 'Roboto'}}>Vous avez déja un compte?</Typography>
                                     <Grid>
                                         <Link to="/register">Inscrivez vous !!</Link>
                                     </Grid>
                                 </Grid>

                             </ThemeProvider>



                         </Box>
                    </Paper>
                </Box>
            </Container>
            <Box  marginTop="-58%" marginBottom="70px">
                    <img width="100%" src={downicone} alt="downicone" />
            </Box>
        </React.Fragment>

    )}

