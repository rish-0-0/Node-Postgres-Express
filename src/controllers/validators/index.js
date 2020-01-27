import Validator from 'validator';

function isEmpty (value) {
    (typeof value === "undefined") ||
    (typeof value === "object" && Object.keys(value).length === 0) ||
    (typeof value === "string" && value.trim().length === 0) ||
    value === null;
}

export function validateLogin (data) {
    let errors = {};

    data.email = isEmpty(data.email) ? '' : data.email;
    data.password = isEmpty(data.password) ? '' : data.password;

    if (Validator.isEmpty(data.email)) {
        errors.email = "Email cannot be empty!";
    }

    if (Validator.isEmpty(data.password)) {
        errors.password = "Password cannot be empty!";
    }

    if (!Validator.isEmail(data.email)) {
        errors.email = "Invalid email";
    }

    return {
        errors,
        isValid: isEmpty(errors),
    };
}

export function validateRegistration (data) {
    let errors = {};

    data.firstName = isEmpty(data.firstName) ? '' : data.firstName;
    data.lastName = isEmpty(data.lastName) ? '' : data.lastName;
    data.password = isEmpty(data.password) ? '' : data.password;
    data.email = isEmpty(data.email) ? '' : data.email;
    data.phoneNo = isEmpty(dat.phoneNo) ? '' : data.phoneNo;

    if (Validator.isEmpty(data.firstName)) {
        errors.firstName = "Please enter first name";
    }

    if (Validator.isEmpty(data.lastName)) {
        errors.lastName = "Please enter your last name";
    }

    if (Validator.isEmpty(data.email)) {
        errors.email = "Email is a required field";
    }

    if (Validator.isEmpty(data.phoneNo)) {
        errors.phoneNo = "Mobile number is a required field";
    }

    if (Validator.isEmpty(data.password)) {
        errors.password = "Password cannot be empty";
    }

    if (!Validator.isEmail(data.email)) {
        errors.email = "Email is invalid";
    }

    if (!Validator.isLength(data.password, { min: 8 })) {
        errors.password = "Minimum length of 8 characters for password";
    }

    if (!Validator.isLength(data.phoneNo, { min: 8, max: 12})) {
        errors.phoneNo = "Phone number should be between 8 to 12 digits";
    }

    return {
        errors,
        isValid: isEmpty(errors),
    };
}

