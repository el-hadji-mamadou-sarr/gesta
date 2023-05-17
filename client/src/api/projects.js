const url = "http://localhost:5000/api/projects/" ;

export const getProject = (id)=>{
        const requestOptions = {
                method: 'GET',
                credentials: "include",
                headers: {
                        'Content-Type': 'application/json',
                }
        }
        return fetch(url+id,requestOptions).then(response=>response.json());

}