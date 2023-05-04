import * as React from "react";
import {
    Avatar,
    Button,
    Paper,
    TextField,
    Typography,
    Box,
    ThemeProvider,
    Divider, Grid, Link, CssBaseline, Container, Checkbox
} from "@mui/material";

import {theme} from "../../Assets/theme/theme";
import Logo from "../../Assets/images/logo.png";
import downicone from "../../Assets/images/login-removebg-preview.png";
import {useState} from "react";
import {initialValues} from "../../Services/Constant/Register/Constant";
import axios from "axios";
import ResponsiveAppBar from "../layout/ResponsiveAppBar";


export const Register = () => {
    const [uservalues, setUserValues] = useState(initialValues)
    const [formError, setFormError] = useState({})
    // variable pour styliser le paper
    const paperStyle = { padding: '30px 20px', width: "387px", margin: "20px auto" }
    const handleChange = (event) => {
        const { name, value } = event.target
        setUserValues({ ...uservalues, [name]: value })
    }
    const handleSubmit = (event) => {
        event.preventDefault();
        // if (Object.keys(formError).length === 0){
        //     axios.post('')
        // }
    };

    return (
        <React.Fragment>
         <ResponsiveAppBar />
            <CssBaseline />
            <Container maxWidth="sm">
                <Box sx={{}}>
                    <Paper elevation={20} style={paperStyle}>
                        <Box align="center" color="#000066" fontSize="x-large">
                            <Avatar>
                                <img src={Logo} alt="logo" width="50px" height="50px"/>

                            </Avatar>
                            <Typography variant='caption'>Inscrivez-vous pour continuer</Typography>
                        </Box>
                        <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 4 }}>
                        <Grid container spacing={2}>
                            <Grid item xs={6}>
                            <TextField
                                margin="normal"
                                size="small"
                                required
                                fullWidth
                                id="Prénom"
                                label="Prénom"
                                name="Nom"
                                autoComplete="Prénom"
                                autoFocus
                                handleChange={handleChange}
                            />                            </Grid>
                            <Grid item xs={6}>

                            <TextField
                                margin="normal"
                                size="small"
                                required
                                fullWidth
                                id="nom"
                                label="Nom"
                                name="Nom"
                                autoComplete="Nom"
                                autoFocus
                                handleChange={handleChange}
                            />                            </Grid>
                            </Grid>
                        
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
                                handleChange={handleChange}
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
                                handleChange={handleChange}
                            />

                            <TextField
                                margin="normal"
                                size="small"
                                required
                                fullWidth
                                name="Confirm Password"
                                label="Confirm Password"
                                type="Confirm Password"
                                id="Confirm Password"
                                autoComplete="current-password"
                                handleChange={handleChange}
                            />
                            <Grid sx={{display: 'flex', ml: 2}}>
                                <Typography variant='caption'>Le mot de passe doit comporter au moins 8 caractères.</Typography>
                            </Grid>
                            <Grid sx={{display: 'flex', mt: 2}}>
                                <Checkbox  />
                                <Typography variant='caption'>  En m'inscrivant j'accepte les conditions d'utilisation cloud de gesta et je pris avoir pris connaissance de sa politique de confidentialité</Typography>

                            </Grid>
                            <ThemeProvider theme={theme}>
                                <Button
                                    type="submit"
                                    color="registeBtnTheme"
                                    fullWidth
                                    variant="contained"
                                    sx={{ mt: 3, mb: 2 }}
                                >
                                    <Box color="white">
                                    S'inscrire
                                    </Box>                                
                                </Button>
                            </ThemeProvider>

                            <Divider variant="middle" sx={{ mt: 3 }} />

                            

                        </Box>
                    </Paper>
                </Box>
                
            </Container>
            <Box  marginTop="-68%" marginBottom="70px">
                        <img width="100%" src={downicone} alt="downicone" />
            </Box>
        </React.Fragment>
    )
}