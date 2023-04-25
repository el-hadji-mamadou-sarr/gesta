import * as React from "react";
import { styled} from "@mui/material";
import {Container} from "@mui/material";
import {Box} from "@mui/material";
import {theme} from "../theme/theme";


const LoginLayoutRoot = styled('body')({
    color: theme.palette.secondary.main
})

const Background = styled(Container)({
    position: 'absolute',
    left: 0,
    right: 0,
    top: 0,
    bottom: 0,
    backgroundSize: 'cover',
    backgroundRepeat: 'no-repeat',
    zIndex: -2,
})

export const LoginLayout=()=>{

    return (
        <LoginLayoutRoot>
            <img src="../images/login-removebg-preview.png" />
        </LoginLayoutRoot>
    )
}

