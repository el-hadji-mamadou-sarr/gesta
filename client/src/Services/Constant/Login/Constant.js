function validation(values){
    let error = {}
     const regex_email = /[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/;
     const regex_password = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[@$!%*#?&])(?=.*[a-zA-Z]).{8,}$/;

     if(values.email === ""){
         error.email = "l'e-mail ne doit pas être vide"
     }
     else if(!regex_email.test(values.email)){
         error.email="l'e-mail n'est pas valide"
     }else {
         error.email = ""
     }


     if(values.password === "") {
         error.password = "le mot de passe ne doit pas être vide"
     }
     else if(!regex_password.test(values.password)){
         error.password = "le mot de passe doit contenir au moins 8 caractères, une lettre majuscule, une lettre minuscule, un chiffre et un caractère spécial"
     }else{
         error.password = ""
     }

     return error;
}
export default validation;