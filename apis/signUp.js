import data from '../models/data.js';
import jwt from 'jsonwebtoken';
import {
    stringToHash,
} from 'bcrypt-inzi';

const signUp = async (req, res) => {

    const body = req.body;
    const SECRET_KEY = "";

    if (!body.name || !body.email || !body.password) {
        res.status(400).send({ message: 'data is missing' });
        return;
    }

    try {
        const user = await data.findOne({ email: body.email });
        if (user) { // user already exist
            res.status(400).send({ message: "user already exist. Please try a different email" });
            return;
        } else { // user not already exist

            // bcrypt hash
            const hashString = await stringToHash(body.password);
            const userCreate = await data.create({
                name: body.name,
                email: body.email,
                password: hashString
            })
            var token = jwt.sign({
                id: userCreate._id,
                name: userCreate.name,
                email: userCreate.email,
            }, SECRET_KEY)
            res.status(200)
                .send({
                    message: "signup successful",
                    token
                });
        }
    }
    catch (err) {
        console.log(err);
        res.status(500).send({ message: "server error" })
    }
}
export default signUp;