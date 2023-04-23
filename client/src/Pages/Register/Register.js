import * as React from "react";
import {
    Avatar,
    Button,
    Paper,
    TextField,
    Typography,
    Box,
    ThemeProvider,
    Divider, Grid, Link
} from "@mui/material";
import { theme } from "../../Assets/theme/theme";
import Logo from "../../Assets/images/login-removebg-preview.png";


export const Register = () => {
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
        <div style={{ backgroundImage: `url(${Logo})`, backgroundRepeat: "no-repeat", width: '100%', height: '100%' }}>
            <Box sx={{}}>
                <Paper elevation={20} style={paperStyle}>
                    <Box align="center">
                        <Avatar>

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
                                color="primary"
                                fullWidth
                                variant="contained"
                                sx={{ mt: 3, mb: 2 }}
                            >
                                Sign In
                            </Button>
                        </ThemeProvider>

                        <Divider variant="middle" sx={{ mt: 7 }} />

                        <Grid align="center">
                            <Typography variant='caption'>Vous avez déja un compte?</Typography>
                            <Grid>
                                <Link href="#">Connectez-vous !!</Link>
                            </Grid>
                        </Grid>

                    </Box>
                </Paper>
            </Box>

        </div>



    )
}