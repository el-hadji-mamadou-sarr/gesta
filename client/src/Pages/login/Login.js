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
import { fontTheme, theme } from "../../Assets/theme/theme";
import { Link } from "react-router-dom"
import { useNavigate } from "react-router";
import { useEffect, useState } from "react";
import validation from "../../Services/Constant/Login/Constant";
import NavigationNavBar from "../../Component/navbar/NavigationNavBar";
import Logo from "../../Assets/images/logo.png";
import downicone from "../../Assets/images/login-removebg-preview.png";
import {useDispatch} from "react-redux";
import {loginUser} from "../../reducers/userReducer";




export const Login = () => {
    // declarate variable
    const navigate = useNavigate()
    const [values, setValues] = useState({
        email: '',
        password: ''
    })
    const [error, setErrors] = useState({})
    const dispatch = useDispatch();


    // variable pour styliser le paper
    const paperStyle = { padding: '30px 20px', width: "387px", margin: "20px auto" }

    // get value from the form
    const handleChange = (event) => {
        const { name, value } = event.target;

        setValues((prevState) => ({
            ...prevState,
            [name]: value,
        }));
    };

    const handleSubmit = (event) => {
        event.preventDefault();
        // show errors
        setErrors(validation(values));
        // if error is empty call api

        const requestBody = {
            method: "POST",
            credentials: "include",
            headers: {
                "Accept": 'application/json',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                email: values.email,
                password: values.password
            })
        }

        fetch("http://localhost:5000/api/auth/login", requestBody)
            .then((res) => {
                if (res.status === 200) {
                    res.json().then((res) => {
                        dispatch(loginUser());
                        navigate('/');
                    })
                }
            })


    }


    return (

        <React.Fragment>
            <NavigationNavBar />
            <CssBaseline />
            <Container maxWidth="sm">
                <Box sx={{}}>
                    <Paper elevation={20} style={paperStyle}>
                        <Box align="center">
                            <Avatar>
                                <img src={Logo} alt="logo" width="50px" height="50px" />
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
                                type="email"
                                value={values.email}
                                onChange={handleChange}
                                helperText={error.email}
                                error={error.email}
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
                                value={values.password}
                                onChange={handleChange}
                                error={error.password}
                                helperText={error.password}
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
                            <Divider variant="middle" sx={{ mt: 7 }} />
                            <ThemeProvider theme={fontTheme}>
                                <Grid align="center" >
                                    <Typography variant='caption' sx={{ fontFamily: 'Roboto' }}>Vous avez déja un compte?</Typography>
                                    <Grid>
                                        <Link to="/register">Inscrivez vous !!</Link>
                                    </Grid>
                                </Grid>
                            </ThemeProvider>
                        </Box>
                    </Paper>
                </Box>
            </Container>
            <Box marginTop="-58%" marginBottom="70px">
                <img width="100%" src={downicone} alt="downicone" />
            </Box>
        </React.Fragment>

    )
}

