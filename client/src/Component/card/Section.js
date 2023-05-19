import { Grid, Paper, Typography } from "@mui/material";
import { useEffect, useState } from "react";
import { addTask, deletetask } from "../../api/task";
import { useParams } from "react-router";
import { deleteSection } from "../../api/section";
import { AddMemberModal } from "../modals/AddMember";
import { getProject } from "../../api/projects";

export const Section = ({data, update, projectOwner, userId})=>{

        const [name, setName] = useState('');
        const {project_id, tab_id} = useParams();

        const handleSubmit = e => {
                e.preventDefault();
                if(name){
                        addTask(project_id, tab_id, data._id, name).then((response)=>{
                                if(response.status === 200){
                                        update();
                                        setName("");
                                }

                        })
                }
        };

        const handleDeleteSection = (section_id)=>{
                if(window.confirm('Etes vous sur de vouloir supprimer cette section?')){
                        deleteSection(project_id, tab_id, data._id).then((response)=>{
                                if(response.status === 200){
                                        console.log("deleted");
                                        update();
                                }
                        })
                }
        }

        const handleDeleteTask = (task_id)=>{
                console.log(task_id);
                deletetask(project_id, tab_id, data._id, task_id).then((response)=>{
                        if(response.status === 200){
                                update();
                        }
                })
        }

        
        return (
                <>
                        <Grid item >
                                <Paper sx={{width:300}}>
                                <div className="flex justify-between items-center p-2 bg-lime-300">
                                        <Typography variant="h6" gutterBottom>
                                                {data.name}
                                        </Typography>
                                        {
                                                projectOwner === userId &&
                                                <button className="text-red-500" onClick={()=>handleDeleteSection(data._id)}>
                                                        supprimer
                                                </button>
                                        }
                                        
                                </div>
                               
                                {data.tasks &&
                                        data.tasks.map((task)=>{
                                                return (
                                                        <Task task={task} 
                                                                section_id={data._id} 
                                                                handleDeleteTask={handleDeleteTask} 
                                                                projectOwner={projectOwner} 
                                                                userId={userId}
                                                        />
                                                );
                                        })
                                }
                                {
                                        projectOwner === userId &&

                                        <form onSubmit={handleSubmit} >
                                                <input className="m-2 border-2"
                                                        type="text"
                                                        value={name}
                                                        onChange={e => setName(e.target.value)}
                                                />
                                                <button type="submit" className="bg-green-800 text-white rounded font-semibold p-1 m-2">ajouter</button>
                                        </form>
                                }
                                  
                                </Paper>
                        </Grid>
                </>
        );
}
const Task = ({task, section_id, handleDeleteTask, projectOwner, userId})=>{

        const [open, setOpen] = useState(false);
        const {project_id, tab_id} = useParams();
        const [members, setMembers]=useState([]);
    const handleOpenModal = () => {
        setOpen(true);
    }
    const handleCloseModal = () => setOpen(false);
    useEffect(()=>{
        getProject(project_id).then((data)=>{
                setMembers(data.members);
        })
    },[])
        
        return (

                <div key={section_id} className="flex justify-start items-center p-2 gap-3 bg-gray-300 my-2">
                        <p className="text-lg font-semibold text-blue-800">{task.name}</p>
                        {
                                projectOwner === userId &&
                                <div>
                                        <div className="flex gap-2">
                                                <button className="text-red-500" onClick={()=>handleDeleteTask(task._id)}>supprimer</button>
                                                <button className="text-green-950" onClick={handleOpenModal}>ajouter</button>
                                        </div>
                                        <AddMemberModal
                                                open={open}
                                                handleCloseModal={handleCloseModal}
                                                task={task}
                                                members={members}
                                        />

                                </div>

                                
                                        
                               
                        }
                        
                </div>
        );
}
