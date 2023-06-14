import { OAuth2Client } from "google-auth-library";

const client = new OAuth2Client(process.env.GOOGLE_CLIENT_ID);

export async function googleVerify(token = "") {
    const ticket = await client.verifyIdToken({
        idToken: token,
        audience: process.env.GOOGLE_CLIENT_ID,
    });
    const { given_name, family_name, email, picture } = ticket.getPayload();

    return {
        name: given_name,
        surname: family_name,
        email,
        img: picture
    }
    
}