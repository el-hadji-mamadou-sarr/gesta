const url = "http://localhost:5000/api/auth/" ;

export const getIsLogged = ()=>{
        const requestOptions = {
                method: 'GET',
                credentials: "include",
                headers: {
                        'Content-Type': 'application/json',
                }
        }
        const result = fetch(url+"isLogged",requestOptions).then(response=>response.json());
        return result;
}

export const logout = ()=>{
         const requestOptions = {
                method: 'POST',
                credentials: "include",
                headers: {
                        'Content-Type': 'application/json',
                }
        }
        return  fetch(url+"logout",requestOptions).then(response=>response.json());
       
}