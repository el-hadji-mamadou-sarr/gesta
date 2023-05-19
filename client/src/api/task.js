const url = "http://localhost:5000/api/tasks/" ;

export const addTask = (project_id, tab_id, section_id, name)=>{
        const requestOptions = {
                method: 'POST',
                credentials: "include",
                headers: {
                        'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                        name: name,
                })
        }

        return fetch(url+project_id+"/"+tab_id+"/"+section_id+"/add",requestOptions);
}

export const deletetask = (project_id, tab_id, section_id, task_id)=>{
                const requestOptions = {
                method: 'DELETE',
                credentials: "include",
                headers: {
                        'Content-Type': 'application/json',
                } 
        }
        return fetch(url+project_id+"/"+tab_id+"/"+section_id+"/"+task_id+"/delete",requestOptions);
}

export const assignTask = (project_id, tab_id, section_id, task_id, user_id)=>{
                const requestOptions = {
                method: 'POST',
                credentials: "include",
                headers: {
                        'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                        user_id: user_id,
                }) 
        }
        return fetch(url+project_id+"/"+tab_id+"/"+section_id+"/"+task_id+"/assign",requestOptions);
}