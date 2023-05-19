import { Grid, Paper, Typography } from "@mui/material";
import { useState } from "react";
import { addTask, deletetask } from "../../api/task";
import { useParams } from "react-router";
import { deleteSection } from "../../api/section";

export const Section = ({data, update})=>{

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
                        <Grid item>
                                <Paper>
                                <div className="flex justify-between items-center p-2 bg-lime-300">
                                        <Typography variant="h6" gutterBottom>
                                                {data.name}
                                        </Typography>
                                        <button className="text-red-500" onClick={()=>handleDeleteSection(data._id)}>
                                                supprimer
                                        </button>
                                </div>
                               
                                {data.tasks &&
                                        data.tasks.map((task)=>{
                                                return (
                                                        <Task task={task} section_id={data._id} handleDeleteTask={handleDeleteTask}/>
                                                );
                                        })
                                }
                                  <form onSubmit={handleSubmit} >
                                        <input className="m-2 border-2"
                                                type="text"
                                                value={name}
                                                onChange={e => setName(e.target.value)}
                                        />
                                        <button type="submit" className="bg-green-800 text-white rounded font-semibold p-1 m-2">ajouter</button>
                                </form>
                                </Paper>
                        </Grid>
                </>
        );
}
const Task = ({task, section_id, handleDeleteTask})=>{
        
        return (

                <div key={section_id} className="flex justify-start items-center p-2 gap-3">
                        <p className="text-lg font-semibold text-blue-800">{task.name}</p>
                        <button className="text-red-500" onClick={()=>handleDeleteTask(task._id)}>supprimer</button>
                </div>
        );
}
