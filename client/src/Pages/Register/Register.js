import * as React from "react";
import {
    Avatar,
    Button,
    Paper,
    TextField,
    Typography,
    Box,
    ThemeProvider,
    Divider, Grid, Link, CssBaseline, Container, Checkbox, Alert, FormHelperText
} from "@mui/material";

import {theme} from "../../Assets/theme/theme";
import Logo from "../../Assets/images/logo.png";
import downicone from "../../Assets/images/login-removebg-preview.png";
import {useState} from "react";
import {useNavigate} from "react-router";
import ResponsiveAppBar from "../layout/ResponsiveAppBar";
import validation from "../../Services/Constant/Register/Constant";


export const Register = () => {
    // variable déclaration
    const [values, setValues] = useState({
        fullname: '',
        email: '',
        password: '',
        confirmPassword: '',
        agree_Terms: ''
    })
    const [error, setErrors] = useState({})
    const [agreeTerms, setAgreeTerm] = useState(false)
    const navigate = useNavigate()



    // variable pour styliser le paper
    const paperStyle = { padding: '30px 20px', width: "387px", margin: "20px auto" }

    // verify if user checked the checkbox
    const handleChecked = (event)=> {
        setAgreeTerm(event.target.checked)
    }

    const handleChange = (event) => {
        const { name , value } = event.target;

        setValues({...values,[name]:value})

        //  both are working
        // setValues((prevState)=>({
        //     ...prevState,
        //     [name]: value,
        // }));
    };

    const handleSubmit = (event) => {
        event.preventDefault()
        setErrors(validation(values, agreeTerms))


             const requestBody = {
                method: "POST",
                 headers : {
                     Accept: 'application/json',
                     'Content-Type': 'application/json'

                 },
                 body: JSON.stringify({
                     fullname: values.fullname,
                     email: values.email,
                     password: values.password

                 })
             }

             fetch("http://localhost:5000/api/auth/register", requestBody)
                 .then((res)=>{
                     if(res.status === 200){
                         res.json().then((res)=>{
                             navigate('/');
                         })
                     }

                 })



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
                            {/*checkbox error message*/}
                            <FormHelperText error={error}>{error.agreeTerms}</FormHelperText>
                            <TextField
                                margin="normal"
                                size="small"
                                required
                                fullWidth
                                id="fullname"
                                label="Fullname"
                                name="fullname"
                                value={values.fullname}
                                onChange={handleChange}
                                autoComplete="email"
                                error={error.fullname}
                                helperText={error.fullname}
                                autoFocus
                            />
                        
                            <TextField
                                margin="normal"
                                size="small"
                                required
                                fullWidth
                                id="email"
                                label="Email Address"
                                name="email"
                                value={values.email}
                                onChange={handleChange}
                                autoComplete="email"
                                error={error.email}
                                helperText={error.email}
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

                            <TextField
                                margin="normal"
                                size="small"
                                required
                                fullWidth
                                name="confirmPassword"
                                value={values.confirmPassword}
                                onChange={handleChange}
                                label="Confirm Password"
                                type="password"
                                id="Confirm Password"
                                error={error.confirmPassword}
                                helperText={error.confirmPassword}
                                autoComplete="current-password"

                            />
                            <Grid sx={{display: 'flex', ml: 2}}>
                                <Typography variant='caption'>Le mot de passe doit comporter au moins 8 caractères.</Typography>
                            </Grid>
                            <Grid sx={{display: 'flex', mt: 2}}>
                                <Checkbox
                                    checked={agreeTerms}
                                    onChange={handleChecked}
                                />
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
                                S'inscrire
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