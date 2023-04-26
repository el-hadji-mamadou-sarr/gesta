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
import Logo from "../../Assets/images/login-removebg-preview.png";
import {useState} from "react";
import {initialValues} from "../../Services/Constant/Register/Constant";
import axios from "axios";
import {useNavigate} from "react-router";

export const Register=()=>{
    const[uservalues, setUserValues] = useState(initialValues)
    const [formError, setFormError] = useState({})
    const navigate = useNavigate()

    // variable pour styliser le paper
    const paperStyle={padding:'30px 20px',width:"387px", margin:"20px auto"}
    const handleChange = (event) => {
        const {name, value} = event.target
        setUserValues({...uservalues, [name]: value})
    }
    const handleSubmit = (event) => {
        event.preventDefault();
        if (Object.keys(formError).length === 0){
            axios.post('', uservalues)
                .then(res => {
                    navigate('/login');
                })
                .catch(err => console.log(err));
        }

    };

    return (

        <React.Fragment>
            <CssBaseline />
            <Container maxWidth="sm">
                <Box sx={{}}>
                    <Paper elevation={20} style={paperStyle}>
                        <Box align="center">
                            <Avatar>

                            </Avatar>
                            <Typography variant='caption'>Inscrivez-vous pour continuer</Typography>
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
                            <Grid sx={{display: 'flex', ml: 2}}>
                                <Typography variant='caption'>Le mot de passe doit comporter au moins 8 caractères.</Typography>
                            </Grid>
                            <Grid sx={{display: 'flex', mt: 2}}>
                                <Checkbox  />
                                <Typography variant='caption'>Oui, envoyez-moi les actus et offres Atlassian sur les produits, évènements et bien plus encore.</Typography>
                            </Grid>



                            <ThemeProvider theme={theme}>
                                <Button
                                    type="submit"
                                    color="registeBtnTheme"
                                    fullWidth
                                    variant="contained"
                                    sx={{ mt: 3, mb: 2 }}
                                >
                                    Sign In
                                </Button>
                            </ThemeProvider>

                            <Divider variant="middle" sx={{ mt: 3}} />

                            <Grid align="center">
                                <Typography variant='caption'>Cette page est protégée par le service reCAPTCHA. La Politique de confidentialité et les Conditions d'utilisation de Google s'appliquent.</Typography>
                            </Grid>

                        </Box>
                    </Paper>
                </Box>
            </Container>
        </React.Fragment>





    )
}