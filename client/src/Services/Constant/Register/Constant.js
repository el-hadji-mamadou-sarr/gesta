function validation(values, agreeTerms){
    let error = {}
    const regex_email = /[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/;
    const regex_password = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[@$!%*#?&])(?=.*[a-zA-Z]).{8,}$/;

    // fullname verification
    if(!values.fullname){
        error.fullname = "Fullname should not be empty"
    }else{
        delete error.fullname
    }

    // email verification
    if(!regex_email.test(values.email) || !values.email){
        error.email="Email has some error"
    }else {
       delete error.email
    }

    //password verification
    if(!regex_password.test(values.password) || !values.password){
        error.password = "This password has some error"
    }else{
        delete error.password
    }

    // password confirm verification
    if(values.password !== values.confirmPassword || !values.confirmPassword){
        error.confirmPassword = "This confirm password didn't match the password"
    }else{
        delete error.confirmPassword
    }

    if(!agreeTerms){
        error.agreeTerms = "You need to check the checkbox"
    }else{
        delete error.agreeTerms
    }

    return error;
}
export default validation;