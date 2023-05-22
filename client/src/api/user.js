const url = "http://localhost:5000/api/users/" ;

export const getProfile = ()=>{
        const requestOptions = {
                method: 'GET',
                credentials: "include",
                headers: {
                        'Content-Type': 'application/json',
                }
        }
        return fetch(url+"profile",requestOptions).then(response=>response.json());

}

export const getUser = (id)=>{
        const requestOptions = {
                method: 'GET',
                credentials: "include",
                headers: {
                        'Content-Type': 'application/json',
                }
        }
        return fetch(url+id,requestOptions).then(response=>response.json());
}