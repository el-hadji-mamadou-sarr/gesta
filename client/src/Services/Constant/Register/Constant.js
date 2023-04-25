export const initialValues = {
    email: "",
    password: "",
    agree_terms:"",
}


export const validate = (userValues, agreeTerms)=>{
    const errors = {};

    if(!userValues.email){
        errors.email = "Vous devez saisir votre email"
    }else{delete errors.email}

    if(!userValues.password){
        errors.password = "Vous devez saisir votre password"
    }else{delete errors.password}

    if(!agreeTerms){
        errors.agree_terms = "Vous devez accépter les conditions d'utilisation de l'application"
    }else{delete errors.agree_terms}
    return errors;
}