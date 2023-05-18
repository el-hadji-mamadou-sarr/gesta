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