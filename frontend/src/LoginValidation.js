function Validation(values){
    let errors = {};
    const email_pattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const password_pattern = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])[a-zA-Z0-9]{8,}$/;

    if(!values.email.trim()) {
        errors.email = "Email should not be empty";
    } else if(!email_pattern.test(values.email)){
        errors.email = "Email format is invalid";
    }

    if(!values.password.trim()) {
        errors.password = "Password should not be empty";
    } else if(!password_pattern.test(values.password)) {
        errors.password = "Password format is invalid";
    }

    return errors;
}

export default Validation;
