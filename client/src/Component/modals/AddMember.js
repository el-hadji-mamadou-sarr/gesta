import { Box, Button, IconButton, Modal, TextField, ThemeProvider } from "@mui/material";
import { useEffect, useState } from "react";
import { getUser } from "../../api/user";

const style = {
    position: 'absolute',
    width: 300,
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    bgcolor: 'background.paper',
    border: '2px solid #000',
    boxShadow: 24,
    p: 4,
};
export const AddMemberModal = (props)=>{
        const {
                handleCloseModal,
                open,
                task,
                members
        }=props;

        const [users, setUsers]=useState([]);

         useEffect(()=>{

               Promise.all(members.map((member) => getUser(member)))
                        .then((users) => {
                        setUsers(users);
                        })
                        .catch((error) => {
                        console.error("Error:", error);
                });
        },[]) 
        return (
                <>
                <Modal
                        open={open}
                        onClose={handleCloseModal}
                        aria-labelledby="modal-modal-title"
                        aria-describedby="modal-modal-description"
                >
                        <Box sx={style}>
                                <h1>Liste des membres du projet</h1>
                                <div className="flex flex-col">
                                        {
                                                users.map((user, index)=>{
                                                        
                                                        return (
                                                                <div key={index}>
                                                                        <span>{user.fullname}</span>

                                                                </div>       
                                                        );
                                                })
                                                
                                        }
                                       
                                </div>
                                
                        </Box>

                </Modal>  
                </>
        );
}