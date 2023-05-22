import { Box, Button, IconButton, Modal, TextField, ThemeProvider } from "@mui/material";
import { addTab } from "../../api/tab";
import { createProject } from "../../api/projects";

export const NewProjectModal = (props)=>{
       
        const {
                handleCloseList,
                value,
                open,
                style,
                handleChange,
                theme,
                update
        }=props;
        return (
                <>
                <Modal
                        open={open}
                        onClose={handleCloseList}
                        aria-labelledby="modal-modal-title"
                        aria-describedby="modal-modal-description"
                >
                        <Box sx={style} component="form" onSubmit={
                        async(event)=>{
                                event.preventDefault();
                                if(value.name && value.description){
                                        await createProject(value.name, value.description);
                                        update();
                                        handleCloseList();
              
                                }
                        }

                        }>
                        
                        <TextField
                                margin="normal"
                                size="small"
                                fullWidth
                                id="name"
                                label="saisissez le nom du projet"
                                name="name"
                                value={value.name}
                                type="text"
                                onChange={handleChange}
                                autoFocus
                        />

                        <TextField
                                margin="normal"
                                size="small"
                                fullWidth
                                id="description"
                                label="saisissez la description du projet"
                                name="description"
                                value={value.description}
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
                                        Créer un projet
                                </Box>
                                </Button>
                        </ThemeProvider>

                        </Box>

                </Modal>  
                </>
        );
}