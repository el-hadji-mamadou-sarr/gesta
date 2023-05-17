import Paper from "@mui/material/Paper";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import * as React from "react";

export const Tab = (props)=>{
    const {name}=props;

    return(
        <>
            <Box>
                <a href="">
                    <Paper sx={{width: 200, height: 200}} >
                        <Typography variant="body1">
                            {name}
                        </Typography>
                    </Paper>
                </a>
            </Box>
        </>

    );
}