import { useParams } from "react-router";
import NavigationNavBar from "../../Component/navbar/NavigationNavBar";
import { getTab } from "../../api/tab";
import { useEffect, useState } from "react";
import { GridComponent } from "../../Component/grid/GridComponent";
import { Box, Button, Grid, IconButton, Paper, Typography } from "@mui/material";
import { NewSectionModal } from "../../Component/modals/NewSection";
import AddIcon from '@mui/icons-material/Add';
import { theme } from "../../Assets/theme/theme";
import { Section } from "../../Component/card/Section";
import { getProject } from "../../api/projects";
import { getProfile } from "../../api/user";


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
export const Tab = () => {
        const { tab_id, project_id } = useParams();
        const [projectOwner, setProjectOwner] = useState();
        const [userId, setUserId] = useState();

        const [tab, setTab] = useState(null);
        const [value, setValue] = useState('')
        const [open, setOpen] = useState(false);
        const handleOpenList = () => setOpen(true);
        const handleCloseList = () => setOpen(false);


        const [doUpdate, setDoUpdate] = useState(false);
        const update = () => {
                setDoUpdate(!doUpdate);
        }
        useEffect(() => {
                getTab(project_id, tab_id).then((data) => {
                        setTab(data);
                });
                getProject(project_id).then((data) => {
                        setProjectOwner(data.owner);
                });
                getProfile().then((data) => {
                        setUserId(data._id);
                });
        }, [tab_id, project_id, doUpdate]);

        return (
                <>
                        <NavigationNavBar />
                        <Box>
                                {
                                        projectOwner === userId &&
                                        <Button
                                                variant="contained"
                                                sx={{ margin: 2 }}
                                                onClick={handleOpenList}>
                                                <IconButton>
                                                        <AddIcon />
                                                </IconButton>
                                                ajouter une section
                                        </Button>
                                }

                                <NewSectionModal
                                        handleCloseList={handleCloseList}
                                        value={value}
                                        open={open}
                                        style={style}
                                        setValue={setValue}
                                        theme={theme}
                                        project_id={project_id}
                                        tab_id={tab_id}
                                        update={update}
                                />
                                {/* section */}
                                <Box sx={{ display: 'flex', margin: 2 }}>
                                        <Grid container spacing={2}>

                                                {tab && tab.sections &&
                                                        tab.sections.map((data) => {
                                                                return (
                                                                        <Section data={data}
                                                                                update={update}
                                                                                projectOwner={projectOwner}
                                                                                userId={userId}
                                                                        />
                                                                );
                                                        })
                                                }

                                        </Grid>
                                </Box>
                        </Box>
                </>
        );
}