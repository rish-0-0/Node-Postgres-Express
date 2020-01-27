import jwt from 'jsonwebtoken';
import { secrets } from './keys';
import {
    errorResponse,
    unauthorized,
    successResponse,
    missingBody,
    alreadyRegistered,
} from '../responses';

export function newToken (user) {
    return jwt.sign({ id: user.id }, secrets.jwt, {
        expiresIn: secrets.jwtExp
    });
};

export function verifyToken (token) {
    return new Promise( (resolve, reject) => {
        jwt.verify(token, secrets.jwt, (err, payload) => {
            if (err) reject(err);
            resolve(payload);
        });
    });
};

export async function protect (req, res, next) {
    const bearer = req.headers.authorization;

    if (!bearer || !bearer.startsWith('Bearer ')) {
        return missingBody(res, 'No JWT Provided');
    }

    const token = bearer.split('Bearer ')[1];

    let payload;

    try {
        payload = await verifyToken(token);
    } catch (err) {
        return unauthorized(res, {
            msg: "Failed to verify JWT"
        });
    }

    next();
};