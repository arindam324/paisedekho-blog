import {NextApiRequest, NextApiResponse} from "next";
import {verifyCredentials} from "../../utils/verifyCredentials";
import {generateAccessToken} from "../../utils/generateAccesstoken";

export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse
) {
    const {email, password} = req.body;
    try {
        const user = await verifyCredentials(email, password);
        if (!user || !user.isAdmin) {
            return res.status(401).json({error: "Incorrect email or password"});
        }
        const accessToken = generateAccessToken(user);


        return res.json({user, accessToken});
    } catch (err) {
        return res.status(500).json({error: "Failed to login here"});
    }
}
