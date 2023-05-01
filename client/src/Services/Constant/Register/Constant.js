function validation(values, agreeTerms){
    let error = {}
    const regex_email = /[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/;
    const regex_password = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[@$!%*#?&])(?=.*[a-zA-Z]).{8,}$/;

    // fullname verification
    if(values.fullname === ""){
        error.fullname = "Fullname should not be empty"
    }

    // email verification
    if(values.email === ""){
        error.email = "Email should not be empty"
    }
    else if(!regex_email.test(values.email)){
        error.email="Email Didn't match"
    }else {
        error.email = ""
    }

    //password verification
    if(values.password === "") {
        error.password = "Password should not be empty"
    }
    else if(!regex_password.test(values.password)){
        error.password = "Password didn't match"
    }else{
        error.password = ""
    }

    // password confirm verification

    if(values.confirmPassword === ""){
        error.confirmPassword = "Confirm password should not be empty"
    }else{
        error.confirmPassword = ""
    }

    if(values.password !== values.confirmPassword){
        error.confirmPassword = "This confirm password didn't match the password"
    }else{
        error.confirmPassword = ""
    }

    if(!agreeTerms){
        error.agreeTerms = "You need to check the checkbox"
    }else{
        error.agreeTerms = ""
    }

    return error;
}
export default validation;