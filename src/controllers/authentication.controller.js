import { validateLogin, validateRegistration } from './validators';
import {
    errorResponse,
    unauthorized,
    successResponse,
    missingBody,
    alreadyRegistered,
} from './responses';
import { newToken } from './config';


export const register = async (req, res) => {
    try {
        const { errors, isValid } = validateRegistration(req.body);

        if (!isValid) {
            return unauthorized(res, errors);
        }

        let userExists
        // If not
        if (userExists) {
            return alreadyRegistered(res);
        }

        // create User
        let user;
        const token = newToken(user);
        const parcel = {
            user,
            token
        };
        return successResponse(res, parcel, "Successfully Registered");

    } catch (err) {
        return errorResponse(res, err, 500, "Server: Registration Error");
    }
};

export const login = async (req, res) => {
    try {
        const { errors, isValid } = validateLogin(req.body);

        if (!isValid) {
            return unauthorized(res, errors);
        }

        // get user
        let user;

        if (!user) {
            return unauthorized(res, {
                message: "User doesn't exist",
            });
        }

        const match = await user.checkPassword(req.body.password);

        if (!match) {
            return unauthorized(res, {
                message: "Password Incorrect",
            });
        }

        const token = newToken(user);

        successResponse(res, user, "Login Successful");

        user.updateLastLogin();
        
    } catch (err) {
        return errorResponse(res, err, 500, "Server: Login Error");
    }
};