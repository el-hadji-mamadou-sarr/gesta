import * as React from 'react';
import { useEffect } from 'react';
import { Box } from "@mui/material";
import { Button } from "@mui/material";
import { theme } from "../../Assets/theme/theme";
import { useState } from "react";
import { Tab } from "../card/Tab";
import { getProfile } from '../../api/user';
import { getProject } from '../../api/projects';
import { NewTabModal } from '../modals/NewTab';
import { NewProjectModal } from '../modals/NewProject';
import { NewMemberModal } from '../modals/NewMember';
import { Flash } from '../flash/Fash';



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
    const [idProject, setIdProject] = useState();
    const [message, setMessage] = useState("");
    const [flash, setFlash] = useState(false);

    /* add new Tab */
    const [value, setValue] = useState('');
    const [open, setOpen] = useState(false);
    const handleOpenList = (id) => {
        setIdProject(id);
        setOpen(true);
    }
    const handleCloseList = () => setOpen(false);
    const [userId, setUserId] = useState();
    const handleChange = (event) => {
        const { name, value } = event.target;
        setValue(event.target.value);
    };

    /* create new project */
    const [newProjectModal, setNewProjectModal] = useState(false);
    const handleCloseModal = () => setNewProjectModal(false);
    const [projectValues, setProjectValues] = useState({
        name: "",
        description: ""
    });
    const handleNewProject = (event) => {
        setProjectValues({ ...projectValues, [event.target.name]: event.target.value });
    }

    useEffect(() => {
        fetch("http://localhost:5000/api/projects/member", {
            method: "GET",
            headers: { 'Content-Type': 'application/json' },
            credentials: "include"
        })
            .then(response => response.json())
            .then(data => { console.log(data); setProjects(data) });
    }, []);

    /* ajouter un membre au projet modal */
    const [newMemberModal, setNewMemberModal] = useState(false);
    const [email, setEmail] = useState("")
    const closeMemberModal = () => {
        setNewMemberModal(false);
        setMessage("");
        setEmail("");
    }
    const handleEmailChange = (event) => {
        const { name, value } = event.target;
        setEmail(event.target.value);
    };
    const handleOpenNewMember = (id) => {
        setIdProject(id);
        setNewMemberModal(true);
    }
    const [projects, setProjects] = useState([]);

    const paperStyle = { padding: '30px 20px', width: "80%", margin: "20px auto" }


    const [doUpdate, setDoUpdate] = useState(false);
    const update = () => {
        setDoUpdate(!doUpdate);
    }
    useEffect(() => {
        getProfile().then((data) => {
            setUserId(data._id);

            console.log(data);

            const projectPromises = data.projects.map(async (id) => {
                const project_data = await getProject(id);
                return ({
                    id: project_data._id,
                    name: project_data.name,
                    owner: project_data.owner,
                    tabs: project_data.tabs,
                    updated_at: project_data.updated_at,
                });
            });

            Promise.all(projectPromises).then((projects) => {
                setProjectList([]);
                setProjectList([...projects])

            });
        });

    }, [doUpdate]);

    return (
        <div class="flex">

            <div>
                <Box>
                    {/*espace de travail side*/}

                    <Box sx={{ display: 'flex', justifyContent: 'flex-start', gap: 5, marginTop: '30px' }}>
                        <Button
                            variant="contained"
                            ml={2}
                            onClick={() => setNewProjectModal(true)}>
                            Créer un nouveau projet
                        </Button>
                        <NewProjectModal
                            handleCloseList={handleCloseModal}
                            open={newProjectModal}
                            value={projectValues}
                            style={style}
                            handleChange={handleNewProject}
                            theme={theme}
                            update={update}
                        />
                    </Box>

                    <Box>
                    </Box>
                    {
                        flash && <Flash />
                    }
                    {/* list de project */}
                    <Box >

                        {
                            projectList.map((data, index) => {
                                return (
                                    <div key={index}>

                                        <div className="flex mt-5 ml-7 ">
                                            <div>
                                                {
                                                    <h1 className="text-3xl font-semibold mt-5">{data.name}</h1>
                                                }
                                            </div>
                                            <div>
                                                {
                                                    userId === data.owner &&
                                                    <Button className="bg-green-900 hover:bg-green-900 text-white font-bold py-2 px-4 rounded"
                                                        sx={{ margin: 3 }}
                                                        variant="contained"
                                                        ml={2}
                                                        onClick={() => handleOpenNewMember(data.id)}>
                                                        ajouter un membre
                                                    </Button>
                                                }
                                            </div>
                                        </div>

                                        <NewMemberModal
                                            handleCloseList={closeMemberModal}
                                            value={email}
                                            open={newMemberModal}
                                            style={style}
                                            idProject={idProject}
                                            handleChange={handleEmailChange}
                                            theme={theme}
                                            update={update}
                                            setMessage={setMessage}
                                            message={message}
                                            setFlash={setFlash}
                                        />
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

                                            {/* liste de tableaux */}
                                            {
                                                data.tabs.map((tab_data, index) => {

                                                    return (
                                                        <div key={index} >
                                                            <Tab project_id={data.id} data={tab_data} />
                                                        </div>

                                                    );
                                                })
                                            }

                                            {
                                                userId === data.owner &&
                                                <Button
                                                    variant="contained"
                                                    ml={2}
                                                    onClick={() => handleOpenList(data.id)}>
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
                                                update={update}

                                            />
                                        </Box>
                                    </div>

                                );
                            })
                        }
                    </Box>
                </Box>
            </div>
        </div>
    )

}




