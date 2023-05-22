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
import { NewSectionModal } from '../modals/NewSection';



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

    const [value, setValue] = useState('')
    const [tabName, setTabName] = useState([]);
    const [open, setOpen] = useState(false);
    const handleOpenList = () => setOpen(true);
    const handleCloseList = () => setOpen(false);
    const handleSubmitList = (event) =>{
        event.preventDefault();
    }

    return (
        <>
            <Button
                variant="contained"
                sx={{ margin:2}}
                onClick={handleOpenList}>
                <IconButton>
                    <AddIcon/>
                </IconButton>
                ajouter une section
            </Button>
           <NewSectionModal
                handleCloseList={handleCloseList}
                value={value}
                open={open}
                style={style} 
                setValue={setValue}
                theme={theme}
            />
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

                    
                </Grid>



                
            </Box>

        </>
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