import Paper from "@mui/material/Paper";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import { Link } from "react-router-dom";

export const Tab = (props)=>{
    const {data, project_id}=props;

    return(
        <>
            <Box>
                <Link to={"/"+project_id+"/"+data._id}>
                    <Paper sx={{width: 200, height: 200}} >
                        <h1>
                            {data.name}
                        </h1>
                    </Paper>
                </Link>
            </Box>
        </>

    );
}