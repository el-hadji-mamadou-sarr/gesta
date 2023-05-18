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
import { addTab } from '../../api/tab';
import { NewTabModal } from '../modals/NewTab';
import { NewProjectModal } from '../modals/NewProject';



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

    const [projectList, setProjectList] = useState([]);
    const [idProject, setIdProject]=useState();

    /* add new Tab */
    const [value, setValue] = useState('');
    const [open, setOpen] = useState(false);
    const handleOpenList = (id) => {
        setIdProject(id);
        setOpen(true);
    }
    const handleCloseList = () => setOpen(false);
    const [userId, setUserId]=useState();
    const handleChange = (event) => {
        const { name, value } = event.target;
        setValue(event.target.value);
    };

    /* create new project */
    const [newProjectModal, setNewProjectModal]= useState(false);
    const handleCloseModal = () => setNewProjectModal(false);
    const [projectValues, setProjectValues]=useState({
        name:"",
        description:""
    });
    const handleNewProject = (event) => {
        setProjectValues({...projectValues, [event.target.name]:event.target.value});
    }

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
                setProjectList([...projects])
                
            });
        });

    }, []);

    return (
        <>
           
            <Box>
                {/*espace de travail side*/}

                <Box sx={{ display: 'flex', justifyContent: 'flex-start', gap:5, marginY:2}}>
                    <h1>Vos Projets Gesta</h1>
                    <Button
                        variant="contained"
                        ml={2}
                        onClick={()=>setNewProjectModal(true)}>
                        Créer un nouveau projet
                     </Button>
                      <NewProjectModal
                            handleCloseList={handleCloseModal}
                            open={newProjectModal}
                            value={projectValues}
                            style={style}
                            handleChange={handleNewProject}
                            theme={theme}
                        />
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
                                            data.tabs.map((tab_data, index)=>{
                                                
                                                return (
                                                    <div key={index}>
                                                        <Tab  project_id={data.id} data={tab_data}/>
                                                    </div>

                                                );
                                            })
                                        }


                                      

                                        {
                                            userId === data.owner &&
                                            <Button
                                                variant="contained"
                                                ml={2}
                                                onClick={()=>handleOpenList(data.id)}>
                                                Créer un Tableau
                                            </Button>
                                        }

                                        {/* Modal création tab */}

                                       <NewTabModal
                                            handleCloseList={handleCloseList}
                                            value={value}
                                            open={open}
                                            style={style}
                                            idProject={idProject}
                                            handleChange={handleChange}
                                            theme={theme}

                                       />
                                      
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




