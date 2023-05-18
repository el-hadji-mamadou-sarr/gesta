import { Box, Button, IconButton, Modal, TextField, ThemeProvider } from "@mui/material";
import { addSection } from "../../api/section";

export const NewSectionModal = (props)=>{
        const {
                handleCloseList,
                value,
                open,
                style,
                setValue,
                theme,
                project_id,
                tab_id,
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
                    <Box sx={style} component="form" onSubmit={(event)=>{
                        event.preventDefault();
                        if(value){
                                addSection(project_id, tab_id, value).then((response)=>{
                                        if(response.status===200){
                                                update();
                                                handleCloseList();
                                                
                                        }
                                })
                        }
                        
                    }}>

                        <TextField
                            margin="normal"
                            size="small"
                            fullWidth
                            id="name"
                            label="saisissez le titre de la section"
                            name="name"
                            value={value}
                            autoComplete="name"
                            type="name"
                            onChange={(event)=>setValue(event.target.value)}
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
                                    ajouter une section
                                </Box>
                            </Button>
                        </ThemeProvider>

                    </Box>

                </Modal>
                </>
        );
}