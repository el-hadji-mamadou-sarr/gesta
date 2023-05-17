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