import Jwt from "jsonwebtoken";
import {User} from "./verifyCredentials";

export const generateAccessToken = (user: User): string => {
    const expiresIn = "7d";

    const SECRET = "dsanfkneniwjepwf";

    const payload = {
        email: user.email,
        isAdmin: user.isAdmin,
    };

    return Jwt.sign(payload, SECRET, {
        expiresIn,
    });
};
