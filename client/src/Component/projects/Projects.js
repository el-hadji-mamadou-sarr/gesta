import * as React from 'react';
import { useEffect } from 'react';
import NavigationNavBar from "../navbar/NavigationNavBar";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import List from "@mui/material/List";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemText from "@mui/material/ListItemText";
import {Button, Modal, TextField, ThemeProvider} from "@mui/material";
import Paper from "@mui/material/Paper";
import IconButton from "@mui/material/IconButton";
import AddIcon from "@mui/icons-material/Add";
import CloseIcon from "@mui/icons-material/Close";
import {theme} from "../../Assets/theme/theme";
import {useState} from "react";
import {Tab} from "../card/Tab";
import { getProfile } from '../../api/user';
import { getProject } from '../../api/projects';



const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    bgcolor: 'background.paper',
    border: '2px solid #000',
    boxShadow: 24,
    p: 4,
};

export const Projects = () => {

    const [value, setValue] = useState('');
    const [tablist, settablist] = useState([]);
    const [projectList, setProjectList] = useState([]);

    
    const [open, setOpen] = useState(false);
    const handleOpenList = (index) => setOpen(true);
    const handleCloseList = () => setOpen(false);
    const [userId, setUserId]=useState();
    
    const handleSubmitList = (event) =>{
        event.preventDefault();
        settablist([...tablist, value]);
        handleCloseList();
    }

    const handleChange = (event) => {
        const { name, value } = event.target;
        setValue(event.target.value);
    };

    useEffect(() => {
        getProfile().then((data) => {
            setUserId(data._id);

            const projectPromises = data.projects.map((id) => {
            return getProject(id)
                .then((project_data) => ({
                    id: project_data._id,
                    name: project_data.name,
                    owner: project_data.owner,
                    tabs: project_data.tabs,
                    updated_at: project_data.updated_at,
                }));
            });

            Promise.all(projectPromises).then((projects) => {
                setProjectList([]);
                setProjectList([...projects]);
            });
        });

    }, []);

    return (
        <>
           
            <Box>
                {/*espace de travail side*/}

                <Box sx={{ display: 'flex', justifyContent: 'space-between'}}>
                    <h1>Vos Projets Gesta</h1>

                </Box>
                <Box>

                    {
                        projectList.map((data, index)=>{
                            return (
                                <div key={index}>
                                    <Typography>{data.name}</Typography>
                                    <Box
                                        sx={{
                                            display: 'flex',
                                            flexWrap: 'wrap',
                                            '& > :not(style)': {
                                                m: 3,
                                                width: 200,
                                                height: 200,
                                            },
                                        }}
                                    >

                                        {
                                            data.tabs.map((data, index)=>{
                                                return (
                                                    <div key={index}>
                                                        <Tab name={data}/>
                                                    </div>

                                                );
                                            })
                                        }


                                        {/*Modal side*/}

                                        {
                                            userId === data.owner &&
                                            <Button
                                                variant="contained"
                                                ml={2}
                                                onClick={handleOpenList}>
                                                Créer un Tableau
                                            </Button>
                                        }


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
                                                    label="saisissez le nom du tableau"
                                                    name="tab"
                                                    value={value}
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
                                                            Créer un tableau
                                                        </Box>
                                                    </Button>
                                                </ThemeProvider>

                                            </Box>

                                        </Modal>
                                    </Box>
                                </div>

                            );
                        })
                    }
                </Box>




            </Box>
        </>
    )

}




