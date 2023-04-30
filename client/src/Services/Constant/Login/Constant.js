function validation(values){
    let error = {}
     const regex_email = /[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/;
     const regex_password = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[@$!%*#?&])(?=.*[a-zA-Z]).{8,}$/;

     if(values.email === ""){
         error.email = "Email should not be empty"
     }
     else if(!regex_email.test(values.email)){
         error.email="Email Didn't match"
     }else {
         error.email = ""
     }


     if(values.password === "") {
         error.password = "Password should not be empty"
     }
     else if(!regex_password.test(values.password)){
         error.password = "Password didn't match"
     }else{
         error.password = ""
     }

     return error;
}
export default validation;