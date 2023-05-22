const url = "http://localhost:5000/api/tabs/" ;

export const addTab = (project_id, name)=>{
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

        return fetch(url+project_id+"/add",requestOptions);
}

export const getTab = (project_id, tab_id)=>{
        const requestOptions = {
                method: 'GET',
                credentials: "include",
                headers: {
                        'Content-Type': 'application/json',
                }
                
        }
        return fetch(url+project_id+"/"+tab_id,requestOptions).then(response=>response.json());
}