import { Grid, Paper, Typography } from "@mui/material";
import { useState } from "react";
import { addTask } from "../../api/task";
import { useParams } from "react-router";

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

       
        return (
                <>
                        <Grid item>
                                <Paper>
                                <Typography variant="h6" gutterBottom>
                                        {data.name}
                                </Typography>
                                {data.tasks &&
                                        data.tasks.map((task)=>{
                                                return (
                                                        <Task task={task} section_id={data._id}/>
                                                );
                                        })
                                }
                                  <form onSubmit={handleSubmit}>
                                        <input
                                                type="text"
                                                value={name}
                                                onChange={e => setName(e.target.value)}
                                        />
                                        <button type="submit">Add Card</button>
                                </form>
                                </Paper>
                        </Grid>
                </>
        );
}
const Task = ({task, section_id})=>{
        return (
              
                <div key={section_id}>
                        <h3>{task.name}</h3>
                </div>
                        
            
        );
}
