import { Box, Button, IconButton, Modal, TextField, ThemeProvider } from "@mui/material";
import { useEffect, useState } from "react";
import { getUser } from "../../api/user";

const style = {
    position: 'absolute',
    width: 400,
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
                members,
                handleAddMember
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
        },[members])
        
        
        return (
                <>
                <Modal
                        open={open}
                        onClose={handleCloseModal}
                        aria-labelledby="modal-modal-title"
                        aria-describedby="modal-modal-description"
                >
                        <Box sx={style}>
                                <h1 className="text-xl font-medium mb-2">Liste des membres du projet</h1>
                                <div className="flex flex-col gap-2">
                                        {
                                                users.map((user, index)=>{
                                                        
                                                        return (
                                                                <div key={index}>
                                                                        <button className="text-lg font-medium p-2 rounded bg-blue-600 text-white" 
                                                                        onClick={()=>handleAddMember(user._id)}
                                                                        >{user.fullname}</button>
                                                                        
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