import { Box, Button, IconButton, Modal, TextField, ThemeProvider } from "@mui/material";
import { addTab } from "../../api/tab";

export const NewTabModal = (props)=>{
        const {
                handleCloseList,
                value,
                open,
                style,
                idProject,
                handleChange,
                theme
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
                                if(value){
                                        await addTab(idProject, value);
                                        window.location.reload();
                                        handleCloseList();
                                       
                                }

                        }
                        }>
                        
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
                </>
        );
}