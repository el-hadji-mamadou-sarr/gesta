import * as React from 'react';
import Grid from '@mui/material/Grid';
import FormLabel from '@mui/material/FormLabel';
import FormControl from '@mui/material/FormControl';
import FormControlLabel from '@mui/material/FormControlLabel';
import RadioGroup from '@mui/material/RadioGroup';
import Radio from '@mui/material/Radio';
import Paper from '@mui/material/Paper';
import {CardComponent} from "../card/CardComponent";
import {Button, Modal, TextField, ThemeProvider} from "@mui/material";
import Typography from "@mui/material/Typography";
import {useEffect, useState} from "react";
import AddIcon from '@mui/icons-material/Add';
import IconButton from "@mui/material/IconButton";
import Box from "@mui/material/Box";
import {theme} from "../../Assets/theme/theme";
import CloseIcon from '@mui/icons-material/Close';
import axios from "axios";



const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 400,
    bgcolor: 'background.paper',
    border: '2px solid #000',
    boxShadow: 24,
    p: 4,
};

export const  GridComponent =()=> {

     const [value, setValues] = useState({
         name: '',
    })
    // const [tabName, setTabName] = useState([]);
    //
    // useEffect(() => {
    //     const fetchData = async () => {
    //         try {
    //             const response = await axios.get('');
    //             setTabName(response.tabName);
    //         }catch (error) {
    //             console.error('Error fetching data', error)
    //         }
    //     }
    // })

    const [open, setOpen] = useState(false);
    const handleOpenList = () => setOpen(true);
    const handleCloseList = () => setOpen(false);

    const handleSubmitList = (event) =>{
        event.preventDefault();
    }

    const handleChange = (event) => {
        const { name, value } = event.target;

        setValues((prevState) => ({
            ...prevState,
            [name]: value,
        }));
    };



    return (
        <div>
            {/*{tabName.map(field => (*/}
            {/*    <Typography variant="h4" gutterBottom key={field.id}>*/}
            {/*        {field.name}*/}
            {/*    </Typography>*/}
            {/*))}*/}

            <Box sx={{ display: 'flex' }}>
                <Grid container spacing={2}>

                    <Grid item>
                        <Paper>
                            <Typography variant="h6" gutterBottom>
                                Bonjour
                            </Typography>

                            <AddCardForm  />
                        </Paper>
                    </Grid>
                    <Grid item>
                        <Paper >
                            <Typography variant="h6" gutterBottom>
                                Bonjour
                            </Typography>

                            <AddCardForm  />
                        </Paper>
                    </Grid>
                </Grid>


                <Button
                    variant="contained"
                    ml={2}
                    onClick={handleOpenList}>
                    <IconButton>
                        <AddIcon/>
                    </IconButton>
                    Créer une liste
                </Button>
                <Modal
                    open={open}
                    onClose={handleCloseList}
                    aria-labelledby="modal-modal-title"
                    aria-describedby="modal-modal-description"
                    >
                    <Box sx={style} component="form" onSubmit={handleSubmitList}>
                        <Box sx={{flexGrow: 1}}>
                            <IconButton>
                                <CloseIcon/>
                            </IconButton>
                        </Box>

                        <TextField
                            margin="normal"
                            size="small"
                            fullWidth
                            id="task"
                            label="saisissez le titre de la task"
                            name="task"
                            autoComplete="email"
                            type="text"
                            onChange={handleChange}
                            autoFocus
                            />

                        <ThemeProvider theme={theme}>
                            <Button
                                type="submit"
                                color="registeBtnTheme"
                                variant="contained"
                                sx={{ mt: 3, mb: 2 }}
                            >
                                <Box
                                    color="white">
                                    Create task
                                </Box>
                            </Button>
                        </ThemeProvider>

                    </Box>

                </Modal>
            </Box>

        </div>
    );
};


const Card = ({ title }) => {
    return (
        <Paper>
            <Typography variant="body1">{title}</Typography>
        </Paper>
    );
};

// Adding card form
const AddCardForm = ({ listId, onAddCard }) => {
    const [cardTitle, setCardTitle] = useState('');

    const handleSubmit = e => {
        e.preventDefault();
        onAddCard(listId, cardTitle);
        setCardTitle('');
    };

    return (
        <form onSubmit={handleSubmit}>
            <input
                type="text"
                value={cardTitle}
                onChange={e => setCardTitle(e.target.value)}
            />
            <button type="submit">Add Card</button>
        </form>
    );
}