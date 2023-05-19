import { Box, Button, IconButton, Modal, TextField, ThemeProvider } from "@mui/material";
import { addTab } from "../../api/tab";
import { addMember } from "../../api/projects";

export const NewMemberModal = (props)=>{
        const {
                handleCloseList,
                value,
                open,
                style,
                idProject,
                handleChange,
                theme,
                update,
                setMessage,
                message,
                setFlash
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
                                        addMember(idProject, value).then((response)=>{
                                                if(response.status === 200){
                                                        update();
                                                        handleCloseList();
                                                        setFlash(true);
                                                       
                                                }else{
                                                        setMessage("veuillez entrer un email valide");
                                                        console.log(value);
                                                }
                                        })
                                        
                                       
                                }

                        }
                        }>
                        
                        <TextField
                                margin="normal"
                                size="small"
                                fullWidth
                                id="member"
                                label="saisissez l'email"
                                name="member"
                                value={value}
                                type="text"
                                onChange={handleChange}
                                autoFocus
                        />
                        {
                                message &&  <p className="text-red-500 text-xs italic">{message}</p>
                        }
                       
                   

                        <ThemeProvider theme={theme}>
                                <Button
                                type="submit"
                                color="registeBtnTheme"
                                variant="contained"
                                sx={{ mt: 3, mb: 2 }}
                                >
                                <Box
                                        color="white">
                                        ajouter un membre
                                </Box>
                                </Button>
                        </ThemeProvider>

                        </Box>

                </Modal>  
                </>
        );
}