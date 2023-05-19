const url = "http://localhost:5000/api/sections/" ;

export const addSection = (project_id, tab_id, name)=>{
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

        return fetch(url+project_id+"/"+tab_id+"/add",requestOptions);
}

export const deleteSection = (project_id, tab_id, section_id)=>{
        const requestOptions = {
                method: 'DELETE',
                credentials: "include",
                headers: {
                        'Content-Type': 'application/json',
                }
        }
        return fetch(url+project_id+"/"+tab_id+"/"+section_id+"/delete",requestOptions);
}