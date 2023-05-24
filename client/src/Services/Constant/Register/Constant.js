function validation(values, agreeTerms){
    let error = {}
    const regex_email = /[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/;
    const regex_password = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[@$!%*#?&])(?=.*[a-zA-Z]).{8,}$/;

    // fullname verification
    if(!values.fullname){
        error.fullname ="Le nom ne doit pas être vide"
    }else{
        delete error.fullname
    }

    // email verification
    if(!regex_email.test(values.email) || !values.email){
        error.email="L'e-mail n'est pas valide"
    }else {
       delete error.email
    }

    //password verification
    if(!regex_password.test(values.password) || !values.password){
        error.password = "Le mot de passe doit contenir au moins 8 caractères, une lettre majuscule, une lettre minuscule, un chiffre et un caractère spécial"
    }else{
        delete error.password
    }

    // password confirm verification
    if(values.password !== values.confirmPassword || !values.confirmPassword){
        error.confirmPassword = "Le mot de passe ne correspond pas"
    }else{
        delete error.confirmPassword
    }

    if(!agreeTerms){
        error.agreeTerms = "Vous devez accepter les conditions d'utilisation"
    }else{
        delete error.agreeTerms
    }

    return error;
}
export default validation;