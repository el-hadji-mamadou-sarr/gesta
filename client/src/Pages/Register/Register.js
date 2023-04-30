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
import {useNavigate} from "react-router";

export const Register = () => {

    const [fullname, setFullname] = useState('')
    const [email, setEmail]= useState('')
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('')
    const navigate = useNavigate()

    // variable pour styliser le paper
    const paperStyle = { padding: '30px 20px', width: "387px", margin: "20px auto" }

    const handleSubmit = (event) => {
        event.preventDefault()
       console.log(fullname,email,password,confirmPassword)

            const requestBody = {
                method: "POST",
                headers : {
                    Accept: 'application/json',
                    'Content-Type': 'application/json'

                },
                body: JSON.stringify({
                    fullname: fullname,
                    email: email,
                    password: password,
                    confirmPassword: confirmPassword
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

                            <TextField
                                margin="normal"
                                size="small"
                                required
                                fullWidth
                                id="fullname"
                                label="Fullname"
                                name={fullname}
                                value={fullname}
                                onChange={(event)=>{setFullname(event.target.value)}}
                                autoComplete="email"
                                autoFocus
                            />
                        
                            <TextField
                                margin="normal"
                                size="small"
                                required
                                fullWidth
                                id="email"
                                label="Email Address"
                                name={email}
                                value={email}
                                onChange={(event)=>{setEmail(event.target.value)}}
                                autoComplete="email"
                                autoFocus

                            />
                           
                            <TextField
                                margin="normal"
                                size="small"
                                required
                                fullWidth
                                name={password}
                                label="Password"
                                type="password"
                                id="password"
                                value={password}
                                onChange={(event)=>{setPassword(event.target.value)}}
                                autoComplete="current-password"

                            />

                            <TextField
                                margin="normal"
                                size="small"
                                required
                                fullWidth
                                name={confirmPassword}
                                value={confirmPassword}
                                onChange={(event)=>{setConfirmPassword(event.target.value)}}
                                label="Confirm Password"
                                type="Confirm Password"
                                id="Confirm Password"
                                autoComplete="current-password"

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